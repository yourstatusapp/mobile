import core, { AppAlert, request } from '@core';
import { Avatar, Block, Fill, IconButton, Spacer, Text } from '@parts';
import { usePulse } from '@pulsejs/react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { useTheme } from 'styled-components';

interface FriendRequestItemType {
	id: string;
	account_id: string;
	username: string;
	avatar: string;
}

type FriendRequestType = ListRenderItemInfo<FriendRequestItemType>;

export const FriendRequests = () => {
	const { params }: { params?: FriendRequestItemType[] } = useRoute();
	const { colors } = useTheme();
	const nav = useNavigation();
	const acc = usePulse(core.account.state.account);
	const [FList, SetFList] = useState([]);

	const replyRequest = useCallback(
		async (id: string, owner: string, response: boolean, index?: string) => {
			const res = await request('post', '/friends/request/' + id, { data: { accept: response } });
			if (res.data) {
				let a = FList;
				a = a.splice(index + 1, 1);
				SetFList(a);
				AppAlert(true, res.message);
			} else {
				AppAlert(false, 'Failed', res.message);
			}
			if (a === false) return;
			console.log(a);
		},
		[FList],
	);

	useEffect(() => {
		SetFList(params);
	}, []);
	const renderItem = ({ item, index }: FriendRequestType) => (
		<Block flex={0} key={index} row style={{ height: 70 }} hCenter paddingHorizontal={20}>
			<Block flex={0} style={{ width: null }} press onPress={() => nav.navigate('profile' as never, { username: item.username } as never)}>
				<Avatar src={[item.account_id, item.avatar]} size={45} />
			</Block>
			<Spacer size={15} h />
			<Text bold style={{ maxWidth: 200 }}>
				{item.username}
			</Text>
			<Fill />

			<IconButton
				name="checkmark"
				color={colors.white}
				size={25}
				iconSize={15}
				backgroundColor={colors.black60}
				onPress={() => replyRequest(item.id, acc.id, true, index)}
			/>
			<Spacer size={10} h />
			<IconButton
				name="plus"
				color={colors.white}
				size={25}
				iconSize={15}
				backgroundColor={colors.black60}
				onPress={() => replyRequest(item.id, acc.id, false, index)}
				iconStyle={{ transform: [{ rotate: '45deg' }] }}
			/>
		</Block>
	);

	return (
		<Block safe>
			<Text bold size={30} paddingLeft={20} paddingBottom={20}>
				Reply friend requests
			</Text>
			{!!FList && <FlatList data={FList} renderItem={renderItem} />}
		</Block>
	);
};
