import React, { useEffect, useState } from 'react';
import { Avatar, Block, Button, Fill, ModalHeader, Spacer, Text } from '@parts';
import { useNavigation } from '@react-navigation/native';
import { FlatList, ListRenderItem } from 'react-native';
import { request } from '@core';
import { useTheme } from 'styled-components/native';

interface FlatFriendItemType {
	id: string;
	account_id: string;
	username: string;
	display_name: string;
	avatar: string;
}

export const ManageFriends = () => {
	const theme = useTheme();
	const [list, setList] = useState<any[]>([]);

	const getFriends = async () => {
		const res = await request<any[]>('get', '/friends?flat=true');
		if (res.data) {
			setList(res.data);
		}
	};

	useEffect(() => {
		getFriends();
	}, []);

	const renderItem: ListRenderItem<FlatFriendItemType> = ({ item, index }) => {
		return (
			<Block flex={0} key={index} row hCenter paddingHorizontal={20} marginBottom={10}>
				<Avatar src={[item.account_id, item.avatar]} size={50} />
				<Text marginLeft={10} weight="600" size={16}>
					@{item.username}
				</Text>
				<Text marginLeft={10}>{item.display_name}</Text>
			</Block>
		);
	};

	return (
		<Block safe color={theme.background}>
			<Text bold paddingLeft={10} size={22}>
				Manage Friends
			</Text>
			<FlatList data={list} renderItem={renderItem} contentContainerStyle={{ paddingBottom: 50 }} />
		</Block>
	);
};
