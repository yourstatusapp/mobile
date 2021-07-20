import { useEffect, useState } from 'react';
import { Linking } from 'react-native';

const useMount = (func: () => void) => useEffect(() => func());

export const useInitialURL = () => {
	const [url, setUrl] = useState<string | null>(null);
	const [processing, setProcessing] = useState(true);

	useMount(() => {
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
