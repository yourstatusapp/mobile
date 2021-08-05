import { state } from '@pulsejs/core';

interface PermissionsList {
	geolocation_access: boolean;
}

const State = {
	use_system_theme: state<boolean>(false).persist('use_system_theme'),
	permissions_list: state<PermissionsList>({
		geolocation_access: false,
	}).persist('phone_permissions_state'),
};

export const app = {
	state: State,
};
