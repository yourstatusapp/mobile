import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Avatar, Block, BlockScroll, Fill, IconButton, Spacer, Status, Text, TextButton } from '@parts';
import { useNavigation } from '@react-navigation/native';
import core from '@core';
import { usePulse } from '@pulsejs/react';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

import FastImage from 'react-native-fast-image';
import { removeNotificationPermissions } from '../../utils/PushNotification';
import { BlurView } from 'expo-blur';
import { StyleSheet, ViewStyle } from 'react-native';
import { getBuildNumber, getVersion, hasNotch } from 'react-native-device-info';

const BANNER_HEIGHT = 250;

export const Account = () => {
	const nav = useNavigation();
	const theme = useTheme();
	const profile = usePulse(core.profile.profile);
	const [MenuOpen, SetMenuOpen] = useState(false);
	const isDarkMode = usePulse(core.ui.isDarkMode);
	const sh2 = StyleSheet.flatten<ViewStyle>([
		{
			position: 'absolute',
			top: 0,
			height: hasNotch() ? 44 : 40,
			width: '100%',
			zIndex: 10,
			opacity: 1,
			borderBottomWidth: 1,
			borderBottomColor: theme.backgroundDarker,
		},
	]);

	return (
		<Block color={theme.background} style={{ zIndex: 1 }}>
			{/* <BannerArea>
				{profile?.banner ? <Banner source={{ uri: `https://cdn.yourstatus.app/profile/${profile.account_id}/${profile.banner}` }} /> : <BannerPlaceholder />}
			</BannerArea> */}
			{/* <LinearGradient
				colors={['transparent', '#0000008a', 'black']}
				style={{ position: 'absolute', top: 0, zIndex: 4, width: '100%', height: BANNER_HEIGHT }}
			/> */}
			{/* <LinearGradient
				colors={[theme.background, theme.backgroundDarker]}
				style={{ position: 'absolute', top: 0, zIndex: 4, width: '100%', height: BANNER_HEIGHT }}
			/> */}

			<BlockScroll style={{ zIndex: 6, paddingHorizontal: 40 }} contentContainerStyle={{ flex: 1 }} paddingHorizontal={20}>
				<Block row flex={0} marginTop={70} marginBottom={20}>
					<Text size={28} bold color={theme.text}>
						Account
					</Text>
					<Fill />
					<IconButton
						name="cog"
						size={25}
						iconSize={15}
						color={theme.text}
						backgroundColor={theme.darker}
						onPress={() => nav.navigate('settings' as never)}
					/>
				</Block>
				{/* <Text>{JSON.stringify(uploadProgress) || 'no upload in progress'}</Text> */}
				<Block row flex={0}>
					<Avatar src={[profile?.account_id, profile?.avatar]} size={120} />

					<Block flex={0} vCenter paddingLeft={15}>
						<IconButton
							name="pencil"
							color={theme.text}
							size={25}
							iconSize={12}
							style={{ marginBottom: 10 }}
							backgroundColor={theme.darker}
							onPress={() => nav.navigate('edit_profile' as never)}
						/>
						<IconButton
							name="image"
							color={theme.text}
							size={25}
							iconSize={16}
							backgroundColor={theme.darker}
							onPress={() => SetMenuOpen(true)}
						/>
						<Menu opened={MenuOpen} onBackdropPress={() => SetMenuOpen(false)} style={{ borderRadius: 5 }}>
							<MenuTrigger text="" />
							<MenuOptions
								customStyles={{
									optionsContainer: { borderRadius: 5 },
									optionsWrapper: { borderRadius: 5 },
									optionWrapper: { backgroundColor: theme.darker, height: 35, justifyContent: 'center' },
									optionText: { color: 'white', fontWeight: '700' },
								}}>
								<MenuOption
									onSelect={() => {
										SetMenuOpen(false);
										nav.navigate(
											'camera' as never,
											{
												uploadMethod: 'avatar',
											} as never,
										);
									}}
									text="Upload avatar"
								/>
								<MenuOption
									onSelect={() => {
										SetMenuOpen(false);
										nav.navigate(
											'camera' as never,
											{
												uploadMethod: 'banner',
											} as never,
										);
									}}
									text="Upload banner"
								/>
							</MenuOptions>
						</Menu>
					</Block>
				</Block>
				<Text bold size={18} paddingTop={30} paddingBottom={10}>
					@{profile.username}
				</Text>
				<Text paddingBottom={10} color={profile.display_name ? theme.text : theme.textFade} marginBottom={50}>
					{profile.display_name || 'No display name'}
				</Text>

				{/* <TextButton text="history" onPress={() => nav.navigate('realtime_history' as never)} /> */}

				<Fill />
				<Block row flex={0}>
					<Text color={theme.darker1}>V{getVersion()}</Text>
					<Text color={theme.darker1}>
						{` `} - {` `}
					</Text>
					<Text color={theme.darker1}>Build {getBuildNumber()}</Text>
				</Block>
			</BlockScroll>
			<BlurView style={sh2} tint={isDarkMode ? 'dark' : 'light'} intensity={30} />
		</Block>
	);
};

const Banner = styled(FastImage)`
	width: 100%;
	z-index: 3;
	height: ${BANNER_HEIGHT}px;
`;

const BannerPlaceholder = styled.View`
	width: 100%;
	background-color: ${({ theme }) => theme.textFadeLight};
	height: ${BANNER_HEIGHT}px;
`;

const BannerArea = styled.View`
	height: ${BANNER_HEIGHT}px;
	position: absolute;
	width: 100%;
	z-index: 2;
`;
