import core, { AppAlert, request } from '@core';
import { useTheme } from '@hooks';
import { Avatar, Block, Fill, IconButton, Spacer, Text } from '@parts';
import { usePulse } from '@pulsejs/react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

interface FriendRequestItemType {
	id: string;
	account_id: string;
	username: string;
	avatar: string;
}

type FriendRequestType = ListRenderItemInfo<FriendRequestItemType>;

export const FriendRequests = () => {
	const { params }: { params?: FriendRequestItemType[] } = useRoute();
	const { theme } = useTheme();
	const nav = useNavigation();
	const acc = usePulse(core.account.account);
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
			<Block
				flex={0}
				style={{ width: null }}
				press
				onPress={() => nav.navigate('profile' as never, { username: item.username } as never)}>
				<Avatar src={[item.account_id, item.avatar]} size={45} />
			</Block>
			<Spacer size={15} h />
			<Text bold style={{ maxWidth: 200 }}>
				{item.username}
			</Text>
			<Fill />

			<IconButton
				name="checkmark"
				color={'#69E74A'}
				size={25}
				iconSize={16}
				backgroundColor={theme.darker}
				onPress={() => replyRequest(item.id, acc.id, true, index.toString())}
			/>
			<Spacer size={10} h />
			<IconButton
				name="plus"
				color={'#FF4C4C'}
				size={25}
				iconSize={17}
				backgroundColor={theme.darker}
				onPress={() => replyRequest(item.id, acc.id, false, index.toString())}
				iconStyle={{ transform: [{ rotate: '45deg' }] }}
			/>
		</Block>
	);

	return (
		<Block safe color={theme.background}>
			<Text bold size={30} paddingLeft={20} paddingBottom={20}>
				Reply friend requests
			</Text>
			{!!FList && <FlatList data={FList} renderItem={renderItem} />}
		</Block>
	);
};
