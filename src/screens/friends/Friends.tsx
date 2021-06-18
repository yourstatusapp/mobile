import * as React from 'react';
import { TabbarContentContainer, Text } from '../../parts';

interface FriendsProps {}

export const Friends: React.FC<FriendsProps> = (props) => {
	const {} = props;

	return (
		<TabbarContentContainer>
			<Text size={20}>Friends</Text>
		</TabbarContentContainer>
	);
};
