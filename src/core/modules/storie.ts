import { StorieType } from '@core';
import { collection } from '@pulsejs/core';

const SC = collection<StorieType>().createGroup('mine');

export const storie = {
	collection: SC,
};
