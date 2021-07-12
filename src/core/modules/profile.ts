import { collection, state } from '@pulsejs/core';
import { Profile } from '../types';

const S = {
	PROFILE: state<Partial<Profile>>({}).persist('profile'),
};

const CL = collection<Profile>().createGroup('friends');

export const profile = {
	state: { ...S },
	collection: CL,
};
