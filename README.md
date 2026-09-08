# Sivyer 中转站文档（Astro Starlight）

面向 [www.sivyer.cc](https://www.sivyer.cc) 的 NewAPI 中转站使用文档站点。

- 框架：[Astro Starlight](https://starlight.astro.build/)
- 特点：左侧多篇导航 + 长文右侧目录跳转 + Markdown 维护

## 主题

当前使用 [Starlight Nova](https://starlight-theme-nova.pages.dev/)。

内容写作约定见 [`docs/CONTENT_TEMPLATE.md`](./docs/CONTENT_TEMPLATE.md)。

## 本地开发

```bash
npm install
npm run dev
```

浏览器打开提示的本地地址（默认 `http://localhost:4321`）。

本地开发时，文档中的 `/screenshots/` 图片可点击，粘贴或上传后会自动覆盖对应 PNG（仅 `astro dev`，生产构建不含此工具）。

> 若本机全局 npm 缓存权限异常，可用项目内缓存：
>
> ```bash
> export NPM_CONFIG_CACHE="$(pwd)/.npm-cache"
> npm install
> ```

## 如何更新文档（日常维护）

1. 在 `src/content/docs/` 下编辑或新增 `.md` / `.mdx`
2. 新页面需带 frontmatter：

```md
---
title: 页面标题
description: 一句话说明
---
```

3. 若是新页面，还要在 `astro.config.mjs` 的 `sidebar` 里加一项
4. 长文用 `##` / `###` 写标题，右侧会自动出现「本页目录」并可跳转
5. 截图建议放 `src/assets/` 或 `public/images/`，在 Markdown 中引用

## 构建

```bash
npm run build
```

产物在 `dist/`，可用于 Cloudflare Pages。

## 部署到 Cloudflare Pages（建议）

本站是 **纯静态** Starlight 站点（`astro build` → `dist/`），**不要**用 `wrangler deploy`，也**不要**加 `@astrojs/cloudflare` 适配器。

1. 把本仓库推到 GitHub（已完成后可跳过）
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. 选仓库 `sivyer-docs`，构建设置：

| 项 | 值 |
| --- | --- |
| Production branch | `main` |
| Framework preset | `Astro` 或 `None` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| **Deploy command** | **留空**（不要填 `npx wrangler deploy`） |
| Environment variable | `NODE_VERSION` = `22`（可选；默认 Node 24 也可） |

4. Save and Deploy。成功后会有 `*.pages.dev` 预览地址
5. **Custom domains** 绑定例如 `docs.sivyer.cc`

若构建日志里先出现 `Build Complete!`，随后又执行 `npx wrangler deploy` 并失败：说明 Deploy command 配错了，到项目 **Settings → Builds** 把 Deploy command 清空后重新部署即可。

也可本地构建后用 Wrangler 仅上传静态资源（一般不需要）：

```bash
npm run build
npx wrangler pages deploy dist
```

## 目录结构

```text
src/content/docs/
  index.mdx                          # 首页
  getting-started/                   # 入门多篇
  tools/                             # 工具安装
  configure/                         # 配置方法
  cherry-studio/image-generation.md  # 生图长文（含 4K）
  faq/                               # 常见问题
  reference/                         # 速查附录
astro.config.mjs                     # 站点标题、侧边栏、中文语言等
```

## 许可证

文档内容归站点维护者所有；框架部分遵循各自开源许可证。
