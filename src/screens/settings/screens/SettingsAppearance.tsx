import * as React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Fill, Row, Spacer, Text, TopHeading } from '@parts';
import { Switch, View, Appearance } from 'react-native';
import { usePulse } from '@pulsejs/react';
import core from '@core';

interface SettingsAppearanceProps {}

export const SettingsAppearance: React.FC<SettingsAppearanceProps> = (props) => {
	const {} = props;
	const theme = useTheme();
	const t = usePulse(core.ui.state.Theme);
	const useSystemTheme = usePulse(core.app.state.use_system_theme);
	const a = true;

	const toggleTheme = () => {
		core.ui.state.Theme.set(t === 'dark' ? 'light' : 'dark');
	};
	const systemThemeToggle = () => {
		core.app.state.use_system_theme.set(!useSystemTheme);
	};

	return (
		<SettingsAppearanceBody>
			<TopHeading text="Appearance" />
			<SidePadding>
				<Spacer size={5} />
				<Row>
					<View>
						<Text weight="semi-bold">Dark Theme</Text>
						<Spacer size={3} />
						<Text size={14} color={theme.textFade}>
							Going into the dark
						</Text>
					</View>
					<Fill />
					<Switch
						trackColor={{ false: theme.background, true: theme.primary }}
						thumbColor={a ? theme.step1 : theme.background}
						ios_backgroundColor={theme.step1}
						onValueChange={toggleTheme}
						value={t === 'dark'}
						disabled={useSystemTheme === true}
					/>
				</Row>

				<Spacer size={20} />

				<Row>
					<View>
						<Text weight="semi-bold">Use System</Text>
						<Spacer size={3} />
						<Text size={14} color={theme.textFade}>
							Using your system theme setting.
						</Text>
					</View>
					<Fill />
					<Switch
						trackColor={{ false: theme.background, true: theme.primary }}
						thumbColor={a ? theme.step1 : theme.background}
						ios_backgroundColor={theme.step1}
						onValueChange={systemThemeToggle}
						value={useSystemTheme}
					/>
				</Row>
			</SidePadding>
		</SettingsAppearanceBody>
	);
};

const SettingsAppearanceBody = styled.View`
	flex: 1;
`;

const SidePadding = styled.View`
	padding: 0px 20px;
	flex: 1;
`;
