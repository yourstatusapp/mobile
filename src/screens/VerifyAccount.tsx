import { AppAlert, request } from '@core';
import { Block, Spacer, Status, Text, TextButton } from '@parts';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type VerifyProps = {
	Camera: {
		code: string;
	};
};

export const VerifyAccount = () => {
	const { params } = useRoute<RouteProp<VerifyProps, 'Camera'>>();
	const nav = useNavigation();
	const [Failed, SetFailed] = useState(false);

	const verifyAccount = async (verifyCode: string) => {
		const res = await request('post', '/account/verify', { data: { code: verifyCode } });

		if (res.data) {
			AppAlert(true, res.message);
		} else {
			AppAlert(false, res.message);
		}
	};

	useEffect(() => {
		if (params?.code) {
			verifyAccount(params.code);
		} else {
			SetFailed(true);
		}
	}, []);

	return (
		<Block safe vCenter>
			<LinearGradient
				pointerEvents="none"
				colors={['#05091d', 'transparent']}
				style={{ position: 'absolute', top: 0, zIndex: 52, width: '100%', height: 450 }}
			/>

			{Failed ? (
				<Block flex={0} vCenter hCenter>
					<Text>Something went wrong, sessions invalid / expired</Text>
					<TextButton onPress={() => nav.goBack()} text="Close" style={{ alignSelf: 'center', marginTop: 20, padding: 5 }} />
				</Block>
			) : (
				<Block flex={0} vCenter hCenter>
					<Status demo status={{ content: 'Verifing account...', type: 0 }} style={{ transform: [{ scale: 1.1 }] }} />
					<Spacer size={20} />
					<ActivityIndicator />
				</Block>
			)}

			{/* <Text center bold>
				Verifing account...
			</Text> */}
		</Block>
	);
};
