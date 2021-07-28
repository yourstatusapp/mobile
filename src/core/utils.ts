import { state } from '@pulsejs/core';
import axios, { AxiosResponse } from 'axios';

export const baseURL = state(process.env.NODE_ENV === 'production' ? 'https://api.yourstatus.app' : 'http://localhost:8080').persist('baseURL');

interface RequestOptions {
	headers?: any;
	data?: any;
}

export const request = async <T extends any>(method: 'post' | 'get' | 'delete' | 'patch', path: string, x?: RequestOptions): Promise<T> => {
	try {
		const a: AxiosResponse<{ data: T }> = await axios({
			method,
			data: x?.data,
			headers: {
				'Content-Type': 'application/json',
				...x?.headers,
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
