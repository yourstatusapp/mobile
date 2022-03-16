import core, { AppAlert, request } from '@core';
import { Spacer, Text, Block } from '@parts';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

interface MagicProps {
	navigation: any;
	route: {
		key: string;
		name: string;
		params: { code: string; new_account: boolean };
		state: string;
	};
}

interface IAccountRequestProps {
	account: any;
	profile: any;
	device: {
		id: string;
		notifications: boolean;
	};
}

export const Magic: React.FC<MagicProps> = ({ route }) => {
	const nav = useNavigation();

	const magicAuth = async (code: string, new_account: boolean) => {
		const res = await request<IAccountRequestProps>('post', '/auth/magic/verify', { data: { code } });

		if (!res.data) {
			AppAlert(false, 'Failed', res.message);
			setTimeout(() => nav.goBack(), 1500);
			return;
		}

		if (res.data?.account) core.account.account.set(res.data.account); // @ts-ignore
		if (res.data?.profile) core.profile.profile.set(res.data.profile);

		if (res.data?.device?.id) {
			core.lists.devices.collect(res.data.device, 'mine');
			core.lists.devices.selectors.current.select(res.data.device.id);
		}

		// TODO: find out if this is neede
		core.app.device_id.set(res.data.device.id);

		core.lists.devices.collect(res.data.device, 'mine');
		core.lists.devices.selectors.current.select(res.data.device.id);

		if (!new_account) {
			nav.reset({ index: 0, routes: [{ name: 'tabs' as never }] });
		} else {
			nav.reset({ index: 0, routes: [{ name: 'tabs' as never, params: { new_account: true } }] });
		}
	};

	useEffect(() => {
		magicAuth(route?.params?.code?.split('&')[0], route?.params?.new_account);
	}, []);

	return (
		<MagicBody>
			<Block vCenter>
				<Text weight="600" size={28} center>
					Verifying your magic link
				</Text>
				<Spacer size={20} />
				<ActivityIndicator color="white" />
			</Block>
		</MagicBody>
	);
};

const MagicBody = styled.View`
	flex: 1;
	background-color: black;
	padding: 0px 20px;
`;
