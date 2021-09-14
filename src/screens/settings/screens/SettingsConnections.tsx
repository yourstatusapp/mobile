import core, { IConnectionType, request } from '@core';
import { BaseButton, Icon, Row, Spacer, Text, TopHeading } from '@parts';
import { usePulse } from '@pulsejs/react';
import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { useEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

interface SettingsConnectionsProps {}

export const SettingsConnections: React.FC<SettingsConnectionsProps> = (props) => {
	const {} = props;
	const nav = useNavigation();
	const conns = usePulse(core.connections.collection.groups.mine);

	const getConnections = async () => {
		const a = await request<IConnectionType[]>('get', '/account/connection');
		core.connections.collection.collect(a, 'mine');
	};

	const createCallback = async () => {
		const url = await request('get', '/account/connection/spotify');
		nav.navigate('Browser', { url });
	};

	useEffect(() => {
		getConnections();
	}, []);

	const renderItem = ({ item, index }) => (
		<Row key={index}>
			<Text>{item.id}</Text>
			<Spacer size={15} />
			<Text color="white">{item.type}</Text>
		</Row>
	);

	return (
		<SettingsConnectionsBody>
			<TopHeading text="Connections" />
			<SidePadding>
				<Spacer size={10} />
				<ConnectionButton text="Spotify" icon="spotify" iconColor="#1BD760" onPress={() => createCallback()} />
				<FlatList data={conns} renderItem={renderItem} />
			</SidePadding>
		</SettingsConnectionsBody>
	);
};

const SettingsConnectionsBody = styled.View`
	flex: 1;
`;

const SidePadding = styled.View`
	padding: 0px 15px;
	flex: 1;
	align-items: flex-start;
`;

interface ConnectionBtnConf {
	text: string;
	onPress?: () => void;
	icon?: string;
	iconColor?: string;
}

const ConnectionButton: React.FC<ConnectionBtnConf> = (p) => {
	return (
		<ConnectionBtnBody onPress={p.onPress} activeOpacity={0.6}>
			<Icon name={p.icon || ''} size={25} color={p.iconColor} />
			<ConnectionText weight="semi-bold" size={17}>
				{p.text}
			</ConnectionText>
		</ConnectionBtnBody>
	);
};

const ConnectionBtnBody = styled(TouchableOpacity)`
	background-color: ${({ theme }) => theme.step1};
	padding: 10px;
	border-radius: 12px;
	/* justify-content: center; */
	align-items: center;
	flex-direction: row;
`;

const ConnectionText = styled(Text)`
	padding: 0px 25px;
`;
