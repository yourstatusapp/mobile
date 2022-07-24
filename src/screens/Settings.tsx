import React, { useEffect, useState } from 'react';
import { Block, Fill, IconButton, Text } from '@parts';
import { useNavigation } from '@react-navigation/native';

import { SettingsNavigator } from '../navigators/SettingsNavigator';
import { useTheme } from '@hooks';

export const Settings = () => {
	const nav = useNavigation();
	const { theme, toggleTheme } = useTheme();

	const [NavigationState, SetNavigationState] = useState<any>();

	useEffect(() => {
		console.log(NavigationState?.state);
	}, [NavigationState]);

	return (
		<Block color={theme.backgroundDarker}>
			<Block
				row
				flex={0}
				paddingHorizontal={20}
				paddingRight={13}
				height={50}
				style={{
					borderBottomColor: theme.background,
					borderBottomWidth: 1,
				}}
				color={theme.background}
				hCenter
				vCenter>
				<IconButton
					name={NavigationState?.state?.index === 1 ? 'arrow-thin' : 'plus'}
					size={22}
					color={theme.textFadeLight}
					onPress={() =>
						NavigationState?.state?.index === 1
							? nav.navigate('settingsMain' as never, { initial: false } as never)
							: nav.goBack()
					}
					backgroundColor="red"
					noBackground
					style={{
						paddingRight: NavigationState?.state?.index === 1 ? 0 : 15,
					}}
					iconStyle={{
						paddingRight: NavigationState?.state?.index === 1 ? 15 : 0,
						transform: [{ rotate: NavigationState?.state?.index === 1 ? '0deg' : '45deg' }],
					}}
				/>
				<Fill />
				<Text bold size={16} center>
					Settings
				</Text>
				<Fill />

				<IconButton
					name="moon"
					size={22}
					iconSize={14}
					color={theme.textFade}
					backgroundColor={theme.backgroundDarker}
					onPress={() => toggleTheme()}
					noPadding
				/>
			</Block>
			<SettingsNavigator onNavigationStateChange={v => SetNavigationState(v)} />
		</Block>
	);
};
