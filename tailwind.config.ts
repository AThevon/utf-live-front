import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/react';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
      fontFamily: {
        sans: ['var(--font-custom-sans)', ...fontFamily.sans],
        secondary: ['var(--font-custom-secondary)', ...fontFamily.sans],
        mono: ['var(--font-custom-mono)', ...fontFamily.mono],
      },
      letterSpacing: {
        xxl: '.15rem',
      },
      height: {
        'screen-minus-navbar': 'calc(100vh - 80px)',
      },
      minHeight: {
        'screen-minus-navbar': 'calc(100vh - 80px)',
      },
      maxHeight: {
        'screen-minus-navbar': 'calc(100vh - 80px)',
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
