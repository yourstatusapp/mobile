import { DefaultTheme } from 'styled-components/native';

export const InternalThemes: { [k in 'light' | 'dark']: DefaultTheme } = {
	light: {
		theme: {
			primary: '#2647E7',
		},
		colors: {
			white20: 'rgba(255, 255, 255, 0.2)',
			white40: 'rgba(255, 255, 255, 0.4)',
			white60: 'rgba(255, 255, 255, 0.6)',
			white80: 'rgba(255, 255, 255, 0.8)',
			white: 'rgb(255, 255, 255)',
			black20: 'rgba(0, 0, 0, 0.2)',
			black40: 'rgba(0, 0, 0, 0.4)',
			black60: 'rgba(0, 0, 0, 0.6)',
			black80: 'rgba(0, 0, 0, 0.8)',
			black: 'rgb(0, 0, 0)',
		},
	},
	dark: {
		theme: {
			primary: '#2647E7',
		},
		colors: {
			white20: 'rgba(255, 255, 255, 0.2)',
			white40: 'rgba(255, 255, 255, 0.4)',
			white60: 'rgba(255, 255, 255, 0.6)',
			white80: 'rgba(255, 255, 255, 0.8)',
			white: 'rgba(255, 255, 255)',
			black20: 'rgba(0, 0, 0, 0.2)',
			black40: 'rgba(0, 0, 0, 0.4)',
			black60: 'rgba(0, 0, 0, 0.6)',
			black80: 'rgba(0, 0, 0, 0.8)',
			black: 'rgba(0, 0, 0)',
		},
	},
};
