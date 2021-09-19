import core, { request } from '@core';
import { Avatar, Fill, IconButton, Input, SidePadding, SmallButton, Spacer, Text, TextButton } from '@parts';
import { usePulse } from '@pulsejs/react';
import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

interface NewconversationProps {}

export const Newconversation: React.FC<NewconversationProps> = () => {
	const theme = useTheme();
	const nav = useNavigation();

	const my_friends = usePulse(core.profile.collection.groups.friends);

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
				<Avatar src={`https://cdn.yourstatus.app/profile/${item.account_id}/${item.avatar}`} size={40} />
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
			<Spacer size={20} />
			<Text weight="bold" size={24} style={{ paddingHorizontal: 20 }}>
				New conversation
			</Text>
			<Spacer size={20} />
			<Input
				placeholder="Search user"
				style={{ paddingHorizontal: 14, color: theme.text, backgroundColor: theme.step2, marginHorizontal: 20 }}
				placeholderTextColor={theme.textFade}
			/>

			<FlatList
				data={my_friends}
				renderItem={renderItem}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.textFade} />}
				style={{ paddingTop: 20 }}
			/>
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
