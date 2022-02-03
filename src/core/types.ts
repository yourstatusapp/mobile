import { StyleProp, ViewProps, ViewStyle } from 'react-native';

export interface AccountType {
	id: string;
	email: string;
	avatar: string;
}

export interface ProfileType {
	account_id: string;
	username: string;
	gender: string;
	avatar: string;
	bio: string;
	location: string;
	date_of_birth: string;
	// collections?: Collection[];
	// status?: Status;
}

export interface BlockType {
	vCenter?: boolean;
	hCenter?: boolean;
	color?: string;
	safe?: boolean;
	paddingHorizontal?: number;
	style?: ViewStyle;
}

export interface TextType {
	color?: string;
	size?: number;
	weight?: '500' | '600' | '700' | '800' | '900';
	style?: ViewStyle;
	center?: boolean;
	italic?: boolean;
	bold?: boolean;
	textAlign?: string;
}
