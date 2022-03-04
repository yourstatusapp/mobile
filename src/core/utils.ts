import core, { UploadProgressEventType } from '@core';
import { state } from '@pulsejs/core';
import axios, { AxiosResponse } from 'axios';

// export const baseURL = state('https://api.yourstatus.app');
export const baseURL = state('http://192.168.1.8:3020');
// export const baseURL = state('http://localhost:3020');

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

export const request = async <T extends any>(method: 'post' | 'get' | 'delete' | 'patch', path: string, x?: RequestOptions): Promise<ReturnRequestType<T>> => {
	try {
		const a: AxiosResponse<ReturnRequestType<T>> = await axios({
			method,
			data: x?.data,
			headers: {
				'Content-Type': 'application/json',
				...x?.headers,
			},
			url: baseURL.value + path,
			withCredentials: true,
			onUploadProgress: x?.onUploadProgress,
		});

		return a.data;
	} catch (error: any) {
		console.log(error);

		// if (error?.response?.status === 401) {
		// 	navigationRef.reset({ routes: [{ name: 'auth' }] });
		// 	core.account.state.account.reset();
		// }
		return { success: false, message: error.response.data.message };
		// // if no auth, reset the accout

		// // alert({ title: error.response.message });

		// console.log('request error', error);
		// // throw {};
		// return false;
		// // console.log(error);
	}
};

export const snow2time = (snow: string): Date => {
	return new Date(Number(snow) / 8388608 + 1627845526000);
};

export const TimeFormatter = (snowflake_id: string, shortName?: boolean) => {
	const d = snow2time(snowflake_id);

	let s = Math.floor((new Date().getTime() - d.getTime()) / 1000);

	if (s < 60) {
		return Math.floor(s) + (shortName ? 's' : ' Second' + (s > 1) ? 's' : '');
	} else if (s > 60 && s < 3600) {
		return Math.floor(s / 60) + (shortName ? 'm' : ' Minutes');
	} else if (s > 3600 && s < 86400) {
		return Math.floor(s / 3600) + (shortName ? 'h' : ' Hours');
	} else if (s > 86400 && s < 2592000) {
		return Math.floor(s / 86400) + (shortName ? 'd' : ' Days');
	} else if (s > 2592000 && s < 2592000 * 12) {
		return Math.floor(s / 2592000) + (shortName ? 'mon' : ' Months');
	} else {
		return s + (shortName ? 'y' : ' Year');
	}
};

export const AppAlert = (success: boolean, title: string, desc?: string) => {
	core.events.notification.emit({ success, title: !!desc ? title : success ? 'Success' : 'Failed', desc });
};
