import { instance } from '@pulsejs/core';
import * as core from './modules';
import { baseURL, request } from './utils';

// init core, tells pulse to initialize all computed values
export function initCore() {
	instance.core({ ...core, baseURL });
}

console.log({ core });

export { request };
export default { ...core, baseURL };
