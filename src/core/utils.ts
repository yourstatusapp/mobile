import core from '@core';
import { state } from '@pulsejs/core';
import axios, { AxiosResponse } from 'axios';
import { navigationRef } from '../navigators/RootNavigator';

export const baseURL = state('https://api.yourstatus.app');
// export const baseURL = state('http://192.168.0.4:3020');

interface RequestOptions {
	headers?: any;
	data?: any;
	onUploadProgress?: (progressEvent: any) => void;
}

interface ReturnRequestType<T> {
	data?: T;
	message?: string;
	success: boolean;
}

export const request = async <T extends any>(method: 'post' | 'get' | 'delete' | 'patch', path: string, x?: RequestOptions): Promise<ReturnRequestType<T>> => {
	try {
		const a: AxiosResponse<ReturnRequestType<T>> = await axios({
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
