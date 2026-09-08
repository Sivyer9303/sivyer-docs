// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeNova from 'starlight-theme-nova';
import screenshotReplacerDev from './src/integrations/screenshot-replacer/index.ts';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.sivyer.cc',
	integrations: [
		screenshotReplacerDev(),
		starlight({
			customCss: ['./src/styles/custom.css'],
			plugins: [starlightThemeNova()],
			title: 'AI 工具文档',
			description:
				'通用 AI 工具使用文档：编程助手、Agent、桌面客户端、生图与常见问题。文首可放置 API 服务推荐。',
			defaultLocale: 'root',
			locales: {
				root: {
					label: '简体中文',
					lang: 'zh-CN',
				},
			},
			social: [],
			sidebar: [
				{
					label: '开始使用',
					items: [
						{ label: '这是什么', slug: 'getting-started/overview' },
						{ label: '如何获取 API 服务', slug: 'getting-started/get-api-service' },
						{ label: '创建 API Key 与分组', slug: 'getting-started/create-key' },
						{ label: '验证是否配置成功', slug: 'getting-started/verify' },
					],
				},
				{
					label: '基础功能安装',
					items: [
						{ label: '安装 Node.js 与 npm', slug: 'basics/nodejs-npm' },
					],
				},
				{
					label: '配置管家',
					items: [
						{ label: 'CC Switch', slug: 'config-manager/cc-switch' },
						{ label: 'Codex++', slug: 'config-manager/codex-plus-plus' },
					],
				},
				{
					label: 'AI 编程助手',
					items: [
						{ label: 'Claude Code CLI', slug: 'coding/claude-code' },
						{ label: 'Claude Code 桌面版', slug: 'coding/claude-code-desktop' },
						{ label: 'Codex CLI', slug: 'coding/codex' },
						{ label: 'Codex 桌面版', slug: 'coding/codex-desktop' },
						{ label: 'Cursor', slug: 'coding/cursor' },
						{ label: 'Gemini CLI', slug: 'coding/gemini-cli' },
						{ label: 'ZCode', slug: 'coding/zcode' },
					],
				},
				{
					label: 'Agent 专区',
					items: [
						{ label: 'OpenClaw', slug: 'agents/openclaw' },
						{ label: 'Hermes Agent', slug: 'agents/hermes' },
						{ label: 'OpenCode', slug: 'agents/opencode' },
						{ label: 'DeepSeek Harness', slug: 'agents/deepseek-harness' },
					],
				},
				{
					label: '桌面聊天客户端',
					items: [
						{ label: 'Cherry Studio 聊天', slug: 'clients/cherry-studio' },
						{ label: 'Cherry Studio 生图（含 4K）', slug: 'clients/cherry-studio-image' },
						{ label: 'Chatbox', slug: 'clients/chatbox' },
						{ label: 'DeepChat', slug: 'clients/deepchat' },
					],
				},
				{
					label: '常见问题',
					items: [{ label: 'FAQ', slug: 'faq' }],
				},
				{
					label: '参考',
					items: [
						{ label: '配置速查', slug: 'reference/cheatsheet' },
						{ label: '协议说明', slug: 'reference/protocols' },
					],
				},
			],
			lastUpdated: true,
			pagination: true,
			tableOfContents: {
				minHeadingLevel: 2,
				maxHeadingLevel: 3,
			},
		}),
	],
});
