import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { request } from '../../core/utils';
import { Avatar, Header, IconButton, Row, Spacer, TabbarContentContainer, Text } from '@parts';
import { useTheme } from 'styled-components/native';

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
		<TouchableOpacity key={index} onPress={() => nav.navigate('Profile', item)}>
			<Row style={{ paddingBottom: 15 }}>
				<Avatar src={`https://cdn.yourstatus.app/profile/${item.owner}/${item.avatar}`} />
				<Spacer size={10} />
				<Text weight="bold">{item.username}</Text>
			</Row>
		</TouchableOpacity>
	);
	return (
		<TabbarContentContainer>
			<Header
				title="Friends"
				rightArea={
					<Row>
						<IconButton name="search" size={35} iconSize={18} color={theme.text} onPress={() => nav.navigate('SearchPeople')} />
						<Spacer size={10} />
					</Row>
				}
			/>
			<Spacer size={20} />
			{/* <Row>
				<Text size={20}>Friends</Text>
				<Fill />
				<IconButton name="settings" size={24} color="black" onPress={() => nav.navigate('Settings')} />
			</Row> */}
			{/* <Input placeholder="Search" autoCompleteType="off" autoCorrect={false} /> */}
			{/* <TextButton text="Incoming friend requests" onPress={() => nav.navigate('Friendrequests', PendingList)} /> */}
			<FlatList data={List} renderItem={renderItem} />
		</TabbarContentContainer>
	);
};
