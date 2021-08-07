import core from '@core';
import { SmallButton, Spacer, Text, TextButton } from '@parts';
import { usePulse } from '@pulsejs/react';
import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

interface DebugViewProps {}

export const DebugView: React.FC<DebugViewProps> = (props) => {
	const account = usePulse(core.account.state.ACCOUNT);
	const profile = usePulse(core.profile.state.PROFILE);
	return (
		<DebugViewBody pointerEvents="box-none" >
			<Text>{JSON.stringify(account)}</Text>
			<Spacer size={20} />
			<Text>{JSON.stringify(profile)}</Text>
			<Spacer size={40} />
			<View pointerEvents="box-none">
				<SmallButton text="Close" onPress={() => core.app.state.debug_enabled.set(false)} />
			</View>
			<Spacer size={10} />
		</DebugViewBody>
	);
};

const DebugViewBody = styled.View`
	position: absolute;
	top: 0;
	z-index: 10;
	margin-top: 50px;
	background-color: white;
	opacity: 1;
	padding: 10px;
	flex: 1;
  opacity: 0.5;
`;
