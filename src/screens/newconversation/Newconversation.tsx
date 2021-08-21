import core, { request } from '@core';
import { Avatar, Fill, IconButton, Input, SmallButton, Spacer, Text, TextButton } from '@parts';
import { usePulse } from '@pulsejs/react';
import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

interface NewconversationProps {}

export const Newconversation: React.FC<NewconversationProps> = () => {
	const theme = useTheme();
	const nav = useNavigation();

	const a = usePulse(core.profile.collection.groups.friends);

	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(async () => {
		setRefreshing(true);
		await getFriendList();
		setTimeout(() => setRefreshing(false), 2000);
	}, []);

	const getFriendList = async () => {
		const x = await request<{ friends: any[]; incoming_pending: any[] }>('get', '/friends');
		core.profile.collection.collect(x.friends, 'friends');
		console.log(x.friends);
	};

	React.useEffect(() => {
		getFriendList;
	}, []);

	const renderItem = ({ item, index }) => {
		return (
			<FriendBody key={index}>
				<Avatar src={`https://cdn.yourstatus.app/profile/${item.owner}/${item.avatar}`} size={40} />
				<Spacer size={10} />
				<Text>{item.username}</Text>
				<Fill />
				<SmallButton
					text="Message"
					onPress={async () => {
						await request('post', '/conversations/create', { data: { to: item.owner } });
						nav.goBack();
					}}
				/>
			</FriendBody>
		);
	};

	return (
		<NewconversationBody>
			<Input placeholder="Search user" />
			<FlatList data={a} renderItem={renderItem} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.textFade} />} />
		</NewconversationBody>
	);
};

const NewconversationBody = styled.View`
	flex: 1;
`;

const FriendBody = styled(TouchableOpacity)`
	flex-direction: row;
	flex: 1;
	align-items: center;
	padding: 5px 20px;
`;
