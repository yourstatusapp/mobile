import * as React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Avatar, Fill, Row, SidePadding, SmallButton, Spacer, Text, TextButton } from '@parts';
import { Collection, request } from '@core';
import { useState } from 'react';

interface ProfileProps {
	route: any;
}

export const Profile: React.FC<ProfileProps> = (props) => {
	const { route } = props;
	const profile = route.params;

	return (
		<ProfileBody>
			<SidePadding style={{ flex: 0 }}>
				<Spacer size={20} />
				<Row>
					<Avatar src={`https://cdn.yourstatus.app/profile/${route.params.owner}/${route.params.avatar}`} size={100} />
					<Spacer size={20} />
					<Text weight="bold" size={24}>
						{profile.username}
					</Text>
				</Row>
				<Spacer size={20} />
				<Row>
					<SmallButton text="Add friend" />
				</Row>
				<Spacer size={35} />
			</SidePadding>
			<Collections />
		</ProfileBody>
	);
};

const ProfileBody = styled.View`
	/* background-color: ${({ theme }) => theme.step1}; */
	flex: 1;
`;

import FastImage from 'react-native-fast-image';
import { FlatList } from 'react-native';

const Collections: React.FC = () => {
	const theme = useTheme();
	const [Coll, setColl] = useState<Collection[]>([]);
	const [Tabs, setTabs] = useState<string[]>();

	const collections = async () => {
		const a = await request('get', '/collection');

		setColl(a);
		setTabs(a.map((v) => v.title));
	};

	React.useEffect(() => {
		collections();
	}, []);

	const renderItem = ({ item, index }) => (
		<CollectionPost>
			<FastImage
				key={index}
				source={{ uri: `https://cdn.yourstatus.app/collection/${item.collection}/${item.content}` }}
				style={{ height: 150, width: 150, flex: 1, borderRadius: 10 }}
			/>
		</CollectionPost>
	);

	return (
		<CollectionsContainer>
			<CollectionsBtns>
				<Row>
					{Tabs?.map((v, i) => (
						<SmallButton text={v} key={i} backgroundColor={theme.step2} />
					))}
				</Row>
			</CollectionsBtns>
			<Spacer size={20} />

			{Coll[0]?.data && <FlatList data={Coll[0].data} renderItem={renderItem} numColumns={3} ItemSeparatorComponent={() => <Spacer size={5} />} />}
		</CollectionsContainer>
	);
};

const CollectionsContainer = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.background};
`;
const CollectionsBtns = styled.View`
	background-color: ${({ theme }) => theme.step0};
	padding: 10px;
	/* border-bottom: solid 1px black; */
	border-bottom-color: ${({ theme }) => theme.step1};
	border-bottom-width: 1px;
`;
const CollectionPost = styled.View``;
