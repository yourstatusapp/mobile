import core, { alert } from '@core';
import { state } from '@pulsejs/core';
import axios, { AxiosResponse } from 'axios';

export const baseURL = state('https://api.yourstatus.app');
// export const baseURL = state('http://localhost:8080');

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
				...x?.headers,
				'Content-Type': 'application/json',
			},
			url: baseURL.value + path,
			withCredentials: true,
		});

		return a.data.data;
	} catch (error: any) {
		// if no auth, reset the accout
		if (error.response.status === 401) {
			core.account.state.ACCOUNT.reset();
			core.profile.state.PROFILE.reset();
		}

		// alert({ title: error.response.message });

		console.log('request error', error);
		// throw {};
		return false;
		// console.log(error);
	}
};

export const snow2time = (snow: string): Date => {
	return new Date(Number(snow) / 8388608 + 1627845526000);
};

export const niceTime = (id: string) => {
	let d = snow2time(id);

	// @ts-ignore
	let s = Math.floor((new Date() - d) / 1000);

	if (s < 60) {
		return Math.floor(s) + ' Seconds';
	} else if (s > 60 && s < 3600) {
		return Math.floor(s / 60) + ' Minutes';
	} else if (s > 3600 && s < 86400) {
		return Math.floor(s / 3600) + ' Hours';
	} else if (s > 86400 && s < 2592000) {
		return Math.floor(s / 86400) + ' Days';
	} else if (s > 2592000 && s < 2592000 * 12) {
		return 'Months';
	} else {
		return s + ' Years';
	}
};
