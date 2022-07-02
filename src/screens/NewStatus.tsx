import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppAlert, GuildInvite, request } from '@core';
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
import { useTheme } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';
import { StatusColors } from '../parts/Status';
import BottomSheet from '@gorhom/bottom-sheet';
import DatePicker from 'react-native-date-picker';

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

export const NewStatus: React.FC = () => {
	const nav = useNavigation();
	const theme = useTheme();
	const { top, bottom } = useSafeAreaInsets();

	const [statusType, setStatusType] = useState<StatusTypes>(0);
	const [statusDisplayText, setStatusDisplayText] = useState('');
	const [eventDesc, setEventDesc] = useState('');
	const [messagePlaceHolder, setMessagePlaceholder] = useState('');

	// const [Error, SetError] = useState('');
	// const [Loading, SetLoading] = useState(false);
	// const [Expire, SetExpire] = useState(false);
	// const [GuildResults, SetGuildResults] = useState<GuildInvite | null>();
	// const [Content, SetContent] = useState('');
	// const [Valid, SetValid] = useState(false);

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

	// const validateNewStatus = async (type: keyof typeof StatusTypes, data: any): Promise<void> => {
	// 	SetValid(false);

	// 	const res = await request<{ guild: GuildInvite }>('post', '/status/validate', {
	// 		data: { type, data },
	// 	});

	// 	if (res?.data) {
	// 		SetValid(true);
	// 		SetGuildResults(res.data.guild);
	// 	} else {
	// 		SetGuildResults(null);
	// 		return;
	// 	}
	// };

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

	// const ContentChecker = React.useCallback(
	// 	v => {
	// 		let t = SelectedType;
	// 		let c = v;

	// 		if (t === 'DISCORD_GUILD') {
	// 			if (timerID2) clearTimeout(timerID2);

	// 			timerID2 = setTimeout(async () => {
	// 				console.log(`${t} ${c}`);

	// 				validateNewStatus(t, c);
	// 			}, 1500);
	// 		}

	// 		if (t === 'DEFAULT') {
	// 			if (c === '') SetValid(false);
	// 			else SetValid(true);
	// 		}
	// 	},
	// 	[SelectedType],
	// );

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
	}, []);

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
								<TextInput
									autoComplete="off"
									autoCorrect={false}
									autoCapitalize="none"
									placeholder="Describe what you’re doing on your event"
									placeholderTextColor={theme.textFadeLight}
									style={{ fontSize: 16, color: theme.text }}
									value={eventDesc}
									defaultValue={eventDesc}
									onChangeText={v => setEventDesc(v)}
								/>
								<Block
									flex={0}
									style={{
										alignSelf: 'flex-start',
										alignItems: 'flex-start',
									}}
									marginBottom={5}>
									<SmallButton text="Start Date" color="white" onPress={() => {}} />
									<Spacer size={10} />
									<SmallButton text="End Date" color="white" onPress={() => {}} />
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
							onPress={() => {}}
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
			<BottomSheet
				ref={bottomSheetRef}
				index={1}
				snapPoints={snapPoints}
				enablePanDownToClose
				handleIndicatorStyle={{ backgroundColor: theme.textFadeLight }}
				handleStyle={{ backgroundColor: theme.backgroundDarker }}
				onChange={handleSheetChanges}>
				<Block style={{ backgroundColor: theme.backgroundDark }} hCenter vCenter>
					<DatePicker
						date={new Date()}
						mode="datetime"
						textColor={theme.text}
						fadeToColor={theme.backgroundDarker}
						onDateChange={() => {}}
					/>
				</Block>
			</BottomSheet>
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
	const theme = useTheme();

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
