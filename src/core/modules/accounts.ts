import { state } from '@pulsejs/core';

interface Account {
	id?: string;
	email?: string;
	verified?: string;
}

const AccountState = {
	ACCOUNT: state<Account>({}).persist(),
};

const ComputedState = {
	LOGGED_IN: state<boolean>(() => {
		if (AccountState.ACCOUNT.value.email) {
			return true;
		} else {
			return false;
		}
	}),
};

export const account = {
	state: { ...ComputedState, ...AccountState },
};
