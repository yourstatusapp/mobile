export enum StatusTypes {
	DEFAULT = 'DEFAULT',
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

export interface EventStatus {
	title: string;
	description: string;
	startDate: Date;
	endDate?: Date;
	location?: string;
}

export type StatusDataType =
	| ({
			type: 'DEFAULT';
	  } & MessageStatus)
	| ({ type: 'DISCORD_GUILD' } & DiscordGuildStatus)
	| ({ type: 'EVENT' } & EventStatus);

export interface CreateStatusType {
	statusText: string;
	data: StatusDataType;
}
