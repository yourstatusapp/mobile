import { AppAlert, request } from '@core';
import { Avatar, Block, Fill, IconButton, Text } from '@parts';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useTheme } from 'styled-components/native';

interface FriendItemType {
	id: string;
	account_id: string;
	username: string;
	avatar: string;
}

export const NewConversation = () => {
	const nav = useNavigation();
	const theme = useTheme();
	const [AvList, SetAvList] = useState<FriendItemType[]>([]);
	const [Loading, SetLoading] = useState(false);

	const getList = async () => {
		const res = await request<FriendItemType[]>('get', '/conversations/create/friends');
		if (res.data) {
			SetAvList(res.data);
		}
	};

	const createNewConversation = async (to_account_id: string) => {
		SetLoading(true);
		const res = await request('post', '/conversations/create', { data: { to: to_account_id } });
		if (res.data) {
			nav.goBack();
		} else {
			AppAlert(false, res.message);
		}

		SetLoading(false);
	};

	useEffect(() => {
		getList();
	}, []);

	return (
		<Block color={theme.background} safe>
			<Block row flex={0} paddingBottom={10} paddingHorizontal={20}>
				<IconButton
					name="arrow-big"
					size={26}
					iconSize={15}
					backgroundColor={theme.darker}
					color={theme.text}
					style={{ transform: [{ rotate: '180deg' }] }}
					onPress={() => nav.goBack()}
				/>
				<Fill />
			</Block>
			<FlatList
				data={AvList}
				renderItem={({ item }) => (
					<Block key={item.id} row style={{ height: 70 }} hCenter paddingHorizontal={20}>
						<Avatar src={[item.account_id, item.avatar]} size={50} />
						<Text marginLeft={20} bold size={18}>
							{item.username}
						</Text>
						<Fill />
						<IconButton
							name="plus"
							size={24}
							iconSize={18}
							color={theme.text}
							backgroundColor={theme.darker}
							disabled={Loading}
							onPress={() => createNewConversation(item.account_id)}
						/>
					</Block>
				)}
			/>
		</Block>
	);
};
