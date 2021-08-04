import core, { request } from '@core';
import { Spacer, Text } from '@parts';
import { RouteProp, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components/native';

interface MagicProps {
	navigation: any;
	route: {
		key: string;
		name: string;
		params: { code: string };
		state: string;
	};
}

export const Magic: React.FC<MagicProps> = (props) => {
	const nav = useNavigation();

	const magicAuth = async (code: string) => {
		const a = await request<{ account: any; profile: any }>('post', '/auth/magic/verify', { data: { code } });

		core.account.state.ACCOUNT.set(a.account);
		core.profile.state.PROFILE.set(a.profile);
		nav.navigate('App');
	};

	useEffect(() => {
		magicAuth(props.route.params.code);
	});

	return (
		<MagicBody>
			<Spacer size={50} />
			<Text weight="semi-bold" size={28} center>
				Verifing your magic link
			</Text>
		</MagicBody>
	);
};

const MagicBody = styled.View`
	flex: 1;
`;
