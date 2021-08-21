import { request } from '@core';
import { Input } from '@parts';
import * as React from 'react';
import styled from 'styled-components/native';

interface NewconversationProps {}

export const Newconversation: React.FC<NewconversationProps> = (props) => {
	const {} = props;

  const getFriends = async () => {
    const a = request('get', '')
  }

	return (
		<NewconversationBody>
			<Input placeholder="Search user" />
		</NewconversationBody>
	);
};

const NewconversationBody = styled.View`
	flex: 1;
`;
