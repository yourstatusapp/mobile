import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components/native';
import core from '@core';
import { useSimple } from 'simple-core-state';

export interface DefaultTheme {
	name: 'dark' | 'light';
	text: string;
	textFade: string;
	textFadeLight: string;
	background: string;
	backgroundDark: string;
	backgroundDarker: string;
	darker: string;
	darker1: string;
	darker2: string;

	primary: string;
	primary2: string;
}

export type ThemeTypes = 'light' | 'dark';

export const ThemesObject: { [k in ThemeTypes]: DefaultTheme } = {
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

export const useTheme = () => {
	const currentTheme = useSimple(core.currentTheme);
	const [systemThemeEnabled, setUseSystemTheme] = useState<boolean>(false);

	const isDarkMode = useCallback(() => {
		return currentTheme === 'dark';
	}, [currentTheme]);

	const updateUseSystemTheme = (v: boolean) => {
		setUseSystemTheme(v);
	};

	const toggleTheme = (setThemeTypeParam?: ThemeTypes) => {
		if (setThemeTypeParam) {
			core.currentTheme.setValue(setThemeTypeParam);
		} else {
			core.currentTheme.setValue(currentTheme === 'light' ? 'dark' : 'light');
		}
	};

	const theme = useMemo(() => ThemesObject[currentTheme], [currentTheme]);

	return {
		isDarkMode: isDarkMode(),
		toggleTheme,
		theme,
		updateUseSystemTheme,
		systemThemeEnabled,
		currentTheme,
	};
};

// This is specific for styled components so we can use the theme object inside a styled component anotation such like `color: ${p => p.theme.color}`
export const StyledThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const currentTheme = useSimple(core.currentTheme);

	useEffect(() => {
		console.log('xx->', currentTheme);
	}, [currentTheme]);
	// console.log(ThemesObject[currentTheme]);

	return <ThemeProvider theme={ThemesObject[currentTheme]}>{children}</ThemeProvider>;
};
