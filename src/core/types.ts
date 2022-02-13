import { TextStyle, ViewStyle } from 'react-native';

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
	banner: string;
	bio: string;
	location: string;
	date_of_birth: string;
	// collections?: Collection[];
	status?: any;
}

export interface StatusType {
	id: string;
	type: number;
	content: string;
	expires_at: string;
}

export interface PaddingType {
	paddingTop?: number;
	paddingBottom?: number;
	paddingLeft?: number;
	paddingRight?: number;
}

export interface MarginType {
	marginTop?: number;
	marginBottom?: number;
	marginLeft?: number;
	marginRight?: number;
}

export interface BlockType extends PaddingType, MarginType {
	vCenter?: boolean;
	hCenter?: boolean;
	color?: string;
	safe?: boolean;
	press?: boolean;
	scroll?: boolean;
	animate?: boolean;
	onPress?: () => void;
	paddingHorizontal?: number;
	style?: ViewStyle;
	row?: boolean;
	flex?: 1 | 0;
}

export interface TextType extends PaddingType, MarginType {
	color?: string;
	size?: number;
	weight?: '500' | '600' | '700' | '800' | '900';
	style?: TextStyle;
	center?: boolean;
	italic?: boolean;
	bold?: boolean;
	textAlign?: string;
}

export interface AlertDataType {
	title: string;
	success: boolean;
	desc?: string;
}

export interface DeviceType {
	id: string;
	notifications: boolean;
	ip: string;
	device_type: string;
	deleted_at: string;
}
