export interface InternalTheme extends InteralThemeOther {
	background?: string;
	darker?: string;
	navBar?: string;
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
		background: '#171717',
		navBar: '#1E1E1E',
	},
	dark: {
		...Other,
		background: '#171717',
		navBar: '#1E1E1E',
	},
};
