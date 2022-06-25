import React, { useEffect, useState } from 'react';
import {
	Avatar,
	Block,
	GradiantShadow,
	Icon,
	IconButton,
	Line,
	Spacer,
	Status,
	Text,
} from '@parts';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ProfileType, request } from '@core';
import styled, { useTheme } from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { ActivityIndicator, Animated } from 'react-native';

const BANNER_HEIGHT = 250;

const edgeSpace = 15;

export const Profile = () => {
	const { params } = useRoute();
	const theme = useTheme();
	const nav = useNavigation();

	const [ProfileData, SetProfile] = useState<ProfileType>();
	const [Loaded, SetLoaded] = useState(false);

	// @ts-ignore
	const usr_name = params.username;

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
			<Block color={theme.background}>
				<Spacer size={50} />
				<IconButton
					name="arrow"
					size={20}
					style={{ marginLeft: edgeSpace, zIndex: 1 }}
					iconSize={16}
					color={theme.text}
					onPress={() => nav.goBack()}
					backgroundColor={theme.background + '75'}
				/>
				<BannerArea>
					<GradiantShadow
						colors={['transparent', theme.background]}
						height={248 + 50}
						style={{ position: 'absolute', bottom: 0, zIndex: 1 }}
					/>
					{!ProfileData?.banner ? (
						<BannerPlaceholder />
					) : (
						<Banner
							source={{
								uri: `https://cdn.yourstatus.app/profile/${ProfileData?.account_id}/${ProfileData?.banner}`,
							}}
							resizeMode="cover"
						/>
					)}
				</BannerArea>

				<Block flex={1}>
					<Spacer size={20} />
					<Block paddingHorizontal={edgeSpace} flex={0}>
						<Avatar src={[ProfileData.account_id, ProfileData.avatar]} size={115} />
						<Block row flex={0} marginTop={5}>
							<Text bold size={40}>
								{ProfileData.username}
							</Text>
						</Block>
					</Block>

					<Block paddingHorizontal={edgeSpace} color={theme.background}>
						{ProfileData.status?.length &&
							ProfileData.status.map((ItemData, ItemIndex) => (
								<Block flex={0} key={ItemIndex} style={{ flexWrap: 'wrap', paddingTop: 6 }}>
									<Status status={ItemData} />
								</Block>
							))}

						{ProfileData?.location && (
							<Block row flex={0} hCenter paddingTop={15}>
								<Icon
									name="map-marker"
									size={15}
									color={theme.textFadeLight}
									style={{ paddingRight: 5 }}
								/>
								<Text medium size={12} color={theme.textFadeLight}>
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
