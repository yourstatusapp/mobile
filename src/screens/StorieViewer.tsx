import core, { StorieType, TimeFormatter } from '@core';
import { Block, Text } from '@parts';
import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export const StorieViewer = ({ list, onClose, clickedAtIndex }: { list: StorieType; onClose: () => void; clickedAtIndex: number }) => {
	const o = useSharedValue(0);

	const animatedStyles = useAnimatedStyle(() => {
		return {
			opacity: o.value,
		};
	});

	const nextImage = () => {
		o.value = withSpring(0);

		setTimeout(() => {
			// core.events.storie_viewer.emit({ stories: false });
			onClose();
		}, 200);
	};

	const close = () => {
		o.value = withSpring(0);

		setTimeout(() => {
			core.events.storie_viewer.emit({ stories: false });
		}, 200);
	};

	useEffect(() => {
		o.value = withSpring(1);
	}, []);

	return (
		<Animated.View
			style={[animatedStyles, { position: 'absolute', top: 0, zIndex: 59, height: '100%', width: '100%', paddingVertical: 40, backgroundColor: 'black' }]}>
			<Block safe press onPress={() => nextImage()} activeOpacity={1} hCenter>
				<FastImage
					source={{ uri: `https://cdn.yourstatus.app/stories/${list.account_id}/${list.stories[clickedAtIndex].picture}` }}
					style={{ height: '100%', width: Dimensions.get('screen').width - 10, borderRadius: 25 }}
				/>
				<Block flex={0} style={{ position: 'absolute', bottom: 10 }} row vCenter>
					<Block flex={0} style={{ width: 'auto', borderRadius: 5, paddingHorizontal: 5, paddingVertical: 3 }} color="black">
						<Text bold color="white">
							{TimeFormatter(list.stories[clickedAtIndex].id)} ago
						</Text>
					</Block>
				</Block>
			</Block>
		</Animated.View>
	);
};
