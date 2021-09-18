import { Status } from '@core';
import { Text } from '@parts';
import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled, { useTheme } from 'styled-components/native';

interface StatusBoxProps extends Partial<Status> {}

export const StatusBox: React.FC<StatusBoxProps> = (p) => {
	const { data } = p;
	const theme = useTheme();
	const nav = useNavigation();

	return (
		<StatusBoxBody onPress={() => nav.navigate('Statusinfo', { params: data })}>
			<Box>
				<Text size={13} color={theme.text} weight="semi-bold">
					{data?.title || 'none'}
				</Text>
			</Box>
		</StatusBoxBody>
	);
};

const StatusBoxBody = styled(TouchableOpacity)`
	align-items: flex-start;
`;

const Box = styled.View`
	border: solid 1px ${({ theme }) => theme.text};
	border-radius: 16px;
	padding: 3px 12px;
`;
