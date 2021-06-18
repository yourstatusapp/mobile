import { state } from '@pulsejs/core';

interface Account {
	email: string;
}
const AccountState = {
	ACCOUNT: state<Partial<Account | null>>(null).persist(),
};

const ComputedState = {
	LOGGED_IN: state<boolean>(() => {
		return false;
	}),
};

export const account = {
	state: { ...ComputedState, ...AccountState },
};
