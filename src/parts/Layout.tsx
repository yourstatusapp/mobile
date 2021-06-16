import styled from 'styled-components/native';
import * as React from 'react';

export const Spacer: React.FC<{ size: number }> = (p) => <SpacerBody {...p} />;

const SpacerBody = styled.View<{ size: number }>`
	height: ${({ size }) => size}px;
	width: ${({ size }) => size}px;
`;

export const Row: React.FC = ({ children }) => <RowBody>{children}</RowBody>;

const RowBody = styled.View`
	flex: 1;
	flex-direction: row;
`;
