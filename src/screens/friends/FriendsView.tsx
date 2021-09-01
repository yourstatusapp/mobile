import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { DatePickerAndroid, FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import { niceTime, request } from '../../core/utils';
import { Avatar, Fill, Header, IconButton, Row, SmallButton, Spacer, StatusBox, TabbarContentContainer, Text } from '@parts';
import styled, { useTheme } from 'styled-components/native';
import core from '@core';
import { Activity } from '../../core/modules/accounts';
import { state } from '@pulsejs/core';
import { usePulse } from '@pulsejs/react';
import { useState } from 'react';
import FastImage from 'react-native-fast-image';

interface FriendsProps {}

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
	};

	const replyFriendRequest = async (accept: boolean, id: string) => {
		await request('post', '/friends/request/' + id, { data: { accept } });
		// TODO: do logic
		if (accept) {
			let a = pendingList;
			let item = pendingList.filter((v) => v.id === id)[0];
			const i = pendingList.indexOf(item);
			a = a.slice(i, i + 1);

			PendingList.set(a);
			getFriendList();
		} else {
		}
	};

	const getNotifications = async () => {
		const a = await request<Activity[]>('get', '/account/activity');
		core.account.collection.activity.collect(a, 'default');
		core.account.state.new_account_activity.set(!!a.filter((v) => !v.read_at).length);
	};

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

	const renderItem = ({ item, index }) => (
		<ProfileRenderItem key={index} onPress={() => nav.navigate('Profile', { profile: item })}>
			<View>
				<Avatar src={`https://cdn.yourstatus.app/profile/${item.owner}/${item.avatar}`} />
				<Fill />
			</View>
			<Spacer size={15} />
			<View>
				<Text weight="medium" size={18}>
					{item.username}
				</Text>

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
				<Spacer size={20} />
				{!!item.stories?.length && <StoriesList data={item} />}
				{/* <Text>{JSON.stringify(item.stories)}</Text> */}
			</View>
		</ProfileRenderItem>
	);

	// const renderItem1 = ({ item, index }) => (
	// 	<Row key={index} style={{ paddingHorizontal: 15 }}>
	// 		<Avatar src={`https://cdn.yourstatus.app/profile/${item.owner}/${item.avatar}`} size={40} />
	// 		<Spacer size={10} />
	// 		<Text>{item.username || 'none'}</Text>
	// 		<Fill />
	// 		<SmallButton text="Accept" onPress={() => replyFriendRequest(true, item.id)} />
	// 		<Spacer size={10} />
	// 		<SmallButton text="Deny" onPress={() => replyFriendRequest(false, item.id)} />
	// 	</Row>
	// );

	React.useEffect(() => {
		getFriendList();
		// getNotifications();
		// getStories();
	}, []);

	return (
		<TabbarContentContainer noSidePadding>
			<Header
				padding
				title="Friends"
				rightArea={
					<Row>
						<IconButton name="search" size={35} color={theme.textFade} noBackground onPress={() => nav.navigate('SearchPeople')} />
						<Spacer size={5} />
					</Row>
				}
			/>
			{/* {!!pendingList?.length && (
				<>
					<Spacer size={20} />
					<Text style={{ paddingLeft: 10 }} weight="semi-bold" size={16} color={theme.primary}>
						Pending friends requests
					</Text>
					<FlatList data={pendingList} renderItem={renderItem1}  scrollEnabled={false} />
				</>
			)} */}
			<FlatList data={friendList} renderItem={renderItem} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.textFade} />} />
		</TabbarContentContainer>
	);
};

const ProfileRenderItem = styled.View`
	flex-direction: row;
	align-items: center;
	/* justify-content: center; */
	padding: 10px 15px;
	border-bottom-color: ${({ theme }) => theme.step1};
	border-bottom-width: 1px;
`;

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
						style={{ width: 90, height: 110, borderRadius: 10, position: 'absolute', zIndex: 1, left: 20, opacity: 0.3 }}
					/>
				)}
				{data.stories.length >= 3 && (
					<View style={{ backgroundColor: theme.textFade, marginLeft: 30, borderRadius: 7, padding: 2, paddingRight: 4, paddingBottom: 3, paddingLeft: 4 }}>
						<Text color={theme.background} weight="bold">
							{data.stories.length - 2}+
						</Text>
					</View>
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

const Label = styled(Text)``;
