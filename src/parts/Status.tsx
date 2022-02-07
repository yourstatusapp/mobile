import { Text } from '@parts';
import React from 'react';
import styled from 'styled-components/native';

interface StatusType {
	status: {
		id: string;
		data: { title: string };
	};
}

export const Status = React.memo(({ status }: StatusType) => {
	return (
		<StatusBody>
			<Text weight="500" size={13} color="#3D60FF" style={{}}>
				{status.data.title}
			</Text>
		</StatusBody>
	);
});

const StatusBody = styled.View`
	background-color: #0c1b37;
	/* background-color: yellow; */
	padding: 2px 4px;
	align-self: flex-start;
	border-radius: 4px;
	justify-content: center;
	/* opacity: 0.6;
	border: solid 1px #ffffff;
	align-self: center;
	padding: 2px 8px;
	border-radius: 90px; */
`;
