// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import UnoCSS from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
	markdown: {
		syntaxHighlight: 'prism',
		gfm: true,
	},
	vite: {
		server: {
			watch: {
				ignored: ["./starlight/*"], // HERE
			},
		},
	},
	integrations: [
		UnoCSS(),
		starlight({
			defaultLocale: 'zh-cn',
			logo: {
				src: './src/assets/aiwb-logo.png',
				replacesTitle: true
			},
			locales: {
				root: {
					label: '简体中文',
					lang: 'zh-CN', // lang 是 root 语言必须的
				},
			},
			title: 'Awesome-Iwb',
			social: {
				github: 'https://github.com/withastro/starlight',
			},
			customCss: [
				"./src/styles/custom.sass"
			],
			sidebar: [
				{
					label: '课表与看板类',
					autogenerate: { directory: 'applications/kebiao-kanban' },
				},
			],
			components: {
				Hero: './src/components/AiwbHero.astro',
				Sidebar: './src/components/AiwbSidebar.astro',
			},
		}),
	],
});
