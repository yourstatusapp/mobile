import { instance } from '@pulsejs/core';
import * as core from './modules';
import { baseURL } from './utils';

// init core, tells pulse to initialize all computed values
export function initCore() {
	instance.core({ ...core, baseURL });
}

console.log({ core });

export * from './types';
export * from './utils';

// Collections but renamed to lists
core.lists.devices;
core.lists.stories.groups.mine;

// States
core.account.logged_in;
core.app.TAB_STATE;

// Events
core.events.notification;
core.events.storie_viewer;

export default { ...core };
