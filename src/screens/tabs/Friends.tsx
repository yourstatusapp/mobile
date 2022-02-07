import React, { useState } from 'react';
import { request } from '@core';
import { Avatar, Block, HeadingBlurOverlay, Row, Spacer, Status, Text } from '@parts';
import { FlatList, ListRenderItemInfo, MaskedViewBase, ScrollView, TouchableOpacity, View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
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

	const [MyStatus, setMyStatus] = useState();
	const getMyStatus = async () => {
		const res = await request<any>('get', '/status');
		setMyStatus(res.data);
	};

	React.useEffect(() => {
		getFriends();
		setTimeout(() => {
			getMyStatus();
		}, 200);
	}, []);

	const renderItem = (p: FriendItemType) => <FriendComp {...p} />;

	return (
		<Block>
			<ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingTop: 50, paddingBottom: 120 }}>
				{!!MyStatus?.data && (
					<Block style={{ padding: 20 }} row hCenter>
						<Text bold style={{ paddingRight: 3 }}>
							My status:{' '}
						</Text>
						<Status status={MyStatus} />
					</Block>
				)}

				{React.useMemo(() => {
					return (
						<FlatList
							data={D}
							renderItem={renderItem}
							initialNumToRender={20}
							showsVerticalScrollIndicator={false}
							keyExtractor={item => item.account_id}
							getItemLayout={(data, index) => ({ length: FRIEND_ITEM_HEIGHT, offset: FRIEND_ITEM_HEIGHT * index, index })}
						/>
					);
				}, [D])}
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
		console.log('friend render ' + item.username);
	}, []);
	return (
		<FriendCompBody key={index}>
			<Block row paddingHorizontal={20}>
				<TouchableOpacity activeOpacity={0.6} onPress={openProfile}>
					<Avatar src={[item.account_id, item.avatar]} size={45} />
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
