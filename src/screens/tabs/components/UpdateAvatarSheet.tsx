import * as React from 'react';
import core, { AppAlert, request } from '@core';
import { useTheme } from '@hooks';
import { Block, Fill, IconButton, Line, RoundyButton, Status, Text } from '@parts';
import { FlashList } from '@shopify/flash-list';
import { useSimple } from 'simple-core-state';
import { BottomSheet, IBaseSheetProps } from '../../../parts/BottomSheet';

interface IUpdateAvatarSheet extends IBaseSheetProps {}

export const UpdateAvatarSheet = (props: IUpdateAvatarSheet) => {
	const { theme } = useTheme();
	const status = useSimple(core.myStatus);
	const [close, setClose] = React.useState(false);

	return (
		<>
			<BottomSheet
				{...props}
				close={close}
				onClose={() => {
					setClose(false);
					props.onClose();
				}}>
				<Block color={theme.backgroundDark} paddingHorizontal={20}>
					<Text bold center marginBottom={15} size={18}>
						Update avatar
					</Text>
					<Block>
						<RoundyButton text="Use Camera" style={{ marginBottom: 15 }} />
						<RoundyButton text="Upload FIle" />
					</Block>
				</Block>
			</BottomSheet>
		</>
	);
};
