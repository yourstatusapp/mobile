import { state } from '@pulsejs/core';

interface PermissionsList {
	geolocation_access: boolean;
}

const State = {
	use_system_theme: state<boolean>(false).persist('use_system_theme'),
	debug_enabled: state<boolean>(false).persist('debug_enabled'),
	permissions_list: state<PermissionsList>({
		geolocation_access: false,
	}).persist('phone_permissions_state'),
};

export const app = {
	state: State,
};
