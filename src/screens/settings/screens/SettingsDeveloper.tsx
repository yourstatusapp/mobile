import core from '@core';
import { Text, TopHeading, SidePadding, Row, Spacer } from '@parts';
import { usePulse } from '@pulsejs/react';
import * as React from 'react';
import { View, Switch } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

export const SettingsDeveloper: React.FC = () => {
	const theme = useTheme();
	const tabbar_show_text = usePulse(core.app.state.tabbar_show_text);

	const toggleSetting = (setting: 'tabbar_show_text', value: boolean) => {
		core.app.state[setting].set(value);
	};

	return (
		<SettingsDeveloperBody>
			<TopHeading text="Developer" />
			<SidePadding>
				<Spacer size={5} />
				<WarningBox>
					<Text weight="semi-bold" center color={theme.text}>
						WARNING, EXPERIMENTAL FEATURES
					</Text>
				</WarningBox>

				<Spacer size={20} />
				<Row>
					<View style={{ flex: 1 }}>
						<Text weight="semi-bold">Navigation bar text </Text>
						<Spacer size={3} />
						<Text size={14} color={theme.textFade}>
							Show/Hide the text on the navigation bar. (default: true)
						</Text>
					</View>
					<Switch value={tabbar_show_text} onValueChange={(v) => toggleSetting('tabbar_show_text', v)} />
				</Row>
			</SidePadding>
		</SettingsDeveloperBody>
	);
};

const SettingsDeveloperBody = styled.View`
	flex: 1;
`;

const WarningBox = styled.View`
	background-color: #f37c7c;
	padding: 10px 5px;
	border-radius: 12px;
`;
