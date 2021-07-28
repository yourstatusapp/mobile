export interface InternalTheme extends InteralThemeOther {
	background?: string;
	step1?: string;
	step2?: string;
	step3?: string;
	step4?: string;
	navBar?: string;
	navBarFade?: string;
	text?: string;
}

interface InteralThemeOther {
	primary?: string;
}

export type Themes = 'light' | 'dark';

const Other = {
	primary: '#707BDC',
};

export const InternalThemes: { [k in Themes]: InternalTheme } = {
	light: {
		...Other,
		background: '#ffffff',
		step1: '#E9E9E9',
		step2: '#E1E1E1',
		step3: '#D4D4D4',
		step4: '#D4D4D4',
		navBar: '#F8F8F8',
		navBarFade: '#D7D7D7',
		text: 'black',
	},
	dark: {
		...Other,
		background: '#171717',
		step1: '#1F1F1F',
		step2: '#2A2A2A',
		step3: '#333333',
		step4: '#434343',
		navBar: '#1E1E1E',
		navBarFade: '#333333',
		text: 'white',
	},
};
