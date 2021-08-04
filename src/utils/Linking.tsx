import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Linking } from 'react-native';
import { request } from '../core/utils';

const useMount = (func: () => void) => useEffect(() => func());

export const useInitialURL = () => {
	const [url, setUrl] = useState<string | null>(null);
	const [processing, setProcessing] = useState(true);

	useMount(() => {
		Linking.addEventListener('url', ({ url }) => {
			setUrl(url);
		});

		const getUrlAsync = async () => {
			// Get the deep link used to open the app
			const initialUrl = await Linking.getInitialURL();

			// The setTimeout is just for testing purpose
			setTimeout(() => {
				setUrl(initialUrl);
				setProcessing(false);
			}, 1000);
		};

		getUrlAsync();
	});

	return { url, processing };
};

export const useLinking = () => {
	// TODO: Cannot use this here
	const { processing, url } = useInitialURL();
	const nav = useNavigation();

	// const verifyAccount = async (code: string) => {
	// 	const a = await request('post', '/account/verify', { data: { code } });
	// };

	React.useEffect(() => {
		// if (url) {
		// 	Alert.alert(url);
		// }

		if (url?.includes('/verify')) {
			// nav.navigate('Verify');
			// verifyAccount(url.split('/verify?code=')[1]);
		}

		if (url?.includes('/magic')) {
			nav.navigate('Magic', { code: url.split('magic?code=')[1] });
		}
		// console.log(url, processing);
	}, [url, processing, nav]);
};
