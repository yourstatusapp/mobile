import styled, { useTheme } from 'styled-components/native';
import React, { useState } from 'react';
import { Block, Button, Fill, Icon, Input, Row, Spacer, Text } from '@parts';
import core, { request } from '@core';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePulse } from '@pulsejs/react';
import DeviceInfo from 'react-native-device-info';

export const AuthView: React.FC = () => {
	const nav = useNavigation();
	const { colors } = useTheme();
	const loggedin = usePulse(core.account.state.logged_in);
	const [Email, SetEmail] = useState('');
	const [Loading, SetLoading] = useState(false);

	const login = async () => {
		SetLoading(true);
		await request('post', '/auth/magic', {
			data: {
				email: Email?.trimStart()?.trimEnd(),
			},
		});
		SetLoading(false);
		// core.app.event.notification.emit({ title: 'Magic link has been send', success: true, desc: 'Click on the link in your inbox' });
	};
	return (
		<Block vCenter paddingHorizontal={20}>
			<Text center weight="800" size={45} color={colors.white}>
				YourStatus
			</Text>
			<Spacer size={30} />
			<Input placeholder="Email" onChange={SetEmail} textContentType={'email'} />
			<Spacer size={15} />
			<Button text="Login" onPress={() => login()} disabled={Email === '' || Loading} />
			<Spacer size={5} />
			<Block row vCenter flex={0}>
				<Text center italic color={colors.white40} bold>
					We use magic links
				</Text>
				<Icon name={'sparkle'} size={15} color={'#5e37c9'} style={{ paddingLeft: 5, paddingBottom: 5 }} />
			</Block>
			<Spacer size={20} />

			{loggedin && (
				<TouchableOpacity style={{ alignSelf: 'center' }} activeOpacity={0.6} onPress={() => nav.navigate('tabs' as never)}>
					<Text center weight="500" size={14} color="white">
						reload
					</Text>
				</TouchableOpacity>
			)}
			<Spacer size={50} />
			<Text center italic color={colors.white20}>
				Build: {DeviceInfo?.getBuildNumber()}
			</Text>
		</Block>
	);
};
