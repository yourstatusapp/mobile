import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Avatar, Block, Button, Fill, IconButton, Spacer, Text, TextButton } from '@parts';
import { useNavigation } from '@react-navigation/native';
import core from '@core';
import { usePulse } from '@pulsejs/react';

export const Account = () => {
	const nav = useNavigation();
	const { colors } = useTheme();
	const account = usePulse(core.account.state.account);
	const profile = usePulse(core.profile.state.profile);

	return (
		<Block scroll paddingHorizontal={20}>
			<Spacer size={20} />
			<Spacer size={50} />
			<Block row flex={0}>
				<Text size={28} bold color={colors.white}>
					Account
				</Text>
				<Fill />
				<IconButton name="cog" size={25} color={colors.white} onPress={() => nav.navigate('settings' as never)} />
			</Block>
			<Spacer size={20} />
			<Block row flex={0}>
				{profile?.account_id && <Avatar src={[profile.account_id, profile?.avatar]} size={120} />}
				<Spacer size={20} h />
				<IconButton
					name="pencil"
					color={colors.white80}
					size={25}
					iconSize={15}
					backgroundColor={colors.white20}
					onPress={() => nav.navigate('edit_profile' as never)}
				/>
			</Block>
			<Spacer size={20} />
			<Text>
				<Text bold>Email: </Text>
				{account?.email}
			</Text>
			<Spacer size={20} />

			<Spacer size={20} />
			<Fill />
			<TextButton
				text="Logout"
				textColor={'#ff6b6b'}
				style={{ padding: 4 }}
				onPress={() => {
					nav.reset({ index: 1, routes: [{ name: 'auth' as never }] });
					core.account.state.account.reset();
				}}
			/>
			<Spacer size={90} />
		</Block>
	);
};
