import React from 'react';
import { useTheme } from 'styled-components/native';
import { Avatar, Block, Fill, IconButton, Spacer, Text, TextButton } from '@parts';
import { useNavigation } from '@react-navigation/native';
import core, { AppAlert, request } from '@core';
import { usePulse } from '@pulsejs/react';
import { MenuView } from '@react-native-menu/menu';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { Platform } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

export const Account = () => {
	const nav = useNavigation();
	const { colors } = useTheme();
	const account = usePulse(core.account.state.account);
	const profile = usePulse(core.profile.state.profile);
	const dToken = usePulse(core.app.state.device_push_token);

	const selectAvatar = async () => {
		const result = await launchImageLibrary({ mediaType: 'photo' });
		if (result.didCancel) return;
		if (!result?.assets?.length) return;

		const ImageFile = result?.assets[0];
		if (!ImageFile.uri) return;

		const fd = new FormData();
		fd.append('file', {
			name: ImageFile.uri.split('/').pop(),
			type: 'image/' + ImageFile.type,
			uri: Platform.OS === 'android' ? ImageFile.uri : ImageFile.uri.replace('file://', ''),
		});

		const res = await request('post', '/profile/avatar', {
			headers: {
				'content-type': 'multipart/form-data;',
			},
			data: fd,
		});

		if (!res.data) {
			AppAlert(false, 'Failed', res.message);
		} else {
			AppAlert(true, 'Success', 'avatar has been uploaded');
		}
	};

	return (
		<Block scroll paddingHorizontal={20}>
			<Spacer size={20} />
			<Spacer size={50} />
			<Block row flex={0}>
				<Text size={28} bold color={colors.white}>
					Account
				</Text>
				<Fill />
				<IconButton name="cog" size={25} color={colors.white} onPress={() => nav.navigate('settings' as never)} />
			</Block>
			<Spacer size={20} />
			<Block row flex={0}>
				<MenuView
					title="Upload new avatar"
					onPressAction={({ nativeEvent }) => {
						if (nativeEvent.event == '1') {
							selectAvatar();
						}
						if (nativeEvent.event == 2) {
						}
					}}
					actions={[
						{
							id: '1',
							title: `Choose from photo's`,
							image: 'photo',
						},
						{
							id: '2',
							title: 'Make a photo',
							image: 'camera',
						},
					]}>
					<Avatar src={[profile?.account_id, profile?.avatar]} size={120} />
				</MenuView>
				<Spacer size={20} h />
				<IconButton
					name="pencil"
					color={colors.white80}
					size={25}
					iconSize={15}
					backgroundColor={colors.white20}
					onPress={() => nav.navigate('edit_profile' as never)}
				/>
			</Block>
			<Spacer size={30} />
			<Text>
				<Text bold>Email: </Text>
				{account?.email}
			</Text>
			<Spacer size={20} />
			<Text>{JSON.stringify(dToken)}</Text>

			<TextButton onPress={() => PushNotificationIOS.requestPermissions()} style={{ paddingTop: 15 }}>
				PushNotificationIOS
			</TextButton>
			<TextButton onPress={() => PushNotificationIOS.checkPermissions(v => AppAlert(true, JSON.stringify(v)))} style={{ paddingTop: 15 }}>
				check perms
			</TextButton>
			<Spacer size={20} />
			<Fill />
			<TextButton
				text="Logout"
				textColor={'#ff6b6b'}
				style={{ padding: 4 }}
				onPress={() => {
					nav.reset({ index: 1, routes: [{ name: 'auth' as never }] });
					core.account.state.account.reset();
				}}
			/>
			<Spacer size={90} />
		</Block>
	);
};
