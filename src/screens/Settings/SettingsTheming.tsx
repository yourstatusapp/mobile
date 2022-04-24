import * as React from 'react';
import { Block, Fill, Spacer, Text } from '@parts';
import { useTheme } from 'styled-components/native';
import { usePulse } from '@pulsejs/react';
import core from '@core';
import { Appearance, Switch } from 'react-native';
import { SettingItem } from './index';

export const SettingsTheming: React.FC = () => {
	const theme = useTheme();

	const isDarkMode = usePulse(core.ui.isDarkMode);
	const useSystemTheme = usePulse(core.ui.USE_SYSTEM_THEME);

	const toggleTheme = (v: boolean) => {
		core.ui.current_theme.set(!v ? 'light' : 'dark');
	};

	const toggleUseSystemTheme = (v: boolean) => {
		console.log('toggleUseSystemTheme ', v);

		core.ui.USE_SYSTEM_THEME.patch({ enabled: v });
	};

	return (
		<Block color={theme.backgroundDarker}>
			<Text bold size={26} marginTop={15} marginLeft={15}>
				Theming
			</Text>
			<Spacer size={20} />
			<SettingItem
				disabled={useSystemTheme.enabled}
				text="Dark Theme"
				RightComponent={() => <Switch value={isDarkMode} onValueChange={v => toggleTheme(v)} />}
			/>
			<SettingItem
				text="Use system Theme"
				RightComponent={() => <Switch value={useSystemTheme.enabled} onValueChange={v => toggleUseSystemTheme(v)} />}
			/>
		</Block>
	);
};
