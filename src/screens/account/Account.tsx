import * as React from 'react';
import { TabbarContentContainer, Text } from '../../parts';

interface AccountProps {}

export const Account: React.FC<AccountProps> = (props) => {
	const {} = props;

	return (
		<TabbarContentContainer>
			<Text size={20}>Account</Text>
		</TabbarContentContainer>
	);
};
