import { SimpleCore } from 'simple-core-state';
import { MMKVLoader } from 'react-native-mmkv-storage';
import { ProfileType, StatusType } from './types';
import { AlertDataType } from '@hooks';

interface Account {
	id: string;
	email: string;
}

export const MMKV = new MMKVLoader().initialize();

interface IDefaultCore {
	currentTheme: 'light' | 'dark';
	account: Account | null;
	profile: ProfileType | null;
	alert: AlertDataType | null;
	myStatus: StatusType[];
}

const DefaultCore: IDefaultCore = {
	currentTheme: 'light',
	account: null,
	profile: null,
	alert: null,
	myStatus: [],
};

const SimpleInstance = new SimpleCore<IDefaultCore>(DefaultCore, {
	Storage: {
		custom: {
			set: async (k, v) => {
				await MMKV.setItem(k, v);
			},
			get: async v => MMKV.getItem(v),
		},
	},
});

SimpleInstance.storage.perist(['currentTheme', 'account']);

export const core = SimpleInstance.core();
