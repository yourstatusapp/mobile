import * as React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Avatar, Fill, Header, Row, SidePadding, SmallButton, Spacer, TabbarContentContainer, Text, TextButton } from '@parts';
import core, { Collection, ProfileType, request } from '@core';
import { useState } from 'react';

interface ProfileProps {
	route: {
		params: any;
	};
}

export const Profile: React.FC<ProfileProps> = (props) => {
	const { route } = props;
	const profile = route.params;

	const [Profile, setProfile] = useState<ProfileType>();

	const loadProfile = async () => {
		const p = await request<ProfileType>('get', '/profile/' + profile.username);
		setProfile(p);
	};

	// Load profile
	React.useEffect(() => {
		loadProfile();
	}, []);

	return (
		<ProfileBody noSidePadding>
			<Row style={{ paddingLeft: 10 }}>
				<Avatar src={`https://cdn.yourstatus.app/profile/${route.params.owner}/${route.params.avatar}`} size={100} />
				<Spacer size={20} />
				<Text weight="bold" size={24}>
					{profile.username}
				</Text>
			</Row>
			<Spacer size={20} />
			<Row style={{ paddingLeft: 10 }}>
				<SmallButton text="Add friend" />
			</Row>
			<Spacer size={35} />
			{!!Profile?.collections?.length && <Collections data={Profile?.collections} />}
		</ProfileBody>
	);
};

const ProfileBody = styled(TabbarContentContainer)`
	background-color: ${({ theme }) => theme.background};
	flex: 1;
`;

import FastImage from 'react-native-fast-image';
import { FlatList, View } from 'react-native';

const Collections: React.FC<{ data: Collection[] }> = (p) => {
	const theme = useTheme();
	const [Coll, setColl] = useState<Collection[]>([]);
	const [Tabs, setTabs] = useState<string[]>();
	const [SelectedTab, setSelectedTab] = useState<number>(0);

	// const collections = async () => {
	// 	const a = await request<Collection[]>('get', '/collection');
	// 	console.log(a);

	// setColl(a);
	// setTabs(a.map((v) => v.title));
	// setSelectedTab(0);
	// };

	React.useEffect(() => {
		if (p.data) {
			console.log('-->', p.data);

			setColl(p.data);
			setTabs(p.data.map((v) => v.title));
			setSelectedTab(0);
		}
	}, []);

	const renderItem = ({ item, index }) => (
		<CollectionPost>
			<FastImage
				key={index}
				resizeMode="cover"
				source={{ uri: `https://cdn.yourstatus.app/collection/${item.collection}/${item.content}` }}
				style={{ height: 120, width: 120, borderRadius: 12 }}
			/>
		</CollectionPost>
	);

	return (
		<CollectionsContainer>
			<CollectionsBtns>
				<FlatList
					data={Tabs}
					horizontal={true}
					contentContainerStyle={{ padding: 10 }}
					renderItem={({ item, index }) => (
						<SmallButton
							textColor={SelectedTab === index ? theme.primary : theme.text}
							text={item}
							key={index}
							backgroundColor={theme.step1}
							style={{ marginRight: 10 }}
							onPress={() => setSelectedTab(index)}
						/>
					)}
				/>
			</CollectionsBtns>

			<View style={{ flex: 1, backgroundColor: theme.step2 }}>
				<FlatList
					data={Coll[SelectedTab]?.data || []}
					renderItem={renderItem}
					numColumns={3}
					ItemSeparatorComponent={() => <Spacer size={5} />}
					contentContainerStyle={{ paddingTop: 10, flex: 1, backgroundColor: theme.step0 }}
					initialNumToRender={9}
				/>
			</View>
		</CollectionsContainer>
	);
};

const CollectionsContainer = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.primary};
`;

const CollectionsBtns = styled.View`
	background-color: ${({ theme }) => theme.background};
	/* border-bottom: solid 1px black; */
	border-bottom-color: ${({ theme }) => theme.step1};
	border-bottom-width: 1px;
`;
const CollectionPost = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;
