import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import styled from 'styled-components/native';
import core, { GetAccountType, request } from '@core';
import { Spacer, Text } from '@parts';
import { startService } from './ForeGroundService';

interface PreloaderProps {
	loaded: () => void;
}

export const Preloader: React.FC<PreloaderProps> = (props) => {
	const {} = props;
	const [TakingTooLong, setTakingTooLong] = React.useState(false);
	// const loggedin_state = usePulse(core.account.state.logged_in);

	const getAccount = async () => {
		// try {
		setTimeout(() => setTakingTooLong(true), 20 * 1000);
		// if (!loggedin_state) {
		// 	console.log('not logged in');

		// 	props.loaded();
		// 	return;
		// }

		const res = await request<GetAccountType>('get', '/account');
		console.log('ACCOUNT_DATA retrieved', res);
		

		core.account.state.ACCOUNT.set(res.account);
		core.profile.state.PROFILE.set(res.profile);
		core.status.state.my_status.set(res.status);
		core.app.state.device_id.set(res.device.id);
		core.account.collection.devices.collect(res.device, 'mine');
		core.account.collection.devices.selectors.current.select(res.device.id);

		// Set the current location if needed
		if (res.locations) {
			core.account.collection.locations.collect(res.locations, 'mine');
			core.account.collection.locations.selectors.current_here.select(res.device.id);
		}

		props.loaded();

		// } catch (error) {
		// 	// core.account.state.logged_in.set(false)
		// }
	};

	React.useEffect(() => {
		console.log('preloader');
		getAccount();
	}, []);

	return (
		<PreloaderBody>
			<Logo />
			<Spacer size={30} />
			<ActivityIndicator />
			<Spacer size={20} />
			{TakingTooLong && (
				<Text weight="semi-bold" size={16}>
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
		<Svg width={80} height={82} viewBox="0 0 636 657" fill="none">
			<Path
				d="M214.857 585C214.857 618.941 214.857 635.912 225.401 646.456C235.945 657 252.916 657 286.857 657H349.143C383.084 657 400.055 657 410.599 646.456C421.143 635.912 421.143 618.941 421.143 585V466.956C421.143 457.987 421.143 453.503 422.221 449.197C423.299 444.892 425.413 440.936 429.639 433.026L604.403 105.93C629.675 58.6294 642.311 34.9793 631.826 17.4896C621.341 0 594.527 0 540.899 0H489.08C466.714 0 455.532 0 446.663 5.67114C437.795 11.3423 433.104 21.4934 423.722 41.7956L320.763 264.585C320.265 265.662 319.186 266.351 318 266.351C316.814 266.351 315.735 265.662 315.237 264.585L212.278 41.7956C202.896 21.4934 198.205 11.3423 189.337 5.67114C180.468 0 169.286 0 146.92 0H95.1013C41.473 0 14.6589 0 4.17396 17.4896C-6.31098 34.9793 6.32501 58.6294 31.597 105.93L206.361 433.026C210.587 440.936 212.701 444.892 213.779 449.197C214.857 453.503 214.857 457.987 214.857 466.956V585Z"
				fill="url(#paint0_linear)"
			/>
			<Defs>
				<LinearGradient id="paint0_linear" x1="496.98" y1="-1.10294e-05" x2="252.459" y2="668.015" gradientUnits="userSpaceOnUse">
					<Stop stopColor="#C4A3FB" />
					<Stop offset="1" stopColor="#4C5DF1" />
				</LinearGradient>
			</Defs>
		</Svg>
	);
};
