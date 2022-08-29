import React, { useState, useRef } from 'react';
import core, { AppAlert, FriendItemRenderType, FriendItemType, request, StatusType, StorieType } from '@core';
import { Block, Fill, IconButton, Status, Text, TextButton } from '@parts';
import { Animated, StyleSheet, TouchableOpacity, ViewStyle, RefreshControl } from 'react-native';

import { FlashList } from '@shopify/flash-list';
import styled from 'styled-components/native';
import { BlurView } from 'expo-blur';
import FastImage from 'react-native-fast-image';
import { FriendComp } from './components/FriendItemList';
import { useNavigation, useTheme } from '@hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ManageStatusSheet } from './components/ManageStatusBottomSheet';

const FRIEND_ITEM_HEIGHT = 88;
const FRIEND_TAB_HEADER_HEIGHT = 50;

export const Friends = React.memo(() => {
	const { theme, isDarkMode } = useTheme();
	const nav = useNavigation();
	const { top } = useSafeAreaInsets();
	const [friends, setFriends] = useState<FriendItemType[]>([]);
	const myStories: StorieType[] = [];
	const profile = null;
	// const friends = usePulse(core.lists.friends.groups.friends);
	// const myStories = usePulse(core.lists.stories.groups.mine);
	// const profile = usePulse(core.profile.profile);

	const [manageFriendsSheetOpen, setManageFriendsSheetOpen] = useState(false);
	const [FriendsRequests, SetFriendsRequests] = useState<any[]>([]);
	const [MyStatus, setMyStatus] = useState<StatusType[]>([]);
	const [Loading, SetLoading] = useState(false);

	const sh2 = StyleSheet.flatten<ViewStyle>([
		{
			position: 'absolute',
			top: 0,
			height: FRIEND_TAB_HEADER_HEIGHT + top,
			width: '100%',
			zIndex: 10,
			opacity: 1,
			borderBottomColor: theme.backgroundDarker,
			borderBottomWidth: 1,
		},
	]);

	const scrolling = useRef(new Animated.Value(0)).current;
	const iR = [60, 115];

	const FadeOpacity = scrolling.interpolate({
		inputRange: iR,
		outputRange: [1, 0],
		extrapolate: 'clamp',
	});

	const translation = scrolling.interpolate({
		inputRange: iR,
		outputRange: [0, -FRIEND_TAB_HEADER_HEIGHT],
		extrapolate: 'clamp',
	});

	const getFriends = async () => {
		SetLoading(true);
		const a = await request<{
			friends: FriendItemType[];
			incoming_pending: any[];
		}>('get', '/friends');
		if (!a.data) {
		} else {
			setFriends(a.data.friends);

			// core.lists.friends.collect(a.data.friends, 'friends');

			SetFriendsRequests(a.data.incoming_pending);
		}
		SetLoading(false);
		// if (a.da) SetD(a.data.friends);
	};

	const getMyStatus = async () => {
		const res = await request<any>('get', '/status');
		setMyStatus(res.data);
		core.myStatus.set(res.data);
	};

	const getStories = async () => {
		const res = await request<{ my: any; all: any }>('get', '/profile/stories');
		if (res.data) {
			// TODO: this
			// core.lists.stories.collect(res.data?.all, 'all');
			// core.lists.stories.collect(
			// 	{
			// 		account_id: profile.account_id,
			// 		avatar: profile.avatar,
			// 		username: profile.username,
			// 		stories: res.data.my,
			// 	},
			// 	'mine',
			// );
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

	const [RefreshLoading, SetRefreshLoading] = useState(false);
	const onRefresh = async () => {
		SetRefreshLoading(true);

		getFriends();

		setTimeout(async () => {
			getMyStatus();
		}, 200);

		setTimeout(async () => {
			await getStories();
			SetRefreshLoading(false);
		}, 400);
	};

	React.useEffect(() => {
		getFriends();

		setTimeout(() => {
			getMyStatus();
		}, 200);

		// setTimeout(() => {
		// 	getStories();
		// }, 400);
	}, []);

	const renderItem = (p: FriendItemRenderType) => <FriendComp {...p} />;

	return (
		<Block color={theme.background} flex={1}>
			<Animated.ScrollView
				scrollEnabled={true}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingTop: FRIEND_TAB_HEADER_HEIGHT + top,
					paddingBottom: 120,
				}}
				scrollEventThrottle={1}
				refreshControl={
					<RefreshControl
						progressViewOffset={90}
						tintColor={theme.textFade}
						colors={[theme.text]}
						refreshing={RefreshLoading}
						onRefresh={onRefresh}
						size={30}
					/>
				}
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
				{(!!MyStatus?.length || !!myStories?.length) && (
					<Block flex={0} marginBottom={30}>
						{!!MyStatus?.length && (
							<Block row paddingHorizontal={10} marginTop={20}>
								<FlashList
									data={MyStatus}
									estimatedItemSize={15}
									scrollEnabled={false}
									estimatedListSize={{
										height: 112.7,
										width: 390,
									}}
									renderItem={({ item, index }) => (
										<Block
											key={index}
											flex={0}
											marginBottom={10}
											style={{
												flexWrap: 'wrap',
											}}>
											<Status status={item} self disableTap={false} />
										</Block>
									)}
								/>
								{/* <Block flex={0} style={{ width: null }}> */}
								<TextButton
									text="Manage status"
									// style={{ marginRight: 15 }}
									onPress={() => setManageFriendsSheetOpen(true)}
								/>
								{/* </Block> */}
							</Block>
						)}
						{!!myStories[0]?.stories?.length && (
							<Block row marginLeft={0} marginTop={15}>
								<FlashList
									horizontal={true}
									data={myStories[0].stories}
									contentContainerStyle={{ paddingLeft: 15 }}
									renderItem={({ item }) => (
										<Block key={item.id} style={{ position: 'relative' }}>
											<TouchableOpacity
												onPress={() => {
													// TODO:
													// core.events.storie_viewer.emit({
													// 	stories: myStories[0],
													// 	clicked_at_index: index,
													// 	skipWatchRequest: true,
													// })
												}}
												activeOpacity={0.8}>
												<FastImage
													source={{
														uri: `https://cdn.yourstatus.app/stories/${item.account_id}/${item.picture}`,
													}}
													style={{
														height: 120,
														width: 80,
														borderRadius: 6,
														marginRight: 15,
													}}>
													<IconButton
														name="plus"
														size={18}
														iconSize={14}
														color={theme.text}
														backgroundColor={theme.background}
														style={{
															position: 'absolute',
															top: 5,
															right: 5,
															zIndex: 50,
															transform: [{ rotate: '45deg' }],
														}}
														onPress={() => deleteStorie(item.id)}
													/>
												</FastImage>
											</TouchableOpacity>
										</Block>
									)}
								/>
							</Block>
						)}
					</Block>
				)}
				<Animated.FlatList
					data={friends}
					scrollEnabled={false}
					scrollEventThrottle={20}
					renderItem={renderItem}
					initialNumToRender={20}
					showsVerticalScrollIndicator={false}
					keyExtractor={item => item.account_id}
					getItemLayout={(data, index) => ({
						length: FRIEND_ITEM_HEIGHT,
						offset: FRIEND_ITEM_HEIGHT * index,
						index,
					})}
				/>
			</Animated.ScrollView>

			<Animated.View
				style={{
					top: 0,
					height: FRIEND_TAB_HEADER_HEIGHT + top,
					transform: [{ translateY: translation }],
					borderBottomWidth: 1,
					borderBottomColor: theme.darker,
					flexDirection: 'row',
					alignItems: 'flex-end',
					width: '100%',
					zIndex: 10,
					position: 'absolute',
				}}>
				<BlurView style={sh2} tint={isDarkMode ? 'dark' : 'light'} intensity={30} />
				<DimmingOverlay height={FRIEND_TAB_HEADER_HEIGHT + top} />
				<Block
					marginTop={top}
					animate
					row
					hCenter
					flex={1}
					paddingHorizontal={10}
					style={{
						zIndex: 15,
						height: FRIEND_TAB_HEADER_HEIGHT,
						opacity: FadeOpacity || undefined,
					}}>
					<IconButton
						name="search"
						size={23}
						iconSize={14}
						color={theme.textFade}
						backgroundColor={theme.darker}
						onPress={() => nav.navigate('SearchProfile')}
						style={{ marginRight: 15 }}
					/>
					{!!FriendsRequests.length && (
						<IconButton
							name="user_add"
							size={23}
							iconSize={15}
							color={theme.textFade}
							backgroundColor={theme.darker}
							onPress={() => nav.navigate('FriendRequests', FriendsRequests as never)}
							style={{ marginRight: 15 }}
						/>
					)}
					<Fill />
					{/* <IconButton
						name="camera"
						color={theme.background}
						backgroundColor={theme.text}
						size={23}
						iconSize={14}
						onPress={() => nav.navigate('Camera', { uploadMethod: 'storie' } as never)}
					/> */}
				</Block>
			</Animated.View>

			<ManageStatusSheet open={manageFriendsSheetOpen} onClose={() => setManageFriendsSheetOpen(false)} />
		</Block>
	);
});

const DimmingOverlay = styled.View<{ height: number }>`
	position: absolute;
	z-index: 15;
	background-color: ${({ theme }) => theme.background};
	opacity: 0.8;

	height: ${props => props.height}px;
	bottom: 0;
	left: 0;
	width: 100%;
`;
