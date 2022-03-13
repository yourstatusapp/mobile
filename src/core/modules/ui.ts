import { state } from '@pulsejs/core';
import { InternalThemes } from '../../utils/theme';
import { DefaultTheme } from 'styled-components/native';

export const UIState = {
	current_theme: state<'light' | 'dark'>('dark').persist('theme_name'),
	use_system_theme: state<boolean>(false),
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
		return InternalThemes[UIState.current_theme.value];
	}),
	isDarkMode: state<boolean>(() => {
		return !!UIState.use_system_theme.value || UIState.current_theme.value === 'dark';
	}),
};

export const ui = { ...UiComputedState, ...UIState };
