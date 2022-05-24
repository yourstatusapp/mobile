import { Block, Text } from '@parts';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { useTheme } from 'styled-components/native';

export const Event = () => {
	const theme = useTheme();
	const route = useRoute();

	return (
		<Block color={theme.background}>
			<Text bold>{JSON.stringify(route.params)}</Text>
		</Block>
	);
};
