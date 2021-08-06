import { Text } from '@parts';
import * as React from 'react';
import styled from 'styled-components/native';

interface EventsListProps {}

export const EventsList: React.FC<EventsListProps> = (props) => {
	const {} = props;

	return (
		<EventsListBody>
			<Text>events</Text>
		</EventsListBody>
	);
};

const EventsListBody = styled.View`
	flex: 1;
`;
