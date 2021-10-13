import { niceTime, request, snow2time } from '@core';
import { Text, TopHeading, StatusBox, SidePadding, Row, Spacer } from '@parts';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

interface StatushistoryProps {}

export const Statushistory: React.FC<StatushistoryProps> = (props) => {
	const {} = props;
	const theme = useTheme();
	const [History, setHistory] = useState<any[]>([]);

	const getHistory = async () => {
		const a = await request<any[]>('get', '/status/history');
		setHistory(a);
	};

	useEffect(() => {
		getHistory();
	}, []);

	const renderItem = ({ item, index }) => (
		<StatusBoxContainer key={index}>
			<StatusBox {...item} disableTap />
			<Spacer size={10} />
			<Text color={theme.textFade}>{snow2time(item.id).toLocaleString()}</Text>
			{/* <Text>{niceTime(item.id)}</Text> */}
		</StatusBoxContainer>
	);

	return (
		<StatushistoryBody>
			<TopHeading />
			<FlatList data={History} renderItem={renderItem} initialNumToRender={50} contentContainerStyle={{ paddingTop: 10, paddingHorizontal: 20 }} />
		</StatushistoryBody>
	);
};

const StatushistoryBody = styled.View`
	flex: 1;
`;

const StatusBoxContainer = styled.View`
	margin-bottom: 20px;
`;
