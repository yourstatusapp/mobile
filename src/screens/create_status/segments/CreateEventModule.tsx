import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Block, IconButton, Line, SmallButton, Spacer, Text } from '@parts';
import { TextInput } from 'react-native';
import { useTheme } from '@hooks';
import { CreateStatusType, EventStatus, ValidateStatusReturn } from '@core';
import dayjs from 'dayjs';
import BottomSheet from '@gorhom/bottom-sheet';
import DatePicker from 'react-native-date-picker';
import { SelectDateSheet } from '../components/SelectDateSheet';
import { IModuleProps } from '.';

interface EventDetails {
	description?: string;
	startDate?: Date;
	endDate?: Date | null;
	location?: string;
}

export const CreateEventModule: React.FC<IModuleProps> = ({ onDataChange }) => {
	const { theme } = useTheme();
	const [bottomSheetMode, setBottomSheetMode] = useState<'startDate' | 'endDate'>('startDate');
	const [showDatePickerModal, setShowDatePickerModal] = useState(false);
	const [textInputValue, setTextInputValue] = useState('');
	const [eventDetails, setEventDetails] = useState<EventDetails>({
		description: '',
		endDate: null,
		startDate: new Date(),
	});

	// const bottomSheetRef = useRef<BottomSheet>(null);
	// const snapPoints = useMemo(() => ['50%', '50%'], []);

	// const handleSheetChanges = useCallback((index: number) => {
	// 	console.log('handleSheetChanges', index);
	// 	if (index === -1) {
	// 		setShowDatePickerModal(false);
	// 	}
	// }, []);

	const handleOnDateChange = useCallback(
		(incomingDate: Date) => {
			console.log(incomingDate);

			if (bottomSheetMode === 'startDate') {
				setEventDetails(oldState => ({
					...oldState,
					startDate: incomingDate,
				}));
			} else {
				setEventDetails(oldState => ({
					...oldState,
					endDate: incomingDate,
				}));
			}
		},
		[bottomSheetMode],
	);

	const setStartDate = () => {
		setBottomSheetMode('startDate');
		setShowDatePickerModal(true);
	};

	const setEndDate = () => {
		setBottomSheetMode('endDate');
		setShowDatePickerModal(true);

		console.log('Settings start date');
	};

	useEffect(() => {
		onDataChange({
			statusText: textInputValue,
			data: { type: 'EVENT', ...eventDetails },
		});
	}, [eventDetails.description, eventDetails.startDate, eventDetails.endDate]);

	return (
		<Block marginTop={10}>
			<TextInput
				autoComplete="off"
				autoCorrect={false}
				autoCapitalize="none"
				placeholder={'Put here your message!'}
				placeholderTextColor={theme.textFadeLight}
				style={{ fontSize: 16, color: theme.text, marginLeft: 10 }}
				value={''}
				defaultValue={textInputValue}
				onChangeText={setTextInputValue}
			/>

			<>
				<Line color={theme.backgroundDarker} size={2} />
				<Block flex={1} paddingHorizontal={10} marginTop={5} style={{ justifyContent: 'space-between' }}>
					<TextInput
						autoComplete="off"
						autoCorrect={false}
						autoCapitalize="none"
						placeholder="Describe what you’re doing on your event"
						placeholderTextColor={theme.textFadeLight}
						style={{ fontSize: 16, color: theme.text }}
						value={eventDetails.description}
						defaultValue={eventDetails.description}
						onChangeText={v => {
							setEventDetails(state => {
								return {
									...state,
									description: v,
								};
							});
						}}
					/>
					<Block flex={0} marginBottom={10}>
						<Block row style={{ justifyContent: 'flex-start' }} flex={0} hCenter>
							<SmallButton text="Start Date" color="white" onPress={() => setStartDate()} />
							<Text marginLeft={10} color={theme.text}>
								{dayjs(eventDetails.startDate).format('DD/MM/YYYY - hh:mm')}
							</Text>
						</Block>

						<Spacer size={10} />

						<Block flex={0} row hCenter>
							<SmallButton text="End Date" color="white" onPress={() => setEndDate()} />

							{eventDetails?.endDate && (
								<Text marginLeft={10} marginRight={5} color={theme.text}>
									{dayjs(eventDetails.endDate).format('DD/MM/YYYY - HH:MM')}
								</Text>
							)}

							{eventDetails?.endDate && (
								<IconButton
									name="plus"
									size={17}
									iconSize={16}
									backgroundColor={theme.darker}
									color={theme.textFadeLight}
									style={{ transform: [{ rotate: '45deg' }] }}
									onPress={() =>
										setEventDetails(state => ({
											...state,
											endDate: null,
										}))
									}
								/>
							)}
						</Block>
					</Block>
				</Block>
			</>

			<SelectDateSheet
				open={showDatePickerModal}
				onClose={() => setShowDatePickerModal(false)}
				eventDetails={{ startDate: eventDetails.startDate, endDate: eventDetails?.endDate || undefined }}
				onDateChange={handleOnDateChange}
				date_pick_type={bottomSheetMode}
			/>
		</Block>
	);
};
