import { IMessage } from '@core';
import { Fill, Row, Text } from '@parts';
import React from 'react';
import styled, { useTheme } from 'styled-components/native';

export const MessageEntry: React.FC<IMessage & { account_id: string }> = (item) => {
	const isSender = item.sender === item.account_id;
	const theme = useTheme();

	return (
		<MessageEntryBody pending_state={!!item?.nonce}>
			{isSender && <Fill />}
			<MessageBubble isSender={isSender}>
				<Text color={isSender ? theme.background : theme.text}>{item.content}</Text>
			</MessageBubble>
		</MessageEntryBody>
	);
};

const MessageEntryBody = styled(Row)<{ pending_state: boolean }>`
	${({ pending_state }) => (pending_state ? 'opacity: 0.5;' : '')}
	padding: 0px 20px;
`;

const MessageBubble = styled.View<{ isSender: boolean }>`
	margin-top: 5px;
	padding: 8px 12px;
	border-radius: 50px;

	${({ theme, isSender }) => `
		background-color: ${isSender ? theme.primary : theme.step1}
	`}
`;
