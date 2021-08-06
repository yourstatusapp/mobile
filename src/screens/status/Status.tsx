import { Row, Spacer, Text, TextButton } from '@parts';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { AvailabilitySel } from './selections/AvailabilitySel';
import { CustomSel } from './selections/CustomSel';
import { EventSel } from './selections/EventSel';
import { LocationSel } from './selections/LocationSel';

const SelectionStack = createStackNavigator();

interface StatusProps {}

export const Status: React.FC<StatusProps> = (props) => {
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
	const buttons: { icon: string; text: string; route: string; color: string }[] = [
		{
			icon: '',
			text: 'Location',
			route: 'locationSel',
			color: '#29C067',
		},
		{
			icon: '',
			text: 'Availability',
			route: 'availabilitySel',
			color: '#FFB246',
		},
		{
			icon: '',
			text: 'Event',
			route: 'eventSel',
			color: '#71cae0',
		},
		// {
		// 	icon: '',
		// 	text: 'Event',
		// 	route: 'eventSel',
		// 	color: '#C68EFF',
		// },
		// {
		// 	icon: '',
		// 	text: '',
		// 	route: 'eventSel'
		// }
	];

	const renderItem = ({ item, index }) => (
		<SelectionBtn key={index} activeOpacity={0.5} onPress={() => nav.navigate(item.route)} style={{ backgroundColor: item.color }}>
			<Text center weight="semi-bold" size={18} color="white">
				{item.text}
			</Text>
		</SelectionBtn>
	);

	return (
		<SidePadding style={{ flex: 1 }}>
			<Spacer size={10} />
			<Text weight="bold" size={28} color={theme.text} center>
				Choose your status
			</Text>
			<Text center color={theme.textFade}>
				You can choose a status how you want to share your friends what you're doing or you want to do.
			</Text>
			<Spacer size={20} />

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
