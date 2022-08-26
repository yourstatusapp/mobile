import core, {
	AppAlert,
	IAccountRequestProps,
	MagicProps,
	request,
} from '@core';
import { Spacer, Text, Block } from '@parts';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSimple } from 'simple-core-state';
import styled from 'styled-components/native';

export const Magic: React.FC<MagicProps> = ({ route }) => {
	const nav = useNavigation();
	const account = useSimple(core.account);

	const magicAuth = async (code: string, new_account: boolean) => {
		const res = await request<IAccountRequestProps>(
			'post',
			'/auth/magic/verify',
			{
				data: { code },
			},
		);

		if (!res.data) {
			AppAlert(false, 'Failed', res.message);
			setTimeout(() => nav.goBack(), 1500);
			return;
		}

		// Set account data
		core.account.setValue(res.data.account);

		// if (res.data?.account) core.account.account.set(res.data.account); // @ts-ignore
		// if (res.data?.profile) core.profile.profile.set(res.data.profile);

		// if (res.data?.device?.id) {
		// 	core.lists.devices.collect(res.data.device, 'mine');
		// 	core.lists.devices.selectors.current.select(res.data.device.id);
		// }

		if (!new_account) {
			nav.reset({ index: 0, routes: [{ name: 'Tabs' as never }] });
		} else {
			nav.reset({
				index: 0,
				routes: [{ name: 'Tabs' as never, params: { new_account: true } }],
			});
		}
	};

	useEffect(() => {
		magicAuth(route?.params?.code?.split('&')[0], route?.params?.new_account);
	}, []);

	return (
		<MagicBody>
			<Block vCenter>
				<Text medium size={28} center>
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
