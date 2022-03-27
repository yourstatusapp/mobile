import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Block, GradiantShadow, Icon, IconButton, Line, Spacer, Status, Text } from '@parts';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ProfileType, request } from '@core';
import styled, { useTheme } from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { ActivityIndicator, Animated } from 'react-native';

const BANNER_HEIGHT = 250;

export const Profile = () => {
	const { params } = useRoute();
	const theme = useTheme();
	const nav = useNavigation();

	const [ProfileData, SetProfile] = useState<ProfileType>();
	const [Loaded, SetLoaded] = useState(false);
	const scrolling = useRef(new Animated.Value(0)).current;

	// @ts-ignore
	const usr_name = params.username;

	const IMAGE_HEIGHT = scrolling.interpolate({
		inputRange: [-100, BANNER_HEIGHT],
		outputRange: [1, 1.5],
		extrapolate: 'clamp',
	});

	const getProfile = async () => {
		const res = await request<ProfileType>('get', '/profile/' + usr_name);
		if (res?.data) {
			SetProfile(res.data);
		}
		SetLoaded(true);
	};

	useEffect(() => {
		getProfile();
	}, []);

	if (!ProfileData) {
		return (
			<Block safe color={theme.background} hCenter vCenter>
				<Block flex={0} hCenter>
					{!Loaded && <ActivityIndicator />}
					<Text bold size={18} paddingTop={20}>
						{Loaded ? 'Failed to load profile' : 'Loading Profile'}
					</Text>
				</Block>
			</Block>
		);
	} else {
		return (
			<Block color={theme.background} style={{ flex: 1 }}>
				<BannerArea style={{ transform: [{ scale: IMAGE_HEIGHT }] }}>
					{!ProfileData?.banner ? (
						<BannerPlaceholder />
					) : (
						<Banner
							source={{ uri: `https://cdn.yourstatus.app/profile/${ProfileData?.account_id}/${ProfileData?.banner}` }}
							resizeMode="cover"
						/>
					)}
				</BannerArea>
				<Animated.ScrollView
					style={{ flex: 1 }}
					onScroll={Animated.event(
						[
							{
								nativeEvent: {
									contentOffset: {
										y: scrolling,
									},
								},
							},
						],
						{ useNativeDriver: true },
					)}
					showsVerticalScrollIndicator={false}>
					<Block paddingBottom={150} flex={1}>
						<IconButton
							name="arrow-big"
							size={25}
							iconSize={13}
							style={{ position: 'absolute', left: 20, top: 40, zIndex: 95352, transform: [{ rotate: '180deg' }] }}
							onPress={() => nav.goBack()}
							color={theme.textFade}
							backgroundColor={theme.backgroundDarker}
						/>
						<GradiantShadow
							colors={['transparent', theme.background]}
							height={248 + 50}
							style={{ position: 'absolute', top: 0, zIndex: 0 }}
						/>

						<Block paddingHorizontal={20}>
							<Spacer size={120} />
							<Avatar src={[ProfileData.account_id, ProfileData.avatar]} size={130} />

							<Block row>
								<Text bold size={40}>
									{ProfileData.username}
								</Text>
							</Block>
						</Block>

						<Block paddingHorizontal={20} paddingTop={20} color={theme.background}>
							{ProfileData.status?.length &&
								ProfileData.status.map((ItemData, ItemIndex) => (
									<Block flex={0} key={ItemIndex} style={{ flexWrap: 'wrap', paddingTop: 6 }}>
										<Status status={ItemData} />
									</Block>
								))}

							{ProfileData?.location && (
								<Block row flex={0} hCenter paddingTop={15}>
									<Icon name="map-marker" size={15} color={theme.textFadeLight} style={{ paddingRight: 5 }} />
									<Text weight="600" size={12} color={theme.textFadeLight}>
										{ProfileData.location}
									</Text>
								</Block>
							)}
							{ProfileData.bio && (
								<>
									<Line size={3} color={theme.backgroundDarker} spacing={12} />
									<Text size={14} color={theme.textFade}>
										{ProfileData.bio}
									</Text>
								</>
							)}
							<Spacer size={300} />
						</Block>
					</Block>
				</Animated.ScrollView>
			</Block>
		);
	}
};

const Banner = styled(FastImage)`
	width: 100%;
	height: 100%;
`;

const BannerPlaceholder = styled.View`
	width: 100%;
	background-color: ${({ theme }) => theme.backgroundDarker};
	height: ${BANNER_HEIGHT}px;
`;

const BannerArea = styled(Animated.View)`
	height: ${BANNER_HEIGHT};
	position: absolute;
	top: 0;
	width: 100%;
	z-index: 0;
`;
