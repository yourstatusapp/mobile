import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Text, Fill, IconButton, Spacer } from '@parts';
import { usePulse } from '@pulsejs/react';
import core from '@core';

interface HeaderProps {
	title?: string;
	rightArea?: any;
	padding?: boolean;
}

export const Header: React.FC<HeaderProps> = (props) => {
	const { title, rightArea } = props;
	const nav = useNavigation();
	const theme = useTheme();
	const new_notification = usePulse(core.notifications.state.new_notification);

	return (
		<HeaderBody {...props}>
			<Text color={theme.primary} size={26} weight="semi-bold">
				{title}
			</Text>

			<Fill />
			{rightArea}
			<IconButton name="bell" size={35} color={new_notification ? theme.primary : theme.text} onPress={() => nav.navigate('notifications')} noBackground />
			<Spacer size={5} />
			<IconButton name="settings" size={35} noBackground color={theme.text} onPress={() => nav.navigate('Settings')} />
			{/* <Spacer size={10} /> */}
			{/* <IconButton name="settings" size={35} color={theme.text} onPress={() => nav.navigate('NewUser')} /> */}
		</HeaderBody>
	);
};

const HeaderBody = styled.View<HeaderProps>`
	flex-direction: row;
	align-items: center;
	padding: 5px 0px;
	background-color: ${({ theme }) => theme.navBar};
	${({ padding }) => padding && 'padding: 5px 20px;'};
`;
