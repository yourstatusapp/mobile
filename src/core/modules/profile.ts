import { collection, state } from '@pulsejs/core';
import { Profile } from '../types';

const S = {
	// @ts-ignore
	PROFILE: state<Profile>(null).persist('profile'),
};

const CL = collection<Profile>().createGroup('friends').createGroup('mine');

export const profile = {
	state: { ...S },
	collection: CL,
};
