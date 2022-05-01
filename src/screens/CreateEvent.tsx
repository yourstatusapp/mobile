import { AppAlert, request } from '@core';
import { useNavigation } from '@hooks';
import { Block, Button, Icon, IconButton, Line, Spacer, Status, Text } from '@parts';
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import styled, { useTheme } from 'styled-components/native';

export const CreateEvent = () => {
	const theme = useTheme();
	const nav = useNavigation();
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
		const res = await request('post', '/events/create', {
			data: {
				title,
				description,
				end_date: endDate,
				// location: check().string(),
				status_display_name: statusDisplayname,
			},
		});
		if (res.data) {
			nav.goBack();
		} else {
			AppAlert(false, res.message);
		}
	};

	return (
		<Block color={theme.background} flex={1}>
			<ScrollView contentContainerStyle={{ flex: 1 }} style={{ flex: 1 }} endFillColor="red">
				<KeyboardAvoidingView behavior="padding" contentContainerStyle={{ flex: 1 }} style={{ flex: 1 }}>
					<Text bold size={26} marginBottom={5} marginLeft={20} marginTop={50}>
						Create your're next event
					</Text>
					{/* <Text color={theme.textFade} marginBottom={30} marginLeft={10} weight="600" style={{ letterSpacing: -0.95 }}>
				Here you're able to create a customizable event to you're preference which you can invite you're friends only or you are able to
				share with the world
			</Text> */}
					<Line size={1} color={theme.darker} />
					<Spacer size={20} />
					<TxtInput placeholder="Title" value={title} onChangeText={v => setTitle(v)} />
					<TxtInput
						placeholder="Description"
						value={description}
						onChangeText={v => setDescription(v)}
						style={{ height: 150, lineHeight: 20, paddingTop: 15, paddingLeft: 15 }}
						multiline
						numberOfLines={4}
					/>

					<Block marginLeft={20} marginBottom={10} marginTop={20} flex={0}>
						<Status status={{ account_id: 'dsa', type: 2, data: { message: statusDisplayname } }} />
					</Block>

					<TxtInput placeholder="Status display name" value={statusDisplayname} onChangeText={v => setStatusDisplayname(v)} />

					{/* Start Date */}
					<Block row flex={0} paddingLeft={20}>
						<CheckBox onPress={() => setEnableStartDate(!enableStartDate)}>{enableStartDate && <CheckboxChecked />}</CheckBox>
						<FlatButton onPress={() => setShowDPSD(!showDPSD)} disabled={!enableStartDate} style={{ opacity: enableStartDate ? 1 : 0.5 }}>
							<Text bold size={16} color="white">
								Set Start Date
							</Text>
							<Text color="white">{endDate.toDateString() + ' ' + endDate.toTimeString().split(' GMT')[0]}</Text>
						</FlatButton>
					</Block>
					<Text marginLeft={20} color={theme.textFadeLight} weight="500" marginTop={2} size={12}>
						Starts after being created if not selected
					</Text>
					{showDPSD && enableStartDate && (
						<Block flex={0} hCenter>
							<DatePicker date={startDate} textColor={theme.text} onDateChange={v => setEndDate(v)} />
						</Block>
					)}

					{/* END DATE */}
					<Block row flex={0} paddingLeft={20} marginBottom={10} marginTop={10}>
						<CheckBox onPress={() => setEnableEndDate(!enableEndDate)}>{enableEndDate && <CheckboxChecked />}</CheckBox>
						<FlatButton onPress={() => setShowDPED(!showDPED)} disabled={!enableEndDate} style={{ opacity: enableEndDate ? 1 : 0.5 }}>
							<Text bold size={16} color="white">
								Set End Date
							</Text>
							<Text color="white">{endDate.toDateString() + ' ' + endDate.toTimeString().split(' GMT')[0]}</Text>
						</FlatButton>
					</Block>
					{showDPED && enableEndDate && (
						<Block flex={0} hCenter>
							<DatePicker date={endDate} textColor={theme.text} onDateChange={v => setEndDate(v)} />
						</Block>
					)}

					<Block paddingHorizontal={20} paddingTop={20} style={{ justifyContent: 'flex-end' }}>
						<Button
							text="Create"
							disabled={!title || !statusDisplayname}
							style={{ marginHorizontal: 10, marginBottom: 20 }}
							onPress={() => create()}
							color="white"
						/>
					</Block>
				</KeyboardAvoidingView>
			</ScrollView>
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
	margin: 0px 20px;
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
