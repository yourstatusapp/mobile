import { Block, IconButton, Line, Text } from '@parts';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { TabbarHeader } from '../parts/components/TabbarHeader';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@hooks';
import { request } from '@core';
import dayjs from 'dayjs';

interface EventType {
	id: string;
	account_id: string;
	title: string;
	description: string;
	start_date: string;
	end_date?: string;
	location?: string;
}

type ParamList = {
	Event: {
		event_id: string;
		message: string;
	};
};

export const Event = () => {
	const theme = useTheme();
	const { params } = useRoute<RouteProp<ParamList>>();
	const nav = useNavigation();

	const [details, setDetails] = useState<EventType>();

	const getDetails = async () => {
		const res = await request<EventType>('get', '/events/' + params.event_id);
		if (res?.success) {
			setDetails(res.data);
		}
	};

	useEffect(() => {
		getDetails();
	}, []);

	return (
		<Block color={theme.background}>
			<TabbarHeader color={theme.backgroundDark} />
			<Block row style={{ height: 40 }} flex={0} vCenter hCenter color={theme.backgroundDark}>
				<IconButton
					name="arrow"
					size={24}
					iconSize={16}
					color={theme.text}
					backgroundColor={theme.darker}
					style={{ position: 'absolute', left: 15 }}
					onPress={() => nav.goBack()}
				/>
				{/* <Text bold size={18}>
					{params?.username} Status
				</Text> */}
			</Block>
			<Block hCenter flex={0} paddingBottom={15} color={theme.backgroundDark}>
				{/* <Status status={params?.status} disableNavigate={true} /> */}
			</Block>
			<Line size={2} color={theme.backgroundDarker} />
			{details ? (
				<Block paddingHorizontal={10}>
					<Text size={26} bold marginBottom={20} marginTop={10}>
						{details?.title}
					</Text>
					<Text>{details?.description}</Text>
					<Text marginTop={50} color={theme.textFade}>
						When: {dayjs(details.start_date).format('MMM d, YYYY')}
					</Text>
					{!!details?.location && (
						<Text marginTop={50} color={theme.textFade}>
							Where: {details.location}
						</Text>
					)}
					{!!details?.end_date && (
						<Text marginTop={50} color={theme.textFade}>
							When: {dayjs(details.end_date).format('MMM d, YYYY')}
						</Text>
					)}
				</Block>
			) : (
				<Text>No event found</Text>
			)}
		</Block>
	);
};
