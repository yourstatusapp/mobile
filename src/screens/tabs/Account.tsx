import React, { useState } from 'react';
import {
	Avatar,
	Block,
	BlockScroll,
	Fill,
	HeadingBlurOverlay,
	IconButton,
	Text,
	TextButton,
} from '@parts';
import core from '@core';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

import { StyleSheet, ViewStyle } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import { useNavigation, useTheme } from '@hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';

export const Account = () => {
	const nav = useNavigation();
	const { theme } = useTheme();
	const { top } = useSafeAreaInsets();
	// const profile = usePulse(core.profile.profile);
	const profile = useRecoilValue(core.profile);
	const [MenuOpen, SetMenuOpen] = useState(false);
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
		<Block color={theme.background}>
			<Block scroll paddingHorizontal={20} marginTop={top + 20}>
				<Block row flex={0} marginBottom={20}>
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
						onPress={() => nav.navigate('settings')}
					/>
				</Block>
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
							onPress={() => nav.navigate('EditProfile')}
						/>
						<IconButton
							name="image"
							color={theme.text}
							size={25}
							iconSize={16}
							backgroundColor={theme.darker}
							onPress={() => SetMenuOpen(true)}
						/>
						<Menu
							opened={MenuOpen}
							onBackdropPress={() => SetMenuOpen(false)}
							style={{ borderRadius: 5 }}>
							<MenuTrigger text="" />
							<MenuOptions
								customStyles={{
									optionsContainer: { borderRadius: 5 },
									optionsWrapper: { borderRadius: 5 },
									optionWrapper: {
										backgroundColor: theme.darker,
										height: 35,
										justifyContent: 'center',
									},
									optionText: { color: 'white', fontWeight: '700' },
								}}>
								<MenuOption
									onSelect={() => {
										SetMenuOpen(false);
										nav.navigate('Camera', {
											uploadMethod: 'avatar',
										});
									}}
									text="Upload avatar"
								/>
								<MenuOption
									onSelect={() => {
										SetMenuOpen(false);
										nav.navigate('Camera', {
											uploadMethod: 'banner',
										});
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
				<TextButton
					onPress={() => nav.navigate('ManageFriends')}
					text={profile.friends_amount + ' friends'}
				/>

				{/* <Text paddingBottom={10} color={profile.display_name ? theme.text : theme.textFade} marginBottom={50}>
					{profile.display_name || 'No display name'}
				</Text> */}

				{/* <TextButton text="history" onPress={() => nav.navigate('realtime_history' as never)} /> */}

				<Fill />
			</Block>
			<HeadingBlurOverlay />
		</Block>
	);
};
