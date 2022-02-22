import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';

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
	const { processing, url } = useInitialURL();
	const nav = useNavigation();

	React.useEffect(() => {
		if (url?.includes('/verify')) {
			nav.navigate('verify_account' as never, { code: url.split('/verify?code=')[1] } as never);
		}

		if (url?.includes('/magic')) {
			nav.navigate('magic' as never, { code: url.split('magic?code=')[1]?.split('&')[0], new_account: url.split('magic?code=')[1]?.split('&')[1] } as never);
		}
	}, [url, processing, nav]);
};
