import { usePulse } from '@pulsejs/react';
import * as React from 'react';
import styled from 'styled-components/native';
import { baseURL } from '../../../core/utils';
import { Text } from '../../../parts';
import { TextButton } from '../../../parts/Buttons';

interface SettingsAppProps {}

export const SettingsApp: React.FC<SettingsAppProps> = (props) => {
	const {} = props;

	const api = usePulse(baseURL);
	const selectApi = (s: string) => {
		baseURL.set(s);
	};

	return (
		<SettingsAppBody>
			<Text>API Connection : {api}</Text>
			<TextButton text="production" onPress={() => selectApi('https://api.yourstatus.app/')} />
			<TextButton text="development" onPress={() => selectApi('http://localhost:8080/')} />
		</SettingsAppBody>
	);
};

const SettingsAppBody = styled.View`
	flex: 1;
	padding: 20px;
`;
