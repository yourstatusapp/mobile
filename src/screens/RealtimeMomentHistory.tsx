import { Block, Fill, IconButton, Text } from '@parts';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useTheme } from 'styled-components';

interface DayObject {
	date: string;
	empty: boolean;
}

type Week = {
	week: DayObject[];
	newMonth: boolean;
	headingText: string;
};

const TOTAL_CAL_TIME_IN_WEEKS = 2 * 52;
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEK_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export const RealtimeMomentHistory = () => {
	const nav = useNavigation();
	const { colors } = useTheme();
	const [List, SetList] = useState<Week[]>([]);

	const renderList = () => {
		let tempList: Week[] = [];

		let d = new Date(new Date().setDate(1));

		let emptyStartDays = 0;
		let newMonth = false;

		// loop the amount of weeks we set up
		for (let WeekIndex = 0; WeekIndex < TOTAL_CAL_TIME_IN_WEEKS; WeekIndex++) {
			// define the week object
			let w: Week = { week: [], newMonth: false, headingText: '' };

			// generate the week by looping 7 days to build an array list of 7 items
			for (let DayIndex = 0; DayIndex <= 6; DayIndex++) {
				// TODO: Check if we need to fill up the array with empty spots from the previous month
				if (newMonth && emptyStartDays !== 0) {
					w.week.push({ empty: true, date: '' });
					if (emptyStartDays === 1) {
						newMonth = false;
					}
					emptyStartDays = emptyStartDays - 1;

					continue;
				}

				// if its the first week of the month, we check if we need to insert a empty
				// if (d.getDate() === 1) {
				// 	if (emptyStartDays) {
				// 		w.week.push({ date: '', empty: true });
				// 	}
				// }

				// define the day object
				let o: DayObject = { date: d.getDate().toString(), empty: false };

				// if we are in the next month, we render a empty day to make the ui look better

				// check if we are in the next month
				if (d.getDate() - (DayIndex + 1) < 0) {
					o.empty = true;
					w.week.push(o);
					continue;
				}

				if (d.getDate() === 1) {
					if (WeekIndex !== 0) {
						// newMonth = true;
					}
					w.newMonth = true;
					w.headingText = MONTHS[d.getUTCMonth()];
				}

				w.week.push(o);

				d.setDate(d.getDate() + 1);
			}

			tempList.push(w);
		}

		SetList(tempList);
	};

	useEffect(() => {
		renderList();
	}, []);

	return (
		<Block color="black">
			<Text>calander test</Text>
			<IconButton name="plus" size={25} color="white" backgroundColor="red" onPress={() => nav.goBack()} />
			<Block row flex={0} vCenter style={{ borderBottomColor: colors.white40, borderBottomWidth: 1 }}>
				{WEEK_DAYS.map((item, index) => (
					<Block flex={0} vCenter hCenter style={{ width: 45, height: 45 }}>
						<Text size={18} bold>
							{item}
						</Text>
					</Block>
				))}
			</Block>
			<FlatList
				data={List}
				initialNumToRender={30}
				renderItem={({ item, index }) => (
					<Block marginTop={item.newMonth ? 30 : 0} paddingHorizontal={56}>
						{item.newMonth && (
							<Text bold size={22} marginBottom={10}>
								{item.headingText}
							</Text>
						)}

						<Block key={index.toString()} row color="#191919" style={{ alignItems: 'flex-start' }} vCenter>
							{item.week.map((item2, index2) => (
								<Block flex={0} vCenter hCenter style={{ width: 45, height: 45 }}>
									{!item2.empty && (
										<Text key={index2} size={18} bold>
											{item2.date}
										</Text>
									)}
								</Block>
							))}
						</Block>
					</Block>
				)}
			/>
		</Block>
	);
};
