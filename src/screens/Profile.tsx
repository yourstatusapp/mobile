import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Block, Icon, Line, Spacer, Status, Text } from '@parts';
import { useRoute } from '@react-navigation/native';
import { ProfileType, request } from '@core';

import styled, { useTheme } from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const BANNER_HEIGHT = 250;

export const Profile = () => {
	const scrolling = useRef(new Animated.Value(0)).current;
	const iR = [0, 200];
	// const FadeOpacity = scrolling.interpolate({
	// 	inputRange: iR,
	// 	outputRange: [1, 0],
	// 	extrapolate: 'clamp',
	// });

	const IMAGE_HEIGHT = scrolling.interpolate({
		inputRange: [-150, 0],
		outputRange: [1.4, 1],
		extrapolate: 'clamp',
	});

	const IMAGE_HEIGHT2 = scrolling.interpolate({
		inputRange: [-150, 0],
		outputRange: [1.4, 1],
		extrapolate: 'clamp',
	});

	const { params } = useRoute();
	const { colors } = useTheme();
	// @ts-ignore
	const usr_name = params.username;
	const [ProfileData, SetProfile] = useState<ProfileType>();
	const [Loaded, SetLoaded] = useState(false);

	const getProfile = async () => {
		const res = await request<ProfileType>('get', '/profile/' + usr_name);
		if (res?.data) {
			SetProfile(res.data);
		}
		SetLoaded(true);
	};

	// const memoizedCB = useCallback(getProfile, [params.username, ]);

	useEffect(() => {
		getProfile();
	}, []);

	if (!ProfileData) {
		return (
			<Block safe color="black">
				<Text>{Loaded ? 'Failed to load profile' : 'Loading profile data'}</Text>
			</Block>
		);
	} else {
		return (
			<Block color="black">
				<BannerArea style={{ transform: [{ scale: IMAGE_HEIGHT }] }}>
					{!ProfileData?.banner ? (
						<BannerPlaceholder />
					) : (
						<Banner source={{ uri: `https://cdn.yourstatus.app/profile/${ProfileData?.account_id}/${ProfileData?.banner}` }} />
					)}
				</BannerArea>
				<Animated.ScrollView
					style={{ backgroundColor: 'transparent', zIndex: 6, paddingTop: 100, flex: 1 }}
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
					)}>
					{/* <Block scroll color="transparent" style={{ zIndex: 6 }} paddingTop={100}> */}
					<LinearGradient
						colors={['transparent', '#0000008a', 'black']}
						style={{ position: 'absolute', top: -100, zIndex: 12, width: '100%', height: BANNER_HEIGHT }}
					/>
					<Avatar src={[ProfileData.account_id, ProfileData.avatar]} size={130} style={{ zIndex: 17, marginLeft: 20 }} />

					<Block color="black" style={{ zIndex: 7, height: 500 }} paddingHorizontal={20} paddingTop={20}>
						<Text bold size={40} paddingTop={0}>
							{ProfileData.username}
						</Text>
						<Spacer size={5} />
						{ProfileData.status && <Status status={ProfileData.status} />}

						{ProfileData?.location && (
							<Block row flex={0} hCenter paddingTop={12}>
								<Icon name="map-marker" size={15} color={colors.white40} style={{ paddingRight: 5 }} />
								<Text weight="600" size={12} color={colors.white80}>
									{ProfileData.location}
								</Text>
							</Block>
						)}
						{ProfileData.bio && (
							<>
								<Line size={3} color={colors.white10} spacing={12} />
								<Text size={14} color={colors.white}>
									{ProfileData.bio}
								</Text>
							</>
						)}
					</Block>
				</Animated.ScrollView>
				{/* </Block> */}
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
	background-color: ${({ theme }) => theme.colors.white20};
	height: ${BANNER_HEIGHT}px;
`;

const BannerArea = styled(Animated.View)`
	height: ${BANNER_HEIGHT};
	position: absolute;
	width: 100%;
	z-index: 1;
`;
