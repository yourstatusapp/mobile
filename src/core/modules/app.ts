import { AlertDataType } from '@core';
import { event, state } from '@pulsejs/core';

export const AppStats = {
	// 0 = need to ask  | 1 = granted | 2 = denied
	notification_permission: state<0 | 1 | 2>(0).persist('notification_enabled'),
	device_push_token: state<string>('').persist('device_pust_token'),

	upload_progress: state<string | boolean>(false),
};

export const AppEvents = {
	notification: event<AlertDataType>({}),
};

export const app = { event: AppEvents, state: AppStats };
