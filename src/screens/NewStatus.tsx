import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppAlert, CreateStatusType, GuildInvite, request } from '@core';
import {
	Block,
	Button,
	Fill,
	Icon,
	Icon2,
	IconButton,
	Line,
	SmallButton,
	Spacer,
	Status,
	TabbarHeader,
	Text,
	TextButton,
} from '@parts';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, TextInput, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';
import { StatusColors } from '../parts/Status';
import BottomSheet from '@gorhom/bottom-sheet';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';
import { useTheme } from '@hooks';

export enum StatusTypes {
	DEFAULT,
	DISCORD_GUILD,
	EVENT,
}

const StatusTypeEtc: {
	[index: number]: { icon: string; iconSize: number; displayMessagePlaceholder: string };
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

export const NewStatus: React.FC = () => {
	const nav = useNavigation();
	const { theme } = useTheme();
	const { top, bottom } = useSafeAreaInsets();

	const [statusType, setStatusType] = useState<StatusTypes>(0);
	const [statusDisplayText, setStatusDisplayText] = useState('');
	const [messagePlaceHolder, setMessagePlaceholder] = useState('');
	const [showDatePickerModal, setShowDatePickerModal] = useState(false);
	const [eventDetails, setEventDetails] = useState<EventDetails>({
		description: '',
		endDate: null,
		startDate: new Date(),
	});

	const [bottomSheetMode, setBottomSheetMode] = useState<'startDate' | 'endDate'>('startDate');

	// valid to create status
	const [valid, setValid] = useState(false);
	const [guildResults, setGuildResults] = useState<GuildInvite | null>();

	const createStatus = async () => {
		let statusTypeString = StatusTypes[statusType];

		let extraData = null;

		switch (statusType) {
			case 0:
				// extraData = { expireA}
				break;
			case 1:
				break;
			default:
				break;
		}

		const newStatusObject: CreateStatusType = {
			statusText: statusDisplayText,
			data: {
				// @ts-ignore
				type: statusTypeString,
			},
		};

		const res = request('post', '/status/new', { data: newStatusObject });
	};

	// const [Error, SetError] = useState('');
	// const [Loading, SetLoading] = useState(false);
	// const [Expire, SetExpire] = useState(false);
	// const [Content, SetContent] = useState('');

	// const createStatus = React.useCallback(async () => {
	// 	SetLoading(true);
	// 	SetError('');

	// 	if (!Content) {
	// 		SetLoading(false);
	// 		return;
	// 	}

	// 	if (Expire) {
	// 		const MINIMUN_DATE = new Date();
	// 		MINIMUN_DATE.setSeconds(MINIMUN_DATE.getSeconds() + 10);

	// 		if (MINIMUN_DATE < new Date()) {
	// 			AppAlert(false, 'expire date is incorrect');
	// 			return;
	// 		}
	// 	}

	// 	const res = await request('post', '/status/new', {
	// 		data: { type: 'DEFAULT', content: Content?.trimStart()?.trimEnd() },
	// 	});
	// 	SetLoading(false);

	// 	if (res.data) {
	// 		AppAlert(true, res.message);
	// 		nav.goBack();
	// 	} else {
	// 		SetError(res?.message || '');
	// 	}
	// }, [Content, Expire, nav]);

	// const newGuildStatus = React.useCallback(async () => {
	// 	SetLoading(true);
	// 	SetError('');

	// 	const res = await request('post', '/status/new', {
	// 		data: { type: 'DISCORD_GUILD', content: GuildResults?.code },
	// 	});
	// 	SetLoading(false);
	// 	if (res.data) {
	// 		AppAlert(true, res.message);
	// 		nav.goBack();
	// 	} else {
	// 		SetError(res?.message || '');
	// 	}
	// }, [GuildResults?.code, nav]);

	const validateNewStatus = async (type: keyof typeof StatusTypes, data: any): Promise<void> => {
		setValid(false);

		const res = await request<{ guild: GuildInvite }>('post', '/status/validate', {
			data: { type, data },
		});

		if (res?.data) {
			setValid(true);
			setGuildResults(res.data.guild);
		} else {
			setGuildResults(null);
			return;
		}
	};

	// const createPost = React.useCallback(() => {
	// 	if (SelectedType === 'DEFAULT') {
	// 		createStatus();
	// 	}
	// 	if (SelectedType === 'DISCORD_GUILD') {
	// 		newGuildStatus();
	// 	}
	// }, [SelectedType, createStatus, newGuildStatus]);

	// const selectStatusType = (index: number) => {
	// 	SetSelectedType(StatusTypes[index].toString());
	// 	SetValid(false);
	// 	SetContent('');
	// };

	// const pasteClipBoard = async () => {
	// 	const c = await Clipboard.getString();
	// 	SetContent(c);
	// };

	const ContentChecker = React.useCallback(
		v => {
			let t = statusType;
			let c = v;

			if (t === 1) {
				if (timerID2) {
					clearTimeout(timerID2);
				}

				timerID2 = setTimeout(async () => {
					console.log(`${t} ${c}`);

					validateNewStatus(t, c);
				}, 1500);
			}

			if (t === 0) {
				if (c === '') setValid(false);
				else setValid(true);
			}
		},
		[statusType],
	);

	// useEffect(() => {
	// 	ContentChecker(Content);
	// }, [Content]);

	// ref
	const bottomSheetRef = useRef<BottomSheet>(null);

	// variables
	const snapPoints = useMemo(() => ['50%', '50%'], []);

	// callbacks
	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
		if (index === -1) {
			setShowDatePickerModal(false);
		}
	}, []);

	const setStartDate = () => {
		setBottomSheetMode('startDate');
		setShowDatePickerModal(true);
	};

	const setEndDate = () => {
		setBottomSheetMode('endDate');
		setShowDatePickerModal(true);

		console.log('Settings start date');
	};

	const handleOnDateChange = useCallback(
		(incomingDate: Date) => {
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

	const createEvent = useCallback(() => {
		if (statusType === 0) {
			setValid(!!statusDisplayText);
		} else if (statusType === 1) {
			if (timerID2) {
				clearTimeout(timerID2);
			}

			timerID2 = setTimeout(async () => {
				validateNewStatus(t, c);
			}, 1500);
		} else if (statusType === 2) {
		}
	}, [statusType, statusDisplayText]);

	useEffect(() => {
		setMessagePlaceholder(StatusTypeEtc[statusType].displayMessagePlaceholder);
	}, [statusType]);

	return (
		<>
			<Block color={theme.background} safe>
				<KeyboardAvoidingView
					style={{ flex: 1 }}
					behavior="padding"
					keyboardVerticalOffset={top + bottom}>
					<Block paddingHorizontal={10} flex={statusType === 2 ? 0 : 1}>
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
						<Spacer size={5} />
					</Block>
					{statusType === 2 && (
						<>
							<Line color={theme.backgroundDarker} size={2} />
							<Block
								flex={1}
								paddingHorizontal={10}
								marginTop={5}
								style={{ justifyContent: 'space-between' }}>
								{/* <Text>{JSON.stringify(eventDetails)}</Text> */}
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
					<Block
						flex={0}
						style={{ justifyContent: 'space-between' }}
						row
						paddingHorizontal={10}
						marginTop={10}>
						<SmallButton
							text="Cancel"
							color="white"
							backgroundColor="#BA1A2E"
							onPress={() => nav.goBack()}
						/>

						<SmallButton
							text="Create"
							color="white"
							onPress={createStatus}
							disabled={!statusDisplayText}
						/>
					</Block>
					<Block marginTop={10} flex={0}>
						<Line color={theme.backgroundDarker} size={2} />
						<Block flex={0} row paddingHorizontal={10} marginTop={10}>
							<StatusSelectedableBox
								pressHandler={setStatusType}
								statusType={0}
								selectedType={statusType}
							/>
							<StatusSelectedableBox
								pressHandler={setStatusType}
								statusType={2}
								selectedType={statusType}
							/>
							<StatusSelectedableBox
								pressHandler={setStatusType}
								statusType={1}
								selectedType={statusType}
							/>
						</Block>
					</Block>
				</KeyboardAvoidingView>
			</Block>
			{showDatePickerModal && (
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
			)}
		</>
	);
	// return (
	// 	<>
	// 		<TabbarHeader color={theme.backgroundDark} backButton />
	// 		<KeyboardAvoidingView
	// 			contentContainerStyle={{ flex: 1, backgroundColor: 'red' }}
	// 			style={{ flex: 1, backgroundColor: theme.background, paddingBottom: bottom }}
	// 			behavior="padding"
	// 			keyboardVerticalOffset={-bottom}>
	// 			<Block color={theme.background}>
	// 				<Block
	// 					flex={0}
	// 					style={{ borderBottomColor: theme.darker, borderBottomWidth: 1 }}
	// 					paddingLeft={15}
	// 					paddingTop={10}
	// 					paddingBottom={10}>
	// 					<Status
	// 						disableTap
	// 						status={{
	// 							id: '',
	// 							data: { message: Content },
	// 							type: StatusTypes[SelectedType],
	// 							taped: true,
	// 						}}
	// 					/>

	// 					{SelectedType === 'DISCORD_GUILD' && Valid && (
	// 						<Block row hCenter flex={0} marginTop={10}>
	// 							<Text bold marginRight={10}>
	// 								Found:
	// 							</Text>
	// 							<Text marginRight={10} color={theme.textFade} medium>
	// 								{GuildResults?.guild.name}
	// 							</Text>
	// 							<FastImage
	// 								source={{
	// 									uri: `https://cdn.discordapp.com/icons/${GuildResults?.guild.id}/${GuildResults?.guild.icon}.webp?size=64`,
	// 								}}
	// 								style={{ height: 30, width: 30, borderRadius: 100 }}
	// 							/>
	// 						</Block>
	// 					)}
	// 					<Spacer size={4} />
	// 					{GuildResults !== null && GuildResults?.expires_at && (
	// 						<Text color="#D35A5A">
	// 							This status will expire on {new Date(GuildResults?.expires_at).toDateString()}
	// 						</Text>
	// 					)}
	// 				</Block>
	// 				<Block
	// 					flex={0}
	// 					style={{ borderBottomColor: theme.darker, borderBottomWidth: 1 }}
	// 					paddingLeft={15}
	// 					paddingTop={10}
	// 					paddingBottom={10}
	// 					row
	// 					hCenter>
	// 					<IconButton
	// 						name="clipboard"
	// 						color={theme.textFadeLight}
	// 						backgroundColor={theme.darker}
	// 						size={20}
	// 						onPress={pasteClipBoard}
	// 						style={{ marginRight: 5 }}
	// 					/>
	// 					<TextInput
	// 						placeholder="message"
	// 						style={{ color: theme.text, paddingHorizontal: 0, paddingVertical: 10 }}
	// 						placeholderTextColor={theme.textFadeLight}
	// 						value={Content}
	// 						onChangeText={v => SetContent(v)}
	// 					/>
	// 				</Block>

	// 				<Block paddingHorizontal={20}>
	// 					<Fill />
	// 				</Block>

	// 				<Text color={theme.primary} paddingLeft={15} paddingBottom={4}>
	// 					{SelectedType === 'DEFAULT' ? 'Message' : 'Discord server'}
	// 				</Text>

	// 				<Block
	// 					flex={0}
	// 					style={{ height: 75 + bottom, borderTopWidth: 1, borderTopColor: theme.darker }}
	// 					color={theme.background}
	// 					vCenter
	// 					paddingHorizontal={15}>
	// 					<Block row flex={1} hCenter marginBottom={bottom}>
	// 						{STATUS_TYPES_LIST.map((item, index) => (
	// 							<Block
	// 								press
	// 								// @ts-ignore
	// 								onPress={() => selectStatusType(index)}
	// 								style={{ width: 50, height: 50, borderRadius: 12 }}
	// 								key={index}
	// 								color={SelectedType === StatusTypes[index] ? theme.darker1 : theme.darker}
	// 								flex={0}
	// 								marginRight={5}
	// 								vCenter
	// 								hCenter>
	// 								<Icon
	// 									name={item.icon}
	// 									size={20 + (item?.iconExtraSpace || 0)}
	// 									color={
	// 										SelectedType === StatusTypes[index] ? theme.textFade : theme.textFadeLight
	// 									}
	// 								/>
	// 							</Block>
	// 						))}
	// 						<Fill />
	// 						<Block
	// 							press
	// 							disabled={Valid === false}
	// 							onPress={() => createPost()}
	// 							style={{
	// 								width: 50,
	// 								height: 50,
	// 								borderRadius: 12,
	// 								opacity: Valid ? 1 : 0.4,
	// 							}}
	// 							color={theme.primary}
	// 							flex={0}
	// 							marginRight={5}
	// 							vCenter
	// 							hCenter>
	// 							<Icon name="arrow-big" size={20} color={'white'} />
	// 						</Block>
	// 					</Block>
	// 				</Block>
	// 			</Block>
	// 		</KeyboardAvoidingView>
	// 	</>
	// );
};

const StatusSelectedableBox = ({
	statusType,
	selectedType,
	pressHandler,
}: {
	statusType: number;
	selectedType: number;
	pressHandler: (v: number) => void;
}) => {
	const { theme } = useTheme();

	const StatusSelectTypeStyle: ViewStyle = {
		height: 57,
		width: 57,
		flex: 0,
		borderRadius: 12,
	};

	const TypePressHandler = useCallback(() => {
		pressHandler(statusType);
	}, [pressHandler, statusType]);

	const a = useMemo(() => [selectedType === statusType], [selectedType, statusType]);

	return (
		<Block flex={0} marginRight={11} hCenter>
			<Block
				height={10}
				width={10}
				flex={0}
				marginBottom={5}
				style={{ borderRadius: 10 }}
				color={
					StatusColors[theme.name][statusType][selectedType === statusType ? 'color' : 'backColor']
				}
			/>
			<Block
				color={StatusColors[theme.name][statusType].backColor}
				hCenter
				vCenter
				opacity={a ? 1 : 0.4}
				style={StatusSelectTypeStyle}
				press
				onPress={TypePressHandler}>
				<Icon
					name={StatusTypeEtc[statusType].icon}
					color={StatusColors[theme.name][statusType].color}
					size={StatusTypeEtc[statusType].iconSize}
				/>
			</Block>
		</Block>
	);
};
