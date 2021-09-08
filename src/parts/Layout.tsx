import styled, { useTheme } from 'styled-components/native';
import * as React from 'react';
import { View, ViewStyle } from 'react-native';
import { TextButton } from './Buttons';
import { useNavigation } from '@react-navigation/native';
import { Text } from './Text';

export const Spacer: React.FC<{ size: number }> = (p) => <SpacerBody {...p} />;

const SpacerBody = styled.View<{ size: number }>`
	height: ${({ size }) => size}px;
	width: ${({ size }) => size}px;
`;

interface RowStyleType {
	style?: ViewStyle;
	center?: boolean;
}

export const Row: React.FC<RowStyleType> = (p) => (
	<RowBody {...p} style={p.style}>
		{p.children}
	</RowBody>
);

const RowBody = styled.View<RowStyleType>`
	${({ center }) => `
		${center ? 'justify-content: center;' : ''}
	`}
	flex-direction: row;
	align-items: center;
`;

export const Fill = styled.View`
	flex: 1;
	flex-grow: 1;
`;

interface TabbarContentContainerConfig {
	noSidePadding?: boolean;
	topBarColor?: string;
}

export const TabbarContentContainer: React.FC<TabbarContentContainerConfig> = (p) => {
	const { children } = p;
	const theme = useTheme();

	return (
		<TabbarContentBody {...p}>
			<View style={{ height: 40, backgroundColor: p.topBarColor || theme.step0 }} />
			{children}
		</TabbarContentBody>
	);
};

const TabbarContentBody = styled.View<TabbarContentContainerConfig>`
	background-color: ${({ theme }) => theme.background};
	flex: 1;
	padding: 0px ${({ noSidePadding }) => (noSidePadding ? 0 : 20)}px;
	/* padding-top: 45px; */
`;

interface TopHeadingProps {
	text?: string;
}

export const TopHeading: React.FC<TopHeadingProps> = (p) => {
	const theme = useTheme();
	const nav = useNavigation();

	return (
		<TopHeadingBody>
			<TextButton text="Back" size={18} weight="semi-bold" color={theme.primary} onPress={() => nav.goBack()} />
			<Fill />
			<Text size={19} weight="semi-bold">
				{p.text}
			</Text>
			<Spacer size={40} />
			<Fill />
		</TopHeadingBody>
	);
};

const TopHeadingBody = styled(Row)`
	padding: 0px 20px;
	margin-bottom: 10px;
	height: 50px;
	background-color: ${({ theme }) => theme.step1};
	border-bottom-color: ${({ theme }) => theme.step2};
	border-bottom-width: 1;
`;

export const SidePadding = styled.View`
	padding: 0px 20px;
	flex: 1;
`;
