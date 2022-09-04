import React, { useEffect, useState } from 'react';
import { Avatar, Block, HeadingBlurOverlay, IconButton, TabbarHeader, Text } from '@parts';
import { request } from '@core';
import { useNavigation, useTheme } from '@hooks';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface FlatFriendItemType {
	id: string;
	account_id: string;
	username: string;
	display_name: string;
	avatar: string;
}

export const FriendsList = () => {
	const { theme } = useTheme();
	const nav = useNavigation();
	const { top } = useSafeAreaInsets();
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
				<Text marginLeft={10} medium size={16}>
					@{item.username}
				</Text>
				<Text marginLeft={10}>{item.display_name}</Text>
			</Block>
		);
	};

	return (
		<Block color={theme.background}>
			{/* <Text bold paddingLeft={15} size={22} marginTop={50} paddingBottom={10}>
				Manage Friends
			</Text> */}
			<IconButton
				name="arrow"
				size={20}
				style={{ marginTop: top + 10, marginLeft: 15, zIndex: 4, position: 'absolute' }}
				iconSize={16}
				color={theme.text}
				onPress={() => nav.goBack()}
				backgroundColor={theme.backgroundDarker + '75'}
			/>
			<FlashList
				data={list}
				renderItem={renderItem}
				contentContainerStyle={{ paddingBottom: 50 }}
				ListHeaderComponent={() => (
					<Text bold paddingLeft={15} size={22} marginTop={top + 10} paddingBottom={10} marginLeft={60}>
						My friends
					</Text>
				)}
			/>
			<HeadingBlurOverlay />
		</Block>
	);
};
