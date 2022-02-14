import React, { useCallback, useState } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Avatar, Block, Fill, IconButton, Spacer, Text, TextButton } from '@parts';
import { useNavigation } from '@react-navigation/native';
import core, { AppAlert, request } from '@core';
import { usePulse } from '@pulsejs/react';
import { MenuView } from '@react-native-menu/menu';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';

import { Platform } from 'react-native';
import FastImage from 'react-native-fast-image';

const BANNER_HEIGHT = 250;

export const Account = () => {
	const nav = useNavigation();
	const { colors } = useTheme();
	const [UploadProgress, SetUploadProgress] = useState('');
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
			type: ImageFile.type,
			uri: Platform.OS === 'android' ? ImageFile.uri : ImageFile.uri.replace('file://', ''),
		});

		const res = await request('post', '/profile/avatar', {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			data: fd,
			onUploadProgress: v => {
				SetUploadProgress(JSON.stringify(v));
			},
		});

		if (!res.data) {
			AppAlert(false, 'Failed', res.message);
		} else {
			AppAlert(true, 'Success', 'avatar has been uploaded');
		}
	};

	const selectBanner = async () => {
		const result = await launchImageLibrary({ mediaType: 'photo' });
		if (result.didCancel) return;
		if (!result?.assets?.length) return;

		const ImageFile = result?.assets[0];
		if (!ImageFile.uri) return;

		const fd = new FormData();
		fd.append('file', {
			name: ImageFile.uri.split('/').pop(),
			type: ImageFile.type,
			uri: Platform.OS === 'android' ? ImageFile.uri : ImageFile.uri.replace('file://', ''),
		});

		const res = await request('post', '/profile/banner', {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			data: fd,
			onUploadProgress: v => {
				SetUploadProgress(JSON.stringify(v || ''));
			},
		});

		if (!res.data) {
			AppAlert(false, 'Failed', res.message);
		} else {
			AppAlert(true, 'Success', 'banner has been uploaded');
		}
	};

	return (
		<Block color="black" style={{ zIndex: 1 }}>
			<BannerArea>
				{profile?.banner ? <Banner source={{ uri: `https://cdn.yourstatus.app/profile/${profile.account_id}/${profile.banner}` }} /> : <BannerPlaceholder />}
			</BannerArea>
			<LinearGradient
				colors={['transparent', '#0000008a', 'black']}
				style={{ position: 'absolute', top: 0, zIndex: 4, width: '100%', height: BANNER_HEIGHT }}></LinearGradient>

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
				<Text>{UploadProgress}</Text>
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
						<MenuView
							title="Upload Avatar/Banner"
							onPressAction={({ nativeEvent }) => {
								if (nativeEvent.event == '1') {
									selectAvatar();
								}

								if (nativeEvent.event === '2') {
									selectBanner();
								}
								return;
							}}
							actions={[
								{
									id: '1',
									title: `Choose from photo's`,
									image: 'photo',
								},
								{
									id: '2',
									title: 'Upload banner',
									image: 'photo',
								},
							]}>
							<IconButton
								name="image"
								color={colors.white}
								size={25}
								iconSize={16}
								backgroundColor={colors.white40}
								onPress={() => nav.navigate('edit_profile' as never)}
							/>
						</MenuView>
					</Block>
				</Block>
				<Text bold size={18} paddingTop={30} paddingBottom={10}>
					@{profile.username}
				</Text>
				<Text paddingBottom={10} color={profile.display_name ? colors.white : colors.white40}>
					{profile.display_name || 'No display name'}
				</Text>
				<Text>
					<Text bold>Email: </Text>
					{account?.email}
				</Text>
				<Text paddingBottom={20}>{JSON.stringify(profile)}</Text>

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
