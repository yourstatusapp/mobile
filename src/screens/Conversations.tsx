import core, { request } from '@core';
import { Avatar, Block, Icon, Text } from '@parts';
import { usePulse } from '@pulsejs/react';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, ViewStyle } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import { useTheme } from 'styled-components/native';

interface ConversationType {
	id: string;
	account_id: string;
	username: string;
	avatar: string;
}

export const Conversations = () => {
	const theme = useTheme();
	const [A, SetA] = useState<ConversationType[]>([]);
	const [NewConversation, SetNewConversation] = useState(false);
	const isDarkMode = usePulse(core.ui.isDarkMode);
	const sh2 = StyleSheet.flatten<ViewStyle>([{ position: 'absolute', top: 0, height: hasNotch() ? 44 : 40, width: '100%', zIndex: 10, opacity: 1 }]);

	const getFriends = async () => {
		const res = await request<ConversationType[]>('get', '/conversations');
		if (res.data) {
			SetA(res.data);
		}
	};
	const nav = useNavigation();

	useEffect(() => {
		getFriends();
	}, []);

	return (
		<Block color={theme.background}>
			<FlatList
				data={A}
				contentContainerStyle={{ paddingTop: 50 }}
				ListFooterComponent={() => (
					<Block row vCenter onPress={() => SetNewConversation(!NewConversation)} press paddingTop={5} paddingBottom={5} marginTop={30}>
						<Text bold paddingRight={12} color={theme.text}>
							Click to create a new conversation
						</Text>
						<Icon name="chat" size={20} color={theme.textFadeLight} />
					</Block>
				)}
				renderItem={({ item, index }) => (
					<Block
						key={item.id}
						style={{ height: 50 }}
						row
						hCenter
						paddingHorizontal={20}
						press
						onPress={() => nav.navigate('directmessage' as never, { account_id: item.account_id, conversation_id: item.id } as never)}>
						<Avatar src={[item.account_id, item.avatar]} size={40} />
						<Text marginLeft={15} bold>
							{item.username}
						</Text>
					</Block>
				)}
			/>
			<BlurView style={sh2} tint={isDarkMode ? 'dark' : 'light'} intensity={30} />
		</Block>
	);
};
