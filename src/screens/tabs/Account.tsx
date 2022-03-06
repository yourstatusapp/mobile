import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Avatar, Block, Fill, IconButton, Spacer, Status, Text, TextButton } from '@parts';
import { useNavigation } from '@react-navigation/native';
import core from '@core';
import { usePulse } from '@pulsejs/react';
import LinearGradient from 'react-native-linear-gradient';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

import FastImage from 'react-native-fast-image';
import { removeNotificationPermissions } from '../../utils/PushNotification';

const BANNER_HEIGHT = 250;

export const Account = () => {
	const nav = useNavigation();
	const { colors } = useTheme();
	const profile = usePulse(core.profile.profile);
	const [MenuOpen, SetMenuOpen] = useState(false);

	return (
		<Block color="black" style={{ zIndex: 1 }}>
			<BannerArea>
				{profile?.banner ? <Banner source={{ uri: `https://cdn.yourstatus.app/profile/${profile.account_id}/${profile.banner}` }} /> : <BannerPlaceholder />}
			</BannerArea>
			<LinearGradient
				colors={['transparent', '#0000008a', 'black']}
				style={{ position: 'absolute', top: 0, zIndex: 4, width: '100%', height: BANNER_HEIGHT }}
			/>

			<Block scroll style={{ zIndex: 6 }} paddingHorizontal={20} color="transparent">
				<Spacer size={20} />
				<Spacer size={50} />
				<Block row flex={0} color="transparent">
					<Text size={28} bold color={colors.white}>
						Account
					</Text>
					<Fill />
					<IconButton name="cog" size={25} color={colors.white} onPress={() => nav.navigate('settings' as never)} />
				</Block>
				<Spacer size={20} />
				{/* <Text>{JSON.stringify(uploadProgress) || 'no upload in progress'}</Text> */}
				<Block row flex={0} color="transparent">
					<Avatar src={[profile?.account_id, profile?.avatar]} size={120} />

					<Block flex={0} color="transparent" vCenter paddingLeft={15}>
						<IconButton
							name="pencil"
							color={colors.white}
							size={25}
							iconSize={12}
							style={{ marginBottom: 10 }}
							backgroundColor={colors.white40}
							onPress={() => nav.navigate('edit_profile' as never)}
						/>
						<IconButton name="image" color={colors.white} size={25} iconSize={16} backgroundColor={colors.white40} onPress={() => SetMenuOpen(true)} />
						<Menu opened={MenuOpen} onBackdropPress={() => SetMenuOpen(false)} style={{ borderRadius: 5 }}>
							<MenuTrigger text="" />
							<MenuOptions
								customStyles={{
									optionsContainer: { borderRadius: 5 },
									optionsWrapper: { borderRadius: 5 },
									optionWrapper: { backgroundColor: colors.black60, height: 35, justifyContent: 'center' },
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
				<Text paddingBottom={10} color={profile.display_name ? colors.white : colors.white40}>
					{profile.display_name || 'No display name'}
				</Text>
				{/* <Spacer size={20} />
				<TextButton
					text="camera"
					textColor={'#6b93ff'}
					style={{ padding: 4 }}
					onPress={() => {
						nav.navigate(
							'camera' as never,
							{
								moment: true,
							} as never,
						);
					}}
				/> */}
				{/* <TextButton text="history" onPress={() => nav.navigate('realtime_history' as never)} /> */}
				<Spacer size={50} />
				<TextButton
					text="Logout"
					textColor={'#ff6b6b'}
					style={{ padding: 4 }}
					onPress={() => {
						removeNotificationPermissions();
						nav.reset({ index: 1, routes: [{ name: 'auth' as never }] });
						core.account.account.reset();
						core.lists.devices.reset();
						core.profile.profile.reset();
						core.app.device_push_token.reset();
						core.app.notification_permission.reset();
					}}
				/>
				<Spacer size={90} />
			</Block>
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
	background-color: ${({ theme }) => theme.colors.white20};
	height: ${BANNER_HEIGHT}px;
`;

const BannerArea = styled.View`
	height: ${BANNER_HEIGHT}px;
	position: absolute;
	width: 100%;
	z-index: 2;
`;
