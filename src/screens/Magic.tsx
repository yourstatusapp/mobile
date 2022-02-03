import { request } from '@core';
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
}

export const MagicView: React.FC<MagicProps> = ({ route }) => {
	const nav = useNavigation();

	const magicAuth = async (code: string, new_account: boolean) => {
		const res = await request<IAccountRequestProps>('post', '/auth/magic/verify', { data: { code } });

		if (!res) {
			// core.app.event.notification.emit({
			// 	title: 'Failed to verify magic link',
			// 	success: false,
			// 	desc: 'Send a dm to @yourstatusapp on Twitter',
			// });
			setTimeout(() => nav.goBack(), 1000);
			return;
		}

		// @ts-ignore
		core.account.state.account.set(res.data.account);

		if (!new_account) {
			nav.reset({ index: 0, routes: [{ name: 'tabs' as never }] });
		} else {
			nav.reset({ index: 0, routes: [{ name: 'tabs' as never }] });
			setTimeout(() => {
				// nav.navigate('NewUser' as never);
			}, 1000);
		}
	};

	useEffect(() => {
		magicAuth(route?.params?.code, route?.params?.new_account);
	});

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