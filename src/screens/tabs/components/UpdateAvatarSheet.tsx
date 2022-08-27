import * as React from 'react';
import core, { AppAlert, request } from '@core';
import { useNavigation, useTheme } from '@hooks';
import { Block, Fill, IconButton, Line, RoundyButton, Status, Text } from '@parts';
import { FlashList } from '@shopify/flash-list';
import { useSimple } from 'simple-core-state';
import { BottomSheet, IBaseSheetProps } from '../../../parts/BottomSheet';
import { launchImageLibrary } from 'react-native-image-picker';

interface IUpdateAvatarSheet extends IBaseSheetProps {}

export const UpdateAvatarSheet = (props: IUpdateAvatarSheet) => {
	const { theme } = useTheme();
	const nav = useNavigation();
	const status = useSimple(core.myStatus);
	const [close, setClose] = React.useState(false);

	const uploadFromAblum = async () => {
		const result = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });
		if (!!result?.assets?.length) {
			console.log(result.assets[0]);
			if (result.assets[0]?.uri) {
				nav.navigate('PreviewUpload', { image: result.assets[0]?.uri, type: 'upload_banner' });
				setClose(true);
			}
		}
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
						Update avatar
					</Text>
					<Block>
						<RoundyButton text="Use Camera" style={{ marginBottom: 15 }} />
						<RoundyButton text="Upload FIle" onPress={uploadFromAblum} />
					</Block>
				</Block>
			</BottomSheet>
		</>
	);
};
