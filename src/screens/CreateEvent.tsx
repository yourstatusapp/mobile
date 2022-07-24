import { AppAlert, request } from '@core';
import { useNavigation, useTheme } from '@hooks';
import { Block, SmallButton, Spacer, Status, Text, TextButton } from '@parts';
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { TabbarHeader } from '../parts/components/TabbarHeader';
import styled from 'styled-components/native';
import Animated, { Transition } from 'react-native-reanimated';
import { Calendar, CalendarList } from 'react-native-calendars';
import dayjs from 'dayjs';

export const CreateEvent = () => {
	const { theme } = useTheme();
	const nav = useNavigation();
	const [step, setStep] = useState<'REQUIRED_DETAILS' | 'OPTIONAL_OPTIONS'>('REQUIRED_DETAILS');

	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const [endDate, setEndDate] = useState(new Date());
	const [startDate, setStartDate] = useState(new Date());
	const [isOpen, setOpen] = React.useState(false);
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
								placeholderTextColor={theme.darker2}
								autoCompleteType="off"
								autoCorrect={false}
								keyboardAppearance={theme.name}
							/>
							<TxtInput
								placeholderTextColor={theme.darker2}
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
								placeholderTextColor={theme.darker2}
								placeholder="Status display name"
								value={statusDisplayname}
								onChangeText={v => setStatusDisplayname(v)}
							/>

							{/* Start Date */}
							<SmallButton text="Set start date" onPress={() => {}} />

							<TextButton text="next" onPress={() => setStep('OPTIONAL_OPTIONS')} />
						</ScrollView>
					</Block>
				)}

				{step === 'OPTIONAL_OPTIONS' && (
					<>
						<Block color={theme.background}>
							<Text>Selected Date: {JSON.stringify(startDate) || ''}</Text>
							<CalendarList
								horizontal
								theme={{
									calendarBackground: theme.background,
									contentStyle: { backgroundColor: 'red' },
								}}
								style={{ backgroundColor: theme.background }}
								markingType={'custom'}
								markedDates={{
									'2022-06-28': {},
									'2022-06-29': {},
								}}
								initialDate={new Date().toDateString()}
								date={startDate.toDateString() || new Date().toDateString()}
								renderHeader={date => {
									<Block flex={0} color={theme.background}>
										<Text color={'red'}>- {JSON.stringify(date)}</Text>
									</Block>;
								}}
								dayComponent={({ date, marking }) => (
									<Block
										press
										flex={0}
										color={marking ? 'red' : theme.background}
										style={{ paddingVertical: 10 }}
										hCenter
										vCenter
										onPress={() => {
											setStartDate(dayjs(date?.dateString).toDate());
											console.log(date?.dateString);
										}}>
										{date?.day && <Text medium>{JSON.stringify(date.day)}</Text>}
										<Text medium>{JSON.stringify(marking)}</Text>
									</Block>
								)}
							/>
							<TextButton text="next" onPress={() => setStep('REQUIRED_DETAILS')} />
						</Block>
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
