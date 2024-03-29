import { DefaultTheme } from 'styled-components/native';

export const InternalThemes: { [k in 'light' | 'dark']: DefaultTheme } = {
	light: {
		name: 'light',
		text: '#000000',
		textFade: '#3F3F3F',
		textFadeLight: '#7B7B7B',
		background: '#FFFFFF',
		backgroundDark: '#F7F6F6',
		backgroundDarker: '#EBEBEB',
		darker: '#DADADA',
		darker1: '#BEBEBE',
		darker2: '#ADADAD',
		primary: '#2647E7',
		primary2: '#3f5ce7',
	},
	dark: {
		name: 'dark',
		text: '#FFFFFF',
		textFade: '#C0C0C0',
		textFadeLight: '#848484',
		background: '#000000',
		backgroundDark: '#0D0D0D',
		backgroundDarker: '#141414',
		darker: '#252525',
		darker1: '#414141',
		darker2: '#525252',
		primary: '#2647E7',
		primary2: '#3f5ce7',
	},
};
