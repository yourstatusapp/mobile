import { request } from '@core';
import { Block, IconButton, Text } from '@parts';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { CalendarWeek } from '../parts/components/Calendar/CalendarWeek';
import { useTheme } from 'styled-components';
import { DayObject, renderCalendarData, StorieType, Week } from '../parts/components/Calendar/calendar';

const TOTAL_CAL_TIME_IN_WEEKS = 1 * 52;
const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const WEEK_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export const RealtimeMomentHistory = () => {
	const nav = useNavigation();
	const theme = useTheme();
	const [List, SetList] = useState<Week[]>([]);
	const [SelectedData, SetSelectedData] = useState<DayObject>();

	const getHistory = async () => {
		const res = await request<StorieType[]>('get', '/profile/stories/history');
		if (res.data) {
			console.log(res.data.length);

			renderCalendarData();
		}
	};

	useEffect(() => {
		// getHistory();
		renderCalendarData();
	}, []);

	return (
		<Block color={theme.backgroundDarker}>
			<Text>Calendar Test</Text>
			<Text>{JSON.stringify(SelectedData?.pictures?.length)}</Text>
			<IconButton name="plus" size={25} color="white" backgroundColor="red" onPress={() => nav.goBack()} />

			<Block row flex={0} vCenter style={{ borderBottomColor: theme.x, borderBottomWidth: 1 }}>
				{WEEK_DAYS.map((item, index) => (
					<Block key={index} flex={0} vCenter hCenter style={{ width: 45, height: 45 }}>
						<Text size={18} bold>
							{item}
						</Text>
					</Block>
				))}
			</Block>

			<FlatList data={List} initialNumToRender={9} maxToRenderPerBatch={6} renderItem={CalendarWeek} />
		</Block>
	);
};
