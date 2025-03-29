import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/react';

const config: Config = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
      minHeight: {
        'screen-minus-navbar': 'calc(100vh - 5rem)',
      },
      maxHeight: {
        'screen-minus-navbar': 'calc(100vh - 5rem)',
      },
    },
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
							DEFAULT: '#60cbd7',
							foreground: '#ffffff',
              '50': '#effbfc',
              '100': '#d6f5f7',
              '200': '#b2ebef',
              '300': '#7ddae3',
              '400': '#60cbd7',
              '500': '#25a5b5',
              '600': '#228598',
              '700': '#226c7c',
              '800': '#245866',
              '900': '#224b57',
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
