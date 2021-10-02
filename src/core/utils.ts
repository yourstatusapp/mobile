import core, { alert } from '@core';
import { state } from '@pulsejs/core';
import axios, { AxiosResponse } from 'axios';

export const baseURL = state('https://api.yourstatus.app');
// export const baseURL = state('http://192.168.1.15:8080');

interface RequestOptions {
	headers?: any;
	data?: any;
	onUploadProgress?: (progressEvent: any) => void;
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
			onUploadProgress: x?.onUploadProgress,
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
		return Math.floor(s / 2592000) + ' Months';
	} else {
		return s + ' Year';
	}
};

/**
 * @description Calculate the distance between 2 coordinates points
 * @returns {number} the distance in meters
 */
export const calcDistance = (c1: { lat: number; long: number }, c2: { lat: number; long: number }): number => {
	const lat1 = c1.lat;
	const lat2 = c2.lat;
	const lon1 = c1.long;
	const lon2 = c2.long;

	const R = 6371e3; // metres
	const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
	const φ2 = (lat2 * Math.PI) / 180;
	const Δφ = ((lat2 - lat1) * Math.PI) / 180;
	const Δλ = ((lon2 - lon1) * Math.PI) / 180;

	const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	const d = R * c; // in metres
	return d;
};
