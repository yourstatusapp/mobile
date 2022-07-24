import { OnboardingTipsConfig, TabStackNavParamList, UploadProgressEventType } from '@core';
import { state } from '@pulsejs/core';

export const AppState = {
	// 0 = need to ask  | 1 = granted | 2 = denied
	notification_permission: state<0 | 1 | 2>(0).persist('notification_enabled'),
	device_push_token: state<string>('').persist('device_push_token'),
	device_id: state<string>('').persist('device_id'),

	upload_progress: state<UploadProgressEventType | boolean>(false),

	TAB_STATE: state<{ state: number; path_name: keyof TabStackNavParamList }>({
		state: 3,
		path_name: 'account',
	}).persist('tab_state'),

	ONBOARDING_TIPS: state<OnboardingTipsConfig>({ GLOBAL: true, REALTIME_STORIES: true }).persist(
		'ONBOARDING_TIPS',
	),

	SOCKET_CONNECT: state<boolean>(false),
	SOCKET_TOKEN: state<string>(''),

	// DIRECT_MESSAGE_AVAILABLE: state<boolean>(false),
};

export const app = { ...AppState };
