import * as React from 'react';
import styled from 'styled-components/native';
import { Text } from '../../../parts';

interface SettingsAppearanceProps {}

export const SettingsAppearance: React.FC<SettingsAppearanceProps> = (props) => {
	const {} = props;

	return (
		<SettingsAppearanceBody>
			<Text>Appearance</Text>
		</SettingsAppearanceBody>
	);
};

const SettingsAppearanceBody = styled.View`
	flex: 1;
`;
