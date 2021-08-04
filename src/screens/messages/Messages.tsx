import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { request } from '../../core/utils';
import { Avatar, Fill, Header, IconButton, Spacer, TabbarContentContainer, Text } from '@parts';
import { conversations } from '../../core/modules';
import core from '@core';
import { usePulse } from '@pulsejs/react';
import { Conversation } from '../../core/types';

interface MessagesProps {
	route: any;
}

export const Messages: React.FC<MessagesProps> = (a) => {
	const Convs = usePulse(core.conversations.collection.groups.all);

	const getMessages = async () => {
		const a = await request<Conversation[]>('get', '/conversation');
		core.conversations.collection.collect(a, 'all');
	};

	React.useEffect(() => {
		getMessages();
		console.log(a);
	}, []);

	return (
		<TabbarContentContainer>
			<Header title="Messages" />
			<Spacer size={20} />
			{Convs?.map((v, i) => (
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
