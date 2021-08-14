import { collection, state } from '@pulsejs/core';

interface Account {
	id?: string;
	email?: string;
	verified?: string;
}
export interface Activity {
	id: string;
	type: number;
	account_to: string;
	data: any;
	read_at?: boolean;
}


const AccountState = {
	ACCOUNT: state<Account>({}).persist('account'),
	new_account_activity: state<boolean>(false)
	// logged_in: state<boolean>(false).persist('logged_in'),
};

const ComputedState = {
	logged_in: state<boolean>(() => {
		// AccountState.logged_in_state.set(!!AccountState.ACCOUNT.value.email);
		return !!AccountState.ACCOUNT.value.email;
	}),
};

const ActivityColl = collection<Activity>();

export const account = {
	state: { ...ComputedState, ...AccountState },
	collection: { activity: ActivityColl },
};
