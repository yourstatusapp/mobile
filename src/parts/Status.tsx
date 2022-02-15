import { Press, Text } from '@parts';
import React from 'react';
import styled from 'styled-components/native';
import { Button } from './Buttons';

interface StatusType {
	status: {
		id: string;
		content: string;
		type: number;
	};
}

enum StatusEventTypes {
	DEFAULT,
	STORIES_COLLECTION,
}

interface StatusTypesColors {
	[index: string]: {
		key_name: string;
		color: string;
		backColor: string;
	};
}

const colors: StatusTypesColors = {
	0: {
		key_name: 'DEFAULT',
		color: '#3D60FF',
		backColor: '#0c1b37',
	},
	1: {
		key_name: 'STORIES_COLLECTION',
		color: '#3D60FF',
		backColor: '#0c1b37',
	},
};

export const Status = React.memo(({ status }: StatusType) => {
	return (
		// <Press >
		<StatusBody backColor={colors[status.type].backColor}>
			<Text weight="600" size={13} color={colors[status.type].color}>
				{status.content}
			</Text>
		</StatusBody>
		// </Press>
	);
});

const StatusBody = styled.View<{ backColor: string }>`
	background-color: ${({ backColor }) => backColor};
	padding: 4px 7px;
	align-self: flex-start;
	border-radius: 4px;
	justify-content: center;
`;
