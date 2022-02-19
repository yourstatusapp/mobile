import core, { AlertDataType, DeviceType, FriendItemType, ProfileType } from '@core';
import { collection, event } from '@pulsejs/core';

// core.account.SOME_STATE;
// core.lists.ACCOUNT;

export const lists = {
	devices: collection<DeviceType>().createGroup('mine').createSelector('current'),
	friends: collection<FriendItemType>().createGroup('friends'),
	profiles: collection<ProfileType>({ primaryKey: 'account_id' }).createGroup('friends').createGroup('requests').createGroup('mine'),
};

export const events = {
	notification: event<AlertDataType>({}),
};
