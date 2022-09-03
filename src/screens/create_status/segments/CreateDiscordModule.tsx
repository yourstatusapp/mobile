import React, { useCallback, useEffect, useState } from 'react';
import { Block, Text } from '@parts';
import { TextInput } from 'react-native';
import { useTheme } from '@hooks';
import { IModuleProps } from '.';
import FastImage from 'react-native-fast-image';
import core from '@core';

let timeoutID: NodeJS.Timeout;
export const CreateDiscordModule: React.FC<IModuleProps> = ({ validateStatus, validateStatusReturnData }) => {
	const { theme } = useTheme();

	const [inviteCode, setInviteCode] = useState('');

	const updateDataChange = useCallback(() => {
		validateStatus({
			statusText: '',
			data: { inviteCode: inviteCode },
			type: 'DISCORD_GUILD',
		});
	}, [inviteCode, validateStatus]);

	useEffect(() => {
		// core.newStatusDraft.set({ type: 'DISCORD_GUILD', statusText: '' });

		if (timeoutID) {
			clearTimeout(timeoutID);
		}

		timeoutID = setTimeout(() => {
			if (!!inviteCode) {
				console.log('inviteCode', inviteCode);

				updateDataChange();
			}
		}, 1000);
	}, [inviteCode]);

	const GUILD_ICON_SIZE = 40;

	return (
		<Block paddingHorizontal={10}>
			{validateStatusReturnData.valid && (
				<Block flex={0} color={theme.backgroundDarker} padding={10} marginBottom={10} style={{ borderRadius: 10 }}>
					<Text size={16} medium>
						Discord guild found:
					</Text>
					<Block flex={0} row hCenter marginTop={10}>
						<FastImage
							source={{
								uri: `https://cdn.discordapp.com/icons/${validateStatusReturnData.data?.id}/${validateStatusReturnData?.data?.iconImage}.webp?size=64`,
							}}
							style={{
								height: GUILD_ICON_SIZE,
								width: GUILD_ICON_SIZE,
								borderRadius: GUILD_ICON_SIZE,
							}}
						/>
						<Text medium marginLeft={10}>
							{validateStatusReturnData.data?.name}
						</Text>
					</Block>
				</Block>
			)}

			<TextInput
				autoComplete="off"
				autoCorrect={false}
				autoCapitalize="none"
				placeholder="Place you're invite code"
				placeholderTextColor={theme.textFadeLight}
				style={{ fontSize: 16, color: theme.text }}
				value={inviteCode}
				defaultValue={inviteCode}
				onChangeText={v => {
					setInviteCode(v);
				}}
			/>
		</Block>
	);
};
