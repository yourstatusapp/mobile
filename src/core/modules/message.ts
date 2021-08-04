import { collection } from '@pulsejs/core';
import { Message } from '../types';

const CL = collection<Message>().createGroup('all');

export const message = {
	collection: CL,
};
