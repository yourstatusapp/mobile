import * as React from 'react';
import { Block, IconButton, Spacer, Text } from '@parts';
import { useTheme } from '@hooks';

export const SettingsUI: React.FC = () => {
	const { theme } = useTheme();

	return (
		<Block color={theme.backgroundDarker}>
			<Text bold size={30} marginLeft={10}>
				UI Library
			</Text>
			<Spacer size={30} />
			<Block paddingHorizontal={10} color={theme.background} paddingTop={10}>
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

				<IconButton
					name="brush"
					size={20}
					color={theme.text}
					backgroundColor={theme.backgroundDarker}
				/>
			</Block>
		</Block>
	);
};
