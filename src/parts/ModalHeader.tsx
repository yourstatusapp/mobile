import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import { Block } from './Block';
import { TextCustom as Text } from './TextUI';

interface ModalHeaderType {
	title: string;
}
export const ModalHeader = ({ title }: ModalHeaderType) => {
	const { colors } = useTheme();
	const sh = StyleSheet.flatten([{ height: 50, padding: 10, borderBottomColor: colors.white20, borderBottomWidth: 1 }]);
	return (
		<Block row flex={0} style={sh} vCenter color={colors.white10} hCenter>
			<Text bold size={20} center>
				{title}
			</Text>
		</Block>
	);
};
