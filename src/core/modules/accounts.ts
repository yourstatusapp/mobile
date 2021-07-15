import { state } from '@pulsejs/core';

interface Account {
	id?: string;
	email?: string;
	verified?: string;
}

const AccountState = {
	ACCOUNT: state<Account>({}).persist('account'),
};

const ComputedState = {
	LOGGED_IN: state<boolean>(() => {
		return !!AccountState.ACCOUNT.value.email;
	}).persist('logged_in'),
};

export const account = {
	state: { ...ComputedState, ...AccountState },
};
