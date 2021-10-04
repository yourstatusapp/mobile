import core, { request, Status } from '@core';
import { Text } from '@parts';
import * as React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled, { useTheme } from 'styled-components/native';
import Animated, { useSharedValue, useAnimatedStyle, Easing, withTiming } from 'react-native-reanimated';
import { useState } from 'react';

interface StatusBoxProps extends Status {
	disableTap?: boolean;
}

export const StatusBox: React.FC<StatusBoxProps> = (p) => {
	const offset = useSharedValue(1);
	const { data, disableTap } = p;
	const theme = useTheme();

	const [Loading, setLoading] = useState(false);

	const tapStatus = async (id: string) => {
		if (disableTap === true) return;
		if (p.taped === true) {
			return;
		}
		if (Loading === true) {
			return;
		}

		setLoading(true);
		offset.value = withTiming(1.18, {
			duration: 80,
			easing: Easing.in(Easing.ease),
		});
		setTimeout(() => {
			offset.value = withTiming(1, {
				duration: 450,
				easing: Easing.in(Easing.ease),
			});
		}, 80);

		await request('post', `/status/${id}/tap`);
		core.profile.collection.update(
			p.account_id,
			{
				// @ts-ignore
				status: {
					taped: true,
					taps: (p?.taps || 0) + 1,
				},
			},
			{ deep: true }
		);

		setLoading(false);
	};

	const animatedStyles = useAnimatedStyle(() => {
		return {
			opacity: p.taped ? 0.6 : 1,
			transform: [{ scale: offset.value }],
		};
	});

	return (
		<Animated.View style={[animatedStyles]}>
			<StatusBoxBody onPress={() => tapStatus(p.id)} activeOpacity={0.8} disabled={disableTap || p?.taped === true}>
				<Box>
					<Text size={13} color={theme.text} weight="semi-bold">
						{data?.title || 'none'}
					</Text>
				</Box>
			</StatusBoxBody>
		</Animated.View>
	);
};

const StatusBoxBody = styled(TouchableOpacity)`
	align-items: flex-start;
	z-index: 10;
`;

const Box = styled.View`
	border: solid 1px ${({ theme }) => theme.text};
	border-radius: 16px;
	padding: 3px 9px;
`;
