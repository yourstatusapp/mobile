import { Status } from '@core';
import { Spacer, Text } from '@parts';
import * as React from 'react';
import { View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { snow2time } from '../../core/utils';

interface StatusBoxProps extends Partial<Status> {}

export const StatusBox: React.FC<StatusBoxProps> = (p) => {
	const { data } = p;
	const theme = useTheme();

	return (
		<StatusBoxBody>
			<Spacer size={5} />
			<Box>
				<Text size={13} color={theme.background} style={{}}>
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
	background-color: ${({ theme }) => theme.textFade};
	border-radius: 4;
	padding: 5px;
`;
