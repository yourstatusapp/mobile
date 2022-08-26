import React, { useEffect, useState } from 'react';
import { Block, Fill, IconButton, TabbarHeader, Text } from '@parts';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '@hooks';
import { SettingsNavigator } from '../../navigator/SettingsNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Settings = () => {
	const nav = useNavigation();
	const { top } = useSafeAreaInsets();
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
				paddingHorizontal={10}
				height={50 + top}
				style={{
					paddingTop: top,
					borderBottomColor: theme.background,
					borderBottomWidth: 1,
				}}
				color={theme.backgroundDarker}
				hCenter
				vCenter>
				<IconButton
					name={NavigationState?.state?.index === 1 ? 'arrow_thin' : 'plus'}
					size={22}
					color={theme.textFadeLight}
					onPress={() =>
						NavigationState?.state?.index === 1
							? nav.navigate('settingsMain' as never, { initial: false } as never)
							: nav.goBack()
					}
					backgroundColor="red"
					noBackground
					iconStyle={{
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
