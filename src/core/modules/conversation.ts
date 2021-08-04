import { collection } from '@pulsejs/core';
import { Conversation } from '../types';


const CL = collection<Conversation>().createSelector('current').createGroup('all');

export const conversations = {
	collection: CL,
};
