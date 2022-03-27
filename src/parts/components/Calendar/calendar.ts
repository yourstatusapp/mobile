export interface StorieType {
	id: string;
	picture: string;
}

export interface DayObject {
	date?: string;
	pictures?: StorieType[];
	empty?: boolean;
}

export type Week = {
	week?: DayObject[];
	headingText?: string;
};

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

export const renderCalendarData = (): Week[] => {
	let d = new Date();
	d.setDate(1);
	d.setMonth(0);

	// global variables
	let tempList: Week[] = [];
	let emptyDaysBeAdded = 0;

	// before we start to generate the list
	// we need to check what day we start with the current date
	emptyDaysBeAdded = d.getDay() - 1;

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

			// Check if we are calculating the last day of the month
			if (d.getDate() === lastDayofCurrentMonth) {
				// if its 0, it means its untouched
				if (emptyDaysBeAdded === 0) {
					// if in case the last day is also on a sunday (last day of the week)
					// then we don't have to do anything about adding extra days for the next month
					week.push({ date: d.getDate().toString() });

					// check if we reached the last index of the week array
					if (DayIndex === 7) {
						// Jump to the next day
						d.setDate(d.getDate() + 1);
					} else {
						// add the amount of days we are already into the week so that will added next week to align days
						emptyDaysBeAdded = DayIndex;
					}
				} else {
					// push an empty day into the week array
					week.push({ empty: true });

					if (DayIndex === 7) {
						d.setDate(d.getDate() + 1);
					}
				}
			} else {
				// Adding a day into the week
				week.push({ date: d.getDate().toString() });

				// Jump to the next day
				d.setDate(d.getDate() + 1);
			}
		}

		// After we added 7 days object into the week array, push the week into the main list
		tempList.push({ week: week });
	}

	// Return the data set
	return tempList;
};
