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
