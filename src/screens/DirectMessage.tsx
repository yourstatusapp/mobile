import React, { useEffect, useState } from 'react';
import { Block, IconButton, Input, Text } from '@parts';
import styled, { useTheme } from 'styled-components/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { request } from '@core';
import { FlatList, KeyboardAvoidingView } from 'react-native';

interface DirectMessageType {
	id: string;
	content: string;
	sender: string;
}

export const DirectMessage = () => {
	const theme = useTheme();
	const routes = useRoute();

	const [MessageText, SetMessageText] = useState('');
	const [A, SetA] = useState<DirectMessageType[]>([]);

	const getMessage = async () => {
		if (!routes?.params?.profile?.conversation_id) {
			return;
		}
		// @ts-ignore
		const res = await request<DirectMessageType[]>('get', '/conversations/' + routes?.params?.profile?.conversation_id);
		if (res.data) SetA(res.data);
	};

	useEffect(() => {
		getMessage();
	}, []);

	return (
		<Block color={theme.background} safe>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
				<Text>Person</Text>
				<FlatList
					data={A}
					renderItem={({ item }) => (
						<Block key={item.id} color="red">
							<Text color={theme.text}>{item.content}</Text>
						</Block>
					)}
				/>
				<Block style={{ borderTopColor: theme.darker, borderTopWidth: 1, height: 55 }} marginBottom={55} color={theme.backgroundDarker} flex={0} vCenter>
					<MessageInput onChangeText={SetMessageText} value={MessageText} />
					<IconButton name="send" iconSize={30} color={theme.text} />
				</Block>
			</KeyboardAvoidingView>
		</Block>
	);
};

const MessageInput = styled.TextInput`
	height: 30px;
	background-color: ${({ theme }) => theme.background};
	border: 1px ${({ theme }) => theme.darker} solid;
	margin-horizontal: 10px;
	border-radius: 30px;
`;
