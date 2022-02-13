import { collection, state } from '@pulsejs/core';
import { AccountType, DeviceType } from '../types';

export const AccountState = {
	account: state<AccountType>(null as never).persist('account'),
};

export const AccountComputedState = {
	logged_in: state<boolean>(() => {
		return !!AccountState.account.value?.id;
	}),
};

const Devices = collection<DeviceType>().createGroup('mine').createSelector('current');

export const account = { state: { ...AccountState, ...AccountComputedState }, collection: { devices: Devices } };
