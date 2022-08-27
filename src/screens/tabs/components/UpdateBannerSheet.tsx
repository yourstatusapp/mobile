import * as React from 'react';
import { AppAlert } from '@core';
import { useNavigation, useTheme } from '@hooks';
import { Block, RoundyButton, Text } from '@parts';
import { BottomSheet, IBaseSheetProps } from '../../../parts/BottomSheet';
import { launchImageLibrary } from 'react-native-image-picker';
import { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';

interface IUpdateBannerSheet extends IBaseSheetProps {}
interface AlbumAssetType {
	path: string;
}

export const UpdateBannerSheet = (props: IUpdateBannerSheet) => {
	const { theme } = useTheme();
	const nav = useNavigation();
	// const status = useSimple(core.myStatus);
	const [close, setClose] = React.useState(false);

	const useCamera = () => {
		setClose(true);
		nav.navigate('Camera', { type: 'upload_banner' });
	};

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

	const [previewImages, setPreviewImages] = useState<AlbumAssetType[]>([]);
	const handlePermission = async () => {
		const perm = await MediaLibrary.getPermissionsAsync();

		if (!perm.granted) {
			AppAlert(false, 'failed to get access to photos');
			await MediaLibrary.requestPermissionsAsync();
		}

		let asset = await MediaLibrary.getAssetsAsync({ mediaType: 'photo' });
		let list: AlbumAssetType[] = [];

		for await (let item of asset.assets) {
			const a = await MediaLibrary.getAssetInfoAsync(item.id);
			if (a?.localUri) {
				list.push({ path: a?.localUri || '' });
			}
		}

		setPreviewImages(list);
	};

	useEffect(() => {
		// handlePermission();
	}, []);

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
						<RoundyButton text="Upload File" onPress={() => uploadFromAblum()} />
						{/* LIST OF PREVIEW PICTURES, MAY NOT BE ON THIS SCREEN BUT CODE WILL BE SAVED */}
						{/* <Block row flex={0} marginTop={15}>
							<FlashList
								horizontal
								data={previewImages}
								renderItem={item => (
									<FastImage
										source={{ uri: item.item.path }}
										style={{ height: 90, width: 90, borderRadius: 18, marginRight: 10 }}
									/>
								)}
							/>
						</Block> */}
					</Block>
				</Block>
			</BottomSheet>
		</>
	);
};
