import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import styled from 'styled-components/native';
import { Fill, Row, Spacer } from '../../parts';
import { IconButton } from '../../parts/Buttons';
import { Input } from '../../parts/Input';

export const Auth: React.FC = () => {
	const inputStyle = {
		placeholder: 'password',
		placeholderTextColor: '#6B6B6B',
		selectionColor: '#C74242',
	};

	const nav = useNavigation();

	return (
		<AuthBody>
			<Spacer size={50 * 8} />
			<Input {...inputStyle} placeholder="Email" />
			<Spacer size={10} />
			<Row>
				<Input {...inputStyle} placeholder="Password" shrink />
				<Spacer size={10} />
				<IconButton onPress={() => nav.navigate('')} name="arrow-big" size={58} color="#0E0E0E" backgroundColor="#C74141" />
			</Row>
			<Fill />
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
