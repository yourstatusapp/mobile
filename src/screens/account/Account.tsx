import * as React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

interface AccountProps {}

export const Account: React.FC<AccountProps> = (props) => {
	const {} = props;

	return (
		<AccountBody>
			<Text>account</Text>
		</AccountBody>
	);
};

const AccountBody = styled.View`
	flex: 1;
`;
