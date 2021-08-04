export interface Account {
	id: string;
	email: string;
}

export interface Profile {
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
