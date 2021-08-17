import { Status } from '@core';
import { Text } from '@parts';
import * as React from 'react';
import styled, { useTheme } from 'styled-components/native';

interface StatusBoxProps extends Partial<Status> {}

export const StatusBox: React.FC<StatusBoxProps> = (p) => {
	const { data } = p;
	const theme = useTheme();

	return (
		<StatusBoxBody>
			<Box>
				<Text size={13} color={theme.text} weight="semi-bold">
					{data?.title || 'none'}
				</Text>
			</Box>
		</StatusBoxBody>
	);
};

const StatusBoxBody = styled.View`
	align-items: flex-start;
`;

const Box = styled.View`
	border: solid 1px ${({ theme }) => theme.text};
	border-radius: 16px;
	padding: 5px 12px;
`;
