// @ts-ignore
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
// @ts-ignore
import UnoCSS from 'unocss/astro'
// @ts-ignore
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import react from '@astrojs/react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
        resolve: {
            alias: {
                "~": path.resolve(__dirname, "./src")
            }
        }
    },
    integrations: [UnoCSS(), starlight({
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
                label: '应用列表',
                link: "applications",
            },
            {
                label: '课表与看板类',
                autogenerate: { directory: 'applications/kebiao-kanban' },
            },
        ],
        components: {
            Hero: './src/components/AiwbHero.astro',
            Sidebar: './src/components/AiwbSidebar.astro',
            Head: './src/components/AiwbHead.astro',
            PageTitle: "./src/components/AiwbPageTitle.astro",
        },
        }), react()],
});