import { Fill, IconButton, Row, Spacer, TabbarContentContainer, Text } from '@parts';
import { usePulse } from '@pulsejs/react';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import styled, { useTheme } from 'styled-components/native';
import { account } from '../../core/modules';
import { request } from '../../core/utils';

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
	const [Messages, setMessages] = useState<any[]>([]);
	const acc = usePulse(account.state.ACCOUNT);
	const nav = useNavigation();
	const theme = useTheme();

	const getMessage = React.useCallback(async () => {
		const a = await request<any[]>('get', '/conversation/' + route.params.conversation_id);
		setMessages(a);
		// console.log(a);
	}, [route.params.conversation_id]);

	useEffect(() => {
		getMessage();
	});

	return (
		<ConversationBody>
			<ConversationHeader>
				<IconButton name="chevron" size={24} color={theme.step3} onPress={() => nav.goBack()} />
				<Spacer size={20} />
				<Text weight="semi-bold" size={26}>
					{route.params.username}
				</Text>
			</ConversationHeader>
			<Spacer size={20} />
			<FlatList
				data={Messages}
				renderItem={({ item, index }: any) => (
					<Row key={index}>
						{item.sender === acc.id && <Fill />}
						<MessageBubble>
							<Text>{item.content}</Text>
						</MessageBubble>
					</Row>
				)}
			/>
		</ConversationBody>
	);
};

const ConversationBody = styled(TabbarContentContainer)`
	flex: 1;
`;

const MessageBubble = styled.View`
	margin-top: 10px;
	padding: 10px;
	border-radius: 40px;
	background-color: ${({ theme }) => theme.step1};
`;

const ConversationHeader = styled(Row)`
	height: 50px;
`;
