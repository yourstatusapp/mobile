import core, { request } from '@core';
import { Fill, RegularInput, Row, SidePadding, Spacer, Text, TopHeading, WideButton } from '@parts';
import { usePulse } from '@pulsejs/react';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import styled, { useTheme } from 'styled-components/native';

interface EditProfileProps {}

let timeoutID: any;

export const EditProfileView: React.FC<EditProfileProps> = (props) => {
	const nav = useNavigation();
	const theme = useTheme();
	const profile = usePulse(core.profile.state.PROFILE);
	const [Username, setUsername] = useState('');
	const [Available, setAvailable] = useState(false);
	const [Loaded, setLoaded] = useState(false);
	const [Location, setLocation] = useState('');
	const [Birthday, setBirthday] = useState<Date>();
	const [Bio, setBio] = useState<string | null>(null);

	const usernameCheck = async (username: string) => {
		if (!valueChanged(profile.username, Username)) {
			setLoaded(true);
			setAvailable(false);
			return;
		}

		const a = await request<boolean>('post', '/profile/username/check', { data: { username } });
		setLoaded(true);
		setAvailable(a);
	};

	const saveInformation = async () => {
		let d: any = {};

		// Check for changed values
		if (valueChanged(profile.username, Username)) d.username = Username;
		if (valueChanged(profile.location, Location)) d.location = Location;
		if (valueChanged(profile.bio, Bio || '')) d.bio = Bio;
		// if (valueChanged(profile.date_of_birth, Bio)) d.date_of_birth = Birthday;

		// if (valueChanged(profile.date_of_birth, Birthday?.toISOString() || '')) d.date_of_birth = Birthday?.toISOString();

		console.log(d);

		await request('patch', '/profile', {
			data: d,
		});

		core.profile.state.PROFILE.patch(d);

		nav.goBack();
	};

	// Check if the value has been changed for editing account and profile
	const valueChanged = (original: string, changed: string): boolean => {
		if (original === changed) return false;
		return true;
		// if (changed === '' && original === '') return (original === null ? '' : original) !== changed;
	};

	const onDateChange = (v: Date) => {
		setBirthday(v);
	};

	React.useEffect(() => {
		setLoaded(false);
		clearTimeout(timeoutID);

		timeoutID = setTimeout(() => {
			usernameCheck(Username);
		}, 500);
	}, [Username]);

	React.useEffect(() => {
		setBirthday(new Date(profile.date_of_birth));
		setLocation(profile.location);
		setUsername(profile.username);
	}, [profile]);

	return (
		<EditProfileBody>
			<KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} keyboardVerticalOffset={40}>
				<TouchableWithoutFeedback style={{ flex: 1 }} containerStyle={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
					<TopHeading text="Edit profile" />
					<SidePadding>
						<Spacer size={20} />
						<Text size={18} weight="semi-bold" style={{ paddingLeft: 10 }}>
							Username
						</Text>
						<Spacer size={10} />
						<InputCont>
							<UsernameField
								defaultValue={profile.username}
								onChangeText={setUsername}
								loaded={Loaded}
								error={!Available}
								changed={valueChanged(profile.username, Username)}
								autoCompleteType="off"
								autoCorrect={false}
								autoCapitalize="none"
								usernameValue={Username}
							/>
							{!Loaded && <ActivityIndicator style={{ position: 'absolute', right: 20 }} />}
						</InputCont>

						<Spacer size={20} />
						<Text size={18} weight="semi-bold" style={{ paddingLeft: 10 }}>
							Location
						</Text>
						<Spacer size={10} />
						<RegularInput
							defaultValue={profile.location}
							onChangeText={setLocation}
							style={{ borderColor: valueChanged(profile.location, Location) ? '#54A7FD' : theme.step1, borderStyle: 'solid', borderWidth: 2 }}
							placeholder="Canada"
							autoCompleteType="off"
							autoCorrect={false}
							autoCapitalize="none"
						/>

						<Spacer size={20} />
						<Text size={18} weight="semi-bold" style={{ paddingLeft: 10 }}>
							Bio
						</Text>
						<Spacer size={10} />
						<BioInput
							placeholder="Tell something about yourself"
							multiline={true}
							defaultValue={profile.bio}
							onChangeText={(v) => setBio(v)}
							style={{ borderColor: valueChanged(profile.bio, Bio || '') ? '#54A7FD' : theme.step1, borderWidth: 2 }}
						/>

						<Spacer size={20} />
						{/* <Row>
						<Text size={18} weight="semi-bold" style={{ paddingLeft: 10 }}>
							Birthday
						</Text>
					</Row>
					<Spacer size={10} />

					{Birthday && (
						<Row center style={{ borderColor: valueChanged(profile.bio, Bio) ? '#54A7FD' : theme.step1, borderWidth: 2 }}>
							<DatePicker date={Birthday} textColor={theme.text} mode="date" onDateChange={onDateChange} />
						</Row>
					)} */}
						<Fill />
						<WideButton text="save" onPress={() => saveInformation()} />
						<Spacer size={30} />
					</SidePadding>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</EditProfileBody>
	);
};

const EditProfileBody = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.background};
`;

const InputCont = styled(Row)`
	position: relative;
`;

const BioInput = styled(RegularInput)`
	min-height: 120px;

	padding: 15px 12px;
	/* vertical-align: al; */
`;

const UsernameField = styled(RegularInput)<{ error: boolean; loaded: boolean; usernameValue: string; changed: boolean }>`
	border: solid 2px ${({ theme, error, loaded, changed }) => (loaded ? (changed ? (error ? '#FF4141' : '#8acd68') : theme.step1) : '#54A7FD')};
`;
