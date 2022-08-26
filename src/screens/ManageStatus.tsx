import core, { AppAlert, request, StatusType } from '@core';
import { useTheme } from '@hooks';
import { Block, Fill, IconButton, Spacer, Status, TabbarHeader, Text } from '@parts';
import React from 'react';
import { FlatList } from 'react-native';
import { useSimple } from 'simple-core-state';
import styled from 'styled-components/native';

export const ManageStatus = () => {
	const { theme } = useTheme();
	const status = useSimple(core.myStatus);

	const removeStatus = async (statusId: string) => {
		const res = await request<boolean>('delete', `/status/${statusId}/end`);
		if (res.data) {
			// core.lists.status.remove(statusId).everywhere();
		} else {
			AppAlert(false, res.message);
		}
	};

	return (
		<Block safe color={theme.background}>
			<TabbarHeader />
			{/* <ModalHeader title="Manage Status" /> */}

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
