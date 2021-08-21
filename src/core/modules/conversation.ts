import { collection } from '@pulsejs/core';
import { Conversation } from '../types';

const CL = collection<Conversation>({ primaryKey: 'id' }).createSelector('current').createGroup('mine');

export const conversations = {
	collection: CL,
};
