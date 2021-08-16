import { collection } from '@pulsejs/core';
import { Conversation } from '../types';

const CL = collection<Conversation>({ primaryKey: 'conversation_id' }).createSelector('current').createGroup('all');

export const conversations = {
	collection: CL,
};
