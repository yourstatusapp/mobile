import * as React from 'react';
import { Header, TabbarContentContainer, Text } from '../../parts';

interface DiscoveryProps {}

export const Discovery: React.FC<DiscoveryProps> = (props) => {
	const {} = props;

	return (
		<TabbarContentContainer noSidePadding>
			<Header title="Discovery" padding />
		</TabbarContentContainer>
	);
};
