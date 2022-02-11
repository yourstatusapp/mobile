import { collection, state } from '@pulsejs/core';
import { ProfileType } from '../types';

const ProfileState = {
	profile: state<ProfileType | false>(false).persist('profile'),
};

const ProfileCollection = collection<ProfileType>({ primaryKey: 'account_id' }).createGroup('friends').createGroup('requests').createGroup('mine');

export const profile = {
	state: { ...ProfileState },
	collection: ProfileCollection,
};
