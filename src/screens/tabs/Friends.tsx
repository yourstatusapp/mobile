import { request } from '@core';
import { Block, HeadingBlurOverlay, Row, Spacer, Text } from '@parts';
import * as React from 'react';
import { FlatList, ListRenderItemInfo, MaskedViewBase, ScrollView, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled, { useTheme } from 'styled-components/native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

interface FriendItem {
	username: string;
	account_id: string;
	avatar: string;
	status?: {
		id: string;
		type: number;
		account_id: string;
		data: any;
		taps: number;
		taped?: boolean;
	};
}

type FriendItemType = ListRenderItemInfo<FriendItem>;

const FRIEND_ITEM_HEIGHT = 88;

export const Friends = () => {
	const [D, SetD] = useState<any[]>([]);
	const [Loading, SetLoading] = useState(false);

	const getFriends = async () => {
		SetLoading(true);
		const a = await request('get', '/friends');
		if (!a.data) {
		} else {
			// @ts-ignore
			SetD(a.data.friends);
		}
		SetLoading(false);
		// if (a.da) SetD(a.data.friends);
	};

	React.useEffect(() => {
		getFriends();
	}, []);

	const renderItem = (p: FriendItemType) => <FriendComp {...p} />;

	return (
		<Block>
			{/* {D && <Text>{JSON.stringify(D)}</Text>} */}
			<ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingTop: 50, paddingBottom: 120 }}>
				<FlatList
					data={D}
					renderItem={renderItem}
					initialNumToRender={20}
					showsVerticalScrollIndicator={false}
					keyExtractor={item => item.account_id}
					getItemLayout={(data, index) => ({ length: FRIEND_ITEM_HEIGHT, offset: FRIEND_ITEM_HEIGHT * index, index })}
				/>
			</ScrollView>
		</Block>
	);
};

const FriendComp: React.FC<FriendItemType> = props => {
	const { item, index } = props;
	const { colors } = useTheme();
	const nav = useNavigation();

	const openProfile = () => nav.navigate('profile' as never, { username: item.username } as never);

	React.useEffect(() => {
		console.log('friend render');
	}, []);
	return (
		<FriendCompBody key={index}>
			<Block row paddingHorizontal={20}>
				<TouchableOpacity activeOpacity={0.6} onPress={openProfile}>
					<Avatar source={{ uri: `https://cdn.yourstatus.app/profile/${item.account_id}/${item.avatar}` }} />
				</TouchableOpacity>
				<Block style={{ paddingLeft: 20 }}>
					<Text weight="700" size={16}>
						{item.username.charAt(0).toUpperCase() + item.username.slice(1, item.username.length + 1)}
					</Text>
					{item?.status && (
						<Block style={{ flexWrap: 'wrap', paddingTop: 6 }}>
							<Status status={item.status} />
						</Block>
					)}
				</Block>
			</Block>

			{/*<Text>{item?.status?.data.title}</Text>*/}
		</FriendCompBody>
	);
};

const FriendCompBody = styled.View`
	//margin-bottom: 20px;
	/* margin: 0px 20px 0px 20px; */
	padding: 20px 0px;
	height: 88px;

	border-bottom-color: #111111;
	border-bottom-style: solid;
	border-bottom-width: 1px;
`;

const Avatar = styled(FastImage)`
	height: 45px;
	width: 45px;
	border-radius: 55px;

	background-color: rgba(255, 255, 255, 0.06);
`;

interface StatusType {
	status: {
		id: string;
		data: { title: string };
	};
}

const Status = React.memo(({ status }: StatusType) => {
	return (
		<StatusBody>
			<Text weight="600" size={12} color="#3D60FF" style={{ paddingTop: 2 }}>
				{status.data.title}
			</Text>
		</StatusBody>
	);
});

const StatusBody = styled.View`
	background-color: #0c1b37;
	align-self: flex-start;
	border-radius: 4px;
	padding: 0px 4px;
	padding-bottom: 2px;
	margin-top: 4px;
	/* opacity: 0.6;
	border: solid 1px #ffffff;
	align-self: center;
	padding: 2px 8px;
	border-radius: 90px; */
`;
