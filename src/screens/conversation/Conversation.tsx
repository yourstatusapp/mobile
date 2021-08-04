import core, { request } from '@core';
import { Avatar, Fill, Icon, IconButton, Row, Spacer, TabbarContentContainer, Text } from '@parts';
import { collection, usePulse } from '@pulsejs/react';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import styled, { useTheme } from 'styled-components/native';
import { account, profile } from '../../core/modules';

interface ConversationItem {
	conversation_id: string;
	owner: string;
	username: string;
	avatar: string;
	id: string;
}

interface ConversationProps {
	route: {
		name: string;
		key: string;
		params: ConversationItem;
	};
}

export const Conversation: React.FC<ConversationProps> = (props) => {
	const { route } = props;
	const messages = usePulse(core.message.collection.getGroup(route.params.conversation_id));
	const [newMessage, setnewMessage] = useState('');
	const acc = usePulse(account.state.ACCOUNT);
	const prof = usePulse(profile.state.PROFILE);
	const nav = useNavigation();
	const theme = useTheme();

	const sendMessage = async (message: string) => {
		const m = {};
		await request('post', `/conversation/${route.params.conversation_id}/send`, { data: { message } });
		core.message.collection.collect();
	};

	const getMessage = React.useCallback(async () => {
		const a = await request<any[]>('get', '/conversation/' + route.params.conversation_id + '/messages');
		console.log('messags', a);

		core.message.collection.collect(a, route.params.conversation_id);
	}, [route.params.conversation_id]);

	useEffect(() => {
		getMessage();
	}, [getMessage]);

	const renderItem = ({ item, index }) => <MessageEntry {...item} accountId={acc.id} key={index} />;

	return (
		<ConversationBody>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<ConversationHeader>
					<TouchableOpacity onPress={() => nav.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Icon name="chevron" size={22} color={theme.step4} />
						<Spacer size={4} />
						<Text color={theme.textFade}>Back</Text>
					</TouchableOpacity>
					{/* <Spacer size={20} /> */}
					<Fill />
					<Text weight="semi-bold" size={22}>
						{route.params.username}
					</Text>
					<Fill />
					<Avatar src={`https://cdn.yourstatus.app/profile/${route.params.owner}/${route.params.avatar}`} size={40} />
				</ConversationHeader>
				{/* <Spacer size={20} /> */}
				<FlatList data={messages} renderItem={renderItem} contentContainerStyle={{ paddingTop: 10 }} />
				<BottomPart>
					<SendMessageInput placeholder="Write a message..." onChangeText={setnewMessage} />
					<Spacer size={10} />
					<IconButton name="send" size={40} iconSize={22} color={theme.textFade} backgroundColor={theme.step1} onPress={() => sendMessage(newMessage)} />
				</BottomPart>
			</KeyboardAvoidingView>
			<Spacer size={25} />
		</ConversationBody>
	);
};

const ConversationBody = styled(TabbarContentContainer).attrs({ noSidePadding: true })`
	flex: 1;
`;

const BottomPart = styled(Row)`
	padding: 0px 20px;
`;

const SendMessageInput = styled.TextInput`
	/* border: solid 1px ${({ theme }) => theme.step2}; */
	border-radius: 50px;
	height: 40px;
	background-color: ${({ theme }) => theme.step1};
	padding: 0px 12px;
	flex: 1;
`;

const ConversationHeader = styled(Row)`
	height: 55px;
	/* background-color: ${({ theme }) => theme.step1}; */
	padding: 0px 10px;
	border-bottom-color: ${({ theme }) => theme.step1};
	border-bottom-width: 1px;
`;

interface MessageEntry {
	content: string;
	sender: string;
	deleted_at: string;
	conversation: string;
	accountId: string;
}

const MessageEntry: React.FC<MessageEntry> = (item) => {
	const isSender = item.sender === item.accountId;
	const theme = useTheme();

	return (
		<MessageEntryBody>
			{isSender && <Fill />}
			<MessageBubble isSender={isSender}>
				<Text color={isSender ? theme.background : theme.text}>{item.content}</Text>
			</MessageBubble>
		</MessageEntryBody>
	);
};

const MessageEntryBody = styled(Row)`
	/* background-color: ; */
	padding: 0px 20px;
`;

const MessageBubble = styled.View<{ isSender: boolean }>`
	margin-top: 5px;
	padding: 8px 12px;
	border-radius: 50px;

	${({ theme, isSender }) => `
		background-color: ${isSender ? theme.primary : theme.step1}
	`}
`;
