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
			white: 'black',
			black10: 'hsl(0, 0%, 50%)',
			black20: 'hsl(0, 0%, 80%)',
			black40: 'hsl(0, 0%, 60%)',
			black60: 'hsl(0, 0%, 10%)',
			black80: 'hsl(0, 0%, 5%)',
			black: 'white',
		},
	},
	dark: {
		theme: {
			primary: '#2647E7',
		},
		colors: {
			white10: 'hsl(0, 0%, 5%)',
			white20: 'hsl(0, 0%, 10%)',
			white40: 'hsl(0, 0%, 20%)',
			white60: 'hsl(0, 0%, 30%)',
			white80: 'hsl(0, 0%, 40%)',
			white: 'white',
			black10: 'hsl(0, 0%, 50%)',
			black20: 'hsl(0, 0%, 80%)',
			black40: 'hsl(0, 0%, 60%)',
			black60: 'hsl(0, 0%, 10%)',
			black80: 'hsl(0, 0%, 5%)',
			black: 'black',
		},
	},
};
