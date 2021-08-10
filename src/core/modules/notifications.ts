import { collection, state } from '@pulsejs/core';
import { Notification } from '../types';

const CL = collection<Notification>();

const State = {
	new_notification: state<boolean>(false),
};

const ComputedState = {
	// new_notification: state<boolean>(() => {
	// 	CL.getGroup('default').output.forEach((v, i) => {
	// 		// If one of them is not read than we still have pending notification to read
	// 		if (!v.read_at) {
	// 			return true;
	// 		}
	// 	});
	// 	return false;
	// }),
};

// CL.onCollect((v) => {
// 	State.new_notification.set(!v.read_at);
// 	return v;
// });


export const notifications = { collection: CL, state: { ...State } };
