import { Status } from '@core';
import { collection, state } from '@pulsejs/core';

const Collection = collection<Status>();

const State = {
	my_status: state<Partial<Status>>({}).persist('status'),
};

export const status = { collection: Collection, state: State };