import { Header, Spacer, TabbarContentContainer, Text } from '@parts';
import * as React from 'react';
import { useTheme } from 'styled-components';

interface DiscoveryProps {}

export const DiscoveryView: React.FC<DiscoveryProps> = (props) => {
	const {} = props;
	const theme = useTheme();

	return (
		<TabbarContentContainer noSidePadding>
			<Header title="Discovery" padding />
			<Spacer size={40} />
			<Text center weight="semi-bold" size={20} color={theme.textFade}>
				Will be available soon
			</Text>
		</TabbarContentContainer>
	);
};
