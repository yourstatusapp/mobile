import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Text, Fill, IconButton } from '../';

interface HeaderProps {
	title?: string;
	rightArea?: any;
}

export const Header: React.FC<HeaderProps> = (props) => {
	const { title, rightArea } = props;
	const nav = useNavigation();
	const theme = useTheme();

	return (
		<HeaderBody>
			<Text color={theme.primary} size={26} weight="semi-bold">
				{title}
			</Text>
			<Fill />
			{rightArea}
			<IconButton name="settings" size={35} iconSize={22} color={theme.textFade} onPress={() => nav.navigate('Settings')} />
		</HeaderBody>
	);
};

const HeaderBody = styled.View`
	flex-direction: row;
	align-items: center;
`;
