import { Text } from '@parts';
import * as React from 'react';
import styled from 'styled-components/native';

interface StatusinfoScreenProps {
	navigation: any;
	route: { params: any };
}

export const StatusinfoScreen: React.FC<StatusinfoScreenProps> = (props) => {
	const {} = props;
	const data = props.route.params;

	console.log(data);

	return (
		<StatusinfoScreenBody>
			<Text>{JSON.stringify(data)}</Text>
		</StatusinfoScreenBody>
	);
};

const StatusinfoScreenBody = styled.View`
	flex: 1;
	padding: 20px;
`;
