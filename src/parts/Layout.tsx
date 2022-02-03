import styled from 'styled-components/native';
import * as React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { BlockType } from '@core';

export const Spacer: React.FC<{ size: number; h?: boolean }> = ({ size, h }) => <SpacerBody s={size} horizontal={h} />;

const SpacerBody = styled.View<{ s: number; horizontal?: boolean }>`
	${({ s, horizontal }) =>
		horizontal
			? `
  height: 1px;
  width: ${s}px;
  `
			: `
  height: ${s}px;
  width: 1px;
  `}
`;

interface RowStyleType {
	style?: ViewStyle;
	className?: string;
	center?: boolean;
}

// Row block from left to right
export const Row: React.FC<RowStyleType> = ({ className, style, children }) => <RowBody {...{ className, style }}>{children}</RowBody>;

const RowBody = styled.View<RowStyleType>`
	${({ center }) => `
		${center ? 'justify-content: center;' : ''}
	`}
	flex-direction: row;
	align-items: center;
`;

// FIlls the area
export const Fill = styled.View`
	flex: 1;
	flex-grow: 1;
`;
