# 文档内容模板约定（给后续生成/写作用）

## 目标

通用 AI 工具文档：正文不绑定单一商家；品牌仅出现在文首广告与「如何获取 API 服务」页。

## 页面骨架（MDX）

```mdx
---
title: 页面标题
description: 一句话说明（通用）
---

import SponsorBanner from '../../components/SponsorBanner.astro';

<SponsorBanner />

## 适合谁

## 安装

## 前置条件

## 方式一：CC Switch / 图形界面配置（推荐）

## 方式二：手动配置

## 验证

## 常见问题
```

## 占位符

- `{{API_BASE_URL}}`
- `{{API_BASE_URL}}/v1`
- `{{MODEL_NAME}}`

## 截图

截图统一放在 `public/screenshots/`（**中文文件名**），完整清单见该目录 `README.md`。  
按同名覆盖即可，无需改文档。

## 广告规则

1. 每页文首最多一次 `<SponsorBanner />`
2. 商家注册/充值细节只写在 `getting-started/get-api-service`
3. 工具正文禁止反复安利
4. 推荐站点外链保持可点击；品牌推荐主要放在文首 Sponsored 与「如何获取 API 服务」页

## 侧边栏分组

见 `astro.config.mjs`：开始使用 / 基础功能安装 / 配置管家 / AI 编程助手（含 CLI 与桌面版） / Agent 专区 / 桌面聊天客户端 / FAQ / 参考。
