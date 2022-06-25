import { useNavigation } from '@hooks';
import { Block, IconButton, Line, Text } from '@parts';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';

interface TabbarHeaderProps {
	color?: string;
	backButton?: boolean;
	centerText?: string;
}

/**
 * @description This component should be only used when its inside a fixed view
 */
export const TabbarHeader: React.FC<TabbarHeaderProps> = ({ color, backButton, centerText }) => {
	const theme = useTheme();
	const insets = useSafeAreaInsets();
	const nav = useNavigation();

	return (
		<Block
			flex={0}
			style={{
				minHeight: insets.top,
				backgroundColor: color ?? theme.background,
			}}>
			{backButton && (
				<Block
					marginTop={insets.top}
					row
					style={{ height: 30 }}
					flex={0}
					vCenter
					hCenter
					color={theme.backgroundDark}>
					<IconButton
						name="arrow"
						size={20}
						iconSize={16}
						color={theme.text}
						style={{ position: 'absolute', left: 15 }}
						onPress={() => nav.goBack()}
					/>
					{centerText && (
						<Text medium size={16}>
							{centerText}
						</Text>
					)}
				</Block>
			)}
			<Line size={2} color={theme.backgroundDarker} />
		</Block>
	);
};
