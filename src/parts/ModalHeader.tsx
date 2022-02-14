import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import { Block } from './Block';
import { IconButton } from './IconButton';
import { TextCustom as Text } from './TextUI';

interface ModalHeaderType {
	title: string;
}
export const ModalHeader = ({ title }: ModalHeaderType) => {
	const nav = useNavigation();
	const { colors } = useTheme();

	const sh = StyleSheet.flatten([{ height: 50, padding: 10, borderBottomColor: colors.white20, borderBottomWidth: 1 }]);
	return (
		<Block row flex={0} style={sh} vCenter color={colors.white10} hCenter>
			<IconButton
				name="arrow-big"
				size={22}
				iconSize={14}
				color={colors.white80}
				style={{ transform: [{ rotate: '180deg' }], position: 'absolute', left: 10 }}
				backgroundColor={colors.white20}
				onPress={() => nav.goBack()}
			/>
			<Text bold size={16} center>
				{title}
			</Text>
		</Block>
	);
};