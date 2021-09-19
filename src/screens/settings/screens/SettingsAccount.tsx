import core, { DeviceType, request } from '@core';
import * as React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Fill, Icon, IconButton, Row, Spacer, Text, TopHeading } from '@parts';
import { useNavigation } from '@react-navigation/native';
import { snow2time } from '../../../core/utils';
import { usePulse } from '@pulsejs/react';

interface SettingsAccountProps {}

export const SettingsAccount: React.FC<SettingsAccountProps> = (props) => {
	const theme = useTheme();
	const nav = useNavigation();

	// const [Devices, setDevices] = React.useState<Device[]>([]);
	const devices = usePulse(core.account.collection.devices.groups.mine);
	const acc = usePulse(core.account.state.ACCOUNT);
	const current_device = usePulse(core.app.state.device_id);

	const getDevices = async () => {
		const a = await request<DeviceType[]>('get', '/account/devices');
		core.account.collection.devices.collect(a, 'mine');
		// setDevices(a);
	};

	const revokeDevice = async (device_id: string) => {
		await request('delete', `/account/devices/${device_id}/revoke`);
		core.account.collection.devices.removeFromGroups(device_id, ['mine']);
	};

	React.useEffect(() => {
		getDevices();
	}, []);

	const renderItem: React.FC<{ item: DeviceType; index: number }> = ({ item, index }) => {
		return (
			<DeviceItem key={index} current={current_device === item.id}>
				{/* {current_device === item.id && <CurrentIndicator />} */}
				<Row>
					<Icon name="phone" size={20} color={theme.textFade} />
					<Spacer size={5} />
					<Text weight="semi-bold" size={18} color={theme.text}>
						{item.device_type.charAt(0).toUpperCase() + item.device_type.slice(1, item.device_type.length)}
					</Text>
					<Fill />
					{/* <Icon name="bell" size={18} color={item.notifications ? theme.primary : theme.textFade} /> */}
				</Row>
				<Spacer size={30} />

				<Row>
					<Text color={theme.textFade}>{snow2time(item.id).toLocaleString()}</Text>
					<Fill />
					<IconButton name="trash" size={20} iconSize={15} color="#FF4848" backgroundColor={theme.step3} onPress={() => revokeDevice(item.id)} />
				</Row>
			</DeviceItem>
		);
	};

	return (
		<SettingsAccountBody>
			<TopHeading text="Account" />
			<SidePadding>
				<Row>
					<Text weight="semi-bold" size={18}>
						Email:
					</Text>
					<Text size={18}> {acc.email}</Text>
				</Row>

				<Spacer size={50} />
				<Text weight="semi-bold" size={22}>
					Devices
				</Text>
				<Spacer size={5} />

				<Row>
					<GreenDot />
					<Text weight="semi-bold" style={{ paddingLeft: 5 }}>
						= Current device
					</Text>
				</Row>

				<Spacer size={10} />

				{!!devices?.length && <FlatList data={devices} renderItem={renderItem} contentContainerStyle={{ paddingTop: 20 }} showsVerticalScrollIndicator={false} />}

				<Spacer size={20} />
			</SidePadding>
		</SettingsAccountBody>
	);
};

const SettingsAccountBody = styled.View`
	flex: 1;
`;

const SidePadding = styled.View`
	padding: 0px 20px;
	flex: 1;
`;

const DeviceItem = styled.View<{ current: boolean }>`
	background-color: ${({ theme }) => theme.step1};
	margin-bottom: 15px;
	border-radius: 22px;
	padding: 15px;
	${({ current, theme }) => (current ? `border: solid 2px ${theme.primary};` : '')}
`;

const GreenDot = styled.View`
	${({ theme }) => `background-color: ${theme.primary}`};
	height: 15px;
	width: 15px;
	border-radius: 15px;
`;
