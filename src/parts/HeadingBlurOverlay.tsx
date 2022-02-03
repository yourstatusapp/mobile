import React from 'react';
import { VibrancyView } from '@react-native-community/blur';
import { StyleSheet, ViewStyle } from 'react-native';

export const HeadingBlurOverlay = () => {
	const sh = StyleSheet.flatten<ViewStyle>([{ position: 'absolute', top: 0, height: 50, width: '100%', zIndex: 10 }]);

	return <VibrancyView style={sh} blurType="dark" blurRadius={3} overlayColor={'#070710'} reducedTransparencyFallbackColor="#070710" blurAmount={100} />;
};
