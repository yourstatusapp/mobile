import * as React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

interface FriendsProps {}

export const Friends: React.FC<FriendsProps> = (props) => {
	const {} = props;

	return (
		<FriendsBody>
			<Text>Friends</Text>
		</FriendsBody>
	);
};

const FriendsBody = styled.View`
	flex: 1;
`;
