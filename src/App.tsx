import React, { useEffect } from 'react';

import styled from 'styled-components/native';
import core from '@core';
import { RootNavigator } from './navigators/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { Platform } from 'react-native';
import { CustomAlert } from './parts/components/Alert';
import { MenuProvider } from 'react-native-popup-menu';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { StyledThemeWrapper } from './hooks/useTheme';
import { DebugOverlay } from './screens/DebugOveralay';
import { SafeAreaProvider } from 'react-native-safe-area-context';

if (__DEV__) {
	console.log('__DEV__', __DEV__);
}

// @ts-ignore
// console.log(`hermers ${!!global.HermesInternal}`);

export const App: React.FC = () => {
	// const [misc, setMisc] = useRecoilState(core.misc);

	// const [L, SetL] = useState<StorieType>();
	// const [ShowStorie, SetShowStorie] = useState<boolean>(false);
	// const [SkipWatchRequest, SetSkipWatchRequest] = useState<boolean>(false);
	// const [ClikedAtIndex, SetClikedAtIndex] = useState<number>(0);

	// const onStorieViewHandler = React.useCallback(
	// 	v => {
	// 		if (v.stories) {
	// 			SetL(v.stories);
	// 			SetClikedAtIndex(v.clicked_at_index);
	// 			SetShowStorie(true);
	// 			SetSkipWatchRequest(v?.skipWatchRequest || false);
	// 		} else {
	// 			SetL(false);
	// 		}
	// 	},
	// 	[ShowStorie, L],
	// );

	useEffect(() => {
		// core.events.storie_viewer.on(v => {
		// 	onStorieViewHandler(v);
		// });

		// Appearance.addChangeListener(v => {
		// 	toggleTheme(v.colorScheme || 'light');
		// });

		if (Platform.OS === 'ios') {
			PushNotificationIOS.setApplicationIconBadgeNumber(0);
		}
	}, []);

	return (
		<SafeAreaProvider>
			<StyledThemeWrapper>
				<BottomSheetModalProvider>
					{/* <PushNotifications /> */}
					{/* {ShowStorie && (
					<StorieViewer
						list={L}
						onClose={() => {
							SetShowStorie(false);
						}}
						clickedAtIndex={ClikedAtIndex}
						skipWatchRequest={SkipWatchRequest}
					/>
				)} */}

					<NavigationContainer>
						{/* {__DEV__ && <DebugOverlay />} */}

						<AppBody>
							<MenuProvider>
								<CustomAlert />
								{/* <StatusBar barStyle={misc.theme !== 'light' ? 'light-content' : 'dark-content'} /> */}
								<RootNavigator />
							</MenuProvider>
						</AppBody>
					</NavigationContainer>
				</BottomSheetModalProvider>
			</StyledThemeWrapper>
		</SafeAreaProvider>
	);
};

const AppBody = styled.View`
	flex: 1;
	z-index: 25;
	background-color: black;
`;
