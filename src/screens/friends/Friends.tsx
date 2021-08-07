import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { request, snow2time } from '../../core/utils';
import { Avatar, Fill, Header, IconButton, Row, SmallButton, Spacer, TabbarContentContainer, Text } from '@parts';
import styled, { useTheme } from 'styled-components/native';

interface FriendsProps {}

export const Friends: React.FC<FriendsProps> = (props) => {
	const {} = props;
	const theme = useTheme();
	const nav = useNavigation();

	const [List, setList] = useState<any>(null);
	const [PendingList, setPendingList] = useState<any[]>();

	React.useEffect(() => {
		request<{ friends: any[]; incoming_pending: any[] }>('get', '/friends').then((c) => {
			setList(c.friends);
			setPendingList(c.incoming_pending);
		});
	}, []);

	const renderItem = ({ item, index }) => (
		<ProfileRenderItem key={index} onPress={() => nav.navigate('Profile', item)}>
			<Avatar src={`https://cdn.yourstatus.app/profile/${item.owner}/${item.avatar}`} />
			<Spacer size={10} />
			<Text weight="bold">{item.username}</Text>
			<Text weight="bold"></Text>
		</ProfileRenderItem>
	);

	const renderItem1 = ({ item, index }) => (
		<Row key={index} style={{ paddingHorizontal: 15 }}>
			<Avatar src={`https://cdn.yourstatus.app/profile/${item.owner}/${item.avatar}`} size={40} />
			<Spacer size={10} />
			<Text>{item.username || 'none'}</Text>
			{/* <Spacer size={10} /> */}
			<Fill />
			<SmallButton text="accept" onPress={() => replyFriendRequest(true, item.id)} />
			<Spacer size={10} />
			<SmallButton text="deny" onPress={() => replyFriendRequest(false, item.id)} />
		</Row>
	);

	const replyFriendRequest = async (accept: boolean, id: string) => {
		await request('post', '/friends/request/' + id, { data: { accept } });
		// TODO: do logic
		if (accept) {
		} else {
		}
	};

	return (
		<TabbarContentContainer noSidePadding>
			<Header
				padding
				title="Friends"
				rightArea={
					<Row>
						<IconButton name="search" size={35} color={theme.text} onPress={() => nav.navigate('SearchPeople')} />
						<Spacer size={10} />
					</Row>
				}
			/>
			{!!PendingList?.length && (
				<>
					<Spacer size={20} />
					<Text style={{ paddingLeft: 10 }} weight="semi-bold" size={16} color={theme.primary}>
						Pending friends requests
					</Text>
					<FlatList data={PendingList} renderItem={renderItem1} style={{ paddingTop: 20, flexGrow: 0 }} scrollEnabled={false} />
				</>
			)}
			<Spacer size={20} />
			<FlatList data={List} renderItem={renderItem} />
		</TabbarContentContainer>
	);
};

const ProfileRenderItem = styled(TouchableOpacity)`
	flex-direction: row;
	align-items: center;
	padding: 10px 15px;
	border-bottom-color: ${({ theme }) => theme.step1};
	border-bottom-width: 1px;
`;
