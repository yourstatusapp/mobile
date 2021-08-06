import { request } from '@core';
import { Row, Spacer, TabbarContentContainer, Text, TextButton } from '@parts';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import styled, { useTheme } from 'styled-components/native';

interface VerifyProps {
	route: {
		params: { code: string };
	};
}

export const Verify: React.FC<VerifyProps> = ({ route }) => {
	const theme = useTheme();
	const nav = useNavigation();
	const [Verified, setVerified] = React.useState(false);
	const [Loaded, setLoaded] = React.useState(false);

	const verifyAccount = async (code) => {
		const a = await request('post', '/account/verify', { data: { code } });
		setVerified(true);
		setLoaded(true);
	};

	React.useEffect(() => {
		verifyAccount(route.params.code);
	}, []);

	return (
		<TabbarContentContainer>
			<Spacer size={30} />
			<Text weight="bold" size={30} center color={theme.primary}>
				Verifying Account
			</Text>
			<Spacer size={50} />
			{Verified && (
				<Row>
					<Text size={28} weight="semi-bold">
						Your account has been verified
					</Text>
					<TextButton text="Go back" center />
				</Row>
			)}
			{Loaded === false && Verified === false && (
				<>
					<Text size={18} weight="semi-bold" color="#ef5959" center>
						Failed to verify account
					</Text>
					<Spacer size={10} />
					<Row center>
						<TextButton size={18} weight="semi-bold" text="Go back" onPress={() => nav.goBack()} />
					</Row>
				</>
			)}
		</TabbarContentContainer>
	);
};
