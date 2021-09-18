import core from '@core';
import { AlertDataType } from '../../parts/alert/CustomAlert';

export const alert = (config: AlertDataType) => {
	core.app.event.notification.emit(config);
};
