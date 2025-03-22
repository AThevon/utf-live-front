import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/react';

const config: Config = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {},
	},
	darkMode: 'class',
	plugins: [
		heroui({
			prefix: 'heroui',
			addCommonColors: false,
			defaultTheme: 'dark',
			defaultExtendTheme: 'dark',
			layout: {},
			themes: {
				dark: {
					layout: {},
					colors: {
						background: '#0e0e0e',
						foreground: '#f4f4f5',
						primary: {
							DEFAULT: '#1f80ff',
							foreground: '#ffffff',
							'50': '#edf8ff',
							'100': '#d7eeff',
							'200': '#b9e2ff',
							'300': '#88d2ff',
							'400': '#50b8ff',
							'500': '#2897ff',
							'600': '#1f80ff',
							'700': '#0a60eb',
							'800': '#0f4dbe',
							'900': '#134595',
						},
						secondary: {
							DEFAULT: '#3b82f6',
							foreground: '#ffffff',
						},
					},
				},
				light: {
					// Optionnel : tu peux ajouter la version light plus tard
					colors: {},
					layout: {},
				},
			},
		}),
	],
};

export default config;
