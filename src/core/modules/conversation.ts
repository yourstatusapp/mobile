import { collection } from '@pulsejs/core';
import { IConversation } from '../types';

const CL = collection<IConversation>({ primaryKey: 'id' }).createSelector('current').createGroup('mine');

export const conversations = {
	collection: CL,
};
