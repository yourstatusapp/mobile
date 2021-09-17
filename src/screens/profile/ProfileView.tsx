import * as React from 'react';
import styled, { useTheme } from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { Dimensions, FlatList, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, Fill, IconButton, Row, SidePadding, SmallButton, Spacer, TabbarContentContainer, Text, TextButton, TopHeading } from '@parts';
import core, { Collection, IProfile, request } from '@core';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/core';

interface ProfileProps {
	route: {
		params: {
			profile: IProfile;
			mine?: boolean;
		};
	};
}

export const ProfileView: React.FC<ProfileProps> = (props) => {
	const { route } = props;
	const theme = useTheme();
	const nav = useNavigation();

	const profile = route.params.profile;

	const [Colls, setColls] = useState<Collection[]>();

	const loadProfile = async () => {
		if (route.params.mine) {
			const m = await request<Collection[]>('get', '/collection');
			setColls(m);
		} else {
			const p = await request<IProfile>('get', '/profile/' + profile.username);
			setColls(p.collections);
		}
	};

	// Load profile
	React.useEffect(() => {
		// loadProfile();
	}, []);

	// return (
	// 	<ProfileBody>
	// 		{route.params?.profile?.avatar ? (
	// 			<PhotoBanner source={{ uri: `https://cdn.yourstatus.app/profile/${route.params.profile.account_id}/${route.params.profile.avatar}` }} />
	// 		) : (
	// 			<PhotoBannerPlaceHolder />
	// 		)}
	// 	</ProfileBody>
	// );

	return (
		<ProfileBody>
			<Spacer size={10} />

			<Row style={{ padding: 20 }}>
				<Avatar src={`https://cdn.yourstatus.app/profile/${route.params.profile.account_id}/${route.params.profile.avatar}`} size={100} />
				<Spacer size={20} />
				<Row style={{ flex: 1 }}>
					<Text weight="bold" size={24}>
						{profile.username}
					</Text>
					<Fill />
					<View style={{ justifyContent: 'flex-start' }}>
						<IconButton name="plus" color={theme.text} size={25} style={{ transform: [{ rotate: '45deg' }] }} noBackground onPress={() => nav.goBack()} />
						<Fill />
					</View>
				</Row>
			</Row>

			<SidePadding>
				<Spacer size={20} />
				{/* <Text color="black">{JSON.stringify(profile)}</Text> */}
				{profile?.bio && (
					<BioBox>
						<Text>{profile.bio}</Text>
					</BioBox>
				)}

				<Spacer size={35} />
				{/* <Text color="black">{JSON.stringify(ProfileData) || -1}</Text> */}
			</SidePadding>
			{/* {!!Colls?.length && <Collections data={Colls} />} */}
		</ProfileBody>
	);
};

const ProfileBody = styled.View`
	background-color: ${({ theme }) => theme.background};
	flex: 1;
`;

const PhotoBanner = styled(FastImage)`
	width: 100%;
	height: 100%;
	max-height: 190px;
`;

const PhotoBannerPlaceHolder = styled.View`
	width: 100%;
	height: 100%;
	background-color: #583838;
	max-height: 190px;
`;

const CardHeader = styled.View`
	background-color: ${({ theme }) => theme.step1};
	padding: 15px 20px;
`;

const BioBox = styled.View`
	padding: 10px;
	border-radius: 15px;
	background-color: ${({ theme }) => theme.step1};
`;

const Collections: React.FC<{ data: Collection[] }> = (p) => {
	const theme = useTheme();
	const [Coll, setColl] = useState<Collection[]>([]);
	const [Tabs, setTabs] = useState<string[]>();
	const [SelectedTab, setSelectedTab] = useState<number>(0);

	const [OpenImage, setOpenImage] = useState('');

	React.useEffect(() => {
		if (p?.data) {
			setColl(p.data);
			setTabs(p.data.map((v) => v.title));
			setSelectedTab(0);
		}
	}, []);

	const itemW = Dimensions.get('screen').width / 3;

	const renderItem = ({ item, index }) => (
		<CollectionPost style={{ width: itemW, height: itemW }} onPress={() => setOpenImage(`https://cdn.yourstatus.app/collection/${item.collection}/${item.content}`)}>
			<FastImage
				key={index}
				resizeMode="cover"
				source={{ uri: `https://cdn.yourstatus.app/collection/${item.collection}/${item.content}` }}
				style={{ height: itemW - 5, width: itemW - 5, borderRadius: 5 }}
			/>
		</CollectionPost>
	);

	return (
		<CollectionsContainer>
			<CollectionsBtns>
				<FlatList
					data={Tabs}
					horizontal={true}
					style={{ borderBottomWidth: 1, borderBottomColor: theme.step3 }}
					contentContainerStyle={{ padding: 10, alignItems: 'center' }}
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

			{!!OpenImage && (
				<FullScreenImage style={{}}>
					<TouchableOpacity onPress={() => setOpenImage('')} style={{ flex: 1 }} activeOpacity={1}>
						<FastImage resizeMode="contain" source={{ uri: OpenImage }} style={{ height: Dimensions.get('screen').height, width: Dimensions.get('screen').width }} />
					</TouchableOpacity>
				</FullScreenImage>
			)}

			<View style={{ flex: 1, backgroundColor: theme.step1 }}>
				<FlatList
					data={Coll[SelectedTab]?.data || []}
					renderItem={renderItem}
					numColumns={3}
					ItemSeparatorComponent={() => <Spacer size={5} />}
					contentContainerStyle={{ paddingTop: 10, flex: 1, backgroundColor: theme.step1 }}
					initialNumToRender={9}
				/>
			</View>
		</CollectionsContainer>
	);
};

const FullScreenImage = styled.View`
	background-color: #00000050;
	position: absolute;
	flex: 1;
	z-index: 1;
	left: 0;
	top: -230;
`;

const CollectionsContainer = styled.View`
	flex: 1;
	position: relative;
	background-color: ${({ theme }) => theme.primary};
`;

const CollectionsBtns = styled.View`
	background-color: ${({ theme }) => theme.background};
	border-bottom-color: ${({ theme }) => theme.step1};
	border-bottom-width: 1px;
`;
const CollectionPost = styled(TouchableOpacity)`
	width: 100%;
	justify-content: center;
	align-items: center;
`;
