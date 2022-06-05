import { AppAlert, request } from '@core';
import { useNavigation } from '@hooks';
import {
	Block,
	BottomModalSheet,
	Button,
	IconButton,
	Line,
	SmallButton,
	Spacer,
	Status,
	Text,
	TextButton,
} from '@parts';
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { TabbarHeader } from '../parts/components/TabbarHeader';
import styled, { useTheme } from 'styled-components/native';
import Animated, { Transition } from 'react-native-reanimated';

export const CreateEvent = () => {
	const theme = useTheme();
	const nav = useNavigation();
	const [step, setStep] = useState<'REQUIRED_DETAILS' | 'OPTIONAL_OPTIONS'>('REQUIRED_DETAILS');

	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const [startDate, setStartDate] = useState(new Date());
	const [enableStartDate, setEnableStartDate] = useState(false);
	const [showDPSD, setShowDPSD] = useState(false);

	const [endDate, setEndDate] = useState(new Date());
	const [enableEndDate, setEnableEndDate] = useState(false);
	const [showDPED, setShowDPED] = useState(false);

	const [statusDisplayname, setStatusDisplayname] = useState('');

	const create = async () => {
		setLoading(true);
		const res = await request('post', '/events/create', {
			data: {
				title,
				description,
				end_date: endDate,
				// location: check().string(),
				status_display_name: statusDisplayname,
			},
		});
		setLoading(false);
		if (res.data) {
			nav.goBack();
		} else {
			AppAlert(false, res.message);
		}
	};

	const ARN = Animated.createAnimatedComponent(View);

	return (
		<Block flex={1} color={theme.background}>
			<TabbarHeader color={theme.backgroundDark} backButton centerText="Create an event" />
			<KeyboardAvoidingView
				behavior="position"
				keyboardVerticalOffset={-150}
				contentContainerStyle={{ flex: 1 }}
				style={{ flex: 1 }}>
				{step === 'REQUIRED_DETAILS' && (
					<Block color={theme.background} flex={1}>
						{/* <BottomModalSheet />	 */}

						<ScrollView contentContainerStyle={{ flex: 1 }} style={{ flex: 1 }} endFillColor="red">
							<Spacer size={15} />
							<TxtInput
								placeholder="Title"
								value={title}
								onChangeText={v => setTitle(v)}
								placeholderTextColor={theme.darker}
							/>
							<TxtInput
								placeholderTextColor={theme.darker}
								placeholder="Description"
								value={description}
								onChangeText={v => setDescription(v)}
								style={{ height: 150, lineHeight: 20, paddingTop: 15, paddingLeft: 15 }}
								multiline
								numberOfLines={4}
							/>

							<Block marginLeft={10} marginBottom={10} marginTop={20} flex={0}>
								<Status
									status={{ account_id: 'dsa', type: 2, data: { message: statusDisplayname } }}
								/>
							</Block>

							<TxtInput
								placeholderTextColor={theme.darker}
								placeholder="Status display name"
								value={statusDisplayname}
								onChangeText={v => setStatusDisplayname(v)}
							/>

							{/* Start Date */}
							<SmallButton text="Set start date" onPress={() => {}} />
							{/* <Block row flex={0} paddingLeft={10}>
								<CheckBox onPress={() => setEnableStartDate(!enableStartDate)}>
									{enableStartDate && <CheckboxChecked />}
								</CheckBox>
								<FlatButton
									onPress={() => setShowDPSD(!showDPSD)}
									disabled={!enableStartDate}
									style={{ opacity: enableStartDate ? 1 : 0.5 }}>
									<Text bold size={16} color="white">
										Set Start Date
									</Text>
									<Text color="white">
										{endDate.toDateString() + ' ' + endDate.toTimeString().split(' GMT')[0]}
									</Text>
								</FlatButton>
							</Block>
							<Text
								marginLeft={10}
								color={theme.textFadeLight}
								weight="500"
								marginTop={2}
								size={12}>
								Starts after being created if not selected
							</Text>
							{showDPSD && enableStartDate && (
								<Block flex={0} hCenter>
									<DatePicker
										date={startDate}
										textColor={theme.text}
										onDateChange={v => setEndDate(v)}
									/>
								</Block>
							)} */}

							{/* END DATE */}
							{/* <Block row flex={0} paddingLeft={10} marginBottom={10} marginTop={10}>
								<CheckBox onPress={() => setEnableEndDate(!enableEndDate)}>
									{enableEndDate && <CheckboxChecked />}
								</CheckBox>
								<FlatButton
									onPress={() => setShowDPED(!showDPED)}
									disabled={!enableEndDate}
									style={{ opacity: enableEndDate ? 1 : 0.5 }}>
									<Text bold size={16} color="white">
										Set End Date
									</Text>
									<Text color="white">
										{endDate.toDateString() + ' ' + endDate.toTimeString().split(' GMT')[0]}
									</Text>
								</FlatButton>
							</Block>
							{showDPED && enableEndDate && (
								<Block flex={0} hCenter>
									<DatePicker
										date={endDate}
										textColor={theme.text}
										onDateChange={v => setEndDate(v)}
									/>
								</Block>
							)} */}
							<TextButton text="next" onPress={() => setStep('OPTIONAL_OPTIONS')} />
							{/* <Block paddingHorizontal={20} paddingTop={20} style={{ justifyContent: 'flex-end' }} flex={0}>
								<Button
									text="Create"
									disabled={loading || !title || !statusDisplayname}
									style={{ marginHorizontal: 10, marginBottom: 20 }}
									onPress={() => create()}
									color="white"
								/>
							</Block> */}
						</ScrollView>
					</Block>
				)}

				{step === 'OPTIONAL_OPTIONS' && (
					<>
						<Text>LOL</Text>
						<TextButton text="next" onPress={() => setStep('REQUIRED_DETAILS')} />
					</>
				)}
			</KeyboardAvoidingView>
		</Block>
	);
};

const TxtInput = styled.TextInput`
	height: 50px;
	border-radius: 10px;
	background-color: ${({ theme }) => theme.backgroundDarker};
	font-weight: 500;
	padding: 0px 15px;
	color: ${({ theme }) => theme.text};
	margin: 0px 10px;
	margin-bottom: 10px;
`;

const FlatButton = styled(TouchableOpacity)`
	background-color: ${({ theme }) => theme.primary};
	color: ${({ theme }) => theme.text};
	border-radius: 10px;
	flex-direction: column;
	height: 50px;
	flex: 1;
	justify-content: center;
	align-items: center;
	margin: 0 10px;
`;

const CheckBox = styled(TouchableOpacity).attrs({ activeOpacity: 0.8 })`
	border-radius: 10px;
	border: solid 2px ${({ theme }) => theme.darker};
	height: 50px;
	width: 50px;
	padding: 5px;/
`;

const CheckboxChecked = styled.View`
	border-radius: 6px;
	background-color: ${({ theme }) => theme.primary};
	flex: 1;
`;
