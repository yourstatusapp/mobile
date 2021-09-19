import core, { IConversation, request } from '@core';
import { Avatar, Fill, Icon, IconButton, Row, Spacer, TabbarContentContainer, Text } from '@parts';
import { usePulse, batch } from '@pulsejs/react';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, RefreshControl, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import styled, { useTheme } from 'styled-components/native';
import { account } from '../../core/modules';
import { v4 as uuid } from 'uuid';
import { MessageEntry } from './parts/MessageEntry';

interface ConversationProps {
	route: {
		name: string;
		key: string;
		params: IConversation;
	};
}

export const ConversationView: React.FC<ConversationProps> = (props) => {
	const { route } = props;
	const messages = usePulse(core.message.collection.getGroup(route.params.id));
	const [Loading, setLoading] = useState(true);
	const [newMessage, setnewMessage] = useState('');
	const acc = usePulse(account.state.ACCOUNT);
	const nav = useNavigation();
	const theme = useTheme();

	const sendMessage = async (message: string) => {
		const NONCE_ID = uuid();
		let MESSAGE_OBJ = { id: NONCE_ID, content: newMessage, deleted_at: '', sender: acc.id || '', nonce: true };
		setnewMessage('');

		// Put the message in a pending state
		core.message.collection.collect(MESSAGE_OBJ, route.params.id, { method: 'unshift' });
		console.log('MESSAGE SENT');
		// Send the message
		const n = await request<{ nonce: string; message_id: string }>('post', `/conversations/${route.params.id}/send`, { data: { message, nonce: NONCE_ID } });

		// Update the message from the pending state
		// batch(() => {
		core.message.collection.update(n.nonce, { id: n.message_id, nonce: false });
		// core.message.collection.rebuildGroupsThatInclude(n.nonce);
		console.log('MESSAGE IS OUT OF PENDING STATE');

		// core.message.collection.remove(n.nonce).everywhere();
		// core.message.collection.collect({ id: n.message_id, content: newMessage, deleted_at: '', sender: acc.id || '', nonce: true }, route.params.id, { method: 'push' });
		// core.message.collection.rebuildGroupsThatInclude(n.message_id);
		// });
	};

	const getMessage = React.useCallback(async () => {
		const a = await request<any[]>('get', '/conversations/' + route.params.id);
		core.message.collection.collect(a.reverse(), route.params.id);

		setLoading(false);
	}, [route.params.id]);

	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(async () => {
		setRefreshing(true);
		await getMessage();
		setTimeout(() => setRefreshing(false), 2000);
	}, []);

	useEffect(() => {
		getMessage();
	}, [getMessage]);

	const renderItem = ({ item, index }) => <MessageEntry {...item} account_id={acc.id} key={index} />;
	const ListEmptyComponent = () => (
		<>
			<Spacer size={10} />
			<Row center>
				<Text size={16} color={theme.step4} weight="semi-bold">
					Send your first message!
				</Text>
			</Row>
		</>
	);

	return (
		<ConversationBody>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<ConversationHeader>
					<TouchableOpacity onPress={() => nav.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Icon name="chevron" size={22} color={theme.step4} />
						<Spacer size={4} />
						<Text color={theme.textFade}>Back</Text>
					</TouchableOpacity>
					<Fill />
					<Text weight="semi-bold" size={22}>
						{route.params.username}
					</Text>
					<Fill />
					<Avatar src={`https://cdn.yourstatus.app/profile/${route.params.account_id}/${route.params.avatar}`} size={40} />
				</ConversationHeader>

				{!Loading && (
					<FlatList
						data={messages}
						renderItem={renderItem}
						initialNumToRender={50}
						ListEmptyComponent={ListEmptyComponent}
						contentContainerStyle={{ paddingTop: 10 }}
						refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.textFade} />}
						inverted={true}
					/>
				)}

				<BottomPart>
					<SendMessageInput placeholder="Write a message..." onChangeText={setnewMessage} value={newMessage} autoCorrect={false} autoCapitalize="none" autoCompleteType="off" />
					<Spacer size={10} />
					<SendMessageButton name="send" size={27} color={theme.textFade} backgroundColor={theme.step1} onPress={() => sendMessage(newMessage)} />
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
	border-radius: 50px;
	height: 40px;
	background-color: ${({ theme }) => theme.step1};
	color: ${({ theme }) => theme.text};
	padding: 0px 12px;
	flex: 1;
`;

const ConversationHeader = styled(Row)`
	height: 55px;
	padding: 0px 10px;
	border-bottom-color: ${({ theme }) => theme.step1};
	border-bottom-width: 1px;
`;

const SendMessageButton = styled(IconButton)`
	padding-top: 3px;
	padding-right: 3px;
`;
