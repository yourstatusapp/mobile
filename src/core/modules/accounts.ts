import { state } from '@pulsejs/core';

interface Account {
	id?: string;
	email?: string;
	verified?: string;
}

const AccountState = {
	ACCOUNT: state<Account>({}).persist('account'),
	// logged_in: state<boolean>(false).persist('logged_in'),
};

const ComputedState = {
	logged_in: state<boolean>(() => {
		// AccountState.logged_in_state.set(!!AccountState.ACCOUNT.value.email);
		return !!AccountState.ACCOUNT.value.email;
	}),
};

export const account = {
	state: { ...ComputedState, ...AccountState },
};
