import { Status, StatusComment } from '@core';
import { collection, state } from '@pulsejs/core';

const Collection = collection<Status>();

const Comments = collection<StatusComment>();

const State = {
	my_status: state<Status | null>(null).persist('status'),
};

export const status = { collection: { ...Collection, comments: Comments }, state: State };
