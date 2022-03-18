import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Block, GradiantShadow, Icon, IconButton, Line, Spacer, Status, Text } from '@parts';
import { useNavigation, useRoute } from '@react-navigation/native';
import core, { ProfileType, request } from '@core';

import styled, { useTheme } from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { ActivityIndicator, Animated } from 'react-native';
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
		inputRange: [-100, BANNER_HEIGHT],
		outputRange: [1, 1.5],
		extrapolate: 'clamp',
	});

	const IMAGE_HEIGHT2 = scrolling.interpolate({
		inputRange: [0, 0],
		outputRange: [1.4, 1],
		extrapolate: 'clamp',
	});

	const { params } = useRoute();
	const theme = useTheme();
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
						<Banner source={{ uri: `https://cdn.yourstatus.app/profile/${ProfileData?.account_id}/${ProfileData?.banner}` }} />
					)}
				</BannerArea>
				{/* <LinearGradient colors={['transparent', theme.background]} style={{ position: 'absolute', top: 0, zIndex: 12, width: '100%', height: BANNER_HEIGHT }} /> */}

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
					{/* <Spacer size={100} /> */}
					{/* <Block scroll color="transparent" style={{ zIndex: 6 }} paddingTop={100}> */}
					{/* <LinearGradient
						colors={['transparent', '#0000008a', 'black']}
						style={{ position: 'absolute', top: 50, zIndex: 0, width: '100%', height: BANNER_HEIGHT }}
					/> */}

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
						<GradiantShadow colors={['transparent', theme.background]} height={248 + 50} style={{ position: 'absolute', top: 0, zIndex: 0 }} />

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
								<Block row flex={0} hCenter paddingTop={12}>
									<Icon name="map-marker" size={15} color={theme.text} style={{ paddingRight: 5 }} />
									<Text weight="600" size={12} color={theme.text}>
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
	background-color: ${({ theme }) => theme.text};
	height: ${BANNER_HEIGHT}px;
`;

const BannerArea = styled(Animated.View)`
	height: ${BANNER_HEIGHT};
	position: absolute;
	top: 0;
	width: 100%;
	z-index: 0;
`;
