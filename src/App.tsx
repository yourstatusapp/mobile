import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyledThemeWrapper, useTheme } from './hooks/useTheme';
import { RootNavigator } from './navigator/RootNavigator';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { CustomAlert } from './parts/Alert';
import { Block } from '@parts';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Expected style']);

export const App = () => {
	const { theme } = useTheme();
	useEffect(() => {
		SplashScreen.hide();
	}, []);

	return (
		<SafeAreaProvider>
			<StyledThemeWrapper>
				<NavigationContainer
					theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: theme.background } }}>
					<Block color="blue">
						<BottomSheetModalProvider>
							<CustomAlert />
							<RootNavigator />
						</BottomSheetModalProvider>
					</Block>
				</NavigationContainer>
			</StyledThemeWrapper>
		</SafeAreaProvider>
	);
};
