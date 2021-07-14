import styled from 'styled-components/native';
import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export const Spacer: React.FC<{ size: number }> = (p) => <SpacerBody {...p} />;

const SpacerBody = styled.View<{ size: number }>`
	height: ${({ size }) => size}px;
	width: ${({ size }) => size}px;
`;

interface RowStyleType {
	style?: StyleProp<ViewStyle>;
}
export const Row: React.FC<RowStyleType> = ({ children, style }) => <RowBody style={style}>{children}</RowBody>;

const RowBody = styled.View`
	flex-direction: row;
	align-items: center;
`;

export const Fill = styled.View`
	flex: 1;
	flex-grow: 1;
`;

export const TabbarContentContainer: React.FC = ({ children }) => {
	return <TabbarContentBody>{children}</TabbarContentBody>;
};

const TabbarContentBody = styled.View`
	padding: 20px;
	padding-top: 50px;
`;
