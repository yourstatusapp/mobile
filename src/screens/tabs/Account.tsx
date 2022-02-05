import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Block, Button, Fill, Spacer, Text } from '@parts';
import { useNavigation } from '@react-navigation/native';
import core from '@core';
import { usePulse } from '@pulsejs/react';

export const Account: React.FC = () => {
	const nav = useNavigation();
	const { colors } = useTheme();
	const account = usePulse(core.account.state.account);
	const profile = usePulse(core.profile.state.profile);

	return (
		<Block safe paddingHorizontal={20}>
			<Text size={28} bold color={colors.white}>
				Account
			</Text>
			<Spacer size={20} />
			<Text>{account.email}</Text>
			<Text>{profile.avatar}</Text>
			<Fill />
			<Button
				text="Logout"
				style={{ backgroundColor: '#e05151' }}
				onPress={() => {
					nav.reset({ index: 1, routes: [{ name: 'auth' as never }] });
					core.account.state.account.reset();
				}}
			/>
			<Spacer size={20} />
		</Block>
	);
};
