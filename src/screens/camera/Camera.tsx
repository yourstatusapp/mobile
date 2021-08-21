import * as React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { RNCamera, RNCameraProps } from 'react-native-camera';
import { Fill, IconButton, Row, Spacer, Text } from '@parts';
import { useNavigation } from '@react-navigation/core';
import { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
interface CameraProp {}

export const Camera: React.FC<CameraProp> = (props) => {
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
			const data = await camera.takePictureAsync(options);
			console.log(data);
			setLastTaken(data.uri);
		}
	};

	const chooseFromGalaery = () => {
		ImagePicker.openPicker({
			mediaType: 'photo',
		}).then((video) => {
			console.log(video.sourceURL);
			nav.navigate('Newpost', { image: video.sourceURL });
		});
	};

	return (
		<CameraBody>
			<RNCamera style={{ flex: 1 }} type={SelectedCam} ref={cameraRef} flashMode={Flash} useNativeZoom={true} maxZoom={1}>
				{({ camera }) => {
					return (
						<OverLay>
							<CloseButton name="times" size={45} iconSize={45} color="white" noBackground onPress={() => nav.goBack()} />
							<ControlBox center>
								<Spacer size={10} />
								<Spacer size={50} />
								<Fill />
								<IconButton
									name="switch"
									size={40}
									color="white"
									noBackground
									onPress={() => setSelectedCam(SelectedCam === 'back' ? 'front' : 'back')}
									style={{ transform: [{ rotate: SelectedCam === 'back' ? '0deg' : '180deg' }] }}
								/>
								<Spacer size={40} />
								<ActionBtn onPress={() => takePicture(camera)} />

								<Spacer size={40} />
								<IconButton name="flashlight" size={40} color={Flash === 'off' ? 'gray' : 'white'} noBackground onPress={() => setFlash(Flash === 'off' ? 'torch' : 'off')} />
								<Fill />

								<IconButton noBackground name="image" size={50} color="white" onPress={() => chooseFromGalaery()} />
								<Spacer size={10} />
							</ControlBox>
						</OverLay>
					);
				}}
			</RNCamera>
			{LastTaken && (
				<ImageThumbnailContainer onPress={() => nav.navigate('Newpost', { image: LastTaken })}>
					<ImageThumbnail source={{ uri: LastTaken }} />
				</ImageThumbnailContainer>
			)}

			{/* <ControlBox center>
				<IconButton
					name="switch"
					size={40}
					color="white"
					noBackground
					onPress={() => setSelectedCam(SelectedCam === 'back' ? 'front' : 'back')}
					style={{ transform: [{ rotate: SelectedCam === 'back' ? '0deg' : '180deg' }] }}
				/>
				<Spacer size={40} />

				<Spacer size={40} />
				<IconButton name="flashlight" size={40} color={Flash === 'off' ? 'gray' : 'white'} noBackground onPress={() => setFlash(Flash === 'off' ? 'auto' : 'off')} />
			</ControlBox> */}
		</CameraBody>
	);
};

const CameraBody = styled.View`
	flex: 1;
`;

const OverLay = styled.View`
	flex: 1;
	position: relative;
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
	top: 50;
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
