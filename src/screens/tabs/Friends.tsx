import React, { useState, useRef, useEffect } from 'react';
import core, { request, StatusType } from '@core';
import { Avatar, Block, IconButton, Status, Text } from '@parts';
import { Animated, ListRenderItemInfo, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';
import { hasNotch } from 'react-native-device-info';
import { usePulse } from '@pulsejs/react';

interface FriendItem {
	username: string;
	account_id: string;
	avatar: string;
	status?: {
		id: string;
		type: number;
		account_id: string;
		content: string;
		taps: number;
		taped?: boolean;
	};
}

type FriendItemType = ListRenderItemInfo<FriendItem>;

const FRIEND_ITEM_HEIGHT = 88;

export const Friends = React.memo(() => {
	const { colors, theme } = useTheme();
	const nav = useNavigation();
	const sh2 = StyleSheet.flatten<ViewStyle>([{ position: 'absolute', top: 0, height: hasNotch() ? 100 : 70, width: '100%', zIndex: 10, opacity: 1 }]);

	const scrolling = useRef(new Animated.Value(0)).current;
	const iR = [60, 115];
	const FadeOpacity = scrolling.interpolate({
		inputRange: iR,
		outputRange: [1, 0],
		extrapolate: 'clamp',
	});

	const translation = scrolling.interpolate({
		inputRange: iR,
		outputRange: [0, -50],
		extrapolate: 'clamp',
	});

	const friends = usePulse(core.lists.friends.groups.friends);
	const [FriendRList, SetFriendRList] = useState<any[]>([]);

	const [Loading, SetLoading] = useState(false);

	const getFriends = async () => {
		SetLoading(true);
		const a = await request<{ friends: FriendItemType[]; incoming_pending: any[] }>('get', '/friends');
		if (!a.data) {
		} else {
			// @ts-ignore
			core.lists.friends.collect(a.data.friends, 'friends');
			// SetD(a.data.friends);
			SetFriendRList(a.data.incoming_pending);
		}
		SetLoading(false);
		// if (a.da) SetD(a.data.friends);
	};

	const [MyStatus, setMyStatus] = useState<boolean | StatusType>(false);
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
			<Animated.ScrollView
				scrollEnabled={true}
				style={{ flex: 1 }}
				contentContainerStyle={{ paddingTop: 100, paddingBottom: 120 }}
				scrollEventThrottle={1}
				onScroll={Animated.event(
					[
						{
							nativeEvent: {
								contentOffset: {
									y: scrolling,
								},
							},
						},
					],
					{ useNativeDriver: true },
				)}>
				{MyStatus?.id && (
					<Block style={{ padding: 20 }} row hCenter>
						<Text bold style={{ paddingRight: 3 }}>
							My status:{`  `}
						</Text>
						<Status status={MyStatus} />
					</Block>
				)}
				<Animated.FlatList
					data={friends}
					// extraData={friends}
					scrollEnabled={false}
					scrollEventThrottle={20}
					renderItem={renderItem}
					initialNumToRender={20}
					showsVerticalScrollIndicator={false}
					keyExtractor={item => item.account_id}
					getItemLayout={(data, index) => ({ length: FRIEND_ITEM_HEIGHT, offset: FRIEND_ITEM_HEIGHT * index, index })}
				/>
			</Animated.ScrollView>
			<Animated.View
				style={{
					height: hasNotch() ? 101 : 71,
					transform: [{ translateY: translation }],
					borderBottomWidth: 1,
					borderBottomColor: colors.white20,
					flexDirection: 'row',
					alignItems: 'flex-end',
					width: '100%',
					zIndex: 10,
					position: 'absolute',
				}}>
				<BlurView style={sh2} blurType="extraDark" blurAmount={20} overlayColor={'#000000'} />
				<Block
					animate
					row
					hCenter
					style={{ zIndex: 10, backgroundColor: 'transparent', height: 100 - (hasNotch() ? 44 : 0), opacity: FadeOpacity }}
					paddingHorizontal={20}>
					<IconButton
						name="search"
						size={23}
						iconSize={14}
						color={colors.white}
						backgroundColor={colors.white40}
						onPress={() => nav.navigate('SearchFriend' as never)}
						style={{ marginRight: 15 }}
					/>
					{!!FriendRList.length && (
						<IconButton
							name="user-add"
							size={23}
							iconSize={15}
							color={colors.black}
							backgroundColor={colors.white}
							onPress={() => nav.navigate('FriendRequests' as never, FriendRList as never)}
							style={{ marginRight: 15 }}
						/>
					)}
				</Block>
			</Animated.View>
		</Block>
	);
});

const FriendComp: React.FC<FriendItemType> = props => {
	const { item, index } = props;
	const { colors } = useTheme();
	const nav = useNavigation();

	const openProfile = () => nav.navigate('profile' as never, { username: item.username } as never);
	const tapStatus = async () => {
		core.lists.friends.update(item.account_id, { status: { taps: item.status?.taps || 0 + 1, taped: true } }, { deep: true });
		const res = await request('post', `/status/${item.status?.id}/tap`);
		if (res.data) {
			// core.lists.friends.update(item.account_id, { status: { taps: item.status?.taps || 0 + 1, taped: true } }, { deep: true });
		} else {
		}
	};

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
						{item.username ? item.username.charAt(0).toUpperCase() + item.username.slice(1, item.username.length + 1) : '-'}
					</Text>
					{item?.status && (
						<Block style={{ flexWrap: 'wrap', paddingTop: 6 }}>
							<Status
								status={item.status}
								onPress={() => {
									tapStatus();
								}}
							/>
						</Block>
					)}
				</Block>
			</Block>
		</FriendCompBody>
	);
};

const FriendCompBody = styled.View`
	padding: 20px 0px;
	border-bottom-color: #111111;
	border-bottom-style: solid;
	border-bottom-width: 1px;
`;
