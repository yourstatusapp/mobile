import * as React from 'react';
import core, { DeviceType, request, TimeFormatter } from '@core';
import { Block, Fill, IconButton, Spacer, Text } from '@parts';
import { useTheme } from 'styled-components/native';
import { usePulse } from '@pulsejs/react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type DeviceItem = ListRenderItemInfo<DeviceType>;

export const SettingsSessions: React.FC = () => {
	const { colors } = useTheme();

	const devices = usePulse(core.lists.devices.groups.mine);

	const getSessions = async () => {
		const res = await request<DeviceType[]>('get', '/account/devices');
		if (res.data) {
			core.lists.devices.collect(res.data, 'mine');
		}
	};

	const revokeDevice = async (deviceId: string) => {
		const res = await request<boolean>('delete', `/account/devices/${deviceId}/revoke`);
		if (res.data) {
		}
	};

	React.useEffect(() => {
		getSessions();
	}, []);

	const sessionRenderItem = ({ item, index }: ListRenderItemInfo<DeviceType>) => (
		<Block key={index} marginBottom={20} color={colors.white20} style={{ padding: 13, borderRadius: 8 }}>
			<Text>{item.device_type}</Text>
			<Text>{TimeFormatter(item.id)}</Text>
			{/* <Text>Notifications: {JSON.stringify(item.notifications)}</Text> */}
			<Block row color="transparent" marginTop={10}>
				<IconButton
					name="plus"
					color="white"
					backgroundColor={colors.white40}
					size={20}
					iconSize={17}
					style={{ transform: [{ rotate: '45deg' }] }}
					onPress={() => revokeDevice(item.id)}
				/>
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
		<Block color={colors.black}>
			<LinearGradient pointerEvents="none" colors={['black', 'transparent']} style={{ position: 'absolute', top: 0, zIndex: 9, width: '100%', height: 150 }} />

			<Text bold size={30} marginTop={15} marginLeft={10} style={{ zIndex: 10, position: 'absolute' }}>
				Account Sessions
			</Text>
			<FlatList
				data={devices}
				renderItem={sessionRenderItem}
				initialNumToRender={30}
				contentContainerStyle={{ paddingTop: 150, paddingHorizontal: 10 }}
				showsVerticalScrollIndicator={false}
			/>
		</Block>
	);
};
