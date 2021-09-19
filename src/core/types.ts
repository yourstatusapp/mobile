export interface Account {
	id: string;
	email: string;
}

export interface ProfileType {
	account_id: string;
	username: string;
	gender: string;
	avatar: string;
	bio: string;
	date_of_birth: string;
	collections?: Collection[];
	status?: Status;
	location?: LocationType;
}

export interface LocationType {
	id: string;
	title: string;
}

export interface IConversation {
	id: string;
	account_id: string;
	username: string;
	avatar: string;
}

export interface IMessage {
	id: string;
	content: string;
	conversation: string;
	sender: string;
	deleted_at: string;
	nonce?: boolean;
}

export interface DeviceType {
	id: string;
	notifications: boolean;
	ip: string;
	device_type: string;
	deleted_at: string;
}

export interface LocationType {
	id: string;
	lang: number;
	long: number;
	title: string;
}

export interface Notification {
	id: string;
	type: string;
	owner: string;
	content: any;
	deleted_at: string;
	read_at: string;
}

export interface Friend {
	account_id: string;
	username: string;
	avatar: string;
	status?: Status;
}

export interface Status {
	id: string;
	type: number;
	event_type: number;
	account_id: string;
	data: any;
}

export interface Collection {
	id: string;
	title: string;
	private: boolean;
	account_id: string;
	description: string;
	data: CollectionData[];
}

export interface CollectionData {
	id: string;
	collection: string;
	type: number;
	content: string;
}

export interface IConnectionType {
	id: string;
	type: string;
}

export interface IStorieType {
	id: string;
	picture: string;
	account_id: string;
}
