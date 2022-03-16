import core, { AppAlert, request, StatusType } from '@core';
import { Block, Fill, IconButton, Spacer, Status, Text } from '@parts';
import { usePulse } from '@pulsejs/react';
import React from 'react';
import { FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

export const ManageStatus = () => {
	const theme = useTheme();
	const status = usePulse(core.lists.status.groups.mine);

	const removeStatus = async (statusId: string) => {
		const res = await request<boolean>('delete', `/status/${statusId}/end`);
		if (res.data) {
			core.lists.status.remove(statusId).everywhere();
		} else {
			AppAlert(false, res.message);
		}
	};

	return (
		<Block safe color={theme.background}>
			<Text size={30} bold paddingLeft={20} paddingTop={20}>
				Manage Status
			</Text>
			<Spacer size={20} />
			<FlatList
				data={status}
				initialNumToRender={status.length}
				contentContainerStyle={{ padding: 20 }}
				renderItem={({ item, index }) => (
					<Block key={index} marginBottom={15}>
						<Block row>
							<Status status={item} />
							<Fill />
							<IconButton
								name="plus"
								iconSize={16}
								size={20}
								color={theme.textFadeLight}
								backgroundColor={theme.darker}
								style={{ transform: [{ rotate: '45deg' }] }}
								onPress={() => removeStatus(item.id)}
							/>
						</Block>
						<Line />
					</Block>
				)}
			/>
		</Block>
	);
};

const Line = styled.View`
	height: 3px;
	border-radius: 20px;
	width: 100%;
	margin-top: 20px;
	background-color: ${({ theme }) => theme.backgroundDarker};
`;
