import core from '@core';
import { INotificationType } from '../modules/app';

export const alert = (config: INotificationType) => {
	core.app.event.notification.emit(config);
};
