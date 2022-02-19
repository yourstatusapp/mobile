import { state } from '@pulsejs/core';
import { ProfileType } from '../types';

const ProfileState = {
	profile: state<ProfileType>(null as never).persist('profile'),
};

export const profile = {
	...ProfileState,
};
