import core, { Device, request } from '@core';
import * as React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Fill, IconButton, Row, Spacer, Text, TopHeading } from '@parts';
import { useNavigation } from '@react-navigation/native';
import { snow2time } from '../../../core/utils';
import { usePulse } from '@pulsejs/react';

interface SettingsAccountProps {}

export const SettingsAccount: React.FC<SettingsAccountProps> = (props) => {
	const theme = useTheme();
	const nav = useNavigation();
	const [Devices, setDevices] = React.useState<Device[]>([]);
	const acc = usePulse(core.account.state.ACCOUNT);

	const getDevices = async () => {
		const a = await request<Device[]>('get', '/account/devices');
		setDevices(a);
	};

	const revokeDevice = async (device_id: string) => {
		await request('delete', `/account/devices/${device_id}/revoke`);
	};

	React.useEffect(() => {
		getDevices();
	}, []);

	const renderItem = ({ item, index }) => {
		return (
			<DeviceItem key={index}>
				<Text weight="semi-bold" color={theme.text}>
					{item.user_agent.slice(0, 40)}
				</Text>
				<Spacer size={10} />
				<TouchableOpacity activeOpacity={0.5}>
					<Text color={theme.text}>
						{item.ip.split('/')[0].slice(0, 4) +
							item.ip
								.split('/')[0]
								.slice(4, item.ip.length)
								.replaceAll(/([0-9])/g, 'x')}
					</Text>
				</TouchableOpacity>
				<Spacer size={35} />

				<Row>
					<Text color={theme.textFade}>{snow2time(item.id).toLocaleString()}</Text>
					<Fill />
					<IconButton name="trash" size={30} color="#FF4848" backgroundColor={theme.step3} onPress={() => revokeDevice(item.id)} />
				</Row>
			</DeviceItem>
		);
	};

	return (
		<SettingsAccountBody>
			<TopHeading text="Account" />
			<SidePadding>
				<Text>{acc.email}</Text>
				<Spacer size={50} />
				<Text weight="semi-bold" size={22}>
					Devices
				</Text>
				<Spacer size={5} />
				<FlatList data={Devices} renderItem={renderItem} contentContainerStyle={{ paddingTop: 20 }} />
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

const DeviceItem = styled.View`
	background-color: ${({ theme }) => theme.step1};
	margin-bottom: 10px;
	border-radius: 12px;
	padding: 10px;
`;
