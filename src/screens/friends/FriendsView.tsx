import { FriendItemEntry, LocationBox } from './parts/FriendItemEntry';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import { Avatar, Fill, Header, Icon, IconButton, Row, Spacer, StatusBox, TabbarContentContainer, Text, TextButton } from '@parts';
import styled, { useTheme } from 'styled-components/native';
import core, { LocationType, request, StorieType } from '@core';
import { state } from '@pulsejs/core';
import { usePulse } from '@pulsejs/react';
import { useState } from 'react';

interface FriendsProps {}

const PendingList = state<any[]>([]);

export const FriendsView: React.FC<FriendsProps> = (props) => {
	const {} = props;
	const theme = useTheme();
	const nav = useNavigation();

	const [Loaded, setLoaded] = useState(false);
	const pendingList = usePulse(PendingList);
	const friendList = usePulse(core.profile.collection.groups.friends);

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
		core.profile.collection.collect(a.friends, 'friends');
		PendingList.set(a.incoming_pending);
		core.profile.collection.collect(a.incoming_pending, 'requests');
		setLoaded(true);
	};

	// const getNotifications = async () => {
	// 	const a = await request<Activity[]>('get', '/account/activity');
	// 	core.account.collection.activity.collect(a, 'default');
	// 	core.account.state.new_account_activity.set(!!a.filter((v) => !v.read_at).length);
	// };

	// const onScroll = (event) => {
	// 	if (event.nativeEvent.contentOffset.y > 40) {
	// 		setStoriesHide(false);
	// 	} else {
	// 		setStoriesHide(true);
	// 	}
	// 	console.log(event.nativeEvent.contentOffset.y);
	// };

	// const { expand } = useBottomSheet();
	// const theme = usePulse(core.ui.state.ThemeObject);
	// ref

	const getStories = async () => {
		const s = await request<{ stories: { stories: StorieType[]; account_id: string; username: string; avatar: string }[]; mine: StorieType[] }>('get', '/profile/stories');

		core.storie.collection.collect(s.mine, 'mine');

		for (let item of s.stories) {
			core.storie.collection.collect(item.stories, `profile/${item.account_id}`);
		}
		// core.storie.collection.collect(s.mine, 'mine');
	};

	React.useEffect(() => {
		console.log('friends_view');
		getFriendList();
		getStories();

		// getNotifications();
	}, []);

	return (
		<TabbarContentContainer noSidePadding>
			<Header
				padding
				title="Friends"
				rightArea={
					<Row>
						<IconButton name="search" size={22} color={theme.textFade} noBackground onPress={() => nav.navigate('SearchPeople')} />
						<Spacer size={10} />
					</Row>
				}
			/>

			{!!pendingList?.length && (
				<NewFriendRequestBox onPress={() => nav.navigate('newfriends', { data: pendingList })}>
					<Text weight="medium" color={theme.text}>
						You have a new friend request
					</Text>
					<Fill />
					<Icon name="incoming" size={25} color={theme.primary} />
				</NewFriendRequestBox>
			)}
			<FlatList
				data={friendList}
				renderItem={(fp) => <FriendItemEntry {...fp} />}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.textFade} />}
				// ListHeaderComponent={() => <MyContent />}
				ListEmptyComponent={() =>
					Loaded ? (
						<Row center style={{ paddingTop: 50 }}>
							<Text color={theme.textFade} size={20} weight="medium">
								Search for your first friend,
							</Text>
							<Spacer size={5} />
							<TextButton text="Search" color={theme.primary} size={20} weight="bold" onPress={() => nav.navigate('SearchPeople')} />
						</Row>
					) : (
						<></>
					)
				}
			/>
		</TabbarContentContainer>
	);
};

const NewBox = styled.View`
	background-color: #5acf4b;
	padding: 2px 5px;
	border-radius: 20px;
`;

const MyContent: React.FC = (p) => {
	const currentLoc = usePulse(core.account.collection.locations.selectors.current_here);
	const savedLocations = usePulse(core.account.state.saved_locations);
	const my_status = usePulse(core.status.state.my_status);

	// If no data, than just hide it
	if (!my_status?.id && !savedLocations.filter((v) => v.id === currentLoc?.id).length) {
		return <></>;
	}

	return (
		<MycontentContainer>
			<Text size={15} weight="semi-bold">
				My stats:
			</Text>
			<Spacer size={2} />
			{savedLocations.filter((v) => v.id === currentLoc?.id)[0] && <LocationBox location={savedLocations.filter((v) => v.id === currentLoc?.id)[0]} />}
			<Spacer size={2} />
			{my_status && <StatusBox {...my_status} />}

			{/* <Text>{JSON.stringify(savedLocations)}</Text> */}
		</MycontentContainer>
	);
};

const MycontentContainer = styled.View`
	background-color: ${({ theme }) => theme.step1};
	padding-horizontal: 20px;
	padding-vertical: 10px;
`;

const NewFriendRequestBox = styled(TouchableOpacity).attrs({ activeOpacity: 0.5 })`
	flex-direction: row;
	align-items: center;
	background-color: ${({ theme }) => theme.step1};
	padding: 12px 20px;
	width: 95%;
	margin: 0 auto;
	border-radius: 12px;
	margin-top: 15px;
	margin-bottom: 10px;
	border-color: ${({ theme }) => theme.step2};
	border-width: 1px;
`;
