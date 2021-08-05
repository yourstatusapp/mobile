import { Input, SidePadding, Text } from '@parts';
import * as React from 'react';
import styled from 'styled-components/native';

interface CustomSelProps {}

export const CustomSel: React.FC<CustomSelProps> = (props) => {
	const {} = props;

	return (
		<SidePadding>
			<Text weight="semi-bold" size={20}>
				custom title and color
			</Text>
			<Input placeholder="any title" />
		</SidePadding>
	);
};
