import { DefaultTheme } from 'styled-components/native';

export const InternalThemes: { [k in 'light' | 'dark']: DefaultTheme } = {
	light: {
		theme: {
			primary: '#2647E7',
		},
		colors: {
			white10: 'hsl(0, 0%, 5%)',
			white20: 'hsl(0, 0%, 10%)',
			white40: 'hsl(0, 0%, 20%)',
			white60: 'hsl(0, 0%, 30%)',
			white80: 'hsl(0, 0%, 40%)',
			white: 'hsl(0, 0%, 100%)',
			black10: 'hsl(0, 0%, 50%)',
			black20: 'hsl(0, 0%, 80%)',
			black40: 'hsl(0, 0%, 60%)',
			black60: 'hsl(0, 0%, 10%)',
			black80: 'hsl(0, 0%, 5%)',
			black: 'hsl(0, 0%, 0%)',
		},
	},
	dark: {
		theme: {
			primary: '#2647E7',
		},
		colors: {
			white10: 'hsl(0, 0%, 10%)',
			white20: 'hsl(0, 0%, 20%)',
			white40: 'hsl(0, 0%, 40%)',
			white60: 'hsl(0, 0%, 60%)',
			white80: 'hsl(0, 0%, 80%)',
			white: 'rgba(255, 255, 255)',
			black10: 'rgba(0, 0, 0, 0.2)',
			black20: 'rgba(0, 0, 0, 0.2)',
			black40: 'rgba(0, 0, 0, 0.4)',
			black60: 'rgba(0, 0, 0, 0.6)',
			black80: 'rgba(0, 0, 0, 0.8)',
			black: 'rgba(0, 0, 0)',
		},
	},
};
