import core from '@core';
import * as React from 'react';
import styled from 'styled-components/native';
import { request } from '../core/utils';
import { Text } from '../parts';

interface PreloaderProps {
	loaded: () => void;
}

export const Preloader: React.FC<PreloaderProps> = (props) => {
	const {} = props;

	// useEffect(() => {
	// 	props.loaded();
	// });

	const getAccount = async () => {
		const res = await request<{ account: any; profile: any }>('get', '/account');

		core.account.state.ACCOUNT.set(res.account);
		core.profile.state.PROFILE.set(res.profile);
		// core.profile.collection.collect(res.profile, 'mine');

		props.loaded();
	};

	React.useEffect(() => {
		// core.account.state.ACCOUNT.onNext((v) => {
		// 	console.log('Account loaded', v);
		// 	props.loaded();
		// });
		console.log('preloader');

		setTimeout(() => {
			getAccount();
		}, 500);
	});

	return (
		<PreloaderBody>
			<Text weight="bold" size={26}>
				Loading
			</Text>
		</PreloaderBody>
	);
};

const PreloaderBody = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;
