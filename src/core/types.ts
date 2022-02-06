import { ViewStyle } from 'react-native';

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
	press?: boolean;
	onPress?: () => void;
	paddingHorizontal?: number;
	style?: ViewStyle;
	row?: boolean;
	flex?: 1 | 0;
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

export interface PaddingStyle {
	paddingTop?: number;
	paddingBottom?: number;
	paddingLeft?: number;
	paddingRight?: number;
}
