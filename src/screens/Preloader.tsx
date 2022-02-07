import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import styled from 'styled-components/native';
import core, { request } from '@core';
import { Spacer, Text } from '@parts';

interface PreloaderProps {
	loaded: () => void;
}

export const PreloaderView = ({ loaded }: PreloaderProps) => {
	const [TakingTooLong, setTakingTooLong] = useState(false);

	const getAccount = async () => {
		setTimeout(() => setTakingTooLong(true), 20 * 1000);

		const res = await request<{ account: any; profile: any }>('get', '/account');
		console.log('ACCOUNT_DATA retrieved', res);
		loaded();

		if (!res.success) {
			core.account.state.account.reset();
			core.profile.state.profile.reset();
		} else {
			if (res.data?.account) core.account.state.account.set(res.data?.account);
			if (res.data?.profile) core.profile.state.profile.set(res.data?.profile);
		}

		setTimeout(() => loaded(), 10);
	};

	useEffect(() => {
		// console.log('preloader');
		getAccount();
	}, []);

	return (
		<PreloaderBody>
			<Logo />
			<Spacer size={30} />
			<ActivityIndicator />
			<Spacer size={20} />
			{TakingTooLong && (
				<Text weight="600" size={16}>
					Still loading...
				</Text>
			)}
		</PreloaderBody>
	);
};

const PreloaderBody = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const Logo: React.FC = () => {
	return (
		<Svg width="120" height="120" viewBox="0 0 192 192" fill="none">
			<G>
				<Path
					d="M80.2133 135.667C80.2133 141.952 80.2133 145.095 82.1426 147.047C84.0719 149 87.1771 149 93.3876 149H99.6124C105.823 149 108.928 149 110.857 147.047C112.787 145.095 112.787 141.952 112.787 135.667V119.085C112.787 117.424 112.787 116.594 112.984 115.796C113.181 114.999 113.568 114.267 114.341 112.802L140.306 63.6163C144.93 54.8571 147.242 50.4775 145.323 47.2388C143.405 44 138.498 44 128.686 44H124.669C120.576 44 118.53 44 116.907 45.0502C115.285 46.1005 114.426 47.9804 112.71 51.7401L96.9362 86.2852C96.8576 86.4574 96.6873 86.5676 96.5 86.5676C96.3127 86.5676 96.1424 86.4574 96.0638 86.2852L80.2903 51.7401C78.5736 47.9804 77.7152 46.1005 76.0925 45.0502C74.4698 44 72.4236 44 68.3312 44H64.3141C54.5016 44 49.5953 44 47.6768 47.2388C45.7583 50.4775 48.0703 54.8571 52.6942 63.6164L78.6588 112.802C79.4321 114.267 79.8187 114.999 80.016 115.796C80.2133 116.594 80.2133 117.424 80.2133 119.085V135.667Z"
					fill="black"
				/>
			</G>
			<G>
				<Path
					d="M80.2133 135.667C80.2133 141.952 80.2133 145.095 82.1426 147.047C84.0719 149 87.1771 149 93.3876 149H99.6124C105.823 149 108.928 149 110.857 147.047C112.787 145.095 112.787 141.952 112.787 135.667V119.085C112.787 117.424 112.787 116.594 112.984 115.796C113.181 114.999 113.568 114.267 114.341 112.802L140.306 63.6163C144.93 54.8571 147.242 50.4775 145.323 47.2388C143.405 44 138.498 44 128.686 44H124.669C120.576 44 118.53 44 116.907 45.0502C115.285 46.1005 114.426 47.9804 112.71 51.7401L96.9362 86.2852C96.8576 86.4574 96.6873 86.5676 96.5 86.5676C96.3127 86.5676 96.1424 86.4574 96.0638 86.2852L80.2903 51.7401C78.5736 47.9804 77.7152 46.1005 76.0925 45.0502C74.4698 44 72.4236 44 68.3312 44H64.3141C54.5016 44 49.5953 44 47.6768 47.2388C45.7583 50.4775 48.0703 54.8571 52.6942 63.6164L78.6588 112.802C79.4321 114.267 79.8187 114.999 80.016 115.796C80.2133 116.594 80.2133 117.424 80.2133 119.085V135.667Z"
					fill="#3859FD"
				/>
			</G>
		</Svg>
	);
};
