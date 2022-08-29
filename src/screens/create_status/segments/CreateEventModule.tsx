import React, { useCallback, useEffect, useState } from 'react';
import { Block, IconButton, Line, SmallButton, Spacer, Text } from '@parts';
import { TextInput } from 'react-native';
import { useTheme } from '@hooks';
import core, { IDataEventStatus } from '@core';
import dayjs from 'dayjs';
import { SelectDateSheet } from '../components/SelectDateSheet';
import { IModuleProps } from '.';

let timeoutID: NodeJS.Timeout;

export const CreateEventModule: React.FC<IModuleProps> = ({
	forceUpdateStatusText,
	validateStatus,
	validateStatusReturnData,
}) => {
	const { theme } = useTheme();
	const [bottomSheetMode, setBottomSheetMode] = useState<'startDate' | 'endDate'>('startDate');
	const [showDatePickerModal, setShowDatePickerModal] = useState(false);
	const [displayText, setDisplayText] = useState('');
	const [eventDetails, setEventDetails] = useState<IDataEventStatus>({
		title: '',
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

	const updateDataChange = useCallback(() => {
		validateStatus({
			statusText: displayText,
			type: 'EVENT',
			data: { ...eventDetails },
		});
	}, [eventDetails.description, eventDetails.startDate, eventDetails.endDate]);

	// const u = useCallback((v: string) => {
	// 	if (forceUpdateStatusText) forceUpdateStatusText(v);
	// 	core.newStatusDraft.set({ statusText: v, data: eventDetails, type: 'EVENT' });
	// }, []);

	// useEffect(() => {
	// 	u(displayText);
	// }, [displayText]);

	useEffect(() => {
		if (forceUpdateStatusText) forceUpdateStatusText(displayText);
		core.newStatusDraft.set({ type: 'EVENT', statusText: displayText, data: eventDetails });

		if (timeoutID) {
			clearTimeout(timeoutID);
		}

		timeoutID = setTimeout(() => {
			if (!!displayText && !!eventDetails.title && !!eventDetails.description && !!eventDetails.startDate) {
				updateDataChange();
			}
		}, 1000);
	}, [eventDetails, displayText]);

	return (
		<Block paddingHorizontal={10}>
			<Block>
				<TextInput
					autoComplete="off"
					autoCorrect={false}
					autoCapitalize="none"
					placeholder={'Display text'}
					placeholderTextColor={theme.textFadeLight}
					style={{ fontSize: 16, color: theme.text, marginBottom: 5 }}
					value={displayText}
					defaultValue={displayText}
					onChangeText={setDisplayText}
				/>

				<Line color={theme.backgroundDarker} size={2} />

				<Text marginTop={10} size={16} medium>
					Title:
				</Text>
				<TextInput
					autoComplete="off"
					autoCorrect={false}
					autoCapitalize="none"
					placeholder={'Event title'}
					placeholderTextColor={theme.textFadeLight}
					style={{ fontSize: 16, color: theme.text, marginVertical: 5 }}
					value={eventDetails.title}
					defaultValue={eventDetails.title}
					onChangeText={v =>
						setEventDetails(prev => ({
							...prev,
							title: v,
						}))
					}
				/>

				<Text marginTop={10} size={16} medium>
					Description:
				</Text>
				<TextInput
					autoComplete="off"
					autoCorrect={false}
					autoCapitalize="none"
					placeholder="Describe what you’re doing on your event"
					placeholderTextColor={theme.textFadeLight}
					style={{ fontSize: 16, color: theme.text, marginVertical: 5 }}
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

				<Text marginTop={10} size={16} medium>
					Location:
				</Text>
				<TextInput
					autoComplete="off"
					autoCorrect={false}
					autoCapitalize="none"
					placeholder="(not required)"
					placeholderTextColor={theme.textFadeLight}
					style={{ fontSize: 16, color: theme.text, marginVertical: 5 }}
					value={eventDetails.location}
					defaultValue={eventDetails.location}
					onChangeText={v => {
						setEventDetails(state => {
							return {
								...state,
								location: v,
							};
						});
					}}
				/>
			</Block>

			<Block flex={0}>
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
