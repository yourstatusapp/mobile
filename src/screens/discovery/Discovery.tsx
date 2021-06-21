import * as React from 'react';
import { TabbarContentContainer, Text } from '../../parts';

interface DiscoveryProps {}

export const Discovery: React.FC<DiscoveryProps> = (props) => {
	const {} = props;

	return (
		<TabbarContentContainer>
			<Text size={20}>Discovery</Text>
		</TabbarContentContainer>
	);
};
