import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppAlert, CreateStatusType, GuildInvite, request } from '@core';
import { Block, Button, Fill, Icon, IconButton, Line, SmallButton, Spacer, Status, Text, TextButton } from '@parts';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, TextInput, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';
import { StatusColors } from '../../parts/Status';
import BottomSheet from '@gorhom/bottom-sheet';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';
import { useTheme } from '@hooks';
import { Icons } from '../../parts/Icon';
import { StatusSelectedableBox } from './components/StatusSelectedableBox';
import { CreateDiscordModule, CreateEventModule, CreateMessageModule } from './segments';

export enum StatusTypes {
	MESSAGE,
	DISCORD_GUILD,
	EVENT,
}

export type ValidateStatusReturn = {
	valid: boolean;
	data?: { name: string; iconImage: string };
};

export const StatusTypeEtc: {
	[index: number]: {
		icon: Icons;
		iconSize: number;
		displayMessagePlaceholder: string;
	};
} = {
	0: {
		icon: 'message',
		iconSize: 22,
		displayMessagePlaceholder: 'Put here your message!',
	},
	1: {
		icon: 'discord',
		iconSize: 27,
		displayMessagePlaceholder: 'Put here you’re invite link',
	},
	2: {
		icon: 'flag',
		iconSize: 21,
		displayMessagePlaceholder: 'Put here your event title!',
	},
};

const STATUS_TYPES_LIST = [{ icon: 'message' }, { icon: 'discord', iconExtraSpace: 5 }];
let timerID2: NodeJS.Timeout;

interface EventDetails {
	description?: string;
	startDate?: Date;
	endDate?: Date | null;
	location?: string;
}

let timeout: NodeJS.Timeout;

export const CreateStatus: React.FC = () => {
	const nav = useNavigation();
	const { theme } = useTheme();
	const { top, bottom } = useSafeAreaInsets();

	const [statusType, setStatusType] = useState<StatusTypes>(0);
	const [statusDisplayText, setStatusDisplayText] = useState('');
	const [validateLoading, setValidateLoading] = useState(false);
	const [validateData, setValidateData] = useState<ValidateStatusReturn>({ valid: false });

	const [statusData, setStatusData] = useState<CreateStatusType>({ data: { type: 'MESSAGE' }, statusText: '' });

	// const [messagePlaceHolder, setMessagePlaceholder] = useState('');
	// const [showDatePickerModal, setShowDatePickerModal] = useState(false);
	// const [eventDetails, setEventDetails] = useState<EventDetails>({
	// 	description: '',
	// 	endDate: null,
	// 	startDate: new Date(),
	// });
	// const [discordDetails, setDiscordDetails] = useState<{ invite: string; guild_name: string; guild_icon: string }>({
	// 	guild_icon: '',
	// 	guild_name: '',
	// 	invite: '',
	// });

	// valid to create status

	// const [guildResults, setGuildResults] = useState<GuildInvite | null>();
	// const [bottomSheetMode, setBottomSheetMode] = useState<'startDate' | 'endDate'>('startDate');
	// const bottomSheetRef = useRef<BottomSheet>(null);
	// const snapPoints = useMemo(() => ['50%', '50%'], []);
	// const handleSheetChanges = useCallback((index: number) => {
	// 	console.log('handleSheetChanges', index);
	// 	if (index === -1) {
	// 		setShowDatePickerModal(false);
	// 	}
	// }, []);

	// Validate any type of status
	const validateNewStatus = useCallback(async (): Promise<void> => {
		setValidateData(s => ({ ...s, valid: false }));
		setValidateLoading(true);

		const res = await request<ValidateStatusReturn>('post', '/status/validate', {
			data: statusData,
		});

		setValidateLoading(false);

		if (res?.data) {
			if (statusData.data.type === 'MESSAGE') {
				setValidateData(s => ({ ...s, valid: true }));
			}
			if (statusData.data.type === 'DISCORD_GUILD') {
				setValidateData(s => ({ ...s, valid: true, data: res.data?.data }));
			}
			if (statusData.data.type === 'EVENT') {
			}
		} else {
			return;
		}
	}, [statusData]);

	// const createStatus = async () => {
	// 	let statusTypeString = StatusTypes[statusType];

	// 	let extraData = null;

	// 	switch (statusType) {
	// 		case 0:
	// 			// extraData = { expireA}
	// 			break;
	// 		case 1:
	// 			break;
	// 		default:
	// 			break;
	// 	}

	// 	const newStatusObject: CreateStatusType = {
	// 		statusText: statusDisplayText,
	// 		data: {
	// 			// @ts-ignore
	// 			type: statusTypeString,
	// 		},
	// 	};

	// 	const res = request('post', '/status/new', { data: newStatusObject });
	// };

	// const ContentChecker = React.useCallback(
	// 	(v: string) => {
	// 		let t = statusType;
	// 		let c = v;

	// 		if (t === 1) {
	// 			if (timerID2) {
	// 				clearTimeout(timerID2);
	// 			}

	// 			timerID2 = setTimeout(async () => {
	// 				console.log(`${t} ${c}`);

	// 				validateNewStatus(t, c);
	// 			}, 1500);
	// 		}

	// 		if (t === 0) {
	// 			if (c === '') setValid(false);
	// 			else setValid(true);
	// 		}
	// 	},
	// 	[statusType],
	// );

	// useEffect(() => {
	// 	ContentChecker(Content);
	// }, [Content]);

	// const setStartDate = () => {
	// 	setBottomSheetMode('startDate');
	// 	setShowDatePickerModal(true);
	// };

	// const setEndDate = () => {
	// 	setBottomSheetMode('endDate');
	// 	setShowDatePickerModal(true);

	// 	console.log('Settings start date');
	// };

	// const handleOnDateChange = useCallback(
	// 	(incomingDate: Date) => {
	// 		if (bottomSheetMode === 'startDate') {
	// 			setEventDetails(oldState => ({
	// 				...oldState,
	// 				startDate: incomingDate,
	// 			}));
	// 		} else {
	// 			setEventDetails(oldState => ({
	// 				...oldState,
	// 				endDate: incomingDate,
	// 			}));
	// 		}
	// 	},
	// 	[bottomSheetMode],
	// );

	// const createEvent = useCallback(() => {
	// 	if (statusType === 0) {
	// 		setValid(!!statusDisplayText);
	// 	} else if (statusType === 1) {
	// 		if (timerID2) {
	// 			clearTimeout(timerID2);
	// 		}

	// 		timerID2 = setTimeout(async () => {
	// 			validateNewStatus(t, c);
	// 		}, 1500);
	// 	} else if (statusType === 2) {
	// 	}
	// }, [statusType, statusDisplayText]);

	// const onChangeText = useCallback(
	// 	(e: string) => {
	// 		if (timeout) {
	// 			clearTimeout(timeout);
	// 		}

	// 		timeout = setTimeout(() => {}, 500);
	// 	},
	// 	[timeout, discordDetails],
	// );

	// useEffect(() => {
	// 	if (!!discordDetails.invite) {
	// 		if (timeout) {
	// 			clearTimeout(timeout);
	// 		}

	// 		timeout = setTimeout(() => {
	// 			validateNewStatus(StatusTypes.DEFAULT, { inviteCode: discordDetails.invite });
	// 		}, 500);
	// 		console.log('disc', discordDetails);
	// 		onChangeText(discordDetails.invite);
	// 	}
	// }, [discordDetails.invite]);

	// useEffect(() => {
	// 	setMessagePlaceholder(StatusTypeEtc[statusType].displayMessagePlaceholder);
	// }, [statusType]);

	return (
		<>
			<Block color={theme.background} safe>
				<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={top + bottom}>
					{/* HEADER */}
					<Block height={50} flex={0}>
						<Block paddingHorizontal={10} flex={0} paddingBottom={5} row style={{ justifyContent: 'space-between' }}>
							<IconButton
								name="plus"
								size={22}
								backgroundColor={theme.backgroundDarker}
								color={theme.textFadeLight}
								style={{ transform: [{ rotate: '45deg' }] }}
								onPress={() => nav.goBack()}
							/>
							<TextButton text="Create" textSize={16} onPress={() => {}} style={{ marginRight: 10, marginTop: 5 }} />
						</Block>

						<Line color={theme.backgroundDarker} size={2} />
					</Block>

					{/* MAIN STATUS DISPLAYHOLDER */}
					<Block style={{ marginLeft: 10 }} flex={0}>
						<Status
							disableTap
							status={{
								account_id: '',
								data: { message: statusDisplayText },
								id: '',
								type: statusType,
							}}
						/>
					</Block>

					{/* DIFFERENT TYPE OF CREATE MODULES */}
					<Block>
						{statusType === StatusTypes.MESSAGE && (
							<CreateMessageModule onDataChange={setStatusData} validateStatusReturnData={validateData} />
						)}
						{statusType === StatusTypes.EVENT && (
							<CreateEventModule onDataChange={setStatusData} validateStatusReturnData={validateData} />
						)}
						{statusType === StatusTypes.DISCORD_GUILD && (
							<CreateDiscordModule
								onDataChange={setStatusData}
								validateStatusReturnData={validateData}
								validateStatus={validateNewStatus}
							/>
						)}
					</Block>

					{/* TESTING */}
					<Block flex={0}>
						<Text>{JSON.stringify(statusData)}</Text>
					</Block>

					{/* BOTTOM SELECTION SEGMENT */}
					<Block marginTop={10} flex={0}>
						<Line color={theme.backgroundDarker} size={2} />
						<Block flex={0} row paddingHorizontal={10} marginTop={10}>
							<StatusSelectedableBox pressHandler={setStatusType} statusType={0} selectedType={statusType} />
							<StatusSelectedableBox pressHandler={setStatusType} statusType={2} selectedType={statusType} />
							<StatusSelectedableBox pressHandler={setStatusType} statusType={1} selectedType={statusType} />
						</Block>
					</Block>
				</KeyboardAvoidingView>
				{/* <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={top + bottom}>
					<Block paddingHorizontal={10} flex={[0, 1].includes(statusType) ? 1 : 0}>
						<Status
							disableTap
							status={{
								account_id: '',
								data: { message: statusDisplayText },
								id: '',
								type: statusType,
							}}
						/>

						<Spacer size={5} />
						{[StatusTypes.DEFAULT, StatusTypes.EVENT].includes(statusType) && (
							<TextInput
								autoComplete="off"
								autoCorrect={false}
								autoCapitalize="none"
								placeholder={messagePlaceHolder}
								placeholderTextColor={theme.textFadeLight}
								style={{ fontSize: 16, color: theme.text }}
								value={statusDisplayText}
								defaultValue={statusDisplayText}
								onChangeText={v => setStatusDisplayText(v)}
							/>
						)}
						{[StatusTypes.DISCORD_GUILD].includes(statusType) && (
							<TextInput
								autoComplete="off"
								autoCorrect={false}
								autoCapitalize="none"
								placeholder={'Place your discord invite link here'}
								placeholderTextColor={theme.textFadeLight}
								style={{ fontSize: 16, color: theme.text }}
								value={discordDetails.invite}
								defaultValue={discordDetails.invite}
								onChangeText={v =>
									setDiscordDetails(state => ({
										...state,
										invite: v,
									}))
								}
							/>
						)}
						<Spacer size={5} />
					</Block>

					{statusType === 2 && (
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
											{dayjs(eventDetails.startDate).format('DD/MM/YYYY - HH:MM')}
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
					)}
					<Line color={theme.backgroundDarker} size={2} />
					<Block flex={0} style={{ justifyContent: 'space-between' }} row paddingHorizontal={10} marginTop={10}>
						<SmallButton text="Cancel" color="white" backgroundColor="#BA1A2E" onPress={() => nav.goBack()} />

						<SmallButton text="Create" color="white" onPress={createStatus} disabled={!statusDisplayText} />
					</Block>
					<Block marginTop={10} flex={0}>
						<Line color={theme.backgroundDarker} size={2} />
						<Block flex={0} row paddingHorizontal={10} marginTop={10}>
							<StatusSelectedableBox pressHandler={setStatusType} statusType={0} selectedType={statusType} />
							<StatusSelectedableBox pressHandler={setStatusType} statusType={2} selectedType={statusType} />
							<StatusSelectedableBox pressHandler={setStatusType} statusType={1} selectedType={statusType} />
						</Block>
					</Block>
				</KeyboardAvoidingView> */}
			</Block>
		</>
	);
};

{
	/* {showDatePickerModal && (
				<BottomSheet
					ref={bottomSheetRef}
					index={1}
					snapPoints={snapPoints}
					enablePanDownToClose
					handleIndicatorStyle={{ backgroundColor: theme.darker1 }}
					handleStyle={{ backgroundColor: theme.backgroundDarker }}
					onChange={handleSheetChanges}>
					<Block style={{ backgroundColor: theme.backgroundDark }} hCenter>
						<Text bold size={18} marginTop={30}>
							Select {bottomSheetMode === 'startDate' ? 'start' : 'end'} Date
						</Text>
						<DatePicker
							date={
								bottomSheetMode === 'startDate'
									? eventDetails?.startDate || new Date()
									: eventDetails?.endDate || new Date()
							}
							mode="datetime"
							textColor={theme.text}
							fadeToColor={theme.backgroundDarker}
							minimumDate={bottomSheetMode === 'startDate' ? new Date() : eventDetails.startDate}
							onDateChange={handleOnDateChange}
						/>
					</Block>
				</BottomSheet>
			)} */
}
