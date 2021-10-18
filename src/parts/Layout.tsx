import styled, { useTheme } from 'styled-components/native';
import * as React from 'react';
import { SafeAreaView, ViewStyle } from 'react-native';
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
	pointerEvents?: any;
}

export const Row: React.FC<RowStyleType> = (p) => (
	<RowBody {...p} style={p.style} pointerEvents={p.pointerEvents}>
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
	innerStyle?: ViewStyle;
	style?: ViewStyle;
}

export const TabbarContentContainer: React.FC<TabbarContentContainerConfig> = (p) => {
	const { children } = p;

	return (
		<TabbarContentBody {...p}>
			<TabbarWrapper>{children}</TabbarWrapper>
		</TabbarContentBody>
	);
};

const TabbarContentBody = styled(SafeAreaView)<TabbarContentContainerConfig>`
	flex: 1;
	padding: 0px ${({ noSidePadding }) => (noSidePadding ? 0 : 20)}px;
	background-color: ${({ theme }) => theme.step0};
`;

const TabbarWrapper = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.background};
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

export const Cul = styled.View<{ center?: boolean }>`
	width: 100%;
	flex-direction: column;
	${({ center }) => center && 'align-items: center;'}
`;
