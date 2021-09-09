import React from 'react';
import { View } from 'react-native';

interface ModalTemplatesTypes {
	component: React.FC;
}

export const ModalTemplates = [
	{
		component: () => <View></View>,
	},
];
