import { Text } from '@parts';
import { route } from '@pulsejs/core';
import * as React from 'react';
import styled from 'styled-components/native';

interface FriendrequestsProps {
	route: any;
}

export const Friendrequests: React.FC<FriendrequestsProps> = (props) => {
	const { route } = props;

	React.useEffect(() => {
		console.log();
	});
	return (
		<FriendrequestsBody>
			<Text weight="semi-bold" size={26}>
				Incoming friend requests
			</Text>
			{route.params.map((v, i) => (
				<Text>test</Text>
			))}
		</FriendrequestsBody>
	);
};

const FriendrequestsBody = styled.View`
	flex: 1;
	padding: 20px;
`;
