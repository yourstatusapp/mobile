import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import { niceTime, request } from '../../core/utils';
import { Avatar, Fill, Header, IconButton, Row, SmallButton, Spacer, StatusBox, TabbarContentContainer, Text } from '@parts';
import styled, { useTheme } from 'styled-components/native';
import core from '@core';
import { Activity } from '../../core/modules/accounts';
import { state } from '@pulsejs/core';
import { usePulse } from '@pulsejs/react';
import { ScrollView } from 'react-native-gesture-handler';

interface FriendsProps {}

const FriendsList = state<any[]>([]);
const PendingList = state<any[]>([]);

export const Friends: React.FC<FriendsProps> = (props) => {
	const {} = props;
	const theme = useTheme();
	const nav = useNavigation();

	const pendingList = usePulse(PendingList);
	const friendList = usePulse(FriendsList);
	const [Stories, setStories] = React.useState<any[]>([]);
	const [MyStories, setMyStories] = React.useState<any[]>([]);

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
								<Spacer size={5} />
								{niceTime(item?.status.id)} ago
							</Text>
						</Row>
					</>
				)}
			</View>
		</ProfileRenderItem>
	);

	const renderItem1 = ({ item, index }) => (
		<Row key={index} style={{ paddingHorizontal: 15 }}>
			<Avatar src={`https://cdn.yourstatus.app/profile/${item.owner}/${item.avatar}`} size={40} />
			<Spacer size={10} />
			<Text>{item.username || 'none'}</Text>
			{/* <Spacer size={10} /> */}
			<Fill />
			<SmallButton text="Accept" onPress={() => replyFriendRequest(true, item.id)} />
			<Spacer size={10} />
			<SmallButton text="Deny" onPress={() => replyFriendRequest(false, item.id)} />
		</Row>
	);

	React.useEffect(() => {
		getFriendList();
		getNotifications();
		getStories();
	}, []);

	return (
		<TabbarContentContainer noSidePadding>
			<Header
				padding
				title="Friends"
				rightArea={
					<Row>
						<IconButton name="search" size={35} color={theme.text} noBackground onPress={() => nav.navigate('SearchPeople')} />
						<Spacer size={5} />
					</Row>
				}
			/>
			{!!Stories.length || (!!MyStories.length && <StoriesArea data={Stories} mine={MyStories} />)}
			{!!pendingList?.length && (
				<>
					<Spacer size={20} />
					<Text style={{ paddingLeft: 10 }} weight="semi-bold" size={16} color={theme.primary}>
						Pending friends requests
					</Text>
					<FlatList data={pendingList} renderItem={renderItem1} style={{ paddingTop: 20, flexGrow: 0 }} scrollEnabled={false} />
				</>
			)}
			<FlatList data={friendList} renderItem={renderItem} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} />
		</TabbarContentContainer>
	);
};

const ProfileRenderItem = styled(TouchableOpacity)`
	flex-direction: row;
	align-items: center;
	/* justify-content: center; */
	padding: 10px 15px;
	border-bottom-color: ${({ theme }) => theme.step1};
	border-bottom-width: 1px;
`;

// const StatusBox = styled.View`
// 	align-items: flex-start;
// `;

const StoriesArea: React.FC<{ data: any[]; mine: any }> = (p) => {
	const theme = useTheme();
	const nav = useNavigation();
	const prof = usePulse(core.profile.state.PROFILE);

	const renderItem = ({ item, index }) => (
		<TouchableOpacity key={index} onPress={() => nav.navigate('Stories', item)}>
			<Avatar src={`https://cdn.yourstatus.app/profile/${item.account_id}/${item.avatar}`} size={50} />
		</TouchableOpacity>
	);

	return (
		<StoriesAreaBody>
			<Spacer size={10} />
			<Text weight="semi-bold" size={18} style={{ paddingLeft: 15 }}>
				Realtime Stories
			</Text>

			<ScrollView horizontal={true} style={{ paddingVertical: 5 }}>
				<Spacer size={15} />
				<TouchableOpacity onPress={() => nav.navigate('Stories', { account_id: prof.owner, avatar: prof.avatar, username: prof.username, stories: p.mine })}>
					<Avatar src={`https://cdn.yourstatus.app/profile/${prof.owner}/${prof.avatar}`} size={50} />
				</TouchableOpacity>
				<FlatList
					data={p.data}
					renderItem={renderItem}
					ItemSeparatorComponent={() => <Spacer size={12} />}
					style={{ flexGrow: 0 }}
					contentContainerStyle={{ paddingLeft: 12 }}
					horizontal
					scrollEnabled={false}
				/>
			</ScrollView>
			<Spacer size={5} />
		</StoriesAreaBody>
	);
};

const StoriesAreaBody = styled.View`
	background-color: ${({ theme }) => theme.step1};
	border-top-color: ${({ theme }) => theme.step2};
	border-bottom-color: ${({ theme }) => theme.step2};
	border-top-width: 1px;
	border-bottom-width: 1px;
	position: relative;
`;
