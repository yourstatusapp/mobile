import React from 'react';
import { Icon, Text } from '@parts';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Test = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ flex: 1 }}>
				<Text color="red">test</Text>
				<Icon name="send" />
				<Icon name="cog" />
			</View>
		</SafeAreaView>
	);
};
