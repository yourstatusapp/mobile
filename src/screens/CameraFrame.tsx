import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Block, IconButton, Text } from '@parts';
import { useCameraDevices, Camera } from 'react-native-vision-camera';
import { BlurView } from 'expo-blur';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import { useNavigation, useTheme } from '@hooks';
import { RouteProp, useRoute } from '@react-navigation/native';
import { GlobalParamList, ProfileType, RootstackParamList } from '../core/types';
import core, { request, ReturnRequestType } from '@core';

type CameraRouteProp = RouteProp<RootstackParamList, 'Camera'>;

export const CameraFrame = () => {
	const nav = useNavigation();
	const params = useRoute<CameraRouteProp>();

	const { theme } = useTheme();
	const { bottom, top } = useSafeAreaInsets();
	const camera = useRef<Camera>(null);
	const devices = useCameraDevices();
	const device = devices.back;
	const [lastTakenPicture, setLastTakenPicture] = useState<string[]>([]);
	const [showImageFull, setShowImageFull] = useState(false);
	const [uploadLoading, setUploadLoading] = useState(false);

	const requestPerms = async () => {
		const cameraPermission = await Camera.getCameraPermissionStatus();
		console.log(cameraPermission);
	};

	const clearImage = () => {
		setLastTakenPicture([]);
		setShowImageFull(false);
	};

	// This handles any type of camera usage
	const continueWithImage = useCallback(async () => {
		setUploadLoading(true);
		const t = params.params.type;
		const path = lastTakenPicture[0];

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

		// if (uploadMethod === 'storie') {
		// 	// check if the user wanted high qualit
		// 	res = await request<boolean>(
		// 		'post',
		// 		'/profile/stories/new' + (HighQuality === true ? '?high_quality=true' : ''),
		// 		{
		// 			data: fd,
		// 			headers: { 'Content-Type': 'multipart/form-data;' },
		// 			onUploadProgress: v => {
		// 				percentage.value = withTiming((100 * v.loaded) / v.total, {
		// 					duration: 200,
		// 					easing: Easing.ease,
		// 				});
		// 			},
		// 		},
		// 	);
		// }
	}, [lastTakenPicture]);

	const takePicture = useCallback(async () => {
		const res = await camera.current?.takePhoto({
			flash: 'off',
			qualityPrioritization: 'balanced',
		});

		if (res?.path) {
			setLastTakenPicture(state => {
				let a = [];
				a.push(res?.path);
				return state.concat(a);
			});
		}
	}, [lastTakenPicture]);

	useEffect(() => {
		requestPerms();
	}, []);

	useEffect(() => {
		// console.log('p', params.params);
	}, []);

	const BOTTOM_BAR_HEIGHT = 90;
	return (
		<Block>
			{showImageFull ? (
				<Block>
					<Block color={theme.background}>
						<FastImage
							source={{ uri: lastTakenPicture[0] }}
							style={{ height: '100%', width: '100%', borderBottomLeftRadius: 18, borderBottomRightRadius: 18 }}
						/>
					</Block>
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
							onPress={clearImage}
							disabled={uploadLoading}
						/>
						<Text size={18} bold>
							{uploadLoading ? 'Uploading...' : 'Continue with this image'}
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
			) : (
				<Block color={theme.background}>
					{device != null && (
						<Camera photo={true} ref={camera} style={{ flex: 1 }} device={device} isActive={true} enableZoomGesture />
					)}
					<IconButton
						color={'white'}
						backgroundColor={theme.darker}
						iconSize={20}
						size={28}
						name="plus"
						style={{ transform: [{ rotate: '45deg' }], position: 'absolute', top: top, left: 15 }}
						onPress={() => nav.goBack()}
					/>

					<Block style={{ height: BOTTOM_BAR_HEIGHT + bottom, width: '100%', position: 'absolute', bottom: 0 }}>
						<BlurView
							tint="dark"
							style={{ height: BOTTOM_BAR_HEIGHT + bottom, width: '100%', position: 'absolute', bottom: 0 }}
							intensity={60}
						/>
						<Block hCenter vCenter marginBottom={bottom} row>
							<PictureButton onPress={takePicture} style={{}} />
							<Block style={{ position: 'absolute', right: 10 }}>
								{!!lastTakenPicture?.length && (
									<TouchableOpacity
										style={{ height: 60, width: 60 }}
										activeOpacity={0.6}
										onPress={() => setShowImageFull(true)}>
										<FastImage
											source={{ uri: lastTakenPicture[0] }}
											style={{ height: 60, width: 60, borderRadius: 12 }}
										/>
									</TouchableOpacity>
								)}
							</Block>
						</Block>
					</Block>
				</Block>
			)}
		</Block>
	);
};

interface IPictureButtonProps {
	style?: ViewStyle;
	onPress?: () => void;
	disabled?: boolean;
}
const PictureButton = ({ onPress, style, disabled }: IPictureButtonProps) => {
	const SIZE = 50;
	return (
		<TouchableOpacity
			activeOpacity={0.6}
			style={{ ...style, height: SIZE, width: SIZE, borderRadius: SIZE, opacity: disabled ? 0.4 : 1 }}
			onPress={onPress}
			disabled={disabled}>
			<Block height={SIZE} width={SIZE} color="white" flex={0} style={{ borderRadius: SIZE }}></Block>
		</TouchableOpacity>
	);
};
