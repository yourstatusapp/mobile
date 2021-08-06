import { request } from '@core';
import { Fill, Input, Row, SidePadding, SmallButton, SmallInput, Spacer, Text, WideButton } from '@parts';
import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { ScrollView, Switch, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import styled, { useTheme } from 'styled-components/native';

interface EventSelProps {}

export const EventSel: React.FC<EventSelProps> = (props) => {
	const theme = useTheme();
	const nav = useNavigation();

	const [Public, setPublic] = React.useState(false);
	const [TimeSelected, setTimeSelected] = React.useState('start');
	const [StartTime, setStartTime] = React.useState(new Date());
	const [EndTime, setEndTime] = React.useState(new Date());
	const [Title, setTitle] = React.useState('');
	const [Desc, setDesc] = React.useState('');

	const onDateChange = (date) => {
		TimeSelected === 'start' ? setStartTime(date) : setEndTime(date);
	};

	const createEvent = async () => {
		await request('post', '/events/create', {
			data: {
				title: Title,
				public: Public,
				start_date: StartTime,
				end_date: EndTime,
				description: Desc,
			},
		});

		nav.goBack();
	};

	const defaultSmallBtnStyle = { borderStyle: 'solid', borderWidth: 2 };
	const smallButtonStyle = { ...defaultSmallBtnStyle, borderColor: TimeSelected === 'start' ? theme.primary : theme.step1 };
	const smallButtonStyle1 = { ...defaultSmallBtnStyle, borderColor: TimeSelected === 'end' ? theme.primary : theme.step1 };

	return (
		<ScrollView>
			<SidePadding>
				<Spacer size={10} />
				<Text weight="bold" size={28}>
					Create Event
				</Text>
				<Spacer size={5} />
				<Text color={theme.textFade} size={16}>
					Create your custom event for your friends or the public.
				</Text>
				<Spacer size={50} />
				<Text weight="semi-bold" size={18}>
					Title
				</Text>
				<Spacer size={10} />
				<SmallInput placeholder="Title" onChangeText={setTitle} />
				<Spacer size={50} />
				<Text weight="semi-bold" size={18}>
					Description
				</Text>
				<Spacer size={10} />
				<SmallInput placeholder="Tell us more about your event" onChangeText={setTitle} autoCompleteType="off" autoCorrect={false} multiline style={{ height: 90 }} />

				<Spacer size={40} />

				<Row>
					<View style={{ flex: 1, marginRight: 20 }}>
						<Text weight="semi-bold" size={18}>
							Public
						</Text>
						<Text size={14} color={theme.textFade}>
							Able to share this to non friends and search-able
						</Text>
					</View>
					<Switch value={Public} onValueChange={setPublic} trackColor={{ true: theme.primary }} thumbColor={theme.background} />
				</Row>
				<Spacer size={50} />
				<Text weight="semi-bold" size={18}>
					Select a Date and Time
				</Text>
				<Spacer size={10} />
				<Row center>
					<SmallButton text="start" style={smallButtonStyle} onPress={() => setTimeSelected('start')} />
					<Spacer size={10} />
					<SmallButton text="end" style={smallButtonStyle1} onPress={() => setTimeSelected('end')} />
				</Row>
				<Spacer size={10} />
				<Row center>
					<DatePicker
						textColor={theme.text}
						onDateChange={onDateChange}
						date={TimeSelected === 'start' ? StartTime : EndTime}
						minimumDate={TimeSelected === 'end' ? StartTime : new Date()}
					/>
				</Row>
				<Fill />
				<Spacer size={20} />
				<WideButton text="Create event" onPress={() => createEvent()} />
				<Spacer size={50} />
			</SidePadding>
		</ScrollView>
	);
};
