import { useTheme } from 'styled-components/native';
import React, { useState } from 'react';
import { Block, Button, Icon, Input, Spacer, Text } from '@parts';
import core, { AppAlert, request } from '@core';
import { KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePulse } from '@pulsejs/react';
import DeviceInfo from 'react-native-device-info';

export const AuthView: React.FC = () => {
	const nav = useNavigation();
	const { colors } = useTheme();
	const loggedin = usePulse(core.account.state.logged_in);
	const [Email, SetEmail] = useState('');
	const [Error, SetError] = useState('');
	const [Loading, SetLoading] = useState(false);

	const login = async () => {
		SetLoading(true);
		SetError('');
		const res = await request('post', '/auth/magic', {
			data: {
				email: Email?.trimStart()?.trimEnd(),
			},
		});
		SetEmail('');

		if (res.data === false) {
			SetError(res?.message || '');
			AppAlert(false, 'failed', res.message);
		} else {
			AppAlert(true, 'Check your inbox');
		}

		SetLoading(false);
	};
	return (
		<Block vCenter paddingHorizontal={20}>
			<KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center' }} behavior="padding">
				<Text center weight="800" size={45} color={colors.white}>
					YourStatus
				</Text>
				<Spacer size={30} />
				{!!Error && (
					<Text color="red" size={14} bold>
						{Error}
					</Text>
				)}
				<Spacer size={10} />
				<Input placeholder="Email" value={Email} onChange={SetEmail} textContentType={'email'} />
				<Spacer size={15} />
				<Button text="Login" onPress={() => login()} disabled={Email === '' || Loading} />
				<Block row vCenter flex={0} marginTop={20}>
					<Icon name={'sparkle'} size={15} color={'#5e37c9'} style={{ paddingRight: 5, paddingBottom: 5 }} />
					<Text center color={colors.white80} weight="600" size={12}>
						We use magic links
					</Text>
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
			</KeyboardAvoidingView>
		</Block>
	);
};
