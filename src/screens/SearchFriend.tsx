import { AppAlert, request } from '@core';
import { Avatar, Block, Fill, IconButton, Input, Spacer, Text } from '@parts';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { useTheme } from 'styled-components/native';

let timeoutID: NodeJS.Timeout;
interface ProfileSearchItem {
	id: string;
	username: string;
	avatar: string;
	friend_status: number;
	account_id: string;
}

export const SearchFriend = () => {
	const { colors } = useTheme();
	const [Username, SetUsername] = useState('');
	const [Results, SetResults] = useState<ProfileSearchItem[]>([]);
	const [Loading, SetLoading] = useState(false);

	const searchUser = async () => {
		const res = await request('post', '/profile/search', { data: { search: Username } });
		SetResults(res.data);
		SetLoading(false);
	};

	const sendFriendRequest = useCallback(
		async (profile_id: string) => {
			const res = await request('post', '/friends/add/' + profile_id);
			if (res.data === true) {
				let a = Results;
				a = a.map(v => {
					if (v.account_id === profile_id) {
						v.friend_status = 1;
					}
					return v;
				});
				SetResults(a);
				AppAlert(true, res.message);
			}
		},
		[Results],
	);

	useEffect(() => {
		SetLoading(true);
		if (timeoutID) clearTimeout(timeoutID);
		timeoutID = setTimeout(() => {
			searchUser();
		}, 1000);
	}, [Username]);

	const renderItem: ListRenderItem<ProfileSearchItem> = ({ item, index }) => {
		return (
			<Block flex={0} key={index} row style={{ height: 70 }} hCenter>
				<Avatar src={[item.id, item.avatar]} size={45} />
				<Spacer size={15} h />
				<Text bold style={{ maxWidth: 200 }}>
					{item.username}
				</Text>
				<Fill />
				{item.friend_status < 2 && (
					<IconButton
						name="plus"
						color={colors.white}
						size={25}
						iconSize={15}
						backgroundColor={colors.black60}
						disabled={item.friend_status === 1}
						onPress={() => sendFriendRequest(item.account_id)}
					/>
				)}
			</Block>
		);
	};

	return (
		<>
			<Block safe paddingHorizontal={20} flex={0}>
				<Spacer size={10} />
				<Input onChange={v => SetUsername(v)} placeholder="Username" />
				<Spacer size={10} />
			</Block>
			<Block>
				<FlatList
					data={Results}
					renderItem={renderItem}
					contentContainerStyle={{ paddingHorizontal: 20 }}
					ListEmptyComponent={
						<Block hCenter paddingTop={50}>
							<Text color={colors.white80}>{Loading ? 'Loading...' : 'No results'}</Text>
						</Block>
					}
					getItemLayout={(data, index) => {
						return {
							length: index,
							offset: index,
							index,
						};
					}}
				/>
			</Block>
		</>
	);
};
