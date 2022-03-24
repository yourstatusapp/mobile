import { request, snow2time } from '@core';
import { Block, IconButton, Text } from '@parts';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItem, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'styled-components';

interface StorieType {
	id: string;
	picture: string;
}

interface DayObject {
	date?: string;
	pictures?: StorieType[];
	empty?: boolean;
}

type Week = {
	week?: DayObject[];
	headingText?: string;
};

const TOTAL_CAL_TIME_IN_WEEKS = 1 * 52;
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const WEEK_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export const RealtimeMomentHistory = () => {
	const nav = useNavigation();
	const theme = useTheme();
	const [List, SetList] = useState<Week[]>([]);
	const [SelectedData, SetSelectedData] = useState<DayObject>();

	const getHistory = async () => {
		const res = await request<StorieType[]>('get', '/profile/stories/history');
		if (res.data) {
			renderCalendarData(res.data);
		}
	};

	const renderCalendarData = (list: StorieType[]) => {
		let d = new Date();
		d.setDate(1);
		d.setMonth(0);
		// d.setMonth(new Date().setFullYear(new Date().getFullYear() - 1));

		// console.log('Date' + JSON.stringify(d));
		// console.log(new Date());

		let tempList: Week[] = [];
		let emptyDaysBeAdded = 0;

		// before we start to generate the list
		// we need to check what day we start with the current date
		// console.log(d.getUTCDate());

		emptyDaysBeAdded = d.getUTCDate();

		// we have to create the weeks
		for (let WeekIndex = 0; WeekIndex < TOTAL_CAL_TIME_IN_WEEKS; WeekIndex++) {
			let week: DayObject[] = [];
			let DayIndex = 1;

			// for every week we need to get the lats day of the month to keep track
			const lastDayofCurrentMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();

			// we loop 7 times to fill a week
			for (null; DayIndex <= 7; DayIndex++) {
				// Check if its the first day of the date to set the new month
				if (d.getDate() === 1) {
					// Add the heading to the list
					tempList.push({ headingText: `${MONTHS[d.getUTCMonth()]} ${d.getFullYear()}` });

					// Check if we have to align the first day of the month with the weekday
					if (emptyDaysBeAdded !== 0) {
						// console.log('going to add ' + emptyDaysBeAdded);
						for (let a = 0; a < emptyDaysBeAdded; a++) {
							week.push({ empty: true });
						}

						DayIndex = emptyDaysBeAdded + DayIndex;
						emptyDaysBeAdded = 0;
					}
				}

				// Check if its the end of the month, than we make empty spaces
				if (d.getDate() === lastDayofCurrentMonth) {
					// check ifs 0 than we no if its untouch yet
					if (emptyDaysBeAdded === 0) {
						// if in case the last day is also on a sunday (last day of the week)
						// then we don't have to do anything about adding extra days for the next month
						if (DayIndex !== 7) {
							// add the amoun of days we are already into the week so that will added next week to align days
							emptyDaysBeAdded = DayIndex - 1;
						}
					}

					// add empty days
					week.push({ empty: true });

					// if its the last day of the week, we cotinue with the next day
					if (DayIndex === 7) {
						d.setDate(d.getDate() + 1);
					}
				} else {
					let n: StorieType[] = [];

					// TODO: imrpove this by removing the already added elements
					const b = list.filter(v => snow2time(v.id).getDate() === d.getDate());
					n.push(...b);

					week.push({ date: d.getDate().toString(), pictures: n });
					d.setDate(d.getDate() + 1);
				}
			}

			tempList.push({ week: week });

			// tempList.push({ empty: : true })
		}
		SetList(tempList);
		// console.log(tempList);
	};

	useEffect(() => {
		getHistory();
	}, []);

	const renderItem: ListRenderItem<Week> = React.useCallback(({ item, index }) => {
		return (
			<Block key={index.toString()} marginTop={item.headingText ? 30 : 0} paddingHorizontal={38}>
				{item.headingText && (
					<Text bold size={18} marginBottom={15}>
						{item.headingText}
					</Text>
				)}

				<Block row color="#191919" style={{ alignItems: 'flex-start' }} vCenter>
					{!!item?.week?.length &&
						item?.week.map((item2, index2) => (
							<Block key={index2} flex={0} vCenter hCenter style={{ width: 45, height: 45 }}>
								{/*{!item2.empty && (*/}
								{/*	<TouchableOpacity key={index2} activeOpacity={0.6} style={{ backgroundColor: theme.textFadeLight, height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>*/}
								{/*		<Text size={18} bold>*/}
								{/*			{item2.date}*/}
								{/*		</Text>*/}
								{/*	</TouchableOpacity>*/}
								{/*)}*/}

								{!item2.empty ? (
									<TouchableOpacity
										key={index2}
										onPress={() => SetSelectedData(item2)}
										activeOpacity={0.6}
										style={{
											backgroundColor: !!item2.pictures?.length ? theme.primary : theme.darker,
											height: '100%',
											width: '100%',
											justifyContent: 'center',
											alignItems: 'center',
										}}>
										<Text size={18} bold>
											{item2.date}
										</Text>
									</TouchableOpacity>
								) : (
									<View
										style={{ backgroundColor: theme.backgroundDarker, height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}></View>
								)}
							</Block>
						))}
				</Block>
			</Block>
		);
	}, []);

	return (
		<Block color={theme.backgroundDarker}>
			<Text>Calendar Test</Text>
			<Text>{JSON.stringify(SelectedData?.pictures?.length)}</Text>
			<IconButton name="plus" size={25} color="white" backgroundColor="red" onPress={() => nav.goBack()} />

			<Block row flex={0} vCenter style={{ borderBottomColor: theme.textFade, borderBottomWidth: 1 }}>
				{WEEK_DAYS.map((item, index) => (
					<Block key={index} flex={0} vCenter hCenter style={{ width: 45, height: 45 }}>
						<Text size={18} bold>
							{item}
						</Text>
					</Block>
				))}
			</Block>

			<FlatList data={List} initialNumToRender={30} renderItem={renderItem} />
		</Block>
	);
};

// let d = new Date(new Date().setDate(1));
// console.log(d.toUTCString());
// d.setDate(new Date().setDate(new Date().getDate() - 1));
// d.setMonth(new Date().setFullYear(new Date().getFullYear() - 1));

// const MONTHS = [
// 	"January",
// 	"February",
// 	"March",
// 	"April",
// 	"May",
// 	"June",
// 	"July",
// 	"August",
// 	"September",
// 	"October",
// 	"November",
// 	"December"
// ];

// const TOTAL_CAL_TIME_IN_WEEKS = 52;

// const main = () => {
// 	let tempList = [];
// 	let emptyDaysBeAdded = 0;
//
// 	// before we start to generate the list
// 	// we need to check what day we start with the current date
// 	// console.log(d.getUTCDate());
//
// 	// we have to create the weeks
// 	for (let WeekIndex = 0; WeekIndex < TOTAL_CAL_TIME_IN_WEEKS; WeekIndex++) {
// 		let week = [];
// 		let DayIndex = 1;
//
// 		// for every week we need to get the lats day of the month to keep track
// 		const lastDayofCurrentMonth = new Date(
// 			d.getFullYear(),
// 			d.getMonth() + 1,
// 			0
// 		).getDate();
//
// 		// we loop 7 times to fill a week
// 		for (null; DayIndex <= 7; DayIndex++) {
// 			// Check if its the first day of the date to set the new month
// 			if (d.getDate() === 1) {
// 				// Add the heading to the list
// 				tempList.push([{ headingText: MONTHS[d.getUTCMonth()] }]);
//
// 				// Check if we have to align the first day of the month with the weekday
// 				if (emptyDaysBeAdded !== 0) {
// 					console.log("going to add " + emptyDaysBeAdded);
// 					for (let a = 0; a < emptyDaysBeAdded; a++) {
// 						week.push({ empty: true });
// 					}
//
// 					DayIndex = emptyDaysBeAdded + DayIndex;
// 					emptyDaysBeAdded = 0;
// 					// continue;
// 				}
// 			}
//
// 			// Check if its the end of the month, than we make empty spaces
// 			if (d.getDate() === lastDayofCurrentMonth) {
// 				// check ifs 0 than we no if its untouch yet
// 				if (emptyDaysBeAdded === 0) {
// 					// if in case the last day is also on a sunday (last day of the week)
// 					// then we don't have to do anything about adding extra days for the next month
// 					if (DayIndex !== 7) {
// 						// add the amoun of days we are already into the week so that will added next week to align days
// 						emptyDaysBeAdded = DayIndex - 1;
// 					}
// 				}
//
// 				// add empty days
// 				week.push({ empty: true });
//
// 				// if its the last day of the week, we cotinue with the next day
// 				if (DayIndex === 7) {
// 					d.setDate(d.getDate() + 1);
// 				}
// 			} else {
// 				// console.log(d.getDate().toString());
// 				week.push({ date: d.getDate().toString() });
// 				d.setDate(d.getDate() + 1);
// 			}
// 		}
//
// 		tempList.push(week);
//
// 		// tempList.push({ empty: : true })
// 	}
//
// 	console.log(tempList);
// };

// main();
