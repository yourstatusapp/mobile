import React, { useState, useRef } from 'react';
import core, { AppAlert, FriendItemType, request, StatusType } from '@core';
import { Avatar, Block, Fill, IconButton, Status, Text, TextButton } from '@parts';
import {
	Animated,
	ListRenderItemInfo,
	StyleSheet,
	TouchableOpacity,
	ViewStyle,
	ScrollView,
	FlatList,
	RefreshControl,
} from 'react-native';
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
		data: any;
		taps: number;
		taped?: boolean;
	}[];
}

type FriendItemRenderType = ListRenderItemInfo<FriendItem>;

const FRIEND_ITEM_HEIGHT = 88;

export const Friends = React.memo(() => {
	const theme = useTheme();
	const nav = useNavigation();

	const isDarkMode = usePulse(core.ui.isDarkMode);
	const friends = usePulse(core.lists.friends.groups.friends);
	const myStories = usePulse(core.lists.stories.groups.mine);

	const sh2 = StyleSheet.flatten<ViewStyle>([
		{ position: 'absolute', top: 0, height: hasNotch() ? 100 : 70, width: '100%', zIndex: 10, opacity: 1 },
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
		outputRange: [0, -50],
		extrapolate: 'clamp',
	});

	const [FriendsRequests, SetFriendsRequests] = useState<any[]>([]);

	const [Loading, SetLoading] = useState(false);

	const getFriends = async () => {
		SetLoading(true);
		const a = await request<{ friends: FriendItemType[]; incoming_pending: any[] }>('get', '/friends');
		if (!a.data) {
		} else {
			core.lists.friends.collect(a.data.friends, 'friends');

			SetFriendsRequests(a.data.incoming_pending);
		}
		SetLoading(false);
		// if (a.da) SetD(a.data.friends);
	};

	const [MyStatus, setMyStatus] = useState<StatusType[]>([]);
	const getMyStatus = async () => {
		const res = await request<any>('get', '/status');
		setMyStatus(res.data);
		core.lists.status.collect(res.data, 'mine');
	};

	const profile = usePulse(core.profile.profile);
	const getStories = async () => {
		const res = await request<{ my: any; all: any }>('get', '/profile/stories');
		if (res.data) {
			core.lists.stories.collect(res.data?.all, 'all');
			core.lists.stories.collect(
				{ account_id: profile.account_id, avatar: profile.avatar, username: profile.username, stories: res.data.my },
				'mine',
			);
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

		setTimeout(() => {
			getStories();
		}, 400);
	}, []);

	const renderItem = (p: FriendItemRenderType) => <FriendComp {...p} />;

	return (
		<>
			<Block color={theme.background}>
				<Animated.ScrollView
					scrollEnabled={true}
					showsVerticalScrollIndicator={false}
					style={{ flex: 1 }}
					contentContainerStyle={{ paddingTop: 100, paddingBottom: 120 }}
					scrollEventThrottle={1}
					refreshControl={
						<RefreshControl
							progressViewOffset={90}
							style={{
								// position: 'absolute',
								// bottom: 0,
								backgroundColor: theme.background,
							}}
							colors={[theme.text, theme.textFadeLight]}
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
					{(!!MyStatus.length || !!myStories?.length) && (
						<Block flex={0} marginBottom={30}>
							{!!MyStatus?.length && (
								<Block row>
									<FlatList
										data={MyStatus}
										initialNumToRender={MyStatus.length}
										style={{ marginTop: 10, marginLeft: 15 }}
										renderItem={({ item, index }) => (
											<Block key={index} style={{ flexWrap: 'wrap', paddingTop: 6 }}>
												<Status status={item} />
											</Block>
										)}
									/>
									<Block flex={0} style={{ width: null }}>
										<TextButton
											text="Manage status"
											style={{ marginTop: 15, marginRight: 15 }}
											onPress={() => nav.navigate('manage_status' as never)}
										/>
									</Block>
								</Block>
							)}
							{!!myStories[0]?.stories?.length && (
								<Block row marginLeft={0} marginTop={15}>
									<ScrollView
										horizontal={true}
										scrollEnabled={true}
										showsHorizontalScrollIndicator={false}
										contentContainerStyle={{ paddingLeft: 15 }}>
										{myStories[0].stories.map((item2, index2) => (
											<Block style={{ position: 'relative' }}>
												<TouchableOpacity
													onPress={() =>
														core.events.storie_viewer.emit({ stories: myStories[0], clicked_at_index: index2 })
													}
													activeOpacity={0.8}>
													<FastImage
														key={index2}
														source={{ uri: `https://cdn.yourstatus.app/stories/${item2.account_id}/${item2.picture}` }}
														style={{ height: 120, width: 80, borderRadius: 6, marginRight: 15 }}>
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
						borderBottomColor: theme.backgroundDarker,
						flexDirection: 'row',
						alignItems: 'flex-end',
						width: '100%',
						zIndex: 10,
						position: 'absolute',
					}}>
					<BlurView style={sh2} tint={isDarkMode ? 'dark' : 'light'} intensity={340} />

					<Block
						animate
						row
						hCenter
						style={{
							zIndex: 10,
							backgroundColor: 'transparent',
							height: 100 - (hasNotch() ? 44 : 0),
							opacity: FadeOpacity,
						}}
						paddingHorizontal={20}>
						<IconButton
							name="search"
							size={23}
							iconSize={14}
							color={theme.textFade}
							backgroundColor={theme.darker}
							onPress={() => nav.navigate('SearchFriend' as never)}
							style={{ marginRight: 15 }}
						/>
						{!!FriendsRequests.length && (
							<IconButton
								name="user-add"
								size={23}
								iconSize={15}
								color={theme.textFade}
								backgroundColor={theme.darker}
								onPress={() => nav.navigate('FriendRequests' as never, FriendsRequests as never)}
								style={{ marginRight: 15 }}
							/>
						)}
						<Fill />
						<IconButton
							name="camera"
							color={theme.background}
							backgroundColor={theme.text}
							size={23}
							iconSize={14}
							onPress={() => nav.navigate('camera' as never, { uploadMethod: 'storie' } as never)}
						/>
					</Block>
				</Animated.View>
			</Block>
		</>
	);
});

const FriendComp: React.FC<FriendItemRenderType> = props => {
	const theme = useTheme();
	const username = props.item.username;
	const nav = useNavigation();
	const bb = usePulse(core.lists.stories.groups.all);

	const userStories = React.useMemo(
		() => bb.filter(v => v.account_id === props.item.account_id)[0],
		[props.item.account_id, bb],
	);

	const openProfile = () => nav.navigate('profile' as never, { username: props.item.username } as never);

	return (
		<FriendCompBody key={props.index}>
			<Block row paddingHorizontal={20}>
				<TouchableOpacity activeOpacity={0.6} onPress={openProfile}>
					<Avatar src={[props.item.account_id, props.item.avatar]} size={45} />
				</TouchableOpacity>
				<Block style={{ paddingLeft: 20 }}>
					<Text weight="700" size={16}>
						{props.item.username
							? props.item.username.charAt(0).toUpperCase() + username.slice(1, username.length + 1)
							: '-'}
					</Text>
					{/* {item?.status && item?.status.(
						<Block style={{ flexWrap: 'wrap', paddingTop: 6 }}>
							<Status
								status={item.status}
								onPress={() => {
									tapStatus();
								}}
							/>
						</Block>
					)} */}
					{!!props.item?.status?.length && (
						<FlatList
							data={props.item?.status}
							initialNumToRender={props.item.status.length}
							renderItem={({ item, index }) => (
								<Block key={index} style={{ flexWrap: 'wrap', paddingTop: 6 }}>
									<Status status={item} />
								</Block>
							)}
						/>
					)}
				</Block>
			</Block>
			{!!userStories?.stories && (
				<Block row marginLeft={15} marginTop={15}>
					<ScrollView horizontal={true} scrollEnabled={true} showsHorizontalScrollIndicator={false}>
						{userStories.stories.map((item2, index2) => (
							<TouchableOpacity
								key={index2}
								onPress={() => core.events.storie_viewer.emit({ stories: userStories, clicked_at_index: index2 })}>
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
	border-bottom-color: ${({ theme }) => theme.backgroundDarker};
	border-bottom-style: solid;
	border-bottom-width: 1px;
`;
