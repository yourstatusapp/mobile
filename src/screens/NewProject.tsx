import React from 'react';
import { Block, Button, Fill, Spacer, Text } from '@parts';
import { useNavigation } from '@react-navigation/native';

export const NewProject = () => {
	const nav = useNavigation();
	return (
		<Block safe>
			<Text>Create new project</Text>
			{/*<Spacer size={50} />*/}
			<Fill />
			<Button onPress={() => nav.goBack()} text={'Close'} />
		</Block>
	);
};
