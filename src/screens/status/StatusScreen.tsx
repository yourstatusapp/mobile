import core from '@core';
import { Fill, Row, SmallButton, Spacer, StatusBox, Text, TextButton } from '@parts';
import { usePulse } from '@pulsejs/react';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { request, snow2time } from '../../core/utils';
import { AvailabilitySel } from './selections/AvailabilitySel';
import { CustomSel } from './selections/CustomSel';
import { EventSel } from './selections/EventSel';
import { LocationSel } from './selections/LocationSel';

const SelectionStack = createStackNavigator();

interface StatusProps {}

export const StatusScreen: React.FC<StatusProps> = (props) => {
	const theme = useTheme();
	const nav = useNavigation();
	const {} = props;

	return (
		<StatusBody>
			<TopHeading style={{ height: 50, backgroundColor: theme.step1 }}>
				<TextButton text="Close" size={18} weight="semi-bold" color={theme.primary} onPress={() => nav.goBack()} />
			</TopHeading>

			{/* ROUTER */}
			<SelectionStack.Navigator initialRouteName="indexSel" mode="card" screenOptions={{ headerShown: false, cardStyle: { backgroundColor: theme.background } }}>
				<SelectionStack.Screen name="indexSel" component={SelectionScreen} />
				<SelectionStack.Screen name="customSel" component={CustomSel} />
				<SelectionStack.Screen name="locationSel" component={LocationSel} />
				<SelectionStack.Screen name="eventSel" component={EventSel} />
				<SelectionStack.Screen name="availabilitySel" component={AvailabilitySel} />
			</SelectionStack.Navigator>
		</StatusBody>
	);
};

const StatusBody = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.background};
`;

const TopHeading = styled(Row)`
	padding: 0px 20px;
	/* margin-bottom: 10px; */
`;

const SidePadding = styled.View`
	padding: 0px 20px;
	flex: 1;
`;

const SelectionBtn = styled(TouchableOpacity)`
	background-color: ${({ theme }) => theme.step1};
	height: 90px;
	justify-content: center;
	width: 48%;
	padding: 10px;
	border-radius: 12px;
	margin-bottom: 15px;
`;

const SelectionScreen: React.FC = () => {
	const theme = useTheme();
	const nav = useNavigation();
	const myStatus = usePulse(core.status.state.my_status);

	const buttons: { icon?: string; text: string; route: string; color: string }[] = [
		{
			text: `Set your custom status`,
			route: 'customSel',
			color: '#57d973',
		},
		// {
		// 	icon: '',
		// 	text: 'Location Preference',
		// 	route: 'locationSel',
		// 	color: '#f6a265',
		// },
		// {
		// 	text: 'Create a Event',
		// 	route: 'eventSel',
		// 	color: '#498cbc',
		// },
		// {
		// 	icon: '',
		// 	text: 'Availability',
		// 	route: 'availabilitySel',
		// 	color: '#FFB246',
		// },
		// {
	];

	const endStatus = async (id: string) => {
		await request('delete', `/status/${id}/end`);
		core.status.state.my_status.reset();
	};

	const renderItem = ({ item, index }) => (
		<SelectionBtn key={index} activeOpacity={0.5} onPress={() => nav.navigate(item.route)} style={{ backgroundColor: item.color }}>
			<Text center weight="semi-bold" size={18} color={theme.background}>
				{item.text}
			</Text>
		</SelectionBtn>
	);

	return (
		<SidePadding style={{ flex: 1 }}>
			<Spacer size={20} />
			<Text weight="bold" size={28} color={theme.text} center>
				Choose your status
			</Text>
			<Text center color={theme.textFade}>
				You can choose a status how you want to share your friends what you're doing or you want to do.
			</Text>
			<Spacer size={20} />
			{myStatus?.id && (
				<CurrentStatus>
					<Row>
						<Text weight="semi-bold" size={18}>
							Current status:
						</Text>
						{/* <Spacer size={5} /> */}
						<Fill />

						{myStatus?.data && <StatusBox {...myStatus} />}
					</Row>
					<Spacer size={15} />
					<Row>
						<Text size={14} color={theme.textFade}>
							{snow2time(myStatus?.id || '').toLocaleString()}
						</Text>
						<Fill />
						<SmallButton text="End status" onPress={() => endStatus(myStatus.id || '')} textColor="#FF7878" />
					</Row>
				</CurrentStatus>
			)}

			<FlatList
				data={buttons}
				renderItem={renderItem}
				numColumns={2}
				horizontal={false}
				columnWrapperStyle={{ justifyContent: 'space-between' }}
				contentContainerStyle={{ paddingTop: 15 }}
			/>
		</SidePadding>
	);
};

const CurrentStatus = styled.View`
	background-color: ${({ theme }) => theme.step0};
	padding: 15px;
	border-radius: 12px;
`;
