import { TabbarContentContainer, Text } from '@parts';
import * as React from 'react';
import styled from 'styled-components/native';

export const Verify: React.FC = () => {
	return (
		<TabbarContentContainer>
			<Text weight="bold" size={30}>
				Verifying Account
			</Text>
		</TabbarContentContainer>
	);
};
