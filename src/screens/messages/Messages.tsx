import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { request } from '../../core/utils';
import { Avatar, Fill, Header, Icon, IconButton, Spacer, TabbarContentContainer, Text } from '../../parts';

interface MessagesProps {}

export const Messages: React.FC<MessagesProps> = () => {
	const [Conversations, setConversations] = React.useState<any>([]);

	const getMessages = async () => {
		const a = await request('get', '/conversation');
		setConversations(a);
	};

	React.useEffect(() => {
		getMessages();
	}, []);

	return (
		<TabbarContentContainer>
			<Header title="Messages" />
			{Conversations?.map((v, i) => (
				<ConversationEntry key={i} {...v} />
			))}
		</TabbarContentContainer>
	);
};

const ConversationEntry: React.FC = (p: any) => {
	const nav = useNavigation();

	return (
		<ConversationEntryBody onPress={() => nav.navigate('conversation', { ...p })}>
			<Avatar src={p.avatar} />
			<Spacer size={10} />
			<Text size={20} weight="semi-bold">
				{p.username}
			</Text>
			<Fill />
			<IconButton name="eclipse" color="lightgray" size={20} />
		</ConversationEntryBody>
	);
};

const ConversationEntryBody = styled(TouchableOpacity)`
	flex-direction: row;
	align-items: center;
	padding: 10px 0px;
	width: 100%;
`;
