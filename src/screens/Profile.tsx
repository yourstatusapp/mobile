import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Block, Icon, IconButton, Line, Spacer, Status, Text } from '@parts';
import { useNavigation, useRoute } from '@react-navigation/native';
import core, { ProfileType, request } from '@core';

import styled, { useTheme } from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { usePulse } from '@pulsejs/react';

const BANNER_HEIGHT = 250;

export const Profile = () => {
	const nav = useNavigation();
	const scrolling = useRef(new Animated.Value(0)).current;
	const iR = [0, 200];
	// const FadeOpacity = scrolling.interpolate({
	// 	inputRange: iR,
	// 	outputRange: [1, 0],
	// 	extrapolate: 'clamp',
	// });

	const IMAGE_HEIGHT = scrolling.interpolate({
		inputRange: [0, 300],
		outputRange: [1, 1],
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
	const isDarkTheme = usePulse(core.ui.isDarkMode);
	useEffect(() => {
		getProfile();
	}, []);

	if (!ProfileData) {
		return (
			<Block safe color={colors.background}>
				<Text>{Loaded ? 'Failed to load profile' : 'Loading profile data'}</Text>
			</Block>
		);
	} else {
		return (
			<Block color={colors.background}>
				<BannerArea style={{ transform: [{ scale: IMAGE_HEIGHT }] }}>
					{!ProfileData?.banner ? (
						<BannerPlaceholder />
					) : (
						<Banner source={{ uri: `https://cdn.yourstatus.app/profile/${ProfileData?.account_id}/${ProfileData?.banner}` }} />
						// <Banner source={{ uri: `https://blog-www.pods.com/wp-content/uploads/2019/04/MG_1_1_New_York_City-1.jpg` }} resizeMode="center" />
					)}
				</BannerArea>
				<LinearGradient
					colors={['transparent', colors.background]}
					style={{ position: 'absolute', top: 0, zIndex: 12, width: '100%', height: BANNER_HEIGHT }}
				/>
				{/* <IconButton
					name="arrow-big"
					size={25}
					iconSize={15}
					style={{ position: 'absolute', left: 20, top: 40, zIndex: 95352, transform: [{ rotate: '180deg' }] }}
					onPress={() => nav.goBack()}
					color={colors.box}
					backgroundColor={colors.box}
				/> */}

				<Animated.ScrollView
					style={{ zIndex: 6, marginTop: 300 }}
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
					{/* <LinearGradient
						colors={['transparent', '#0000008a', 'black']}
						style={{ position: 'absolute', top: -100, zIndex: 12, width: '100%', height: BANNER_HEIGHT }}
					/> */}

					<Avatar src={[ProfileData.account_id, ProfileData.avatar]} size={130} style={{ zIndex: 17, marginLeft: 20, marginBottom: 0 }} />

					<Block color={colors.background} style={{ zIndex: 7, height: 500 }} paddingHorizontal={20} paddingTop={50}>
						<Text bold size={40} paddingTop={0}>
							{ProfileData.username}
						</Text>
						<Spacer size={5} />

						{ProfileData.status?.length &&
							ProfileData.status.map((ItemData, ItemIndex) => (
								<Block flex={0} key={ItemIndex} style={{ flexWrap: 'wrap', paddingTop: 6 }}>
									<Status status={ItemData} />
								</Block>
							))}

						{ProfileData?.location && (
							<Block row flex={0} hCenter paddingTop={12}>
								<Icon name="map-marker" size={15} color={colors.text} style={{ paddingRight: 5 }} />
								<Text weight="600" size={12} color={colors.text}>
									{ProfileData.location}
								</Text>
							</Block>
						)}
						{ProfileData.bio && (
							<>
								<Line size={3} color={colors.box} spacing={12} />
								<Text size={14} color={colors.textFade}>
									{ProfileData.bio}
								</Text>
							</>
						)}
						<Block flex={1}>
							<Text paddingBottom={50}>texts</Text>
							<Text paddingBottom={50}>texts</Text>
							<Text paddingBottom={50}>texts</Text>
							<Text paddingBottom={50}>texts</Text>
							<Text paddingBottom={50}>texts</Text>
							<Text paddingBottom={50}>texts</Text>
							<Text paddingBottom={50}>texts</Text>
							<Text paddingBottom={50}>texts</Text>
							<Text paddingBottom={50}>texts</Text>
							<Text paddingBottom={50}>texts</Text>
							<Text paddingBottom={50}>texts</Text>
							<Text paddingBottom={50}>texts</Text>
							<Text paddingBottom={50}>texts</Text>
							<Text paddingBottom={50}>texts</Text>
							<Text paddingBottom={50}>texts</Text>
							<Text paddingBottom={50}>texts</Text>
							<Text paddingBottom={0}>texts</Text>
						</Block>
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
	background-color: ${({ theme }) => theme.colors.text};
	height: ${BANNER_HEIGHT}px;
`;

const BannerArea = styled(Animated.View)`
	height: ${BANNER_HEIGHT};
	position: absolute;
	top: 0;
	width: 100%;
	z-index: 1;
`;
