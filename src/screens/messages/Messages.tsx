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

export const Messages: React.FC<MessagesProps> = () => {
	const Convs = usePulse(core.conversations.collection.groups.mine);
	const nav = useNavigation();
	const theme = useTheme();

	const getMessages = async () => {
		const a = await request<Conversation[]>('get', '/conversations');
		// console.log(a);
		// setTest(a);

		core.conversations.collection.collect(a, 'mine', { method: 'push'});
	};

	React.useEffect(() => {
		getMessages();
	}, []);

	const renderItem = ({ item, index }) => (
		<ConversationEntryBody key={index} onPress={() => nav.navigate('conversation', { ...item })} style={{ backgroundColor: !(index % 2) ? theme.background : theme.step0 }}>
			<Avatar src={`https://cdn.yourstatus.app/profile/${item.account_id}/${item.avatar}`} size={50} />
			<Spacer size={10} />
			<View>
				<Text size={18} weight="semi-bold">
					{item.username}
				</Text>
				<Text size={14} color={theme.step4}>
					no messages...
				</Text>
			</View>
			<Fill />
			{/* <IconButton name="eclipse" color={theme.step4} iconSize={35} noBackground /> */}
		</ConversationEntryBody>
	);

	return (
		<TabbarContentContainer noSidePadding>
			<Header
				title="Messages"
				padding
				rightArea={<IconButton name="plus" size={35} onPress={() => nav.navigate('NewConversation')} noBackground color={theme.text} style={{ marginRight: 5 }} />}
			/>

			<FlatList data={Convs} renderItem={renderItem} />
		</TabbarContentContainer>
	);
};

const ConversationEntryBody = styled(TouchableOpacity)`
	flex-direction: row;
	align-items: center;
	padding: 10px 15px;
	width: 100%;
	border-bottom-color: ${({ theme }) => theme.step1};
	border-bottom-width: 1px;
`;
