import { request } from '@core';
import { Block, HeadingBlurOverlay, Row, Spacer, Text } from '@parts';
import * as React from 'react';
import { FlatList, ListRenderItemInfo, ScrollView, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled, { useTheme } from 'styled-components/native';
import { useState } from 'react';

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
			<ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingTop: 50 }}>
				<FlatList data={D} renderItem={renderItem} />
			</ScrollView>
		</Block>
	);
};

const FriendComp: React.FC<FriendItemType> = props => {
	const { item, index } = props;

	return (
		<FriendCompBody key={index}>
			<Row>
				<Avatar source={{ uri: `https://cdn.yourstatus.app/profile/${item.account_id}/${item.avatar}` }} />
				<Block>
					<Text weight="600" size={14}>
						{item.username.charAt(0).toUpperCase() + item.username.slice(1, item.username.length + 1)}
					</Text>
					{item?.status && (
						<Block style={{ flexWrap: 'wrap', paddingTop: 6 }}>
							<Status status={item.status} />
						</Block>
					)}
				</Block>
			</Row>

			{/*<Text>{item?.status?.data.title}</Text>*/}
		</FriendCompBody>
	);
};

const FriendCompBody = styled.View`
	//margin-bottom: 20px;
	margin: 0px 20px 0px 20px;
	padding: 20px 0px;

	border-bottom-color: #181818;
	border-bottom-style: solid;
	border-bottom-width: 2px;
`;

const Avatar = styled(FastImage)`
	height: 55px;
	width: 55px;
	border-radius: 55px;
	margin-right: 12px;
	background-color: rgba(255, 255, 255, 0.06);
`;

interface StatusType {
	status: {
		id: string;
		data: { title: string };
	};
}

const Status = ({ status }: StatusType) => {
	return (
		<StatusBody>
			<Text weight="700" size={12}>
				{status.data.title}
			</Text>
		</StatusBody>
	);
};

const StatusBody = styled.View`
	opacity: 0.6;
	border: solid 1px #ffffff;
	align-self: center;
	padding: 2px 8px;
	border-radius: 90px;
`;
