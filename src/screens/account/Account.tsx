import { usePulse } from '@pulsejs/react';
import * as React from 'react';
import core from '../../core';
import { TabbarContentContainer, Text } from '../../parts';
import { Avatar } from '../../parts/Avatar';

interface AccountProps {}

export const Account: React.FC<AccountProps> = (props) => {
	const {} = props;

	const acc = usePulse(core.account.state.ACCOUNT);

	return (
		<TabbarContentContainer>
			{/* <Avatar src={} /> */}
			<Text size={12}>{JSON.stringify(acc)}</Text>
		</TabbarContentContainer>
	);
};
