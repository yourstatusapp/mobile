import * as React from 'react';
import core, { AppAlert, request } from '@core';
import { useTheme } from '@hooks';
import { Block, Fill, IconButton, Line, Status, Text } from '@parts';
import { FlashList } from '@shopify/flash-list';
import { useSimple } from 'simple-core-state';
import { BottomSheet, IBaseSheetProps } from '../../../parts/BottomSheet';

interface ManageStatusSheet extends IBaseSheetProps {
	manage_friends?: boolean;
}

export const ManageStatusSheet = (props: ManageStatusSheet) => {
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
		<>
			<BottomSheet {...props}>
				<Block color={theme.backgroundDark} paddingHorizontal={20}>
					<FlashList
						data={status}
						scrollEnabled={false}
						estimatedItemSize={status.length}
						contentContainerStyle={{ padding: 20 }}
						renderItem={({ item, index }) => (
							<Block key={index} marginBottom={15}>
								<Block row marginBottom={15}>
									<Status status={item} disableTap />
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
								<Line color={theme.backgroundDarker} />
							</Block>
						)}
					/>
				</Block>
			</BottomSheet>
		</>
	);
};
