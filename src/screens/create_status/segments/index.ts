import { CreateStatusType, StatusTypes, ValidateStatusReturn } from '@core';

export { CreateMessageModule } from './CreateMessageModule';
export { CreateEventModule } from './CreateEventModule';
export { CreateDiscordModule } from './CreateDiscordModule';

export interface IModuleProps {
	validateStatus?: (type: StatusTypes, data: any) => void;
	validateStatusReturnData?: ValidateStatusReturn;
	onDataChange: (e: CreateStatusType) => void;
}
