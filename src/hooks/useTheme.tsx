import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useContext } from 'react';
import { atom, useRecoilState, useRecoilValue } from 'recoil';

import styled, {
	DefaultTheme,
	ThemeProvider,
	useTheme as useStyledTheme,
} from 'styled-components/native';

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

type ThemeTypes = 'light' | 'dark';

// export const ThemeContext = createContext({
// 	theme: InternalThemes.light,
// });

const themeState = atom<ThemeTypes>({
	key: 'theme',
	default: 'light',
});

export const useTheme = () => {
	const [currentTheme, setCurrentTheme] = useRecoilState(themeState);
	// const [currentTheme, setCurrentTheme] = useState<ThemeTypes>('light');
	const [systemThemeEnabled, setUseSystemTheme] = useState<boolean>(false);

	const isDarkMode = useMemo(() => currentTheme === 'dark', [currentTheme]);

	const updateUseSystemTheme = (v: boolean) => {
		setUseSystemTheme(v);
	};

	const toggleTheme = useCallback(
		(type?: ThemeTypes) => {
			console.log('incoming type => ', type);
			console.log(type ?? currentTheme === 'light' ? 'dark' : 'light');

			setCurrentTheme(type ?? currentTheme === 'light' ? 'dark' : 'light');
		},
		[currentTheme, setCurrentTheme],
	);

	// const theme = useMemo(() => {
	// 	console.log(`Theming chaning to ${currentTheme}`);

	// 	return InternalThemes[currentTheme];
	// }, [currentTheme]);

	return {
		isDarkMode,
		toggleTheme,
		theme: InternalThemes[currentTheme],
		updateUseSystemTheme,
		systemThemeEnabled,
		currentTheme,
	};
};

// export const ThemeWrapper: React.FC<{ theme: DefaultTheme }> = ({ children, theme }) => {
// 	return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
// };
