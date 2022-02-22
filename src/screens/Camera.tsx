import { Block, IconButton } from '@parts';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Camera as CameraComp, PhotoFile, useCameraDevices, CameraPosition } from 'react-native-vision-camera';
import styled, { useTheme } from 'styled-components/native';
import * as MediaLibrary from 'expo-media-library';

import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import LinearGradient from 'react-native-linear-gradient';
import { AppAlert } from '@core';

const CAMERA_BORDER_RADIUS = 23;
type CameraProps = {
	Camera: {
		uploadMethod: 'avatar' | 'banner' | 'collection' | 'storie';
	};
};

export const Camera = () => {
	const { colors } = useTheme();
	const nav = useNavigation();
	const { params } = useRoute<RouteProp<CameraProps, 'Camera'>>();
	const camera = useRef<CameraComp>(null);
	const devices = useCameraDevices('wide-angle-camera');
	const device = devices.back;

	const CameraStyle = StyleSheet.flatten([{ height: '100%', width: '100%', flex: 1, borderRadius: CAMERA_BORDER_RADIUS }]);

	const [PhotoData, SetPhotoData] = useState<PhotoFile | false>(false);
	const [Flash, SetFlash] = useState<boolean>(false);
	const [AlbumAssets, SetAlbumAssets] = useState<string[]>([]);
	const [CamerDevice, SetCameraDevice] = useState<CameraPosition>('back');
	const [PhotosLibraryOpen, SetPhotosLibraryOpen] = useState(false);
	const offset = useSharedValue(0);
	const height = useSharedValue(0);

	const PhotosLibraryPreviewstyle = useAnimatedStyle(() => {
		return {
			// backgroundColor: colors.black80,
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
	}, [PhotosLibraryOpen]);

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
		nav.navigate('new_moment' as never, { path: image_url_path, uploadMethod: params.uploadMethod } as never);
	};

	const getCameraRollAssets = async () => {
		const perm = await MediaLibrary.getPermissionsAsync();

		if (!perm.granted) {
			AppAlert(false, 'failed to get access to photos');
			await MediaLibrary.requestPermissionsAsync();
			// return;
		}

		let asset = await MediaLibrary.getAssetsAsync({ mediaType: 'photo' });
		let list: string[] = [];

		// asset.assets = asset.assets.slice(0, 5);

		for await (let item of asset.assets) {
			const a = await MediaLibrary.getAssetInfoAsync(item.id);
			if (a?.localUri) {
				list.push(a.localUri);
			}
		}

		SetAlbumAssets(list);
	};

	useEffect(() => {
		getCameraRollAssets();
	}, []);

	const imageWidth = Dimensions.get('screen').width / 3 - 3.5;
	const imageHeight = (1920 / 1080) * imageWidth;

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
					style={{ position: 'absolute', top: 0, zIndex: 52, width: '100%', height: 150 }}
				/>
				<FlatList
					numColumns={3}
					data={AlbumAssets}
					horizontal={false}
					style={{ borderRadius: CAMERA_BORDER_RADIUS }}
					renderItem={({ item, index }) => (
						<TouchableOpacity activeOpacity={0.6} onPress={() => navigateToPreview(item)}>
							<FastImage
								key={index}
								source={{ uri: item || '' }}
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
						backgroundColor={colors.white40}
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
					backgroundColor={colors.white40}
					color="white"
					style={{ left: 15, top: 10, position: 'absolute', zIndex: 20, transform: [{ rotate: '45deg' }] }}
					onPress={() => nav.goBack()}
				/>
				<IconButton
					name="flashlight"
					size={28}
					iconSize={18}
					backgroundColor={colors.white40}
					color="white"
					style={{ right: 15, top: 10, position: 'absolute', zIndex: 20 }}
					onPress={() => SetFlash(!Flash)}
				/>

				{/* <LinearGradient
							pointerEvents="none"
							// colors={['rgba(56,89,253,0.1) 100%)', 'transparent']}
							colors={['black', 'transparent']}
							style={{ position: 'absolute', top: 0, zIndex: 52, width: '100%', height: 150 }}
						/> */}

				<Block style={{ position: 'relative' }}>
					{device != null && (
						<CameraComp
							ref={camera}
							style={CameraStyle}
							device={devices[CamerDevice]}
							isActive={true}
							photo={true}
							focusable={true}
							torch={Flash ? 'on' : 'off'}
							enableZoomGesture
						/>
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

				<Block flex={0} style={{ height: 75, justifyContent: 'space-between' }} hCenter row paddingHorizontal={20}>
					<IconButton name="camera-flip" size={30} color="white" onPress={() => SetCameraDevice(CamerDevice === 'back' ? 'front' : 'back')} />

					<CameraBtn flex={0} press onPress={() => takePhoto()} />

					<TouchableOpacity
						onPress={() => toggleOpenPhotos()}
						activeOpacity={0.6}
						style={{ borderRadius: 7, backgroundColor: colors.white20, height: 40, width: 40 }}>
						{!!AlbumAssets.length && <FastImage source={{ uri: AlbumAssets[0] }} style={{ height: 40, width: 40, borderRadius: 7 }} />}
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
