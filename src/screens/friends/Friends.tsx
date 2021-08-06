import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { FlatList, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { request, snow2time } from '../../core/utils';
import { Avatar, Header, IconButton, Row, SidePadding, SmallButton, Spacer, TabbarContentContainer, Text } from '@parts';
import styled, { useTheme } from 'styled-components/native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { EventsList } from './tabs/EventsList';

interface FriendsProps {}

const renderScene = SceneMap({
	first: EventsList,
	second: EventsList,
	// second: SecondRoute,
});

export const Friends: React.FC<FriendsProps> = (props) => {
	const {} = props;
	const theme = useTheme();
	const nav = useNavigation();

	const layout = useWindowDimensions();

	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: 'first', title: 'Friends' },
		{ key: 'second', title: 'Events' },
	]);

	// const [List, setList] = useState<any>(null);
	// const [Events, setEvents] = useState([]);
	// const [PendingList, setPendingList] = useState<any[]>();

	// const getEvents = async () => {
	// 	const a = await request('get', '/events');
	// 	setEvents(a);
	// };

	// React.useEffect(() => {
	// 	request<{ friends: any[]; incoming_pending: any[] }>('get', '/friends').then((c) => {
	// 		setList(c.friends);
	// 		setPendingList(c.incoming_pending);
	// 	});
	// 	getEvents();
	// }, []);

	// const renderItem = ({ item, index }) => (
	// 	<TouchableOpacity key={index} onPress={() => nav.navigate('Profile', item)}>
	// 		<Row style={{ paddingBottom: 15 }}>
	// 			<Avatar src={`https://cdn.yourstatus.app/profile/${item.owner}/${item.avatar}`} />
	// 			<Spacer size={10} />
	// 			<Text weight="bold">{item.username}</Text>
	// 		</Row>
	// 	</TouchableOpacity>
	// );

	// const renderItemEvent = ({ item, index }) => (
	// 	<EventItem key={index}>
	// 		<Text weight="semi-bold" size={16}>
	// 			{item.title}
	// 		</Text>
	// 		<Text size={14} color={theme.textFade}>
	// 			{item.description}
	// 		</Text>
	// 		<Spacer size={20} />
	// 		<Text size={14} color={theme.text}>
	// 			{snow2time(item.id).toLocaleTimeString() + '  -  ' + snow2time(item.id).toLocaleDateString()}
	// 		</Text>
	// 	</EventItem>
	// );
	return (
		<TabbarContentContainer noSidePadding>
			<Header
				padding
				title="Friends"
				rightArea={
					<Row>
						<IconButton name="search" size={35} iconSize={18} color={theme.text} onPress={() => nav.navigate('SearchPeople')} />
						<Spacer size={10} />
					</Row>
				}
			/>
			<Spacer size={20} />
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
				renderTabBar={(p) => <TabBar {...p} jumpTo={(v) => setIndex(v)} />}
			/>

			{/* <Row>
				<Text size={20}>Friends</Text>
				<Fill />
				<IconButton name="settings" size={24} color="black" onPress={() => nav.navigate('Settings')} />
			</Row> */}
			{/* <Input placeholder="Search" autoCompleteType="off" autoCorrect={false} /> */}
			{/* <TextButton text="Incoming friend requests" onPress={() => nav.navigate('Friendrequests', PendingList)} /> */}
			{/* <FlatList
				data={Events}
				renderItem={renderItemEvent}
				style={{ flexGrow: 0 }}
				// ItemSeparatorComponent={() => <Spacer size={10} />}
				showsVerticalScrollIndicator={false}
				pagingEnabled={true}
				snapToAlignment={'start'}
			/>
			<FlatList data={List} renderItem={renderItem} /> */}
		</TabbarContentContainer>
	);
};

const EventItem = styled.View`
	background-color: ${({ theme }) => theme.step1};
	padding: 10px;
	border-radius: 12px;
	margin-bottom: 10px;
`;

interface TabbarProps {
	jumpTo: any;
	position: any;
	layout: { height: number; width: number };
	navigationState: { index: number; routes: { key: string; title: string }[] };
}
export const TabBar: React.FC<TabbarProps> = (props) => {
	const { navigationState, jumpTo } = props;
	React.useEffect(() => {
		console.log(props);
	}, []);

	return (
		<TabbarBody>
			{navigationState.routes.map((v, i) => (
				<SmallButton key={i} text={v.title} style={{ marginRight: 10, opacity: navigationState.index === i ? 0.5 : 1 }} onPress={() => jumpTo(i)} />
			))}
		</TabbarBody>
	);
};

const TabbarBody = styled(Row)`
	padding: 0px 20px;
`;
