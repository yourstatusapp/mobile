import { Block, IconButton, Text } from '@parts';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
	Dimensions,
	FlatList,
	GestureResponderEvent,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
	Camera as CameraComp,
	PhotoFile,
	useCameraDevices,
	CameraPosition,
} from 'react-native-vision-camera';
import styled from 'styled-components/native';
import * as MediaLibrary from 'expo-media-library';

import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

import LinearGradient from 'react-native-linear-gradient';
import core, { AppAlert, TimeFormatter } from '@core';
import { usePulse } from '@pulsejs/react';
import { useTheme } from '@hooks';

const CAMERA_BORDER_RADIUS = 23;
type CameraProps = {
	Camera: {
		uploadMethod: 'avatar' | 'banner' | 'collection' | 'storie';
	};
};
interface AlbumAssetType {
	path: string;
}

export const Camera = () => {
	const { theme } = useTheme();
	const nav = useNavigation();
	const { params } = useRoute<RouteProp<CameraProps, 'Camera'>>();
	const camera = useRef<CameraComp>(null);
	const devices = useCameraDevices('wide-angle-camera');
	const device = devices.back;

	const CameraStyle = StyleSheet.flatten([
		{ height: '100%', width: '100%', flex: 1, borderRadius: CAMERA_BORDER_RADIUS },
	]);

	const [PhotoData, SetPhotoData] = useState<PhotoFile | false>(false);
	const [CameraZoom, SetCameraZoom] = useState('');
	const [Flash, SetFlash] = useState<boolean>(false);
	const [AlbumAssets, SetAlbumAssets] = useState<AlbumAssetType[]>([]);
	const [CamerDevice, SetCameraDevice] = useState<CameraPosition>('back');
	const [PhotosLibraryOpen, SetPhotosLibraryOpen] = useState(false);

	const opacityDot = useSharedValue(0);
	const opacityDotY = useSharedValue(0);
	const opacityDotX = useSharedValue(0);
	const PressFocus = useAnimatedStyle(() => {
		return {
			opacity: opacityDot.value,
			left: opacityDotX.value,
			top: opacityDotY.value - 50,
		};
	});

	const offset = useSharedValue(0);
	const height = useSharedValue(0);

	const PhotosLibraryPreviewstyle = useAnimatedStyle(() => {
		return {
			// backgroundColor: theme.black80,
			opacity: offset.value,

			// height: height.value + '%',
		};
	});

	const D = 400;
	const toggleOpenPhotos = React.useCallback(() => {
		if (PhotosLibraryOpen) {
			offset.value = withTiming(0, { easing: Easing.ease, duration: D });
			height.value = withTiming(0, { easing: Easing.ease, duration: D });
			SetPhotosLibraryOpen(false);
		} else {
			offset.value = withTiming(1, { easing: Easing.ease, duration: D });
			height.value = withTiming(100, { easing: Easing.ease, duration: D });
			SetPhotosLibraryOpen(true);
		}
	}, [PhotosLibraryOpen, height, offset]);

	const focusCamera = async (e: GestureResponderEvent) => {
		if (!camera.current) return;
		opacityDotY.value = withTiming(e.nativeEvent.pageY);
		opacityDotX.value = withTiming(e.nativeEvent.pageX);
		opacityDot.value = withTiming(0.4, { duration: 400 });
		setTimeout(() => {
			opacityDot.value = withTiming(0, { duration: 250 });
		}, 400);

		await camera.current.focus({ x: e.nativeEvent.pageX, y: e.nativeEvent.pageY });
	};

	const takePhoto = async () => {
		if (!camera.current) return;

		const photo = await camera.current.takePhoto({
			flash: 'off',
			qualityPrioritization: 'quality',
			enableAutoStabilization: false,
			enableAutoRedEyeReduction: false,
		});

		// SetPhotoData(photo);
		SetFlash(false);
		navigateToPreview(photo.path);
	};

	// const onPreviewPress = React.useCallback(
	// 	(IncomingPhotoData: string) => {
	// 		if (IncomingPhotoData) {
	// 			nav.navigate('new_moment' as never, { path: IncomingPhotoData } as never);
	// 		} else if (PhotoData) {
	// 			nav.navigate('new_moment' as never, { path: PhotoData.path } as never);
	// 		}
	// 	},
	// 	[PhotoData, params],
	// );

	const navigateToPreview = (image_url_path: string) => {
		nav.navigate(
			'new_moment' as never,
			{ path: image_url_path, uploadMethod: params.uploadMethod } as never,
		);
	};

	const getCameraRollAssets = async () => {
		const perm = await MediaLibrary.getPermissionsAsync();

		if (!perm.granted) {
			AppAlert(false, 'failed to get access to photos');
			await MediaLibrary.requestPermissionsAsync();
			// return;
		}

		let asset = await MediaLibrary.getAssetsAsync({ mediaType: 'photo' });
		let list: AlbumAssetType[] = [];

		// asset.assets = asset.assets.slice(0, 5);

		for await (let item of asset.assets) {
			const a = await MediaLibrary.getAssetInfoAsync(item.id);
			if (a?.localUri) {
				list.push({ path: a?.localUri || '' });
			}
		}

		SetAlbumAssets(list);
	};

	useEffect(() => {
		getCameraRollAssets();
	}, []);

	const imageWidth = Dimensions.get('screen').width / 3 - 3.5;
	const imageHeight = (1920 / 1080) * imageWidth;

	const t = usePulse(core.app.ONBOARDING_TIPS);

	// useEffect(() => {
	// 	if (t.REALTIME_STORIES) {
	// 		nav.navigate('explanation' as never, { type: 'REALTIME_STORIES' } as never);
	// 	}
	// }, []);

	return (
		<Block>
			<Animated.View
				pointerEvents={!PhotosLibraryOpen ? 'none' : 'auto'}
				style={[
					PhotosLibraryPreviewstyle,
					{
						top: 0,
						width: Dimensions.get('screen').width,
						position: 'absolute',
						height: '100%',
						zIndex: 50,
						alignItems: 'center',
						backgroundColor: 'black',
						paddingBottom: 70,
					},
				]}>
				<LinearGradient
					pointerEvents="none"
					colors={['black', 'transparent']}
					style={{ position: 'absolute', top: 0, zIndex: 52, width: '100%', height: 70 }}
				/>
				<FlatList
					numColumns={3}
					data={AlbumAssets}
					horizontal={false}
					style={{ borderRadius: CAMERA_BORDER_RADIUS }}
					contentContainerStyle={{ paddingTop: 70 }}
					showsVerticalScrollIndicator={false}
					renderItem={({ item, index }) => (
						<TouchableOpacity activeOpacity={0.6} onPress={() => navigateToPreview(item.path)}>
							<FastImage
								key={index}
								source={{ uri: item?.path || '' }}
								style={{
									height: imageHeight,
									width: imageWidth,
								}}
							/>
						</TouchableOpacity>
					)}
				/>
				<Block paddingTop={10} paddingLeft={10}>
					<IconButton
						name="plus"
						size={28}
						iconSize={18}
						backgroundColor={theme.textFade}
						color="white"
						style={{ transform: [{ rotate: '45deg' }] }}
						onPress={() => toggleOpenPhotos()}
					/>
				</Block>
			</Animated.View>
			<Block color="black" safe paddingHorizontal={5}>
				<IconButton
					name="plus"
					size={28}
					iconSize={18}
					backgroundColor="#252525"
					color="white"
					style={{
						left: 15,
						top: 10,
						position: 'absolute',
						zIndex: 20,
						transform: [{ rotate: '45deg' }],
					}}
					onPress={() => nav.goBack()}
				/>
				<IconButton
					name="flashlight"
					size={28}
					iconSize={18}
					backgroundColor="#252525"
					color="white"
					style={{ right: 15, top: 10, position: 'absolute', zIndex: 20 }}
					onPress={() => SetFlash(!Flash)}
					disabled={CamerDevice === 'front'}
				/>

				{/* <IconButton
					name="sparkle"
					size={28}
					iconSize={18}
					backgroundColor="#252525"
					color="white"
					style={{ right: 15, top: 60, position: 'absolute', zIndex: 20 }}
					onPress={() => SetFlash(!Flash)}
					disabled={CamerDevice === 'front'}
				/> */}

				{/* <LinearGradient
							pointerEvents="none"
							// colors={['rgba(56,89,253,0.1) 100%)', 'transparent']}
							colors={['black', 'transparent']}
							style={{ position: 'absolute', top: 0, zIndex: 52, width: '100%', height: 150 }}
						/> */}

				<Block style={{ position: 'relative' }}>
					{device != null && (
						<TouchableOpacity
							onPress={e => focusCamera(e)}
							style={{ flex: 1, position: 'relative' }}
							activeOpacity={1}>
							<CameraComp
								ref={camera}
								style={CameraStyle}
								device={devices[CamerDevice]}
								isActive={true}
								photo={true}
								focusable={true}
								preset="high"
								torch={Flash ? 'on' : 'off'}
								enableZoomGesture
							/>

							<Animated.View
								style={[
									{
										borderRadius: 50,
										height: 40,
										width: 40,
										backgroundColor: 'white',
										zIndex: 40,
										position: 'absolute',
									},
									PressFocus,
								]}
							/>
						</TouchableOpacity>
					)}
					{/* <AlbumPreviewPictures style={PhotosLibraryPreviewstyle}>
						<LinearGradient
							pointerEvents="none"
							// colors={['rgba(56,89,253,0.1) 100%)', 'transparent']}
							colors={['black', 'transparent']}
							style={{ position: 'absolute', top: 0, zIndex: 52, width: '100%', height: 150 }}
						/>
						<FlatList
							numColumns={3}
							data={AlbumAssets}
							renderItem={({ item, index }) => (
								<TouchableOpacity activeOpacity={0.6} onPress={() => navigateToPreview(item)}>
									<FastImage
										key={index}
										source={{ uri: item || '', cache: 'cacheOnly' }}
										style={{
											height: imageHeight,
											width: imageWidth,
											margin: 2,
										}}
									/>
								</TouchableOpacity>
							)}
						/>
					</AlbumPreviewPictures> */}
				</Block>

				<Block
					flex={0}
					style={{ height: 75, justifyContent: 'space-between' }}
					hCenter
					row
					paddingHorizontal={20}>
					<IconButton
						name={CamerDevice === 'back' ? 'camera-flip2' : 'camera-flip'}
						size={30}
						color="white"
						onPress={() => SetCameraDevice(CamerDevice === 'back' ? 'front' : 'back')}
					/>

					<CameraBtn flex={0} press onPress={() => takePhoto()} />

					<TouchableOpacity
						onPress={() => toggleOpenPhotos()}
						activeOpacity={0.6}
						style={{ borderRadius: 7, backgroundColor: theme.white20, height: 50, width: 50 }}>
						{!!AlbumAssets.length && (
							<FastImage
								source={{ uri: AlbumAssets[0].path }}
								style={{ height: 50, width: 50, borderRadius: 7 }}
							/>
						)}
					</TouchableOpacity>
				</Block>
			</Block>
		</Block>
	);
};

const CameraBtn = styled(Block)`
	height: 45px;
	width: 45px;
	background-color: #ffffff;
	border-radius: 50px;
	margin-horizontal: 50px;
`;
