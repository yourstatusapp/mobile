import * as React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { RNCamera, RNCameraProps } from 'react-native-camera';
import { Fill, IconButton, Row, Spacer, TabbarContentContainer, Text } from '@parts';
import { useNavigation } from '@react-navigation/core';
import { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
interface CameraProp {}

export const CameraView: React.FC<CameraProp> = (props) => {
	const {} = props;
	const nav = useNavigation();
	const cameraRef = React.useRef<any>();
	const theme = useTheme();
	const [Flash, setFlash] = useState<'off' | 'on' | 'auto' | 'torch'>('off');
	const [SelectedCam, setSelectedCam] = useState<'front' | 'back'>('back');
	const [LastTaken, setLastTaken] = useState();

	const takePicture = async (camera: any) => {
		console.log(camera);

		//@ts-ignore
		if (camera) {
			const options = { quality: 0.5, base64: true };
			// const data = await cameraRef.current.camera.takePictureAsync(options);
			//@ts-ignore
			const data = await camera.takePictureAsync({});
			console.log(data);
			setLastTaken(data.uri);
		}
	};

	const chooseFromGalaery = () => {
		ImagePicker.openPicker({
			mediaType: 'photo',
			cropping: true,
		}).then((video) => {
			console.log(video.sourceURL);
			nav.navigate('Newpost', { image: video.sourceURL });
		});
	};

	return (
		<CameraBody style={{ backgroundColor: 'black' }}>
			<RNCamera style={{ flex: 1 }} type={SelectedCam} ref={cameraRef} flashMode={Flash} useNativeZoom={true} maxZoom={1}>
				{({ camera }) => {
					return (
						<>
							<CloseButton name="times" size={30} color="white" noBackground onPress={() => nav.goBack()} />

							<ControlBox center style={{ zIndex: 10 }}>
								<Spacer size={10} />
								<Spacer size={50} />
								<Fill />
								<IconButton
									name="switch"
									size={25}
									color="white"
									noBackground
									onPress={() => setSelectedCam(SelectedCam === 'back' ? 'front' : 'back')}
									style={{ transform: [{ rotate: SelectedCam === 'back' ? '0deg' : '180deg' }] }}
								/>
								<Spacer size={40} />
								<ActionBtn onPress={() => takePicture(camera)} />

								<Spacer size={40} />
								<IconButton name="flashlight" size={25} color={Flash === 'off' ? 'gray' : 'white'} noBackground onPress={() => setFlash(Flash === 'off' ? 'torch' : 'off')} />
								<Fill />

								<IconButton noBackground name="image" size={35} color="white" onPress={() => chooseFromGalaery()} />
								<Spacer size={10} />
							</ControlBox>
						</>
					);
				}}
			</RNCamera>
			{LastTaken && (
				<ImageThumbnailContainer onPress={() => nav.navigate('Newpost', { image: LastTaken })}>
					<ImageThumbnail source={{ uri: LastTaken }} />
				</ImageThumbnailContainer>
			)}
		</CameraBody>
	);
};

const CameraBody = styled(TabbarContentContainer).attrs({ style: { backgroundColor: 'black' }, innerStyle: { backgroundColor: 'black' } })`
	flex: 1;
`;

const ControlBox = styled(Row)`
	position: absolute;
	bottom: 30px;
	height: 40px;
	width: 100%;
	justify-content: center;
	align-items: center;
`;
const ActionBtn = styled(TouchableOpacity)`
	height: 50px;
	width: 50px;

	background-color: white;
	border-radius: 50px;
`;
const CloseButton = styled(IconButton)`
	position: absolute;
	top: 10;
	left: 10;
`;

const ImageThumbnail = styled(FastImage)`
	border-radius: 6px;
	height: 80px;
	width: 80px;
`;

const ImageThumbnailContainer = styled(TouchableOpacity)`
	padding: 3px;
	position: absolute;
	border-radius: 10px;
	right: 10px;
	bottom: 90px;
	background-color: white;
`;
