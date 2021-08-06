import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { request } from '../../core/utils';
import { Avatar, Fill, Header, IconButton, Spacer, TabbarContentContainer, Text } from '@parts';
import core from '@core';
import { usePulse } from '@pulsejs/react';
import { Conversation } from '../../core/types';

interface MessagesProps {
	route: any;
}

export const Messages: React.FC<MessagesProps> = (a) => {
	const Convs = usePulse(core.conversations.collection.groups.all);
	const nav = useNavigation();
	const theme = useTheme();
	const getMessages = async () => {
		const a = await request<Conversation[]>('get', '/conversation');
		core.conversations.collection.collect(a, 'all');
	};

	React.useEffect(() => {
		getMessages();
	}, []);

	const renderItem = ({ item, index }) => (
		<ConversationEntryBody key={index} onPress={() => nav.navigate('conversation', { ...item })} style={{ backgroundColor: !(index % 2) ? theme.background : theme.step0 }}>
			<Avatar src={`https://cdn.yourstatus.app/profile/${item.owner}/${item.avatar}`} size={50} />
			<Spacer size={10} />
			<View>
				<Text size={18} weight="semi-bold">
					{item.username}
				</Text>
				<Text size={14} color={theme.textFade}>
					no status...
				</Text>
			</View>
			<Fill />
			<IconButton name="eclipse" color={theme.step4} iconSize={20} size={25} noBackground />
		</ConversationEntryBody>
	);

	return (
		<TabbarContentContainer noSidePadding>
			<Header title="Messages" padding />
			{/* <Spacer size={20} /> */}
			<FlatList data={Convs} renderItem={renderItem} />
		</TabbarContentContainer>
	);
};

const ConversationEntryBody = styled(TouchableOpacity)`
	flex-direction: row;
	align-items: center;
	padding: 6px 10px;
	width: 100%;
	/* background-color: ${({ theme }) => theme.step1}; */
	/* margin-bottom: 5px; */
	border-bottom-color: ${({ theme }) => theme.step1};
	/* border-bottom-style: solid; */
	border-bottom-width: 1px;
`;
