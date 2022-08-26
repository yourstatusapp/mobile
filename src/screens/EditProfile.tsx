import core, { request } from '@core';
import { Block, RoundyButton, RoundyInput, SheetModal, Spacer, TabbarHeader, Text } from '@parts';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import DatePicker from 'react-native-date-picker';

import dayjs from 'dayjs';
import { Keyboard, KeyboardAvoidingView } from 'react-native';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useTheme } from '@hooks';
import { useSimple } from 'simple-core-state';

export const EditProfile = () => {
	const { theme } = useTheme();

	const profile = useSimple(core.profile);
	const [validationError, setValidationError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [username, setUsername] = useState('');
	const [location, setLocation] = useState('');
	const [bio, setBio] = useState('');
	const [birthday, setBirthday] = useState<Date>(
		profile?.date_of_birth ? dayjs(profile?.date_of_birth).toDate() : new Date(),
	);
	const [usrNameValid, setUsrNameValid] = useState<{
		state: boolean;
		message: string;
	}>({
		state: false,
		message: '',
	});
	const [showBirthDayDate, setShowBirthDayDate] = useState(false);
	const SheetModalRef = useRef<BottomSheetMethods>(null);

	const userNameCheck = useCallback(
		async (v: string) => {
			setLoading(true);
			setValidationError(false);

			if (v.toLowerCase() === username.toLowerCase()) {
				setLoading(false);
				return;
			}

			// check if its valid
			const res = await request<{ valid: boolean }>('post', '/profile/username/check', {
				data: { username: v },
			});

			if (res.data) {
				if (res.data.valid === false) {
					setValidationError(true);
				}
				setUsrNameValid({ state: res.data.valid, message: res.message });
			}

			setLoading(false);
		},
		[username],
	);

	const onUsernameFinishedTyping = useCallback(
		(incomingValue: string) => {
			userNameCheck(incomingValue);
		},
		[userNameCheck],
	);

	useEffect(() => {
		setLoading(true);
	}, [username]);

	const saveInformation = useCallback(async () => {
		const res = await request('patch', '/profile/', {
			data: {
				username,
				location,
				bio,
				date_of_birth: birthday,
			},
		});
		if (res.data) {
			// request profile data and set the data
		}
	}, [bio, location, username, birthday]);

	useEffect(() => {
		Keyboard.addListener('keyboardDidShow', () => {
			SheetModalRef?.current && SheetModalRef.current.close();
		});
	}, []);

	if (profile === null) {
		return (
			<Block flex={1} color={theme.background}>
				<Text>No profile present</Text>
			</Block>
		);
	}

	return (
		<Block flex={1} color={theme.background}>
			<KeyboardAvoidingView contentContainerStyle={{ flex: 1 }} style={{ flex: 1 }} behavior="padding" enabled={false}>
				<TabbarHeader color={theme.backgroundDark} backButton centerText="Edit Profile" />
				<Block paddingHorizontal={10} marginTop={15}>
					<Text marginBottom={8} bold paddingLeft={10}>
						Username
					</Text>
					<Text>{JSON.stringify(validationError)}</Text>
					<RoundyInput
						initialValue={profile.username}
						onTextChange={setUsername}
						autoCorrect={false}
						placeholder="Username"
						onFinishTyping={onUsernameFinishedTyping}
						borderColor={validationError && '#EF4F4F'}
					/>
					{validationError && (
						<Text paddingTop={3} color="#EF4F4F">
							{usrNameValid.message}
						</Text>
					)}
					<Text marginBottom={8} bold paddingLeft={10} marginTop={20}>
						Location
					</Text>

					<RoundyInput
						initialValue={profile.location}
						onTextChange={setLocation}
						autoCorrect={false}
						placeholder="Location"
					/>

					<Text marginBottom={8} bold paddingLeft={10} marginTop={20}>
						Bio
					</Text>

					<RoundyInput initialValue={profile.bio} onTextChange={setBio} autoCorrect={false} placeholder="Bio" extend />

					<Text marginBottom={8} bold paddingLeft={10} marginTop={20}>
						Birthday
					</Text>

					<Block
						press
						flex={0}
						onPress={() => {
							setShowBirthDayDate(!showBirthDayDate);
							Keyboard.dismiss();
						}}>
						<RoundyInput
							initialValue={dayjs(birthday).format('YYYY-MM-DD')}
							placeholder="Birthday"
							disabled
							updateValue={dayjs(birthday).format('YYYY-MM-DD')}
						/>
					</Block>

					<Spacer size={40} />

					<RoundyButton
						style={{ marginBottom: 10 }}
						text="Save"
						textColor="white"
						onPress={saveInformation}
						disabled={loading === true ?? validationError === true}
					/>

					{/* {showBirthDayDate && ( */}
					<SheetModal openModal={showBirthDayDate} ref={SheetModalRef}>
						<Block hCenter>
							<DatePicker
								textColor={theme.text}
								fadeToColor={theme.background}
								date={birthday}
								mode="date"
								onDateChange={d => setBirthday(d)}
								onConfirm={date => {
									setBirthday(date);
								}}
								onCancel={() => {}}
							/>
						</Block>
					</SheetModal>
				</Block>
			</KeyboardAvoidingView>
		</Block>
	);
};
