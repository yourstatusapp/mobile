import * as React from 'react';
import styled from 'styled-components/native';
import { RNCamera, RNCameraProps } from 'react-native-camera';
import { IconButton, Row, Spacer, Text } from '@parts';
import { useNavigation } from '@react-navigation/core';
import { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native';

interface CameraProp {}

export const Camera: React.FC<CameraProp> = (props) => {
	const {} = props;
	const nav = useNavigation();
	const cameraRef = React.useRef<any>();
	const [Flash, setFlash] = useState<'off' | 'on' | 'auto'>('off');
	const [SelectedCam, setSelectedCam] = useState<'front' | 'back'>('back');
	const [LastTaken, setLastTaken] = useState();
	const [FullScreenPreview, setFullScreenPreview] = useState(false);

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

	return (
		<CameraBody>
			<RNCamera style={{ flex: 1 }} type={SelectedCam} ref={cameraRef} flashMode={Flash}>
				{({ camera }) => {
					return (
						<OverLay>
							<CloseButton name="times" size={45} iconSize={45} color="white" noBackground onPress={() => nav.goBack()} />
							<ControlBox center>
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
								<IconButton name="flashlight" size={40} color={Flash === 'off' ? 'gray' : 'white'} noBackground onPress={() => setFlash(Flash === 'off' ? 'auto' : 'off')} />
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
