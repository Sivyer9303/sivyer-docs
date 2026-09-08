/**
 * Dev-only UI: click docs screenshots to paste/upload and replace files on disk.
 * Injected only when `astro dev` runs (see integration).
 */

const ENDPOINT = '/__dev/replace-screenshot';
const STYLE_ID = 'screenshot-replacer-dev-style';
const MODAL_ID = 'screenshot-replacer-dev-modal';

function filenameFromSrc(src: string): string | null {
	try {
		const u = new URL(src, location.origin);
		const m = u.pathname.match(/\/screenshots\/([^/]+\.(?:png|svg))$/i);
		return m ? decodeURIComponent(m[1]) : null;
	} catch {
		return null;
	}
}

function stemOf(filename: string): string {
	return filename.replace(/\.(png|svg)$/i, '');
}

function ensureStyles() {
	if (document.getElementById(STYLE_ID)) return;
	const style = document.createElement('style');
	style.id = STYLE_ID;
	style.textContent = `
.sr-dev-wrap {
  position: relative;
  display: inline-block;
  max-width: 100%;
  vertical-align: top;
}
.sr-dev-wrap > img {
  cursor: pointer !important;
  outline: 2px dashed transparent;
  outline-offset: 2px;
  transition: outline-color .15s ease;
}
.sr-dev-wrap:hover > img,
.sr-dev-wrap:focus-within > img {
  outline-color: #2563eb;
}
.sr-dev-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 5;
  max-width: calc(100% - 16px);
  padding: 4px 8px;
  border-radius: 6px;
  font: 600 11px/1.3 system-ui, "PingFang SC", "Microsoft YaHei", sans-serif;
  color: #fff;
  background: #2563eb;
  box-shadow: 0 1px 4px rgba(0,0,0,.25);
  pointer-events: none;
  opacity: .95;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#${MODAL_ID} {
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, .55);
  padding: 16px;
  font-family: system-ui, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
}
#${MODAL_ID} .sr-panel {
  width: min(520px, 100%);
  background: #fff;
  color: #0f172a;
  border-radius: 12px;
  box-shadow: 0 20px 50px rgba(0,0,0,.3);
  overflow: hidden;
}
#${MODAL_ID} .sr-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 18px 8px;
}
#${MODAL_ID} .sr-head h2 {
  margin: 0;
  font-size: 16px;
}
#${MODAL_ID} .sr-head p {
  margin: 6px 0 0;
  font-size: 13px;
  color: #64748b;
  word-break: break-all;
}
#${MODAL_ID} .sr-close {
  border: 0;
  background: transparent;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  color: #64748b;
}
#${MODAL_ID} .sr-drop {
  margin: 8px 18px 16px;
  border: 2px dashed #94a3b8;
  border-radius: 10px;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px;
  text-align: center;
  background: #f8fafc;
}
#${MODAL_ID} .sr-drop.sr-active {
  border-color: #2563eb;
  background: #eff6ff;
}
#${MODAL_ID} .sr-drop strong { font-size: 14px; }
#${MODAL_ID} .sr-drop span { font-size: 12px; color: #64748b; }
#${MODAL_ID} .sr-actions {
  display: flex;
  gap: 8px;
  padding: 0 18px 18px;
}
#${MODAL_ID} .sr-actions button,
#${MODAL_ID} .sr-actions label {
  flex: 1;
  text-align: center;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid #cbd5e1;
  background: #fff;
}
#${MODAL_ID} .sr-actions .sr-primary {
  background: #2563eb;
  border-color: #2563eb;
  color: #fff;
}
#${MODAL_ID} .sr-status {
  padding: 0 18px 16px;
  font-size: 13px;
  color: #334155;
  min-height: 1.2em;
}
#${MODAL_ID} .sr-status.sr-ok { color: #15803d; }
#${MODAL_ID} .sr-status.sr-err { color: #b91c1c; }
#${MODAL_ID} input[type=file] { display: none; }
.sr-toast {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 100000;
  background: #0f172a;
  color: #fff;
  padding: 10px 14px;
  border-radius: 8px;
  font: 600 13px/1.3 system-ui, sans-serif;
  box-shadow: 0 8px 24px rgba(0,0,0,.25);
}
`;
	document.head.appendChild(style);
}

async function blobToPng(blob: Blob): Promise<Blob> {
	if (blob.type === 'image/png') return blob;
	const bitmap = await createImageBitmap(blob);
	const canvas = document.createElement('canvas');
	canvas.width = bitmap.width;
	canvas.height = bitmap.height;
	const ctx = canvas.getContext('2d');
	if (!ctx) throw new Error('无法创建 canvas');
	ctx.drawImage(bitmap, 0, 0);
	bitmap.close?.();
	const out = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
	if (!out) throw new Error('PNG 转换失败');
	return out;
}

async function uploadPng(filename: string, png: Blob) {
	const res = await fetch(ENDPOINT, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/octet-stream',
			'X-Screenshot-Filename': encodeURIComponent(filename),
		},
		body: png,
	});
	const data = await res.json().catch(() => ({ ok: false, error: '无效响应' }));
	if (!res.ok || !data.ok) throw new Error(data.error || `上传失败 (${res.status})`);
	return data as {
		ok: true;
		filename: string;
		bytes: number;
		removedSvg?: boolean;
		docsChanged?: string[];
	};
}

function toast(msg: string) {
	const el = document.createElement('div');
	el.className = 'sr-toast';
	el.textContent = msg;
	document.body.appendChild(el);
	setTimeout(() => el.remove(), 2800);
}

function refreshImage(img: HTMLImageElement, pngFilename: string) {
	img.src = `/screenshots/${pngFilename}?t=${Date.now()}`;
	img.dataset.srDev = '1';
}

function closeModal() {
	document.getElementById(MODAL_ID)?.remove();
}

function openModal(img: HTMLImageElement, filename: string) {
	closeModal();
	ensureStyles();
	const pngName = `${stemOf(filename)}.png`;
	const isSvg = /\.svg$/i.test(filename);

	const root = document.createElement('div');
	root.id = MODAL_ID;
	root.innerHTML = `
		<div class="sr-panel" role="dialog" aria-modal="true" aria-label="替换截图">
			<div class="sr-head">
				<div>
					<h2>替换截图（仅本地开发）</h2>
					<p>当前：<code>${filename}</code></p>
					<p>保存为：<code>public/screenshots/${pngName}</code>${isSvg ? '（会删掉 SVG 占位并改文档引用）' : ''}</p>
				</div>
				<button type="button" class="sr-close" aria-label="关闭">×</button>
			</div>
			<div class="sr-drop" tabindex="0">
				<strong>在这里粘贴图片（Ctrl/Cmd + V）</strong>
				<span>或拖拽图片到此处 · 支持 PNG / JPG / WebP / GIF，会自动转成 PNG</span>
			</div>
			<div class="sr-actions">
				<label class="sr-primary">选择文件<input type="file" accept="image/*" /></label>
				<button type="button" class="sr-cancel">取消</button>
			</div>
			<div class="sr-status">提示：粘贴后会立即写入磁盘上的 PNG。</div>
		</div>
	`;

	const drop = root.querySelector('.sr-drop') as HTMLDivElement;
	const status = root.querySelector('.sr-status') as HTMLDivElement;
	const fileInput = root.querySelector('input[type=file]') as HTMLInputElement;

	const setStatus = (text: string, kind: '' | 'ok' | 'err' = '') => {
		status.textContent = text;
		status.className = `sr-status${kind ? ` sr-${kind}` : ''}`;
	};

	const handleBlob = async (blob: Blob | null | undefined) => {
		if (!blob) return;
		if (!blob.type.startsWith('image/')) {
			setStatus('请粘贴或选择图片文件', 'err');
			return;
		}
		try {
			setStatus('正在转换为 PNG 并上传…');
			const png = await blobToPng(blob);
			const result = await uploadPng(filename, png);
			setStatus(`已保存 ${result.filename}（${result.bytes} 字节）`, 'ok');
			refreshImage(img, result.filename);
			toast(`已替换：${result.filename}`);
			setTimeout(closeModal, 700);
		} catch (err) {
			setStatus(err instanceof Error ? err.message : String(err), 'err');
		}
	};

	const onPaste = (e: ClipboardEvent) => {
		const items = e.clipboardData?.items;
		if (!items) return;
		for (const item of items) {
			if (item.type.startsWith('image/')) {
				e.preventDefault();
				void handleBlob(item.getAsFile());
				return;
			}
		}
		setStatus('剪贴板里没有图片，请先复制截图再粘贴', 'err');
	};

	root.addEventListener('click', (e) => {
		if (e.target === root) closeModal();
	});
	root.querySelector('.sr-close')?.addEventListener('click', closeModal);
	root.querySelector('.sr-cancel')?.addEventListener('click', closeModal);
	fileInput.addEventListener('change', () => {
		const f = fileInput.files?.[0];
		void handleBlob(f);
	});

	drop.addEventListener('dragenter', (e) => {
		e.preventDefault();
		drop.classList.add('sr-active');
	});
	drop.addEventListener('dragover', (e) => {
		e.preventDefault();
		drop.classList.add('sr-active');
	});
	drop.addEventListener('dragleave', () => drop.classList.remove('sr-active'));
	drop.addEventListener('drop', (e) => {
		e.preventDefault();
		drop.classList.remove('sr-active');
		const f = e.dataTransfer?.files?.[0];
		void handleBlob(f);
	});

	document.addEventListener('paste', onPaste);
	const prevClose = closeModal;
	const cleanup = () => {
		document.removeEventListener('paste', onPaste);
	};
	const observer = new MutationObserver(() => {
		if (!document.getElementById(MODAL_ID)) {
			cleanup();
			observer.disconnect();
		}
	});
	observer.observe(document.body, { childList: true });
	void prevClose;

	document.body.appendChild(root);
	drop.focus();
}

function enhanceImage(img: HTMLImageElement) {
	if (img.dataset.srDev === '1') return;
	const filename = filenameFromSrc(img.currentSrc || img.src);
	if (!filename) return;
	img.dataset.srDev = '1';

	let wrap = img.parentElement;
	if (!wrap?.classList.contains('sr-dev-wrap')) {
		wrap = document.createElement('span');
		wrap.className = 'sr-dev-wrap';
		img.replaceWith(wrap);
		wrap.appendChild(img);
	}

	if (!wrap.querySelector('.sr-dev-badge')) {
		const badge = document.createElement('span');
		badge.className = 'sr-dev-badge';
		badge.textContent = `替换 · ${stemOf(filename)}.png`;
		wrap.appendChild(badge);
	} else {
		const badge = wrap.querySelector('.sr-dev-badge');
		if (badge) badge.textContent = `替换 · ${stemOf(filename)}.png`;
	}

	img.title = `点击替换截图：${filename}（仅本地开发）`;
	img.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();
		openModal(img, filename);
	});
}

function scan() {
	ensureStyles();
	document.querySelectorAll<HTMLImageElement>('img[src*="/screenshots/"]').forEach(enhanceImage);
}

function boot() {
	scan();
	document.addEventListener('astro:page-load', scan);
	const mo = new MutationObserver(() => scan());
	mo.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', boot);
} else {
	boot();
}
