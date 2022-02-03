import { state } from '@pulsejs/core';
import { Appearance } from 'react-native';
import { InternalTheme, InternalThemes, Themes } from '../../utils/Theme';

export const UiState = {
	Theme: state<Themes>('light').persist('theme_name'),
	system_theme: state<Themes>('light'),
	use_system_theme: state<boolean>(false),
};

UiState.system_theme.set(Appearance.getColorScheme() || 'light');

Appearance.addChangeListener(v => {
	UiState.system_theme.set(v.colorScheme || 'light');
	if (v.colorScheme && UiState.use_system_theme.is(true)) {
		UiState.Theme.set(v.colorScheme);
	}
});

export const UiComputedState = {
	ThemeObject: state<InternalTheme>(() => {
		return InternalThemes[UiState.Theme.value];
	}),
};

export const ui = { state: { ...UiComputedState, ...UiState } };
