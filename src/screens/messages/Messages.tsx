import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { request } from '../../core/utils';
import { Avatar, Fill, Header, IconButton, Spacer, TabbarContentContainer, Text } from '@parts';

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
			<Spacer size={20} />
			{Conversations?.map((v, i) => (
				<ConversationEntry key={i} {...v} />
			))}
		</TabbarContentContainer>
	);
};

const ConversationEntry: React.FC = (p: any) => {
	const nav = useNavigation();
	const theme = useTheme();

	return (
		<ConversationEntryBody onPress={() => nav.navigate('conversation', { ...p })}>
			<Avatar src={`https://cdn.yourstatus.app/profile/${p.owner}/${p.avatar}`} />
			<Spacer size={10} />
			<Text size={20} weight="semi-bold">
				{p.username}
			</Text>
			<Fill />
			<IconButton name="eclipse" color={theme.step4} iconSize={20} size={25} noBackground />
		</ConversationEntryBody>
	);
};

const ConversationEntryBody = styled(TouchableOpacity)`
	flex-direction: row;
	align-items: center;
	padding: 6px 0px;
	width: 100%;
`;
