import core, { UploadProgressEventType } from '@core';
import axios, { AxiosResponse } from 'axios';

const DEV_API = 'http://0.0.0.0:3020';
// export const baseURL = state('https://api.yourstatus.app');
export const baseURL = process.env.NODE_ENV === 'production' ? 'http://0.0.0.0:3020' : DEV_API;

// export const baseURL = state(DEV_API);

interface RequestOptions {
	headers?: object;
	data?: any;
	onUploadProgress?: (progressEvent: UploadProgressEventType) => void;
}

export interface ReturnRequestType<T> {
	data?: T;
	message: string;
	success: boolean;
}

export const request = async <T extends any>(
	method: 'post' | 'get' | 'delete' | 'patch',
	path: string,
	x?: RequestOptions,
): Promise<ReturnRequestType<T>> => {
	try {
		const a: AxiosResponse<ReturnRequestType<T>> = await axios({
			method,
			data: x?.data,
			headers: {
				'Content-Type': 'application/json',
				...x?.headers,
			},
			url: baseURL + path,
			withCredentials: true,
			onUploadProgress: x?.onUploadProgress,
		});

		return a.data;
	} catch (error: any) {
		// This will happen when there is an network error so probably a 500
		// TODO: Setting a state that we don't have network and navigating to a no network screen? (we can close the screen and going back to where we left of since its pushed to the stack)
		console.log('error => ', error);
		return { success: false, message: error.response.data.message };
	}
};

export const snow2time = (snow: string): Date => {
	return new Date(Number(snow) / 8388608 + 1627845526000);
};

export const TimeFormatter = (snowflake_id: string, shortName?: boolean) => {
	const d = snow2time(snowflake_id);

	let s = Math.floor((new Date().getTime() - d.getTime()) / 1000);

	if (s < 60) {
		return Math.floor(s) + (shortName ? 's' : ' Second' + (Math.floor(s) >= 1 ? `'s` : ''));
	} else if (s > 60 && s < 3600) {
		return (
			Math.floor(s / 60) + (shortName ? 'm' : ' Minute' + (Math.floor(s / 60) >= 120 ? `'s` : ''))
		);
	} else if (s > 3600 && s < 86400) {
		return (
			Math.floor(s / 3600) +
			(shortName ? 'h' : ' Hours' + (Math.floor(s / 3600) >= 7200 ? `'s` : ''))
		);
	} else if (s > 86400 && s < 2592000) {
		return (
			Math.floor(s / 86400) +
			(shortName ? 'd' : ' Day' + (Math.floor(s / 86400) >= 172800 ? `'s` : ''))
		);
	} else if (s > 2592000 && s < 2592000 * 12) {
		return (
			Math.floor(s / 2592000) +
			(shortName ? 'mon' : ' Months' + (Math.floor(s / 2592000) >= 5184000 ? `'s` : ''))
		);
	} else {
		return s + (shortName ? 'y' : ' Year');
	}
};

export const AppAlert = (success: boolean, title: string, desc?: string) => {
	// core.events.notification.emit({
	// 	success,
	// 	title: !desc ? title : success ? 'Success' : 'Failed',
	// 	desc,
	// });
};
