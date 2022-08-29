import { ICreateStatus, ValidateStatusReturn } from '@core';

export { CreateMessageModule } from './CreateMessageModule';
export { CreateEventModule } from './CreateEventModule';
export { CreateDiscordModule } from './CreateDiscordModule';

export interface IModuleProps {
	// createStatus: (v: ICreateStatus) => void;
	validateStatus: (v: ICreateStatus) => void;
	validateStatusReturnData: ValidateStatusReturn;
	forceUpdateStatusText?: (v: string) => void;
}
