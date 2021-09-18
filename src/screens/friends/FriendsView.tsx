import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import { Avatar, Fill, Header, Icon, IconButton, Row, SmallButton, Spacer, StatusBox, TabbarContentContainer, Text, TextButton } from '@parts';
import styled, { useTheme } from 'styled-components/native';
import core, { LocationType, niceTime, request } from '@core';
import { state } from '@pulsejs/core';
import { usePulse } from '@pulsejs/react';

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

	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(async () => {
		setRefreshing(true);
		await getFriendList();
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

	React.useEffect(() => {
		console.log('friends_view');
		getFriendList();
		// getNotifications();
	}, []);

	const renderItem = ({ item, index }) => (
		<ProfileRenderItem key={index}>
			<View>
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
							<Text weight="semi-bold" size={12} color={theme.background}>
								New Stories
							</Text>
						</ShowStoriesButton>
					)}
				</Row>
				{item?.location && <LocationBox location={item.location} />}

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
						<IconButton name="search" size={22} color={theme.textFade} noBackground onPress={() => nav.navigate('SearchPeople')} />
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
			<FlatList
				data={friendList}
				renderItem={renderItem}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.textFade} />}
				ListHeaderComponent={() => <MyContent />}
				ListEmptyComponent={() => (
					<Row center style={{ paddingTop: 50 }}>
						<Text color={theme.textFade} size={20} weight="medium" >
							Search for your first friend,
						</Text>
						<Spacer size={5} />
						<TextButton text="Search" color={theme.primary} size={20} weight="bold" onPress={() => nav.navigate('SearchPeople')} />
					</Row>
				)}
			/>
		</TabbarContentContainer>
	);
};

const LocationBox: React.FC<{ location: LocationType }> = (p) => {
	const { location } = p;
	const theme = useTheme();

	return (
		<Row style={{ paddingTop: 5, paddingBottom: 5 }}>
			<Icon name="location" size={9} color={'white'} style={{ marginRight: 5, backgroundColor: theme.primary, padding: 3, borderRadius: 50, paddingTop: 5, paddingRight: 5 }} />
			<Text size={14} color={theme.textFade} style={{ paddingTop: 1 }}>
				{location.title}
			</Text>
		</Row>
	);
};

const MyContent: React.FC = (p) => {
	const currentLoc = usePulse(core.account.collection.locations.selectors.current_here);
	const savedLocations = usePulse(core.account.state.saved_locations);
	const my_status = usePulse(core.status.state.my_status);

	// If no data, than just hide it
	if (!my_status?.id || !savedLocations.filter((v) => v.id === currentLoc?.id).length) {
		return <></>;
	}

	return (
		<MycontentContainer>
			<Text size={15} weight="semi-bold">
				My stats:
			</Text>
			<Text>{JSON.stringify(savedLocations.filter((v) => v.id === currentLoc?.id))}</Text>
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
