import * as React from 'react';
import core, { AppAlert, DeviceType, request, TimeFormatter } from '@core';
import { Block, Fill, GradiantShadow, Icon, IconButton, Spacer, Text } from '@parts';
import { useTheme } from 'styled-components/native';
import { usePulse } from '@pulsejs/react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { removeNotificationPermissions } from '../../utils/PushNotification';
import { useNavigation } from '@react-navigation/native';

type DeviceItem = ListRenderItemInfo<DeviceType>;

export const SettingsSessions: React.FC = () => {
	const theme = useTheme();
	const nav = useNavigation();

	const devices = usePulse(core.lists.devices.groups.mine);
	const current_device = usePulse(core.lists.devices.selectors.current);

	const getSessions = async () => {
		const res = await request<DeviceType[]>('get', '/account/devices');
		if (res.data) {
			core.lists.devices.collect(res.data, 'mine');
		}
	};

	const revokeDevice = async (deviceId: string) => {
		const res = await request<boolean>('delete', `/account/devices/${deviceId}/revoke`);
		if (res.data) {
			// if we are revoking the current device, log out of the device
			if (current_device?.id === deviceId) {
				removeNotificationPermissions();
				nav.reset({ index: 1, routes: [{ name: 'auth' as never }] });
				core.account.account.reset();
				core.lists.devices.reset();
				core.profile.profile.reset();
				core.app.device_push_token.reset();
				core.app.notification_permission.reset();
			} else {
				AppAlert(true, res.message);
				core.lists.devices.remove(deviceId).everywhere();
			}
		} else {
			AppAlert(false, res.message);
		}
	};

	React.useEffect(() => {
		getSessions();
	}, []);

	const sessionRenderItem = ({ item, index }: ListRenderItemInfo<DeviceType>) => (
		<Block
			key={index}
			marginBottom={10}
			color={theme.background}
			style={{ padding: 13, borderRadius: 8 }}>
			<Text bold color={theme.textFade}>
				Created <Text color={theme.text}>{TimeFormatter(item.id)}</Text> ago
			</Text>
			{current_device?.id === item.id && (
				<Block row hCenter flex={0} marginTop={5}>
					<Icon name="info" size={13} color="#379bf9" />
					<Text weight="600" color="#379bf9" marginLeft={3}>
						Current Device
					</Text>
				</Block>
			)}
			<Block row color="transparent" marginTop={10}>
				{/* <IconButton
					name="plus"
					color="white"
					backgroundColor={theme.white40}
					size={20}
					iconSize={17}
					style={{ transform: [{ rotate: '45deg' }] }}
					onPress={() => revokeDevice(item.id)}
				/> */}
				<Fill />
				<IconButton
					name="plus"
					color="white"
					backgroundColor="#FF4242"
					size={17}
					iconSize={15}
					style={{ transform: [{ rotate: '45deg' }] }}
					onPress={() => revokeDevice(item.id)}
				/>
			</Block>
		</Block>
	);

	return (
		<Block color={theme.backgroundDarker}>
			{/* <LinearGradient
				pointerEvents="none"
				colors={[theme.background, theme.name === 'light' ? :]}
				style={{ position: 'absolute', top: 0, zIndex: 9, width: '100%', height: 150 }}
			/> */}
			{/* <Block paddingBottom={20} color={theme.background}></Block> */}
			{/* <GradiantShadow height={50} style={{ position: 'absolute', top: 0, zIndex: 9 }} /> */}

			<Text bold size={30} marginTop={15} marginLeft={20} paddingBottom={5}>
				Account Sessions
			</Text>
			<FlatList
				data={devices}
				renderItem={sessionRenderItem}
				initialNumToRender={30}
				contentContainerStyle={{ paddingTop: 20, paddingHorizontal: 20 }}
				showsVerticalScrollIndicator={false}
			/>
		</Block>
	);
};
