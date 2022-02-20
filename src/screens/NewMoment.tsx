import core, { AppAlert, ProfileType, request, ReturnRequestType } from '@core';
import { Block, IconButton, Text } from '@parts';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { PhotoFile } from 'react-native-vision-camera';
import { useTheme } from 'styled-components';

type NewMomentProps = {
	NewMoment: {
		path: string;
		uploadMethod: 'avatar' | 'banner' | 'collection';
	};
};

export const NewMoment = () => {
	const nav = useNavigation();
	const { colors, theme } = useTheme();
	const { params } = useRoute<RouteProp<NewMomentProps, 'NewMoment'>>();
	const { uploadMethod, path } = params;

	const [Loading, SetLoading] = useState(false);

	const nextAction = async () => {
		SetLoading(true);
		const fd = new FormData();

		fd.append('file', {
			uri: path.replace('file://', ''),
			type: path.split('.')[1],
			name: path.split('/').pop(),
		});

		let res: ReturnRequestType<boolean> | false = false;

		if (uploadMethod === 'banner') {
			res = await request<boolean>('post', '/profile/banner', { data: fd, headers: { 'Content-Type': 'multipart/form-data;' } });
		}

		if (uploadMethod === 'avatar') {
			res = await request<boolean>('post', '/profile/avatar', { data: fd, headers: { 'Content-Type': 'multipart/form-data;' } });
		}

		if (!res) return;

		if (res?.data) {
			if (['avatar', 'banner'].includes(uploadMethod)) {
				// nav.reset({ index: 0, routes: [{ name: 'account' } as never] });
				nav.navigate('account' as never);
				const pRes = await request<{ profile: ProfileType }>('get', '/account');
				if (pRes.data) {
					core.profile.profile.set(pRes.data.profile);
				}
			}
		} else {
			AppAlert(false, 'Failed', res.message);
		}
	};

	return (
		<Block safe hCenter vCenter color="black">
			{params.path && (
				<Block flex={1} color="transparent" paddingHorizontal={5}>
					<FastImage source={{ uri: params.path }} resizeMode="cover" style={{ width: '100%', height: '100%', borderRadius: 23 }} />
				</Block>
			)}
			<Block flex={0} style={{ height: 75, justifyContent: 'space-between' }} color="transparent" row hCenter paddingHorizontal={20}>
				<IconButton
					name="arrow-big"
					color="white"
					size={30}
					iconSize={18}
					backgroundColor={colors.black60}
					style={{ transform: [{ rotate: '180deg' }] }}
					onPress={() => nav.goBack()}
					disabled={Loading}
				/>
				<IconButton
					name="send"
					color={colors.white}
					size={30}
					iconSize={18}
					backgroundColor={colors.black60}
					iconStyle={{ paddingRight: 2, paddingTop: 2 }}
					onPress={() => nextAction()}
					disabled={Loading}
				/>
			</Block>
		</Block>
	);
};
