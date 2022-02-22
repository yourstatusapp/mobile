import * as React from 'react';
import core, { request } from '@core';
import { Block, Text } from '@parts';
import { useTheme } from 'styled-components/native';

export const SettingsSessions: React.FC = () => {
	const { colors } = useTheme();

	const getSessions = async () => {
		const res = await request('get', '/account/devices');
	};

	React.useEffect(() => {}, []);

	return (
		<Block paddingHorizontal={20}>
			<Text>Sessions</Text>
		</Block>
	);
};
