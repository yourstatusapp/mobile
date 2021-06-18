import { instance } from '@pulsejs/core';
import * as core from './modules';

// init core, tells pulse to initialize all computed values
export function initCore() {
	instance.core(core);
}

console.log({ core });

export default core;
