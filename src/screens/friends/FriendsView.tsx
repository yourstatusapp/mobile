import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import { Avatar, Fill, Header, Icon, IconButton, Row, Spacer, StatusBox, TabbarContentContainer, Text } from '@parts';
import styled, { useTheme } from 'styled-components/native';
import core, { alert, niceTime, request } from '@core';
import { state } from '@pulsejs/core';
import { usePulse } from '@pulsejs/react';
import { useState } from 'react';
import FastImage from 'react-native-fast-image';

interface FriendsProps {}

interface IStories {
	id: string;
	picture: string;
	account_id: string;
	deleted_at: string;
}

interface StoriesList {
	data: {
		owner: string;
		username: string;
		avatar: string;
		status: any;
		stories: IStories[];
	};
}

const FriendsList = state<any[]>([]);
const PendingList = state<any[]>([]);

export const FriendsView: React.FC<FriendsProps> = (props) => {
	const {} = props;
	const theme = useTheme();
	const nav = useNavigation();

	const pendingList = usePulse(PendingList);
	const friendList = usePulse(FriendsList);
	const [Stories, setStories] = useState<any[]>([]);
	const [MyStories, setMyStories] = useState<any[]>([]);

	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(async () => {
		setRefreshing(true);
		await getFriendList();
		await getStories();
		setTimeout(() => setRefreshing(false), 2000);
	}, []);

	// const [PendingList, setPendingList] = useState<any[]>();
	const getFriendList = async () => {
		const a = await request<{ friends: any[]; incoming_pending: any[] }>('get', '/friends');
		FriendsList.set(a.friends);
		PendingList.set(a.incoming_pending);
		core.profile.collection.collect(a.incoming_pending, 'requests');
	};

	// const getNotifications = async () => {
	// 	const a = await request<Activity[]>('get', '/account/activity');
	// 	core.account.collection.activity.collect(a, 'default');
	// 	core.account.state.new_account_activity.set(!!a.filter((v) => !v.read_at).length);
	// };

	const getStories = async () => {
		const a = await request<{ mine: any; stories: any[] }>('get', '/profile/stories');
		setStories(a.stories);
		setMyStories(a.mine);
	};

	// const onScroll = (event) => {
	// 	if (event.nativeEvent.contentOffset.y > 40) {
	// 		setStoriesHide(false);
	// 	} else {
	// 		setStoriesHide(true);
	// 	}
	// 	console.log(event.nativeEvent.contentOffset.y);
	// };

	React.useEffect(() => {
		console.log('friends_view');

		getFriendList();
		// getNotifications();
		// getStories();
	}, []);

	const renderItem = ({ item, index }) => (
		<ProfileRenderItem key={index}>
			<View>
				{/* {item.stories?.length ? (
					<StorieCircle>
						<Avatar size={44} src={`https://cdn.yourstatus.app/profile/${item.account_id}/${item.avatar}`} onPress={() => nav.navigate('Profile', { profile: item })} />
					</StorieCircle>
				) : (
					<Avatar src={`https://cdn.yourstatus.app/profile/${item.account_id}/${item.avatar}`} onPress={() => nav.navigate('Profile', { profile: item })} />
				)} */}

				<Avatar src={`https://cdn.yourstatus.app/profile/${item.account_id}/${item.avatar}`} onPress={() => nav.navigate('Profile', { profile: item })} />

				<Fill />
			</View>
			<Spacer size={15} />
			<View>
				<Row>
					<Text weight="medium" size={18}>
						{item.username}
					</Text>
					<Spacer size={10} />
					{item.stories?.length && (
						<ShowStoriesButton onPress={() => nav.navigate('Stories', { ...item })} activeOpacity={0.8}>
							<Text weight="semi-bold" size={12} color="white">
								New Stories
							</Text>
						</ShowStoriesButton>
					)}
				</Row>

				{item?.status && (
					<>
						<Spacer size={8} />
						<Row>
							<StatusBox {...item.status} />
							<Text size={12} color={theme.textFade} weight="medium">
								<Spacer size={10} />
								{niceTime(item?.status.id)} ago
							</Text>
						</Row>
					</>
				)}
				{/* <Spacer size={20} /> */}
				{/* {!!item.stories?.length && <StoriesList data={item} />} */}
				{/* <Text>{JSON.stringify(item.stories)}</Text> */}
			</View>
		</ProfileRenderItem>
	);

	return (
		<TabbarContentContainer noSidePadding>
			<Header
				padding
				title="Friends"
				rightArea={
					<Row>
						<IconButton name="search" size={25} color={theme.textFade} noBackground onPress={() => nav.navigate('SearchPeople')} />
						<Spacer size={10} />
					</Row>
				}
			/>

			{!!pendingList?.length && (
				<NewFriendRequestBox onPress={() => nav.navigate('newfriends', { data: pendingList })}>
					<Text weight="bold">You have a new friend request</Text>
					<Fill />
					<Icon name="incoming" size={25} color={theme.primary} />
				</NewFriendRequestBox>
			)}
			<FlatList data={friendList} renderItem={renderItem} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.textFade} />} />
		</TabbarContentContainer>
	);
};

const ProfileRenderItem = styled.View`
	flex-direction: row;
	align-items: center;
	padding: 10px 15px;
	border-bottom-color: ${({ theme }) => theme.step1};
	border-bottom-width: 1px;
`;

const NewFriendRequestBox = styled(TouchableOpacity).attrs({ activeOpacity: 0.5 })`
	flex-direction: row;
	align-items: center;
	background-color: ${({ theme }) => theme.step1};
	padding: 12px 20px;
	width: 100%;
	border-bottom-color: ${({ theme }) => theme.step1};
	border-bottom-width: 1px;
`;

const ShowStoriesButton = styled(TouchableOpacity)`
	padding: 2px 6px;
	border-radius: 5px;
	background-color: #68a4e9;
	/* background-color: ${({ theme }) => theme.primary}; */
`;

const StoriesList: React.FC<StoriesList> = (props) => {
	const { data } = props;
	const theme = useTheme();
	const nav = useNavigation();
	// const profile = usePulse(core.profile.state.PROFILE);

	return (
		<StoriesListBody>
			{/* <Text>{JSON.stringify(data.stories)}</Text> */}
			<StoriesPreviewer onPress={() => nav.navigate('Stories', { ...data })}>
				<FastImage
					source={{ uri: `https://cdn.yourstatus.app/stories/${data.owner}/${data.stories[0].picture}` }}
					style={{ width: 90, height: 140, borderRadius: 16, zIndex: 2, borderWidth: 5, borderColor: theme.background }}
				/>
				{!!data.stories[1]?.account_id && (
					<FastImage
						source={{ uri: `https://cdn.yourstatus.app/stories/${data.owner}/${data.stories[1].picture}` }}
						style={{ width: 90, height: 110, borderRadius: 10, position: 'absolute', zIndex: 1, left: 8, opacity: 0.5 }}
					/>
				)}
				{data.stories.length >= 3 && (
					<CountBox>
						<Text color={theme.text} weight="medium" size={15}>
							{data.stories.length - 2} +
						</Text>
					</CountBox>
				)}
			</StoriesPreviewer>
		</StoriesListBody>
	);
};

const StoriesListBody = styled.View`
	width: 110px;
`;
const StoriesPreviewer = styled(TouchableOpacity)`
	display: flex;
	flex-direction: row;
	position: relative;
	align-items: center;
`;

const CountBox = styled.View`
	margin-left: 10px;
	border-radius: 7px;
	padding: 2px;
	padding-right: 4px;
	padding-bottom: 3px;
	padding-left: 4px;
`;
