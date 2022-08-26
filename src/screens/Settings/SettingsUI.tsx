import * as React from 'react';
import { Block, IconButton, RoundyButton, Spacer, Text } from '@parts';
import { useAlert, useTheme } from '@hooks';

export const SettingsUI: React.FC = () => {
	const { theme } = useTheme();
	const { createAlert } = useAlert();

	return (
		<Block color={theme.background}>
			<Text bold size={30} marginLeft={10}>
				UI Library
			</Text>
			<Spacer size={30} />
			<Block paddingHorizontal={10} color={theme.backgroundDark} paddingTop={10}>
				<Text size={15}>normal</Text>
				<Text size={15} medium>
					medium
				</Text>
				<Text size={15} bold>
					bold
				</Text>
				<Text size={15} extraBold>
					extrabold
				</Text>

				<Spacer size={50} />

				<IconButton name="brush" size={20} color={theme.text} backgroundColor={theme.backgroundDarker} />

				<RoundyButton
					text="test alert"
					onPress={() => createAlert({ success: true, title: 'test alert', desc: 'test description alert' })}
				/>
			</Block>
		</Block>
	);
};
