import React, { useEffect, useState } from 'react';
import { Avatar, Block, Button, Fill, ModalHeader, Spacer, Text } from '@parts';
import { useNavigation } from '@react-navigation/native';
import { FlatList, ListRenderItem } from 'react-native';

interface FriendRequest {
	id: string;
	username: string;
	avatar: string;
}

export const ManageFriends = () => {
	const [Requests, SetRequests] = useState<FriendRequest[]>([]);

	const getIncomingRequests = async () => {
		const res = await request('get', '/friends/request');
	};

	const renderItem: ListRenderItem<FriendRequest> = ({ item, index }) => {
		return (
			<Block flex={0} key={index} row vCenter hCenter>
				<Avatar src={[item.id, item.avatar]} size={50} />
				<Text>{item.username}</Text>
			</Block>
		);
	};

	useEffect(() => getIncomingRequests, []);

	return (
		<Block safe>
			<ModalHeader title="Manage Friends" />
			<Spacer size={25} />
			<Text>Edit Profile</Text>

			<FlatList data={Requests} renderItem={renderItem} />
		</Block>
	);
};
