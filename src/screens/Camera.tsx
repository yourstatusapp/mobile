import { Block, IconButton } from '@parts';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Camera as CameraComp, PhotoFile, useCameraDevices, CameraPosition } from 'react-native-vision-camera';
import styled from 'styled-components/native';

type CameraProps = {
	Camera: {
		moment: boolean;
	};
};

export const Camera = () => {
	const nav = useNavigation();
	const { params } = useRoute<RouteProp<CameraProps, 'Camera'>>();

	const camera = useRef<CameraComp>(null);
	const devices = useCameraDevices('wide-angle-camera');
	const device = devices.back;

	const CameraStyle = StyleSheet.flatten([{ height: '100%', width: '100%', flex: 1, borderRadius: 20 }]);

	const [PhotoData, SetPhotoData] = useState<PhotoFile | false>(false);
	const [CamerDevice, SetCameraDevice] = useState<CameraPosition>('back');

	const onPreviewPress = React.useCallback(() => {
		if (PhotoData) {
			if (params.moment) {
				nav.navigate('new_moment' as never, PhotoData as never);
			}
		}
	}, [PhotoData, params]);

	const takePhoto = async () => {
		if (!camera.current) return;

		const photo = await camera.current.takePhoto({
			flash: 'off',
			qualityPrioritization: 'balanced',
			enableAutoStabilization: true,
		});

		SetPhotoData(photo);
	};

	return (
		<Block safe hCenter vCenter paddingHorizontal={5}>
			{device != null && (
				<CameraComp ref={camera} style={CameraStyle} device={devices[CamerDevice]} isActive={true} photo={true} focusable={true} enableZoomGesture />
			)}
			<Block flex={0} style={{ height: 55 }} hCenter vCenter row>
				<IconButton name="camera-flip" size={30} color="white" onPress={() => SetCameraDevice(CamerDevice === 'back' ? 'front' : 'back')} />

				<CameraBtn flex={0} press onPress={() => takePhoto()} />
				{!!PhotoData && (
					<TouchableOpacity onPress={() => onPreviewPress()} activeOpacity={0.6} style={{ borderRadius: 20 }}>
						<FastImage source={{ uri: PhotoData.path || '' }} style={{ height: 40, width: 40, borderRadius: 7 }} />
					</TouchableOpacity>
				)}
			</Block>
		</Block>
	);
};

const CameraBtn = styled(Block)`
	height: 38px;
	width: 38px;
	background-color: #ffffff;
	border-radius: 20px;
	margin-horizontal: 50px;
`;
