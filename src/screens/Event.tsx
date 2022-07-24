import { Block, IconButton, Line, Text } from '@parts';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { TabbarHeader } from '../parts/components/TabbarHeader';
import { useNavigation, useTheme } from '@hooks';
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
	const { theme } = useTheme();
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
			<TabbarHeader color={theme.backgroundDark} backButton />
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
