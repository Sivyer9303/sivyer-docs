/**
 * Local-dev-only Astro integration:
 * click /screenshots/* images → paste/upload → save as PNG on disk.
 * If the current file is an SVG placeholder, it is removed and MDX refs are updated to .png.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ENDPOINT = '/__dev/replace-screenshot';

/**
 * @param {string} name
 * @returns {{ stem: string, ext: '.png' | '.svg' } | null}
 */
function parseScreenshotName(name) {
	if (!name || typeof name !== 'string') return null;
	const base = path.basename(name);
	if (base !== name) return null;
	if (base.includes('..') || base.includes('/') || base.includes('\\')) return null;
	const m = base.match(/^([\w\u4e00-\u9fff+\-\[\](). ]+)\.(png|svg)$/i);
	if (!m) return null;
	return { stem: m[1], ext: ('.' + m[2].toLowerCase()) };
}

/** @param {Buffer} buf */
function isPng(buf) {
	return (
		buf.length >= 8 &&
		buf[0] === 0x89 &&
		buf[1] === 0x50 &&
		buf[2] === 0x4e &&
		buf[3] === 0x47 &&
		buf[4] === 0x0d &&
		buf[5] === 0x0a &&
		buf[6] === 0x1a &&
		buf[7] === 0x0a
	);
}

/**
 * @param {string} docsRoot
 * @param {string} stem
 */
async function retargetDocsToPng(docsRoot, stem) {
	const from = `/screenshots/${stem}.svg`;
	const to = `/screenshots/${stem}.png`;
	/** @type {string[]} */
	const changed = [];
	async function walk(dir) {
		const entries = await fs.readdir(dir, { withFileTypes: true });
		for (const ent of entries) {
			const full = path.join(dir, ent.name);
			if (ent.isDirectory()) {
				await walk(full);
				continue;
			}
			if (!/\.(mdx?|md)$/i.test(ent.name)) continue;
			const text = await fs.readFile(full, 'utf8');
			if (!text.includes(from)) continue;
			await fs.writeFile(full, text.split(from).join(to), 'utf8');
			changed.push(path.relative(docsRoot, full));
		}
	}
	await walk(docsRoot);
	return changed;
}

/**
 * @returns {import('astro').AstroIntegration}
 */
export default function screenshotReplacerDev() {
	return {
		name: 'screenshot-replacer-dev',
		hooks: {
			'astro:config:setup'({ command, injectScript }) {
				if (command !== 'dev') return;
				injectScript(
					'page',
					`import ${JSON.stringify(new URL('./client.ts', import.meta.url).href)};`,
				);
			},
			'astro:server:setup'({ server, logger }) {
				const root = path.resolve(fileURLToPath(new URL('../../..', import.meta.url)));
				const screenshotsDir = path.join(root, 'public', 'screenshots');
				const docsRoot = path.join(root, 'src', 'content', 'docs');

				server.middlewares.use(async (req, res, next) => {
					if (!req.url?.startsWith(ENDPOINT)) return next();

					res.setHeader('Cache-Control', 'no-store');

					if (req.method === 'OPTIONS') {
						res.statusCode = 204;
						res.end();
						return;
					}

					if (req.method === 'GET' && req.url.split('?')[0] === `${ENDPOINT}/list`) {
						try {
							const files = (await fs.readdir(screenshotsDir))
								.filter((f) => /\.(png|svg)$/i.test(f))
								.sort();
							res.setHeader('Content-Type', 'application/json; charset=utf-8');
							res.end(JSON.stringify({ ok: true, files }));
						} catch (err) {
							res.statusCode = 500;
							res.end(JSON.stringify({ ok: false, error: String(err) }));
						}
						return;
					}

					if (req.method !== 'POST' || req.url.split('?')[0] !== ENDPOINT) {
						res.statusCode = 405;
						res.setHeader('Content-Type', 'application/json; charset=utf-8');
						res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }));
						return;
					}

					const rawName = String(req.headers['x-screenshot-filename'] || '');
					let filename = rawName;
					try {
						filename = decodeURIComponent(rawName);
					} catch {
						/* keep raw */
					}

					const parsed = parseScreenshotName(filename);
					if (!parsed) {
						res.statusCode = 400;
						res.setHeader('Content-Type', 'application/json; charset=utf-8');
						res.end(JSON.stringify({ ok: false, error: '非法文件名，仅允许 public/screenshots 下的 .png / .svg' }));
						return;
					}

					const pngName = `${parsed.stem}.png`;
					const svgName = `${parsed.stem}.svg`;
					const pngPath = path.resolve(screenshotsDir, pngName);
					const svgPath = path.resolve(screenshotsDir, svgName);
					const rootDir = path.resolve(screenshotsDir);
					if (!pngPath.startsWith(rootDir + path.sep)) {
						res.statusCode = 400;
						res.end(JSON.stringify({ ok: false, error: '路径非法' }));
						return;
					}

					try {
						/** @type {Buffer[]} */
						const chunks = [];
						for await (const chunk of req) {
							chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
						}
						const buf = Buffer.concat(chunks);
						if (!isPng(buf)) {
							res.statusCode = 400;
							res.setHeader('Content-Type', 'application/json; charset=utf-8');
							res.end(JSON.stringify({ ok: false, error: '内容不是有效 PNG（前端应先转成 PNG）' }));
							return;
						}
						await fs.mkdir(screenshotsDir, { recursive: true });
						await fs.writeFile(pngPath, buf);

						/** @type {string[]} */
						let docsChanged = [];
						let removedSvg = false;
						try {
							await fs.access(svgPath);
							await fs.unlink(svgPath);
							removedSvg = true;
							docsChanged = await retargetDocsToPng(docsRoot, parsed.stem);
						} catch {
							/* no svg placeholder */
						}

						logger.info(
							`[screenshot-replacer] wrote ${pngName} (${buf.length} bytes)` +
								(removedSvg ? `; removed ${svgName}; docs ${docsChanged.length}` : ''),
						);
						res.setHeader('Content-Type', 'application/json; charset=utf-8');
						res.end(
							JSON.stringify({
								ok: true,
								filename: pngName,
								bytes: buf.length,
								removedSvg,
								docsChanged,
							}),
						);
					} catch (err) {
						logger.error(`[screenshot-replacer] ${err}`);
						res.statusCode = 500;
						res.setHeader('Content-Type', 'application/json; charset=utf-8');
						res.end(JSON.stringify({ ok: false, error: String(err) }));
					}
				});
			},
		},
	};
}
