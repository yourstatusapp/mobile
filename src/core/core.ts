import { SimpleCore } from 'simple-core-state';
import { MMKVLoader } from 'react-native-mmkv-storage';
import { FriendItemType, ICreateStatus, ProfileType, StatusType } from './types';
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
	newStatusDraft: ICreateStatus;
	friendsList: FriendItemType[];
}

const DefaultCore: IDefaultCore = {
	currentTheme: 'light',
	account: null,
	profile: null,
	alert: null,
	myStatus: [],
	newStatusDraft: {
		data: {},
		statusText: '',
		type: 'MESSAGE',
	},
	friendsList: [],
};

const SimpleInstance = new SimpleCore<IDefaultCore>(DefaultCore, {
	storage: {
		custom: {
			//@ts-ignore
			set: async (k, v) => {
				if (__DEV__) console.log(`SimpleCore set => k: ${k} v:${v}`);
				//@ts-ignore
				return await MMKV.setItem(k, v);
			},
			get: async k => {
				if (__DEV__) console.log(`SimpleCore get => k: ${k} `);
				return await MMKV.getItem(k);
			},
		},
	},
});

SimpleInstance.persist(['currentTheme', 'account', 'newStatusDraft']);

export const core = SimpleInstance.core();
