import * as React from 'react';
import { Block } from '@parts';
import { useState } from 'react';
import { CustomNavBar, NavbarScreens } from './components/NavigationBar';
import { Account, Friends } from '../screens';

export const TabsNavigator = () => {
	const [tab, setTab] = useState<NavbarScreens>('friends');

	return (
		<>
			<Block style={{ zIndex: 1 }}>
				<Block flex={tab === 'account' ? 1 : 0}>
					<Account />
				</Block>
				<Block flex={tab === 'friends' ? 1 : 0}>
					<Friends />
				</Block>
			</Block>

			<CustomNavBar onTabChange={setTab} tabState={tab} />
		</>
	);
};
