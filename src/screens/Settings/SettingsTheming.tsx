import * as React from 'react';
import { Block, Fill, Text } from '@parts';
import { useTheme } from 'styled-components/native';
import { usePulse } from '@pulsejs/react';
import core from '@core';
import { Switch } from 'react-native';
import { SettingItem } from './index';

export const SettingsTheming: React.FC = () => {
	const theme = useTheme();

	const isDarkMode = usePulse(core.ui.isDarkMode);
	const toggleTheme = (v: boolean) => core.ui.current_theme.set(!v ? 'light' : 'dark');

	return (
		<Block color={theme.backgroundDarker}>
			<Text bold size={26} marginTop={15} marginLeft={15}>
				Theming
			</Text>

			<SettingItem text="Dark Theme" RightComponent={() => <Switch value={isDarkMode} onValueChange={toggleTheme} />} />
		</Block>
	);
};
