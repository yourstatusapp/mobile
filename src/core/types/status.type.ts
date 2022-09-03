export enum StatusTypes {
	MESSAGE = 'MESSAGE',
	DISCORD_GUILD = 'DISCORD_GUILD',
	EVENT = 'EVENT',
}

export interface MessageStatus {
	expires_at?: Date;
}

export interface DiscordGuildStatus {
	inviteCode: string;
	expires_at?: Date;
}

export interface IDataEventStatus {
	title: string;
	description: string;
	startDate: Date;
	endDate?: Date | null;
	location?: string;
}

export type StatusDataType =
	| ({
			type: 'MESSAGE';
	  } & MessageStatus)
	| ({ type: 'DISCORD_GUILD' } & DiscordGuildStatus)
	| ({ type: 'EVENT' } & IDataEventStatus);

export interface CreateStatusType {
	statusText: string;
	data: StatusDataType;
}

export interface ValidateStatusReturn {
	valid: boolean;
	data?: { id: string; name: string; iconImage: string };
	message: string;
}

export type ICreateStatus =
	| {
			statusText: string;
			type: 'MESSAGE';
			data: MessageStatus;
	  }
	| {
			statusText: string;
			type: 'DISCORD_GUILD';
			data: DiscordGuildStatus;
	  }
	| {
			statusText: string;
			type: 'EVENT';
			data: IDataEventStatus;
	  };
