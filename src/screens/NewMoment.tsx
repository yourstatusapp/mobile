import core, { AppAlert, ProfileType, request, ReturnRequestType } from '@core';
import { Block, IconButton, Text } from '@parts';
import { usePulse } from '@pulsejs/react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

type NewMomentProps = {
	NewMoment: {
		path: string;
		uploadMethod: 'avatar' | 'banner' | 'collection' | 'storie';
	};
};

export const NewMoment = () => {
	const [HighQuality, SetHighQuality] = useState(false);

	const percentage = useSharedValue(0);

	const animatedStyles = useAnimatedStyle(() => {
		return {
			width: percentage.value + '%',
		};
	});

	const nav = useNavigation();
	const theme = useTheme();
	const { params } = useRoute<RouteProp<NewMomentProps, 'NewMoment'>>();
	const { uploadMethod, path } = params;
	const frame = useSafeAreaFrame();
	const outframe = useSafeAreaInsets();

	const [Loading, SetLoading] = useState(false);

	const nextAction = React.useCallback(async () => {
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

		if (uploadMethod === 'storie') {
			// check if the user wanted high qualit
			res = await request<boolean>('post', '/profile/stories/new' + (HighQuality === true ? '?high_quality=true' : ''), {
				data: fd,
				headers: { 'Content-Type': 'multipart/form-data;' },
				onUploadProgress: v => {
					percentage.value = withTiming((100 * v.loaded) / v.total, { duration: 200, easing: Easing.ease });
				},
			});
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

			if (uploadMethod === 'storie') {
				nav.navigate('friends' as never);
			}
		} else {
			AppAlert(false, 'Failed', res.message);
		}
	}, [HighQuality, nav, path, percentage, uploadMethod]);

	const IMAGE_PADDING = outframe.top + outframe.top + 60;

	return (
		<Block safe hCenter vCenter color="black">
			{params.path && (
				<Block flex={1} color="transparent" hCenter>
					<FastImage
						source={{ uri: params.path }}
						resizeMode="cover"
						style={{
							// backgroundColor: 'red',
							// width: (frame.height - IMAGE_PADDING) / (frame.height / frame.width),
							// height: frame.height - IMAGE_PADDING,
							width: frame.width - 20,
							height: '100%',
							borderRadius: 23,
						}}
					/>
				</Block>
			)}
			<View style={{ marginTop: 10, height: 5, borderRadius: 50, backgroundColor: '#000000', width: Dimensions.get('screen').width - 45 }}>
				<Animated.View style={[animatedStyles, { height: 5, borderRadius: 50, backgroundColor: '#3859FD' }]} />
			</View>
			<Block flex={0} style={{ height: 60, justifyContent: 'space-between' }} color="transparent" row hCenter paddingHorizontal={10}>
				<IconButton
					name="arrow-big"
					color="white"
					size={30}
					iconSize={18}
					backgroundColor={theme.darker}
					style={{ transform: [{ rotate: '180deg' }] }}
					onPress={() => nav.goBack()}
					disabled={Loading}
				/>
				<Block row flex={0} style={{ width: null }} hCenter>
					<RoundBtn activeOpacity={1} onPress={() => SetHighQuality(!HighQuality)} style={{ opacity: HighQuality ? 0.5 : 1 }}>
						<Text size={12} weight="600" color="white">
							High Quality
						</Text>
					</RoundBtn>
					<IconButton
						name="send"
						color={theme.text}
						size={30}
						iconSize={18}
						backgroundColor={theme.darker}
						iconStyle={{ paddingRight: 2, paddingTop: 2 }}
						onPress={() => nextAction()}
						disabled={Loading}
					/>
				</Block>
			</Block>
		</Block>
	);
};

const RoundBtn = styled(TouchableOpacity)`
	justify-content: center;
	border-radius: 30px;
	border: 1px solid white;
	height: 28px;
	padding: 0px 9px;
	background-color: #252525;
	margin-right: 10px;
`;
