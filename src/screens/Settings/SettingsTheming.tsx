import * as React from 'react';
import { Block, Spacer, Text } from '@parts';
import { Switch } from 'react-native';
import { SettingItem } from './index';
import { useTheme } from '@hooks';

export const SettingsTheming: React.FC = () => {
	const { theme, isDarkMode, updateUseSystemTheme, systemThemeEnabled, toggleTheme } = useTheme();

	const toggleUseSystemTheme = (v: boolean) => {
		console.log('toggleUseSystemTheme ', v);
		updateUseSystemTheme(v);
	};

	const toggleUiTheme = () => toggleTheme();

	return (
		<Block color={theme.backgroundDarker}>
			<Text bold size={26} marginTop={15} marginLeft={15}>
				Theming
			</Text>
			<Spacer size={20} />
			<SettingItem
				disabled={systemThemeEnabled}
				text="Dark Theme"
				RightComponent={() => <Switch value={isDarkMode} onValueChange={toggleUiTheme} />}
			/>
			<SettingItem
				text="Use system Theme"
				RightComponent={() => (
					<Switch value={systemThemeEnabled} onValueChange={v => toggleUseSystemTheme(v)} />
				)}
			/>
		</Block>
	);
};
