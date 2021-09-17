import { event, state } from '@pulsejs/core';
import { AlertDataType } from '../../parts/alert/CustomAlert';

interface PermissionsList {
	geolocation_access: boolean;
}

const State = {
	use_system_theme: state<boolean>(false).persist('use_system_theme'),
	system_theme: state<'light' | 'dark'>('light'),

	// 0 = need to ask  | 1 = granted | 2 = denied
	notifications_enabled: state<0 | 1 | 2>(0).persist('notification_enabled'),

	// Debug mode enabled for testing purpose
	debug_enabled: state<boolean>(false).persist('debug_enabled'),

	// 0 = need to ask  | 1 = granted | 2 = denied
	location_service_enabled: state<0 | 1 | 2>(0).persist('location_service_enabled'),

	permissions_list: state<PermissionsList>({
		geolocation_access: false,
	}).persist('phone_permissions_state'),

	device_push_token: state<string>('').persist('device_push_token'),
	device_id: state<string>('').persist('device_id'),

	soft_update_available: state<boolean>(false).persist('soft_update_available'),
};

const DevSettingsState = {
	tabbar_show_text: state<boolean>(true).persist('tabbar_show_text'),
};

export interface ModalType {}

const Events = {
	notification: event<AlertDataType>({}),
	modal: event<ModalType>(),
};

export const app = {
	state: { ...State, ...DevSettingsState },
	event: Events,
};
