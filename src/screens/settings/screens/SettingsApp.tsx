import { usePulse } from '@pulsejs/react';
import * as React from 'react';
import styled from 'styled-components/native';
import { baseURL } from '../../../core/utils';
import { Text, TopHeading } from '../../../parts';
import { TextButton } from '../../../parts/Buttons';

import RNPickerSelect from 'react-native-picker-select';

interface SettingsAppProps {}

export const SettingsApp: React.FC<SettingsAppProps> = (props) => {
	const {} = props;

	const api = usePulse(baseURL);
	const selectApi = (s: string) => {
		baseURL.set(s);
	};

	return (
		<SettingsAppBody>
			<TopHeading text="App Info" />
			<SidePadding>
				<Text>API Connection : {api}</Text>

				<RNPickerSelect
					pickerProps={{ dropdownIconColor: 'red' }}
					onValueChange={(value) => selectApi(value)}
					items={[
						{ label: 'Production', value: 'https://api.yourstatus.app', color: '#58a355' },
						{ label: 'Development', value: 'http://localhost:8080', color: '#FF8282' },
					]}
				/>
			</SidePadding>
		</SettingsAppBody>
	);
};

const SettingsAppBody = styled.View`
	flex: 1;
`;

const SidePadding = styled.View`
	padding: 0px 20px;
	flex: 1;
`;
