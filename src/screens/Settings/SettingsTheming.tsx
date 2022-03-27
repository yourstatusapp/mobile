import * as React from 'react';
import { Block, Text } from '@parts';
import { useTheme } from 'styled-components/native';

export const SettingsTheming: React.FC = () => {
	const theme = useTheme();

	// const current_device = usePulse(core.lists.devices.selectors.current);

	return (
		<Block color={theme.backgroundDarker}>
			<Text>Theming</Text>
		</Block>
	);
};
