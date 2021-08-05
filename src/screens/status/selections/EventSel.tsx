import { Input, Text } from '@parts';
import * as React from 'react';
import styled from 'styled-components/native';

interface EventSelProps {}

export const EventSel: React.FC<EventSelProps> = (props) => {
	const {} = props;

	return (
		<EventSelBody>
			<Text weight="semi-bold" size={22}>
				Create Evennt
			</Text>
			<Input placeholder="Title" />
		</EventSelBody>
	);
};

const EventSelBody = styled.View`
	flex: 1;
`;
