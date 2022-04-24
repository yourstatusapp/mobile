import { Text, Block, Fill, Icon } from '@parts';
import React from 'react';
import { useTheme } from 'styled-components/native';

export { SettingsNotifications } from './SettingsNotifications';
export { SettingsSessions } from './SettingsSessions';
export { SettingsTheming } from './SettingsTheming';

export interface SettingItemMenuProps {
	text: string;
	icon?: string;
	onPress: () => void;
	textColor?: string;
	iconColor?: string;
}

export const SettingItemMenu = ({ text, onPress, icon, textColor, iconColor }: SettingItemMenuProps) => {
	const theme = useTheme();

	return (
		<Block style={{ paddingVertical: 15 }} paddingHorizontal={20} flex={0} onPress={onPress} color={theme.background} hCenter press row>
			{icon && <Icon name={icon} size={15} color={iconColor || theme.textFadeLight} />}
			<Text color={textColor || theme.text} weight="600" size={14} marginLeft={12}>
				{text}
			</Text>

			<Fill />
			<Icon name="chevron" size={15} color={iconColor || theme.textFadeLight} style={{ transform: [{ rotate: '180deg' }] }} />
		</Block>
	);
};

interface SettingItemProps {
	text: string;
	RightComponent: any;
	spaceBottom?: boolean;
	disabled?: boolean;
}

export const SettingItem: React.FC<SettingItemProps> = ({ text, RightComponent, disabled, spaceBottom }) => {
	const theme = useTheme();

	return (
		<Block
			flex={0}
			row
			marginTop={spaceBottom ? 40 : 0}
			paddingHorizontal={20}
			color={theme.background}
			style={{ paddingVertical: 10, opacity: disabled ? 0.7 : 1 }}
			hCenter>
			<Text size={14} weight="600">
				{text}
			</Text>
			<Fill />
			{RightComponent && <RightComponent />}
		</Block>
	);
};
