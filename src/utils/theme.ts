export interface InternalTheme extends InteralThemeOther {
	background?: string;
	darker?: string;
	navBar?: string;
	navBarFade?: string;
	text?: string;
}

interface InteralThemeOther {
	primary?: string;
}

export type Themes = 'light' | 'dark';

const Other = {
	primary: '#5CABF3',
};

export const InternalThemes: { [k in Themes]: InternalTheme } = {
	light: {
		...Other,
		background: 'white',
		navBar: '#F8F8F8',
		navBarFade: '#D7D7D7',
		text: 'black',
	},
	dark: {
		...Other,
		background: '#171717',
		navBar: '#1E1E1E',
		navBarFade: '#333333',
		text: 'white',
	},
};
