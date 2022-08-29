import React, { useCallback, useEffect, useMemo, useState } from 'react';
import core, { ICreateStatus, request, ValidateStatusReturn } from '@core';
import { Block, IconButton, Line, Status, Text, TextButton } from '@parts';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@hooks';
import { Icons } from '../../parts/Icon';
import { StatusSelectedableBox } from './components/StatusSelectedableBox';
import { CreateDiscordModule, CreateEventModule, CreateMessageModule, IModuleProps } from './segments';
import { useSimple } from 'simple-core-state';

export enum StatusTypes {
	MESSAGE,
	DISCORD_GUILD,
	EVENT,
}

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

	const newStatusDraft = useSimple(core.newStatusDraft);

	const [statusType, setStatusType] = useState<StatusTypes>(0);
	const [statusDisplayText, setStatusDisplayText] = useState('');
	const [validateLoading, setValidateLoading] = useState(false);
	const [validateData, setValidateData] = useState<ValidateStatusReturn>({ valid: false, data: undefined });

	// Validate any type of status
	const validateNewStatus = useCallback(async (incomingStatusDraft: ICreateStatus) => {
		console.log('validating status', incomingStatusDraft);

		setValidateData(s => ({ ...s, valid: false }));
		setValidateLoading(true);

		console.log('[NEW STATUS] status data sending', incomingStatusDraft);

		const res = await request<ValidateStatusReturn>('post', '/status/new/validate', {
			data: incomingStatusDraft,
		});

		console.log(res);

		setValidateLoading(false);

		if (res?.data) {
			if (incomingStatusDraft.type === 'MESSAGE') {
				setValidateData(s => ({ ...s, valid: true }));
			}
			if (incomingStatusDraft.type === 'DISCORD_GUILD') {
				if (res.data.data?.name) setStatusDisplayText(res.data.data?.name);
				setValidateData(s => ({ ...s, valid: true, data: res.data?.data }));
			}
			if (incomingStatusDraft.type === 'EVENT') {
				setValidateData(s => ({ ...s, valid: res.data?.valid || false }));
			}
		} else {
			return;
		}
	}, []);

	const createNewStatus = async () => {
		console.log(newStatusDraft);

		const res = await request<ValidateStatusReturn>('post', '/status/new', {
			data: newStatusDraft,
		});

		console.log(res);
	};

	useEffect(() => {
		setStatusDisplayText('');
		setValidateData({ valid: false, data: undefined });
	}, [statusType]);

	return (
		<>
			<Block color={theme.background}>
				<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={0}>
					{/* HEADER */}
					<Block height={50 + top} flex={0}>
						<Block
							paddingHorizontal={10}
							flex={0}
							paddingTop={top}
							paddingBottom={5}
							row
							style={{ justifyContent: 'space-between' }}
							color={theme.backgroundDark}>
							<IconButton
								name="plus"
								size={22}
								backgroundColor={theme.backgroundDarker}
								color={theme.textFadeLight}
								style={{ transform: [{ rotate: '45deg' }] }}
								onPress={() => nav.goBack()}
							/>
							{validateLoading && (
								<Block marginLeft={25} flex={0} row hCenter>
									<Text medium>Checking</Text>
									<ActivityIndicator style={{ marginLeft: 10 }} />
								</Block>
							)}
							<TextButton
								text="Create"
								textSize={16}
								onPress={() => createNewStatus()}
								style={{ marginRight: 10, marginTop: 5 }}
								disabled={validateData.valid === false}
							/>
						</Block>

						<Line color={theme.backgroundDarker} size={2} />
					</Block>

					{/* MAIN STATUS DISPLAYHOLDER */}
					<Block marginLeft={10} marginBottom={10} flex={0}>
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
							<CreateMessageModule
								forceUpdateStatusText={v => setStatusDisplayText(v)}
								validateStatus={validateNewStatus}
								validateStatusReturnData={validateData}
							/>
						)}
						{statusType === StatusTypes.EVENT && (
							<CreateEventModule
								validateStatus={validateNewStatus}
								validateStatusReturnData={validateData}
								forceUpdateStatusText={v => setStatusDisplayText(v)}
							/>
						)}
						{statusType === StatusTypes.DISCORD_GUILD && (
							<CreateDiscordModule validateStatus={validateNewStatus} validateStatusReturnData={validateData} />
						)}
					</Block>

					{/* TESTING */}
					<Block flex={0}>
						<Text>{JSON.stringify(newStatusDraft)}</Text>
						<Text marginTop={10}>{JSON.stringify(validateData)}</Text>
					</Block>
				</KeyboardAvoidingView>

				{/* BOTTOM SELECTION SEGMENT */}
				<Block marginTop={10} flex={0} paddingBottom={bottom} color={theme.backgroundDark}>
					<Line color={theme.backgroundDarker} size={2} />
					<Block flex={0} row paddingHorizontal={10} marginTop={10}>
						<StatusSelectedableBox
							pressHandler={setStatusType}
							statusType={0}
							selectedType={statusType}
							disabled={validateLoading}
						/>
						<StatusSelectedableBox
							pressHandler={setStatusType}
							statusType={2}
							selectedType={statusType}
							disabled={validateLoading}
						/>
						<StatusSelectedableBox
							pressHandler={setStatusType}
							statusType={1}
							selectedType={statusType}
							disabled={validateLoading}
						/>
					</Block>
				</Block>
			</Block>
		</>
	);
};
