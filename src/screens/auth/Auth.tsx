import * as React from 'react';
import styled from 'styled-components/native';
import { Row, Spacer } from '../../parts';
import { BaseButton } from '../../parts/Buttons';
import { Input } from '../../parts/Input';

export const Auth: React.FC = () => {
	return (
		<AuthBody>
			<Spacer size={50 * 8} />
			<Input placeholder="Email" placeholderTextColor="#6B6B6B" />
			<Spacer size={10} />
			<Row>
				<Input placeholder="Password" shrink />
				<BaseButton />
			</Row>
		</AuthBody>
	);
};

const AuthBody = styled.View`
	flex: 1;
	color: white;
	padding: 20px;
	padding-top: 50px;
	background-color: #0d0d0d;
`;
