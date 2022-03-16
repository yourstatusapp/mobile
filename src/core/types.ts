import { TextStyle, ViewStyle } from 'react-native';

export interface AccountType {
	id: string;
	email: string;
	avatar: string;
}

export interface ProfileType {
	account_id: string;
	username: string;
	display_name: string;
	gender: string;
	avatar: string;
	banner: string;
	bio: string;
	location: string;
	date_of_birth: string;
	// collections?: Collection[];
	status?: StatusType[];
}

export interface StatusType {
	id: string;
	type: number;
	account_id: string;
	data: any;
	expires_at: string;
	taped?: boolean;
	taps?: number;
}

export interface PaddingType {
	paddingTop?: number;
	paddingBottom?: number;
	paddingLeft?: number;
	paddingRight?: number;
	paddingHorizontal?: number;
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
	opacity?: number;
	flex?: 1 | 0;
	activeOpacity?: number;
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
	device_type?: string;
	deleted_at?: string;
	ip?: string;
}

export interface UploadProgressEventType {
	isTrusted: boolean;
	lengthComputable: boolean;
	loaded: number;
	total: number;
}

export interface FriendItemType {
	id: string;
	account_id: string;
	bio: string;
	username: string;
	location: string;
	avatar: string;
	status: {
		id: string;
		type: number;
		account_id: string;
		deleted_at: null;
		data: any;
		taps: number;
		taped?: boolean;
	}[];
}

export interface StorieType {
	account_id: string;
	username: string;
	avatar: string;
	stories: {
		id: string;
		picture: string;
		account_id: string;
	}[];
}

export interface OnboardingTipsConfig {
	GLOBAL: boolean;
	REALTIME_STORIES: boolean;
}

export interface GuildInvite {
	code: string;
	type: number;
	expires_at: string;
	guild: {
		icon: string;
		description: string;
		banner: string;
		splash: string;
		id: string;
		name: string;
	};
	welcome_screen: {
		description: string;
	};
}

export interface DirectMessageType {
	id: string;
	content: string;
	username: string;
	avatar: string;
	account_id: string;
	conversation_id: string;
}
