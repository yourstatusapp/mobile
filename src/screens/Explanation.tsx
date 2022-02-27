import { Block, Button, Fill, Text } from '@parts';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

export const Explanation = () => {
	const nav = useNavigation();
	return (
		<Block safe paddingHorizontal={20}>
			<Text bold size={35} paddingTop={20}>
				Introduction
			</Text>
			<Fill />
			<Button text="close" onPress={() => nav.goBack()} />
		</Block>
	);
};
