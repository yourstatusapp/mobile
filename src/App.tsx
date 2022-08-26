import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyledThemeWrapper } from './hooks/useTheme';
import { RootNavigator } from './navigator/RootNavigator';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { CustomAlert } from './parts/Alert';
import { Block } from '@parts';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Expected style']);

export const App = () => {
	useEffect(() => {
		SplashScreen.hide();
	}, []);

	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<StyledThemeWrapper>
					<Block color="blue">
						<BottomSheetModalProvider>
							<CustomAlert />
							<RootNavigator />
						</BottomSheetModalProvider>
					</Block>
				</StyledThemeWrapper>
			</NavigationContainer>
		</SafeAreaProvider>
	);
};
