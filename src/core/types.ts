export interface Account {
	id: string;
	email: string;
}

export interface Profile {
	id: string;
	username: string;
	location: string;
	gender: string;
	avatar: string;
	date_of_birth: string;
}

export interface Conversation {
	conversation_id: string;
	owner: string;
	username: string;
	avatar: string;
	id: string;
}

export interface Message {
	id: string;
	content: string;
	sender: string;
	deleted_at: string;
}

export interface Device {
	id: string;
	deleted_at: string;
	user_agent: string;
	ip: string;
}

export interface ActivityLocation {
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