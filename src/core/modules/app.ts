import { state } from '@pulsejs/core';

interface PermissionsList {
	geolocation_access: boolean;
}

const State = {
	use_system_theme: state<boolean>(false).persist('use_system_theme'),

	// 0 = need to ask  | 1 = granted | 2 = denied
	notifications_enabled: state<0 | 1 | 2>(0).persist('notification_enabled'),

	// Debug mode enabled for testing purpose
	debug_enabled: state<boolean>(false).persist('debug_enabled'),

	permissions_list: state<PermissionsList>({
		geolocation_access: false,
	}).persist('phone_permissions_state'),
};

export const app = {
	state: State,
};
