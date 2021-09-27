import { collection, state } from '@pulsejs/core';
import { ProfileType } from '../types';

const S = {
	// @ts-ignore
	PROFILE: state<ProfileType>(null).persist('profile'),
};

const CL = collection<ProfileType>({ primaryKey: 'account_id' }).createGroup('friends').createGroup('requests').createGroup('mine');

export const profile = {
	state: { ...S },
	collection: CL,
};
