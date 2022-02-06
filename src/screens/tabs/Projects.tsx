import { Block, Button, Spacer, Text } from '@parts';
import * as React from 'react';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

export const Projects = () => {
	const nav = useNavigation();
	return (
		<Block color={'black'}>
			<Spacer size={50} />
			<Button onPress={() => nav.navigate('newproject' as never)} text={'new project'} />
			<Text>tst</Text>
		</Block>
	);
};
