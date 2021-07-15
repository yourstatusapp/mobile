import * as React from 'react';
import styled from 'styled-components/native';
import core from '../core';
import { Text } from '../parts';

interface PreloaderProps {
	loaded: () => void;
}

export const Preloader: React.FC<PreloaderProps> = (props) => {
	const {} = props;

	// useEffect(() => {
	// 	props.loaded();
	// });

	React.useEffect(() => {
		// core.account.state.ACCOUNT.onNext((v) => {
		// 	console.log('Account loaded', v);
		// 	props.loaded();
		// });
		setTimeout(() => {
			props.loaded();
		}, 500);
	});

	return (
		<PreloaderBody>
			<Text>PRELOADING</Text>
		</PreloaderBody>
	);
};

const PreloaderBody = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;
