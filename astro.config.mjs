// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.sivyer.cc',
	integrations: [
		starlight({
			title: 'Sivyer 中转站文档',
			description: 'Sivyer（www.sivyer.cc）NewAPI 中转站使用文档：注册、创建 Key、工具配置、Cherry Studio 生图与常见问题。',
			defaultLocale: 'root',
			locales: {
				root: {
					label: '简体中文',
					lang: 'zh-CN',
				},
			},
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/Sivyer9303/sivyer-docs',
				},
			],
			editLink: {
				baseUrl: 'https://github.com/Sivyer9303/sivyer-docs/edit/main/',
			},
			sidebar: [
				{
					label: '开始使用',
					items: [
						{ label: '中转站是什么', slug: 'getting-started/overview' },
						{ label: '注册与登录', slug: 'getting-started/register' },
						{ label: '创建 API Key 与分组', slug: 'getting-started/create-key' },
						{ label: '验证是否配置成功', slug: 'getting-started/verify' },
					],
				},
				{
					label: '工具安装',
					items: [{ label: '下载、安装与使用', slug: 'tools/install' }],
				},
				{
					label: '配置中转站',
					items: [{ label: '工具配置与手动配置', slug: 'configure' }],
				},
				{
					label: 'Cherry Studio',
					items: [
						{
							label: '生图详解（分辨率 / 质量 / 比例 / 4K）',
							slug: 'cherry-studio/image-generation',
						},
					],
				},
				{
					label: '常见问题',
					items: [{ label: 'FAQ', slug: 'faq' }],
				},
				{
					label: '参考',
					items: [{ label: '配置速查与附录', slug: 'reference/cheatsheet' }],
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
