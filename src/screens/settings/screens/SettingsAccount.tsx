import * as React from 'react';
import styled from 'styled-components/native';
import { Text } from '../../../parts';

interface SettingsAccountProps {}

export const SettingsAccount: React.FC<SettingsAccountProps> = (props) => {
	const {} = props;

	return (
		<SettingsAccountBody>
			<Text>Account</Text>
		</SettingsAccountBody>
	);
};

const SettingsAccountBody = styled.View`
	flex: 1;
`;
