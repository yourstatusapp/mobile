import React from 'react';
import { Block, Button, Fill, ModalHeader, Spacer, Text } from '@parts';
import { useNavigation } from '@react-navigation/native';

export const NewProject = () => {
	const nav = useNavigation();
	return (
		<Block safe>
			<ModalHeader title="Edit Profile" />
			<Spacer size={25} />
			<Text>Edit Profile</Text>
		</Block>
	);
};
