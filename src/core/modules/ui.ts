import { state } from '@pulsejs/core';
import { InternalTheme, InternalThemes, Themes } from '../../utils/theme';

const UiState = {
	Theme: state<Themes>('light').persist('theme_name'),
};

const ComputedState = {
	ThemeObject: state<InternalTheme>(() => {
		return InternalThemes[UiState.Theme.value];
	}),
};

export const ui = {
	state: { ...ComputedState, ...UiState },
};
