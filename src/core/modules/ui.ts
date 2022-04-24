import { state } from '@pulsejs/core';
import { InternalThemes } from '../../utils/theme';
import { DefaultTheme } from 'styled-components/native';
import { Appearance } from 'react-native';

export const UIState = {
	current_theme: state<'light' | 'dark'>('dark').persist('theme_name'),
	USE_SYSTEM_THEME: state<{ enabled: boolean; theme: 'light' | 'dark' }>({
		enabled: false,
		theme: Appearance.getColorScheme() || 'light',
	}).persist('listen_to_system_theme2'),
};

// UiState.system_theme.set(Appearance.getColorScheme() || 'light');

// Appearance.addChangeListener(v => {
// 	UiState.system_theme.set(v.colorScheme || 'light');
// 	if (v.colorScheme && UiState.use_system_theme.is(true)) {
// 		UiState.Theme.set(v.colorScheme);
// 	}
// });

export const UiComputedState = {
	ThemeObject: state<DefaultTheme>(() => {
		// first check if system theme is enabled
		if (UIState.USE_SYSTEM_THEME.value.enabled === true) {
			return InternalThemes[UIState.USE_SYSTEM_THEME.value.theme];
		}

		return InternalThemes[UIState.current_theme.value];
	}),
	isDarkMode: state<boolean>(() => {
		if (UIState.USE_SYSTEM_THEME.value.enabled === true) {
			return UIState.USE_SYSTEM_THEME.value.theme === 'dark';
		} else {
			return UIState.current_theme.value === 'dark';
		}
	}),
};

export const ui = { ...UiComputedState, ...UIState };
