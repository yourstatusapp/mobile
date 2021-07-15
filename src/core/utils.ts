import { state } from '@pulsejs/core';
import axios from 'axios';



export const baseURL = state('http://localhost:8080/').persist('baseURL');

export const request = async (method: 'post' | 'get', path: string, data?: any): Promise<object> => {
	console.log(baseURL.value);

	try {
		const a = await axios({
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
		return {};
	}
};
