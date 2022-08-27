import core, { ProfileType, request, ReturnRequestType, RootstackParamList } from '@core';
import { useNavigation, useTheme } from '@hooks';
import { Block, IconButton, Text } from '@parts';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootstackParamList, 'PreviewUpload'>;

export const PreviewUpload: React.FC<Props> = ({ route }) => {
	const nav = useNavigation();
	const { theme } = useTheme();
	const { bottom } = useSafeAreaInsets();
	const [image, setImage] = useState('');
	const [uploadLoading, setUploadLoading] = useState(false);

	const continueWithImage = useCallback(async () => {
		setUploadLoading(true);
		const t = route.params.type;
		const path = image;

		if (!t) {
			//TODO: handle error
			return;
		}

		const fd = new FormData();

		fd.append('file', {
			uri: path.replace('file://', ''),
			type: path.split('.')[1],
			name: path.split('/').pop(),
		});

		let res: ReturnRequestType<boolean> | false = false;

		if (t === 'upload_banner') {
			res = await request<boolean>('post', '/profile/banner', {
				data: fd,
				headers: { 'Content-Type': 'multipart/form-data;' },
			});
		}

		if (t === 'upload_avatar') {
			res = await request<boolean>('post', '/profile/avatar', {
				data: fd,
				headers: { 'Content-Type': 'multipart/form-data;' },
			});
		}

		if (res != false && res.data) {
			// request account data to refresh
			const pRes = await request<{ profile: ProfileType }>('get', '/account');
			if (pRes.data) {
				core.profile.setValue(pRes.data.profile);
			}
			nav.reset({ index: 0, routes: [{ name: 'Tabs' }] });
			setUploadLoading(false);
		} else {
			// TODO: handle failed upload
			setUploadLoading(false);
		}
	}, [image]);

	useEffect(() => {
		setImage(route.params.image);
	}, [route]);

	const BOTTOM_BAR_HEIGHT = 30;
	return (
		<Block safe color={theme.background}>
			<Block>
				<FastImage source={{ uri: image }} style={{ width: '100%', height: '100%' }} />
			</Block>
			<Block flex={0} height={BOTTOM_BAR_HEIGHT + bottom} width="100%">
				<Block
					height={bottom + BOTTOM_BAR_HEIGHT}
					flex={0}
					color={theme.background}
					row
					style={{ justifyContent: 'space-between' }}
					paddingHorizontal={20}
					paddingTop={0}
					hCenter>
					<IconButton
						color={'white'}
						backgroundColor={theme.darker}
						iconSize={20}
						size={28}
						name="plus"
						style={{ transform: [{ rotate: '45deg' }] }}
						onPress={() => nav.goBack()}
						disabled={uploadLoading}
					/>
					<Text size={18} bold>
						You want to use this image?
					</Text>
					<IconButton
						color={'white'}
						backgroundColor={theme.darker}
						iconSize={20}
						size={28}
						name="checkmark"
						onPress={continueWithImage}
						disabled={uploadLoading}
					/>
				</Block>
			</Block>
		</Block>
	);
};
