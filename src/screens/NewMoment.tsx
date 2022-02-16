import { AppAlert, request } from '@core';
import { Block, IconButton, Text } from '@parts';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { PhotoFile } from 'react-native-vision-camera';
import { useTheme } from 'styled-components';

type NewMomentProps = {
	NewMoment: PhotoFile;
};

export const NewMoment = () => {
	const { params } = useRoute<RouteProp<NewMomentProps, 'NewMoment'>>();
	const nav = useNavigation();
	const { colors, theme } = useTheme();

	const [Loading, SetLoading] = useState(false);

	const postMoment = async () => {
		SetLoading(true);
		const fd = new FormData();

		fd.append('file', {
			uri: params.path.replace('file://', ''),
			type: params.path.split('.')[1],
			name: params.path.split('/').pop(),
		});

		const res = await request('post', '/profile/stories/new', { data: fd, headers: { 'Content-Type': 'multipart/form-data;' } });
		SetLoading(false);
		if (res.data) {
			nav.reset({ index: 0, routes: [{ name: 'tabs' as never }] });
			AppAlert(true, 'Successfull', res.message);
		} else {
			nav.goBack();
			AppAlert(false, 'Failed', res.message);
		}
	};

	return (
		<Block safe hCenter vCenter color="black">
			{params.path && (
				<Block flex={1} color="transparent" paddingHorizontal={5}>
					<FastImage source={{ uri: params.path }} resizeMode="cover" style={{ width: '100%', height: '100%', borderRadius: 15 }} />
				</Block>
			)}
			<Block flex={0} style={{ height: 55, justifyContent: 'space-between' }} color="transparent" row hCenter paddingHorizontal={20}>
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
					onPress={() => postMoment()}
					disabled={Loading}
				/>
			</Block>
		</Block>
	);
};
