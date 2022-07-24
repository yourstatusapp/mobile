import { ThemeTypes } from '@hooks';
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

export const themeState = atom<ThemeTypes>({
	key: 'theme',
	default: 'light',
});
