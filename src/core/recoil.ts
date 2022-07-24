import { atom } from 'recoil';
import { localStorageEffect } from './recoil.utils';
import { ProfileType } from './types';

interface Account {
	id: string;
	email: string;
}

export const userData = atom<Account | null>({
	key: 'account',
	default: null,
	effects: [localStorageEffect('account')],
});

export const profile = atom<ProfileType | null>({
	key: 'profile',
	default: null,
});

interface MiscType {
	theme: 'light' | 'dark';
}

export const misc = atom<MiscType>({
	key: 'misc',
	default: {
		theme: 'light',
	},
	effects: [localStorageEffect('misc')],
});
