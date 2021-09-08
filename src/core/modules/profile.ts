import { collection, state } from '@pulsejs/core';
import { IProfile } from '../types';

const S = {
	// @ts-ignore
	PROFILE: state<IProfile>(null).persist('profile'),
};

const CL = collection<IProfile>().createGroup('friends').createGroup('requests').createGroup('mine');

export const profile = {
	state: { ...S },
	collection: CL,
};
