import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Text, Fill, Icon, IconButton } from '@parts';
import { usePulse } from '@pulsejs/react';
import core from '@core';
// import { CodePushState } from '../../utils/CodePush';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
	// const newUpdate = usePulse(CodePushState.UpdateReadyToInstall);

	return (
		<HeaderBody {...props}>
			<HeaderTitle color={theme.primary} size={27} weight="bold">
				{title}
			</HeaderTitle>

			<Fill />
			{rightArea}
			{/* <IconButton name="bell" size={20} color={new_notification ? theme.primary : theme.textFade} onPress={() => nav.navigate('notifications')} noBackground /> */}
			{/* <Spacer size={10} /> */}
			<TouchableOpacity style={{ position: 'relative', padding: 5 }} onPress={() => nav.navigate('Settings')}>
				{/* {newUpdate === true && <Dot />} */}
				<Icon name="settings" size={18} color={theme.text} />
			</TouchableOpacity>
			{/* <Spacer size={10} /> */}
			{/* <IconButton name="settings" size={35} color={theme.text} onPress={() => nav.navigate('NewUser')} /> */}
		</HeaderBody>
	);
};

const HeaderTitle = styled(Text)`
	letter-spacing: -0.9px;
`;

const HeaderBody = styled.View<HeaderProps>`
	flex-direction: row;
	align-items: center;
	padding: 8px 0px;
	background-color: ${({ theme }) => theme.navBar};
	${({ padding }) => padding && 'padding: 8px 15px;'};
`;

const Dot = styled.View`
	position: absolute;
	z-index: 10px;
	right: 0;
	top: 0;
	height: 14px;
	width: 14px;
	border-radius: 20px;
	background-color: ${({ theme }) => theme.primary};
`;
