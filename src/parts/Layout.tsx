import styled from 'styled-components/native';
import * as React from 'react';
import { ViewStyle } from 'react-native';

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
}

export const TabbarContentContainer: React.FC<TabbarContentContainerConfig> = (p) => {
	const { children } = p;

	return <TabbarContentBody {...p}>{children}</TabbarContentBody>;
};

const TabbarContentBody = styled.View<TabbarContentContainerConfig>`
	background-color: ${({ theme }) => theme.background};
	flex: 1;
	padding: 0px ${({ noSidePadding }) => (noSidePadding ? 0 : 20)}px;
	padding-top: 45px;
`;
