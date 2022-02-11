import { AlertDataType } from '@core';
import { event, state } from '@pulsejs/core';

export const AppStats = {
	// 0 = need to ask  | 1 = granted | 2 = denied
	notifications_enabled: state<0 | 1 | 2>(0).persist('notification_enabled'),
};

export const AppEvents = {
	notification: event<AlertDataType>({}),
};

export const app = { event: AppEvents, state: AppStats };
