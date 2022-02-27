import React, { useState, useRef } from 'react';
import core, { AppAlert, request, StatusType } from '@core';
import { Avatar, Block, Fill, IconButton, Status, Text } from '@parts';
import { Animated, ListRenderItemInfo, StyleSheet, TouchableOpacity, ViewStyle, ScrollView } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { hasNotch } from 'react-native-device-info';
import { usePulse } from '@pulsejs/react';
import FastImage from 'react-native-fast-image';

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

	const friends = usePulse(core.lists.friends.groups.friends);
	const myStories = usePulse(core.lists.stories.groups.mine);

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

	const profile = usePulse(core.profile.profile);
	const getStories = async () => {
		const res = await request<{ my: any; all: any }>('get', '/profile/stories');
		if (res.data) {
			core.lists.stories.collect(res.data?.all, 'all');
			core.lists.stories.collect({ account_id: profile.account_id, avatar: profile.avatar, username: profile.username, stories: res.data.my }, 'mine');
		}
	};

	const deleteStorie = async (storieId: string) => {
		const res = await request('delete', '/profile/stories/' + storieId);
		if (res.data) {
			AppAlert(true, 'Success', res.message);

			//
			getStories();
			// core.lists.stories.remove(storieId)
		} else {
			AppAlert(false, 'Failed', res.message);
		}
	};

	const removeStatus = async (storieId: string) => {
		const res = await request('delete', `/status/${storieId}/end`);
		if (res.data) {
			setMyStatus(false);
		} else {
			AppAlert(false, res.message);
		}
	};

	React.useEffect(() => {
		getFriends();

		setTimeout(() => {
			getMyStatus();
		}, 200);

		setTimeout(() => {
			getStories();
		}, 400);
	}, []);

	const renderItem = (p: FriendItemType) => <FriendComp {...p} />;

	return (
		<>
			<Block color={colors.black}>
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
					{(!!MyStatus?.id || !!myStories?.length) && (
						<Block flex={0} marginBottom={30}>
							{!!MyStatus?.id && (
								<Block style={{ padding: 20 }} row hCenter>
									<Text bold style={{ paddingRight: 3 }}>
										My status:{`  `}
									</Text>
									<Status status={MyStatus} />
									<IconButton
										name="plus"
										color={colors.black}
										backgroundColor={colors.white40}
										iconSize={14}
										size={12}
										style={{ transform: [{ rotate: '45deg' }], marginLeft: 5 }}
										onPress={() => removeStatus(MyStatus.id)}
									/>
								</Block>
							)}
							{!!myStories[0]?.stories?.length && (
								<Block row marginLeft={15} marginTop={15}>
									<ScrollView horizontal={true} scrollEnabled={true} showsHorizontalScrollIndicator={false}>
										{myStories[0].stories.map((item2, index2) => (
											<Block style={{ position: 'relative' }}>
												<TouchableOpacity
													onPress={() => core.events.storie_viewer.emit({ stories: myStories[0], clicked_at_index: index2 })}
													activeOpacity={0.8}>
													<FastImage
														key={index2}
														source={{ uri: `https://cdn.yourstatus.app/stories/${item2.account_id}/${item2.picture}` }}
														style={{ height: 120, width: 80, borderRadius: 6, marginRight: 15 }}>
														<IconButton
															name="plus"
															size={18}
															iconSize={14}
															color={colors.white}
															backgroundColor={colors.black80}
															style={{ position: 'absolute', top: 5, right: 5, zIndex: 50, transform: [{ rotate: '45deg' }] }}
															onPress={() => deleteStorie(item2.id)}
														/>
													</FastImage>
												</TouchableOpacity>
											</Block>
										))}
									</ScrollView>
								</Block>
							)}
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

					{/* <Text>{JSON.stringify(stories)}</Text>
				<Text>{JSON.stringify(myStories)}</Text> */}
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
					{/* <BlurView style={sh2} blurType="extraDark" blurAmount={20} overlayColor={'#000000'} /> */}
					<BlurView style={sh2} tint="dark" intensity={340} />
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
						<Fill />
						<IconButton
							name="camera"
							color={colors.black}
							backgroundColor={colors.white}
							size={23}
							iconSize={15}
							onPress={() => nav.navigate('camera' as never, { uploadMethod: 'storie' } as never)}
						/>
					</Block>
				</Animated.View>
			</Block>
		</>
	);
});

const FriendComp: React.FC<FriendItemType> = props => {
	const { item, index } = props;
	const { colors } = useTheme();
	const nav = useNavigation();
	const bb = usePulse(core.lists.stories.groups.all);

	const userStories = React.useMemo(() => bb.filter(v => v.account_id === item.account_id)[0], [item.account_id, bb]);

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
			{!!userStories?.stories && (
				<Block row marginLeft={15} marginTop={15}>
					<ScrollView horizontal={true} scrollEnabled={true} showsHorizontalScrollIndicator={false}>
						{userStories.stories.map((item2, index2) => (
							<TouchableOpacity key={index2} onPress={() => core.events.storie_viewer.emit({ stories: userStories, clicked_at_index: index2 })}>
								<FastImage
									key={index2}
									source={{ uri: `https://cdn.yourstatus.app/stories/${item2.account_id}/${item2.picture}` }}
									style={{ height: 120, width: 80, borderRadius: 6, marginRight: 15 }}
								/>
							</TouchableOpacity>
						))}
					</ScrollView>
				</Block>
			)}
		</FriendCompBody>
	);
};

const FriendCompBody = styled.View`
	padding: 20px 0px;
	border-bottom-color: #111111;
	border-bottom-style: solid;
	border-bottom-width: 1px;
`;
