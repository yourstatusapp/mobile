import * as React from 'react';
import styled, { useTheme } from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { Dimensions, FlatList, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, Icon, IconButton, Row, SidePadding, SmallButton, Spacer, StatusBox, Text } from '@parts';
import { Collection, ProfileType, snow2time } from '@core';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/core';

interface ProfileProps {
	route: {
		params: {
			profile: ProfileType;
			mine?: boolean;
		};
	};
}

export const ProfileView: React.FC<ProfileProps> = (props) => {
	const { route } = props;
	const profile = route.params.profile;
	const theme = useTheme();
	const nav = useNavigation();

	// const [Colls, setColls] = useState<Collection[]>();

	// const loadProfile = async () => {
	// 	if (route.params.mine) {
	// 		const m = await request<Collection[]>('get', '/collection');
	// 		setColls(m);
	// 	} else {
	// 		const p = await request<ProfileType>('get', '/profile/' + profile.username);
	// 		setColls(p.collections);
	// 	}
	// };

	// Load profile
	React.useEffect(() => {
		// loadProfile();
	}, []);

	return (
		<ProfileBody>
			<FloatingControlBar>
				<IconButton name="arrow-big" size={25} iconSize={15} style={{ transform: [{ rotate: '180deg' }] }} color={theme.text} onPress={() => nav.goBack()} />
			</FloatingControlBar>
			{/* @ts-ignore */}
			{profile?.banner ? (
				<PhotoBanner source={{ uri: `https://cdn.yourstatus.app/profile/${route.params.profile.account_id}/${route.params.profile.avatar}` }} />
			) : (
				<PhotoBannerPlaceHolder />
			)}

			<SidePadding style={{ position: 'absolute', top: 110 }}>
				<Avatar
					size={100}
					src={`https://cdn.yourstatus.app/profile/${profile.account_id}/${profile.avatar}`}
					style={{ borderColor: theme.background, borderWidth: 3, borderRadius: 120 }}
				/>
			</SidePadding>

			<SidePadding>
				<Spacer size={14} />
				<Row style={{ marginLeft: 120, marginBottom: 30 }}>
					<Text weight="semi-bold" size={26} color={theme.textFade}>
						@
					</Text>
					<Spacer size={2} />
					<Text weight="semi-bold" size={26}>
						{profile.username}
					</Text>
				</Row>
				<Spacer size={5} />
				{profile?.status && (
					<Row>
						<StatusBox {...profile.status} />
						{new Date(new Date().getTime() - 24 * 60 * 60 * 1000) < snow2time(profile.status.id) && (
							<NewBadge>
								<Text size={10} color={theme.background} weight="bold">
									new
								</Text>
							</NewBadge>
						)}
					</Row>
				)}
				{profile?.bio && <Text style={{ paddingTop: 10 }}>{profile.bio}</Text>}
				{profile?.location && (
					<>
						<Spacer size={10} />
						<Row>
							<Icon name="map-marker" size={18} color={theme.step3} />
							<Spacer size={5} />
							<Text size={15} color={theme.textFade} weight="medium">
								{profile.location}
							</Text>
						</Row>
					</>
				)}
			</SidePadding>
		</ProfileBody>
	);
};

const NewBadge = styled.View`
	background-color: #f16464;
	margin-left: 5px;
	border-radius: 20px;
	padding: 2px 6px;
`;

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
	background-color: ${({ theme }) => theme.primary};
	max-height: 150px;
`;

const FloatingControlBar = styled(Row)`
	position: absolute;
	top: 40px;
	z-index: 10;
	padding: 10px;
	width: 100%;
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
