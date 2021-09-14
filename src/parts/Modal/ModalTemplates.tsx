import { Text } from '@parts';
import React from 'react';
import { View } from 'react-native';

interface ModalTemplatesTypes {
	component: React.FC;
}

export const ModalTemplates = [
	{
		component: () => (
			<View>
				<Text>test</Text>
			</View>
		),
	},
];
