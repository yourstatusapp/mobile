import React, { useCallback, useEffect, useState } from 'react';
import { Block, IconButton, Input, Text } from '@parts';
import styled, { useTheme } from 'styled-components/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import core, { DirectMessageType, request } from '@core';
import { FlatList, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { route } from '@pulsejs/core';
import { usePulse } from '@pulsejs/react';

type ParamList = {
	DirectMessage: {
		conversation_id: string;
		account_id: string;
	};
};

export const DirectMessage = () => {
	const theme = useTheme();
	const { params } = useRoute<RouteProp<ParamList, 'DirectMessage'>>();
	const { bottom, top } = useSafeAreaInsets();
	const acc = usePulse(core.account.account);

	const [MessageText, SetMessageText] = useState('');
	const [A, SetA] = useState<DirectMessageType[]>([]);

	const getMessage = async () => {
		if (!params?.conversation_id) {
			return;
		}
		// @ts-ignore
		const res = await request<DirectMessageType[]>('get', '/conversations/' + params?.conversation_id);
		if (res.data) SetA(res.data);
	};

	const sendMessage = useCallback(async () => {
		const res = await request('post', `/conversations/${params.conversation_id}/send`, { data: { message: MessageText, nonce: 'random' } });
		if (res.data) {
			core.lists.messages.collect({
				id: (parseInt(params.conversation_id) + 1).toString(),
				content: MessageText,
				conversation: params.conversation_id,
				sender: acc.id,
			});
		}
	}, [params.conversation_id, MessageText]);

	useEffect(() => {
		getMessage();
	}, []);

	return (
		<Block color={theme.background}>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={-(55 + bottom)}>
				<FlatList
					data={A}
					contentContainerStyle={{ paddingTop: top + 10 }}
					renderItem={({ item }) => (
						<Block key={item.id} color="red">
							<Text color={theme.text}>{item.content}</Text>
						</Block>
					)}
				/>
				<Block
					style={{ borderTopColor: theme.darker, borderTopWidth: 1, height: 55 }}
					marginBottom={55 + bottom}
					color={theme.backgroundDarker}
					flex={0}
					row
					hCenter
					paddingHorizontal={20}>
					<MessageInput onChangeText={SetMessageText} value={MessageText} />
					<IconButton
						name="send"
						iconSize={20}
						iconStyle={{ marginRight: 2 }}
						color={theme.darker}
						backgroundColor={theme.text}
						size={23}
						noPadding
						onPress={sendMessage}
					/>
				</Block>
			</KeyboardAvoidingView>
		</Block>
	);
};

const MessageInput = styled.TextInput`
	height: 35px;
	background-color: ${({ theme }) => theme.background};
	border: 1px ${({ theme }) => theme.darker} solid;
	/* margin-horizontal: 10px; */
	border-radius: 30px;
	margin-right: 15px;
	color: ${({ theme }) => theme.text};
	padding-horizontal: 15;
	flex: 1;
`;
