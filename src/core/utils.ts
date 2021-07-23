import { state } from '@pulsejs/core';
import axios, { AxiosResponse } from 'axios';

export const baseURL = state('http://localhost:8080').persist('baseURL');

export const request = async <T extends any>(method: 'post' | 'get' | 'delete', path: string, data?: any): Promise<T> => {
	try {
		const a: AxiosResponse<{ data: T }> = await axios({
			method,
			data,
			headers: {
				'Content-Type': 'application/json',
			},
			url: baseURL.value + path,
			withCredentials: true,
		});

		return a.data.data;
	} catch (error) {
		console.log(error);
		throw false;
	}
};
