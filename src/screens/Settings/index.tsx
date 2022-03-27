import { Text, Block, Fill, Icon } from '@parts';
import React from 'react';
import { useTheme } from 'styled-components/native';

export { SettingsNotifications } from './SettingsNotifications';
export { SettingsSessions } from './SettingsSessions';
export { SettingsTheming } from './SettingsTheming';

export interface SettingItemProps {
	text: string;
	icon: string;
	onPress: () => void;
}

export const SettingItem = ({ text, onPress, icon }: SettingItemProps) => {
	const theme = useTheme();

	return (
		<Block style={{ paddingVertical: 15 }} paddingHorizontal={20} flex={0} onPress={onPress} color={theme.background} hCenter press row>
			<Icon name={icon} size={15} color={theme.textFadeLight} />
			<Text color={theme.text} weight="600" size={14} marginLeft={12}>
				{text}
			</Text>

			<Fill />
			<Icon name="chevron" size={15} color={theme.textFadeLight} style={{ transform: [{ rotate: '180deg' }] }} />
		</Block>
	);
};
