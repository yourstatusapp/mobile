import * as React from 'react';
import core, { AppAlert, request } from '@core';
import { useNavigation, useTheme } from '@hooks';
import { Block, Fill, IconButton, Line, RoundyButton, Status, Text } from '@parts';
import { FlashList } from '@shopify/flash-list';
import { useSimple } from 'simple-core-state';
import { BottomSheet, IBaseSheetProps } from '../../../parts/BottomSheet';
import { launchImageLibrary } from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';

interface ISelectDateSheet extends IBaseSheetProps {
	date_pick_type?: 'startDate' | 'endDate';
	eventDetails: {
		startDate?: Date;
		endDate?: Date;
	};
	onDateChange?: (v: Date) => void;
}

export const SelectDateSheet = (props: ISelectDateSheet) => {
	const { theme } = useTheme();
	const nav = useNavigation();
	const status = useSimple(core.myStatus);
	const [close, setClose] = React.useState(false);

	const uploadFromAblum = async () => {};

	return (
		<>
			<BottomSheet
				{...props}
				close={close}
				onClose={() => {
					setClose(false);
					props.onClose();
				}}>
				<Block color={theme.backgroundDark} paddingHorizontal={20}>
					<Text bold size={18} marginTop={30}>
						Select {props.date_pick_type === 'startDate' ? 'start' : 'end'} time
					</Text>
					<DatePicker
						date={
							props.date_pick_type === 'startDate'
								? props.eventDetails?.startDate || new Date()
								: props.eventDetails?.endDate || new Date()
						}
						mode="datetime"
						textColor={theme.text}
						fadeToColor={theme.backgroundDarker}
						minimumDate={props.date_pick_type === 'startDate' ? new Date() : props.eventDetails.startDate}
						onDateChange={props.onDateChange}
					/>
				</Block>
			</BottomSheet>
		</>
	);
};
