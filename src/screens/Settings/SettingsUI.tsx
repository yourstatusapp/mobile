import * as React from 'react';
import { Block, Spacer, Text } from '@parts';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

export const SettingsUI: React.FC = () => {
	const theme = useTheme();
	const nav = useNavigation();

	return (
		<Block color={theme.backgroundDarker} paddingHorizontal={10}>
			<Text bold size={30}>
				UI Library
			</Text>
			<Spacer size={30} />
			<Text>normal</Text>
			<Text weight="600">medium</Text>
			<Text bold>bold</Text>
		</Block>
	);
};
