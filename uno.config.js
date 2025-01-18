import {defineConfig, presetMini, presetUno} from 'unocss';
import { presetKobalte } from 'unocss-preset-primitives'

export default defineConfig({
	presets: [
		presetUno({
			dark: {
				dark: '[data-theme="dark"]',
				light: '[data-theme="light"]',
			},
		}),
		presetKobalte(/* options */),
		// ...custom presets
	],
})