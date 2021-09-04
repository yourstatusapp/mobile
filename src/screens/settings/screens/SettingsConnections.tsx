import core, { IConnectionType, request } from '@core';
import { Row, Spacer, Text } from '@parts';
import { usePulse } from '@pulsejs/react';
import * as React from 'react';
import { useEffect } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';

interface SettingsConnectionsProps {}

export const SettingsConnections: React.FC<SettingsConnectionsProps> = (props) => {
	const {} = props;

	const conns = usePulse(core.connections.collection.groups.mine);

	const getConnections = async () => {
		const a = await request<IConnectionType[]>('get', '/account/connection');
		core.connections.collection.collect(a, 'mine');
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
			<SidePadding>
				<Text>Connections</Text>
				<FlatList data={conns} renderItem={renderItem} />
			</SidePadding>
		</SettingsConnectionsBody>
	);
};

const SettingsConnectionsBody = styled.View``;

const SidePadding = styled.View`
	padding: 0px 20px;
	flex: 1;
`;
