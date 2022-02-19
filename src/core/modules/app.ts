import { UploadProgressEventType } from '@core';
import { state } from '@pulsejs/core';

export const AppStats = {
	// 0 = need to ask  | 1 = granted | 2 = denied
	notification_permission: state<0 | 1 | 2>(0).persist('notification_enabled'),
	device_push_token: state<string>('').persist('device_pust_token'),

	upload_progress: state<UploadProgressEventType | boolean>(false),
};

export const app = { ...AppStats };
