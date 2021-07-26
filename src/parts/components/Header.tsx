import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Text, Fill, IconButton } from '../';
import { InternalThemes } from '../../utils/theme';

interface HeaderProps {
	title?: string;
}

export const Header: React.FC<HeaderProps> = (props) => {
	const { title } = props;
	const nav = useNavigation();
	const theme = useTheme();

	return (
		<HeaderBody>
			<Text color={theme.primary} size={26} weight="semi-bold">
				{title}
			</Text>
			<Fill />
			<RightSection>
				<IconButton name="settings" size={24} color={theme.text} onPress={() => nav.navigate('Settings')} />
			</RightSection>
		</HeaderBody>
	);
};

const HeaderBody = styled.View`
	flex-direction: row;
	align-items: center;
`;

const RightSection = styled.View``;
