import * as React from 'react';
import core, { AppAlert, request } from '@core';
import { useNavigation, useTheme } from '@hooks';
import { Block, Fill, IconButton, Line, RoundyButton, Status, Text } from '@parts';
import { FlashList } from '@shopify/flash-list';
import { useSimple } from 'simple-core-state';
import { BottomSheet, IBaseSheetProps } from '../../../parts/BottomSheet';
import { useBottomSheet } from '@gorhom/bottom-sheet';

interface IUpdateBannerSheet extends IBaseSheetProps {}

export const UpdateBannerSheet = (props: IUpdateBannerSheet) => {
	const { theme } = useTheme();
	const nav = useNavigation();
	const status = useSimple(core.myStatus);
	const [close, setClose] = React.useState(false);

	const useCamera = () => {
		setClose(true);
		nav.navigate('Camera', { type: 'upload_banner' });
	};

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
						Update banner
					</Text>
					<Block>
						<RoundyButton text="Use Camera" style={{ marginBottom: 15 }} onPress={useCamera} />
						<RoundyButton text="Upload File" />
					</Block>
				</Block>
			</BottomSheet>
		</>
	);
};
