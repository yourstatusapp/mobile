import { instance } from '@pulsejs/react';
import * as React from 'react';
import { Router } from './utils/Router';

import AsyncStorage from '@react-native-async-storage/async-storage';

instance.setStorage({
	async: true,
	get: AsyncStorage.getItem,
	set: AsyncStorage.setItem,
	remove: AsyncStorage.removeItem,
});

export const App: React.FC = () => {
	return <Router />;
};
