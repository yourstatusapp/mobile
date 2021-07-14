import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Fill, Icon, Row, Spacer, Text } from '../../parts';
import { TextButton } from '../../parts/Buttons';
import { SettingsAccount } from './screens/SettingsAccount';
import { SettingsAppearance } from './screens/SettingsAppearance';

const SettingsStack = createStackNavigator();

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = (props) => {
	const {} = props;
	const nav = useNavigation();
	const theme = useTheme();
	const cardStyle = { backgroundColor: theme.background };
	return (
		<SettingsStack.Navigator headerMode="none" initialRouteName="SettingsMain" screenOptions={{ cardStyle }}>
			<SettingsStack.Screen name="SettingsMain" component={SettingsMain} />
			<SettingsStack.Screen name="SettingsAccount" component={SettingsAccount} />
			<SettingsStack.Screen name="SettingsAppearance" component={SettingsAppearance} />
		</SettingsStack.Navigator>
	);
};

const SettingsMain: React.FC = () => {
	const nav = useNavigation();
	return (
		<SettingsBody>
			<Row>
				<Text size={30} weight="bold">
					Settings
				</Text>
				<Fill />
				<TextButton size={18} weight="medium" text="close" onPress={() => nav.goBack()} />
			</Row>
			<Spacer size={30} />
			<SettingsButton text="Account" routeName="Account" icon="person" />
			<SettingsButton text="Appearance" routeName="Appearance" icon="quil" />
		</SettingsBody>
	);
};

const SettingsBody = styled.View`
	flex: 1;
	padding: 20px;
`;

interface SettingsButtonProps {
	text: string;
	icon: string;
	routeName: string;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ icon, text, routeName }) => {
	const nav = useNavigation();

	return (
		<SettingsButtonBody onPress={() => nav.navigate('Settings' + routeName)}>
			<Text weight="semi-bold">{text}</Text>
			<Fill />
			<Icon name={icon} size={26} color="black" />
		</SettingsButtonBody>
	);
};

const SettingsButtonBody = styled(TouchableOpacity)`
	background-color: #f5f5f5;
	border-radius: 8px;
	/* padding: 10px; */
	height: 50px;
	padding: 0px 10px;
	align-items: center;
	margin-bottom: 10px;
	flex-direction: row;
`;
