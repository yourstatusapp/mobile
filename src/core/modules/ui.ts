import { state } from '@pulsejs/core';
import { Appearance } from 'react-native';
import { app } from '.';
import { InternalTheme, InternalThemes, Themes } from '../../utils/theme';

const State = {
	Theme: state<Themes>('light').persist('theme_name'),
};

app.state.system_theme.set(Appearance.getColorScheme() || 'light');

Appearance.addChangeListener((v) => {
	app.state.system_theme.set(v.colorScheme || 'light');
	if (v.colorScheme && app.state.use_system_theme.is(true)) {
		State.Theme.set(v.colorScheme);
	}
});

const ComputedState = {
	ThemeObject: state<InternalTheme>(() => {
		return InternalThemes[State.Theme.value];
	}),
};

export const ui = {
	state: { ...ComputedState, ...State },
};
