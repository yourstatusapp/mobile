import React, { useState } from 'react';
import { Avatar, Block, Fill, IconButton, Text, TextButton } from '@parts';
import core from '@core';

import { Dimensions, StyleSheet, ViewStyle } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import { useNavigation, useTheme } from '@hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSimple } from 'simple-core-state';
import { UpdateAvatarSheet } from './components/UpdateAvatarSheet';
import { UpdateBannerSheet } from './components/UpdateBannerSheet';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

export const Account = () => {
	const nav = useNavigation();
	const [showUploadAvatarSheet, setShowUploadAvatarSheet] = useState(false);
	const [showUploadBannerSheet, setShowUploadbannerSheet] = useState(false);
	const { theme } = useTheme();
	const { top } = useSafeAreaInsets();
	const profile = useSimple(core.profile);
	const [MenuOpen, SetMenuOpen] = useState(false);
	const { width } = Dimensions.get('screen');
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
						onPress={() => nav.navigate('Settings')}
					/>
				</Block>
				<Block row flex={0}>
					<TouchableOpacity
						onPress={() => setShowUploadAvatarSheet(true)}
						activeOpacity={0.7}
						disabled={showUploadAvatarSheet}>
						<Avatar src={[profile?.account_id, profile?.avatar]} size={120} />
					</TouchableOpacity>

					<Block flex={0} paddingLeft={20}>
						<Text bold size={18} paddingBottom={10}>
							@{profile?.username}
						</Text>
						<TextButton onPress={() => nav.navigate('FriendsList')} text={profile?.friends_amount + ' friends'} />
						<IconButton
							name="pencil"
							color={theme.text}
							size={25}
							iconSize={12}
							style={{ marginTop: 10 }}
							backgroundColor={theme.darker}
							onPress={() => nav.navigate('EditProfile')}
						/>
					</Block>
				</Block>
				<Block flex={0} marginTop={20} width="100%" style={{ borderRadius: 12 }} hCenter>
					<Text bold>Click to edit</Text>

					<TouchableOpacity
						style={{ width: '100%', flex: 0, marginTop: 8 }}
						activeOpacity={0.7}
						onPress={() => setShowUploadbannerSheet(true)}
						disabled={showUploadBannerSheet}>
						<FastImage
							resizeMode="cover"
							source={{ uri: `https://cdn.yourstatus.app/profile/${profile?.account_id}/${profile?.banner}` }}
							style={{ height: 140, width: width - 40, borderRadius: 12 }}
						/>
					</TouchableOpacity>
				</Block>

				{/* <Text paddingBottom={10} color={profile.display_name ? theme.text : theme.textFade} marginBottom={50}>
					{profile.display_name || 'No display name'}
				</Text> */}

				{/* <TextButton text="history" onPress={() => nav.navigate('realtime_history' as never)} /> */}

				<Fill />
			</Block>
			{/* <HeadingBlurOverlay /> */}
			<UpdateAvatarSheet open={showUploadAvatarSheet} onClose={() => setShowUploadAvatarSheet(false)} />

			<UpdateBannerSheet open={showUploadBannerSheet} onClose={() => setShowUploadbannerSheet(false)} />
		</Block>
	);
};
