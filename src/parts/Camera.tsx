import React from 'react';
import { useCameraDevices } from 'react-native-vision-camera';

export const Camera = () => {
	const devices = useCameraDevices();
	const device = devices.back;

	if (device == null) return <></>;
	return <Camera device={device} isActive={true} />;
};
