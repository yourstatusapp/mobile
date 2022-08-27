import React from 'react';
import { ListRenderItemInfo, TextStyle, ViewStyle } from 'react-native';
export * from './status.type';

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
	friends_amount: number;
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
	disabled?: boolean;
	onPress?: () => void;
	paddingHorizontal?: number;
	style?: ViewStyle;
	width?: number | string;
	height?: number | string;
	row?: boolean;
	opacity?: number;
	flex?: 1 | 0;
	activeOpacity?: number;
	children?: React.ReactNode;
}

export interface TextType extends PaddingType, MarginType {
	color?: string | null;
	// The default size is 14
	size?: number;
	weight?: '500' | '600' | '700' | '800' | '900';
	style?: TextStyle;
	center?: boolean;
	italic?: boolean;
	bold?: boolean;
	extraBold?: boolean;
	medium?: boolean;
	textAlign?: string;
	children: React.ReactNode;
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
		viewed?: boolean;
		views?: number;
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
	nonce?: string;
}

export interface ConversationType {
	id: string;
	account_id: string;
	username: string;
	avatar: string;
	new_message?: boolean;
}

export interface EventType {
	id: string;
	title: string;
	description: string;
	account_id: string;
	location: string;
	start_date: string;
	end_date: string;
	avatar: string;
	username: string;
}

export type TabStackNavParamList = {
	account: undefined;
	events: undefined;
	StatusDetail: {
		username: string;
		status: StatusType;
	};
	friends: undefined;
	conversations: undefined;
	profile: undefined;
	directmessage: undefined;
	SearchFriend: undefined;
	FriendRequests: undefined;
	newconversation: undefined;
	ManageFriends: undefined;
	CreateEvent: undefined;
	Event: EventType;
	EditProfile: undefined;
};

export type RootstackParamList = {
	Auth: undefined;
	Preloader: undefined;
	Magic: { code: string; new_account: boolean } | undefined;
	Tabs: undefined;
	Profile: undefined;
	CreateStatus: undefined;
	StatusDetail: undefined;
	EditProfile: undefined;
	Settings: undefined;
	FriendsList: undefined;
	SearchProfile: undefined;
	FriendRequests: undefined;
	ManageStatus: undefined;
	Camera: { type: 'upload_banner' | 'upload_avatar' };
	PreviewUpload: { image: string; type: 'upload_banner' | 'upload_avatar' };
};

export type SettingsStackParamList = {
	settingsMain: undefined;
	settingsNotifications: undefined;
	settingsSessions: undefined;
	settingsTheming: undefined;
	settingsUI: undefined;
};

export type GlobalParamList = RootstackParamList & TabStackNavParamList & SettingsStackParamList;

export interface FriendItem {
	username: string;
	account_id: string;
	avatar: string;
	status?: {
		id: string;
		type: number;
		account_id: string;
		data: any;
		taps: number;
		taped?: boolean;
	}[];
}

export type FriendItemRenderType = ListRenderItemInfo<FriendItem>;

export interface MagicProps {
	navigation: any;
	route: {
		key: string;
		name: string;
		params: { code: string; new_account: boolean };
		state: string;
	};
}

export interface IAccountRequestProps {
	account: any;
	profile: any;
	device: {
		id: string;
		notifications: boolean;
	};
}
