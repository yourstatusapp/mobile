import { AlertDataType, DeviceType, FriendItemType, ProfileType, StorieType } from '@core';
import { collection, event } from '@pulsejs/core';
import { ConversationType, DirectMessageType, StatusType } from '../types';

export const lists = {
	devices: collection<DeviceType>().createGroup('mine').createSelector('current'),
	friends: collection<FriendItemType>({ primaryKey: 'account_id' }).createGroup('friends'),
	profiles: collection<ProfileType>({ primaryKey: 'account_id' }).createGroup('friends').createGroup('requests').createGroup('mine'),
	stories: collection<StorieType>({ primaryKey: 'account_id' }).createGroup('mine').createGroup('all'),
	status: collection<StatusType>().createGroup('mine'),
	messages: collection<DirectMessageType>(),
	conversations: collection<ConversationType>().createGroup('new_messages'),
};

export const events = {
	notification: event<AlertDataType>({}),
	storie_viewer: event<{ stories: StorieType | false; clicked_at_index?: number; skipWatchRequest?: boolean }>(),
};
