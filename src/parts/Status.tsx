import { Text } from '@parts';
import React from 'react';
import styled from 'styled-components/native';

interface StatusType {
	status: {
		id: string;
		content: string;
		type: number;
	};
}

export const Status = React.memo(({ status }: StatusType) => {
	return (
		<StatusBody>
			<Text weight="600" size={13} color="#3D60FF">
				{status.content}
			</Text>
		</StatusBody>
	);
});

const StatusBody = styled.View`
	background-color: #0c1b37;
	/* padding: 2px 5px; */
	padding: 4px 7px;
	align-self: flex-start;
	border-radius: 4px;
	justify-content: center;
`;
