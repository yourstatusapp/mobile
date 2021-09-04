import { collection } from '@pulsejs/core';
import { IConnectionType } from '../types';

const CL = collection<IConnectionType>().createGroup('mine');

export const connections = { collection: CL };
