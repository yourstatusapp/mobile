import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, Block, IconButton, Text } from '@parts';
import styled, { useTheme } from 'styled-components/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import core, { AppAlert, DirectMessageType, request } from '@core';
import { FlatList, KeyboardAvoidingView, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePulse } from '@pulsejs/react';
import { hasNotch } from 'react-native-device-info';
import { BlurView } from 'expo-blur';
import { profile } from 'src/core/modules';

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
	const profile = usePulse(core.profile.profile);
	const isDarkMode = usePulse(core.ui.isDarkMode);

	const sh2 = StyleSheet.flatten<ViewStyle>([
		{
			position: 'absolute',
			top: 0,
			height: hasNotch() ? 44 : 40,
			width: '100%',
			zIndex: 10,
			opacity: 1,
			borderBottomWidth: 1,
			borderBottomColor: theme.backgroundDarker,
		},
	]);

	const [MessageText, SetMessageText] = useState('');
	const [SendMessLoading, SetSendMessLoading] = useState(false);
	// const [A, SetA] = useState<DirectMessageType[]>([]);
	const Messages = usePulse(core.lists.messages.getGroup(params?.conversation_id));

	const getMessage = async () => {
		if (!params?.conversation_id) {
			return;
		}
		// @ts-ignore
		const res = await request<DirectMessageType[]>('get', '/conversations/' + params?.conversation_id);
		if (res.data) {
			// res.data;
			// const a = res.data.map(v => {
			// 	v['conversation_id'] = params?.conversation_id;
			// 	return v;
			// });
			// AppAlert(true, JSON.stringify(res.data.length));
			// SetA(res.data);
			// core.lists.messages.createGroup(params.conversation_id);
			core.lists.messages.collect(res.data, params.conversation_id);
			// core.lists.messages.rebuildGroupsThatInclude(params.conversation_id);
		}
	};

	const sendMessage = useCallback(async () => {
		SetSendMessLoading(true);
		const res = await request('post', `/conversations/${params.conversation_id}/send`, { data: { message: MessageText, nonce: 'random' } });
		if (res.data) {
			SetMessageText('');
			core.lists.messages.collect(
				{
					id: (parseInt(params.conversation_id) + 1).toString(),
					content: MessageText,
					conversation_id: params.conversation_id,
					account_id: acc?.id,
					avatar: profile.avatar,
					username: profile.username,
				},
				params.conversation_id,
				{ method: 'unshift' },
			);
		}
		SetSendMessLoading(false);
	}, [params.conversation_id, MessageText, acc?.id, profile.avatar, profile.username]);

	useEffect(() => {
		getMessage();
	}, []);

	const renderItem = ({ item }) => (
		<Block key={item.id} row style={{ height: 34 }} hCenter paddingHorizontal={10}>
			<Avatar src={[item.account_id, item.avatar]} size={25} />
			<Text color={theme.text} marginLeft={15} bold>
				{item.username}:
			</Text>
			<Text color={theme.textFadeLight} marginLeft={15}>
				{item.content}
			</Text>
		</Block>
	);

	return (
		<Block color={theme.background}>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={-(55 + bottom - 9)}>
				<FlatList data={Messages} contentContainerStyle={{}} renderItem={renderItem} inverted />
				<Block
					style={{ borderTopColor: theme.darker, borderTopWidth: 1, height: 55 }}
					marginBottom={55 + bottom - 9}
					color={theme.backgroundDarker}
					flex={0}
					row
					hCenter
					paddingHorizontal={20}>
					<MessageInput
						onChangeText={SetMessageText}
						value={MessageText}
						pointerEvents={SendMessLoading ? 'none' : 'auto'}
						style={{ opacity: SendMessLoading ? 0.6 : 1 }}
					/>
					<IconButton
						name="send"
						iconSize={20}
						iconStyle={{ marginRight: 2 }}
						color={theme.darker}
						backgroundColor={theme.text}
						size={23}
						noPadding
						onPress={sendMessage}
						disabled={SendMessLoading}
					/>
				</Block>
			</KeyboardAvoidingView>
			<BlurView style={sh2} tint={isDarkMode ? 'dark' : 'light'} intensity={30} />
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
