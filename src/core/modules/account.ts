import { state } from '@pulsejs/core';
import { AccountType } from '../types';

export const AccountState = {
	account: state<AccountType>(null as never).persist('account'),
};

export const AccountComputedState = {
	logged_in: state<boolean>(() => {
		return !!AccountState.account.value?.id;
	}),
};

export const account = { ...AccountState, ...AccountComputedState };
