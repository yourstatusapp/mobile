import { Block, Icon, RoundyButton, Text } from '@parts';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { DBRConfig, decode, TextResult } from 'vision-camera-dynamsoft-barcode-reader';
import * as REA from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@hooks';
import core, { AppAlert, IAccountRequestProps, request } from '@core';

export const MagicAuthScanner = () => {
	const theme = useTheme();
	const nav = useNavigation();
	const devices = useCameraDevices('dual-camera');
	const device = devices.back;

	const [failedCodes, setFailedCodes] = useState<string[]>([]);
	const [barcodeResults, setBarcodeResults] = useState([] as TextResult[]);
	const [foundLink, setFoundLink] = useState<string>();
	const [validateLoading, setValidateLoading] = useState(false);
	const [failedCodesFound, setFailedCodesFound] = useState(false);
	// const onQRCodeDetected = useCallback((qrCode: string) => {
	// 	navigation.push('ProductPage', { productId: qrCode });
	// }, []);

	const frameProcessor = useFrameProcessor(frame => {
		'worklet';
		const config: DBRConfig = {};
		config.template =
			'{"ImageParameter":{"BarcodeFormatIds":["BF_QR_CODE"],"Description":"","Name":"Settings"},"Version":"3.0"}'; //scan qrcode only

		const results: TextResult[] = decode(frame, config);
		REA.runOnJS(setBarcodeResults)(results);
	}, []);

	const validateCode = useCallback(
		async (code: string) => {
			setValidateLoading(true);
			setFailedCodes(v => [...v, code]);

			if (!code) {
				setValidateLoading(false);
				setFoundLink(undefined);
			}

			console.log(code);

			const res = await request<IAccountRequestProps>('post', '/auth/magic/verify', {
				data: { code },
			});

			if (!res.data) {
				setValidateLoading(false);
				setFoundLink(undefined);
				return;
			}

			if (res.data?.account) {
				core.account.account.set(res.data.account);
			}

			if (res.data?.profile) {
				core.profile.profile.set(res.data.profile);
			}

			if (res.data?.device?.id) {
				core.lists.devices.collect(res.data.device, 'mine');
				core.lists.devices.selectors.current.select(res.data.device.id);
			}

			nav.reset({ index: 0, routes: [{ name: 'tabs' as never }] });
			// TODO: fix this
			// if (!new_account) {
			// 	nav.reset({ index: 0, routes: [{ name: 'tabs' as never }] });
			// } else {
			// 	nav.reset({ index: 0, routes: [{ name: 'tabs' as never, params: { new_account: true } }] });
			// }
		},
		[nav],
	);

	const handleBarcodeResults = useCallback(() => {
		const barcodeText = barcodeResults[0]?.barcodeText || '';
		if (barcodeText) {
			if (!validateLoading) {
				// Check if the text include the magic code
				if (barcodeText.includes('magic?code=')) {
					if (failedCodes.includes(barcodeText.split('code=')[1])) {
						setFailedCodesFound(true);
					} else {
						setFoundLink(barcodeText);
						validateCode(barcodeText.split('code=')[1]);
					}
				}
			}
		}
	}, [barcodeResults, failedCodes, validateCode, validateLoading]);

	useEffect(() => {
		handleBarcodeResults();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [barcodeResults]);

	if (device == null) {
		return (
			<Block>
				<Text>Loading</Text>
			</Block>
		);
	}

	return (
		<Block color="black" safe>
			<Block paddingHorizontal={10} marginLeft={10} flex={1}>
				<Block
					style={{ alignSelf: 'center', position: 'absolute', zIndex: 30, top: 20 }}
					flex={0}
					vCenter
					row>
					<Block
						flex={0}
						style={{
							alignSelf: 'center',
							flexGrow: 0,
							justifyContent: 'center',
							width: 170,
							padding: 12,
							borderRadius: 12,
						}}
						color={'black'}>
						<Text bold size={16} center>
							Scan the qr code
						</Text>
					</Block>
				</Block>
				<Camera
					frameProcessor={frameProcessor}
					style={[StyleSheet.absoluteFill, { borderRadius: 6, marginRight: 20 }]}
					device={device}
					isActive={true}
				/>
			</Block>
			<Block style={{ height: 100 }} flex={0} vCenter paddingHorizontal={10} hCenter>
				{/* <Text>{JSON.stringify(failedCodes)}</Text> */}
				{foundLink && (
					<Block
						row
						color={theme.primary2}
						style={{ height: 37, width: 175, borderRadius: 40 }}
						flex={0}
						hCenter
						vCenter>
						<Icon name="sparkle" color="white" size={20} />
						<Text bold marginLeft={8}>
							Login Link Found
						</Text>
					</Block>
				)}
			</Block>
			{/* <Text marginTop={50}>{JSON.stringify(barcodeResults)}</Text> */}
			{/* <Text marginTop={50}>{JSON.stringify(foundLink)}</Text> */}
		</Block>
	);
};
