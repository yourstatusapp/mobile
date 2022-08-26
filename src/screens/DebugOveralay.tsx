import { useAccount, useTheme } from '@hooks';
import { Block, Text, TextButton } from '@parts';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MMKV } from '../core/core';

export const DebugOverlay = () => {
	const [show, setShow] = useState(false);
	const { theme } = useTheme();
	const { loggedIn, profile, account } = useAccount();
	const { top } = useSafeAreaInsets();
	const FSize = 18;

	return (
		<Block
			flex={1}
			color="red"
			width="100%"
			style={{ position: 'absolute', top: top, zIndex: 5000 }}>
			<TextButton onPress={() => setShow(!show)}>hide/show</TextButton>

			{show && (
				<>
					<Text>
						<Text bold>account:</Text>
						{JSON.stringify(account)}
					</Text>
					<Text>
						<Text bold>profile:</Text>
						{JSON.stringify(profile)}
					</Text>
					<Text>
						<Text bold>theme:</Text>
						{theme.name}
					</Text>
					<Text>
						<Text bold>storage:</Text>
						{JSON.stringify(MMKV.getItem('account'))}
					</Text>
				</>
			)}
		</Block>
	);
};
