import core, { request } from '@core';
import { Row, Spacer, Text } from '@parts';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect } from 'react';
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
	status: any;
	device: {
		id: string;
		notifications: boolean;
	};
}

export const MagicView: React.FC<MagicProps> = (props) => {
	const { route } = props;
	const nav = useNavigation();

	const magicAuth = async (code: string, new_account: boolean) => {
		const res = await request<IAccountRequestProps>('post', '/auth/magic/verify', { data: { code } });
		
		if (!res) {
			core.app.event.notification.emit({ title: 'Failed to verify magic link', type: 'error', desc: 'Send a dm to @yourstatusapp on Twitter' });
			setTimeout(() => nav.goBack(), 1000);
			return;
		}

		// set states
		core.account.state.ACCOUNT.set(res.account);
		core.profile.state.PROFILE.set(res.profile);
		core.status.state.my_status.set(res.status);
		core.app.state.device_id.set(res.device.id);
		core.account.collection.devices.collect(res.device, 'mine');
		core.account.collection.devices.selectors.current.select(res.device.id);

		if (!new_account) {
			nav.reset({ index: 0, routes: [{ name: 'App' }] });
		} else {
			nav.reset({ index: 0, routes: [{ name: 'App' }] });
			setTimeout(() => {
				nav.navigate('NewUser');
			}, 1000);
		}
	};

	useEffect(() => {
		magicAuth(route.params.code, route.params.new_account);
	});

	return (
		<MagicBody>
			<Spacer size={100} />
			<Text weight="semi-bold" size={28} center>
				Verifing your magic link
			</Text>
			<Spacer size={40} />
			<Row center>
				<ActivityIndicator />
			</Row>
		</MagicBody>
	);
};

const MagicBody = styled.View`
	flex: 1;
`;
