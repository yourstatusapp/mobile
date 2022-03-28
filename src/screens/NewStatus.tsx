import React, { useEffect, useState } from 'react';
import { AppAlert, GuildInvite, request } from '@core';
import { Block, Button, Fill, Icon, IconButton, Input, Spacer, Status, Text, TextButton } from '@parts';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, KeyboardAvoidingView, TextInput } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';

export enum StatusTypes {
	DEFAULT,
	DISCORD_GUILD,
}

const STATUS_TYPES_LIST = [{ icon: 'message' }, { icon: 'discord', iconExtraSpace: 5 }];
let timerID2: NodeJS.Timeout;

export const NewStatus: React.FC = () => {
	const nav = useNavigation();
	const theme = useTheme();

	const [Error, SetError] = useState('');
	const [Loading, SetLoading] = useState(false);
	const [Expire, SetExpire] = useState(false);
	const [SelectedType, SetSelectedType] = useState<keyof typeof StatusTypes>('DEFAULT');
	const [GuildResults, SetGuildResults] = useState<GuildInvite | null>();
	const [Content, SetContent] = useState('');
	const [Valid, SetValid] = useState(false);

	const createStatus = React.useCallback(async () => {
		SetLoading(true);
		SetError('');

		if (!Content) {
			SetLoading(false);
			return;
		}

		if (Expire) {
			const MINIMUN_DATE = new Date();
			MINIMUN_DATE.setSeconds(MINIMUN_DATE.getSeconds() + 10);

			if (MINIMUN_DATE < new Date()) {
				AppAlert(false, 'expire date is incorrect');
				return;
			}
		}

		const res = await request('post', '/status/new', { data: { type: 'DEFAULT', content: Content?.trimStart()?.trimEnd() } });
		SetLoading(false);

		if (res.data) {
			AppAlert(true, res.message);
			nav.goBack();
		} else {
			SetError(res?.message || '');
		}
	}, [Content, Expire, nav]);

	const newGuildStatus = React.useCallback(async () => {
		SetLoading(true);
		SetError('');

		const res = await request('post', '/status/new', { data: { type: 'DISCORD_GUILD', content: GuildResults?.code } });
		SetLoading(false);
		if (res.data) {
			AppAlert(true, res.message);
			nav.goBack();
		} else {
			SetError(res?.message || '');
		}
	}, [GuildResults?.code, nav]);

	const validateNewStatus = async (type: keyof typeof StatusTypes, data: any): Promise<void> => {
		SetValid(false);

		const res = await request<{ guild: GuildInvite }>('post', '/status/validate', { data: { type, data } });

		if (res?.data) {
			SetValid(true);
			SetGuildResults(res.data.guild);
		} else {
			SetGuildResults(null);
			return;
		}
	};

	const createPost = React.useCallback(() => {
		if (SelectedType === 'DEFAULT') {
			createStatus();
		}
		if (SelectedType === 'DISCORD_GUILD') {
			newGuildStatus();
		}
	}, [SelectedType, createStatus, newGuildStatus]);

	const selectStatusType = (index: number) => {
		SetSelectedType(StatusTypes[index].toString());
		SetValid(false);
		SetContent('');
	};

	const pasteClipBoard = async () => {
		const c = await Clipboard.getString();
		SetContent(c);
	};

	const ContentChecker = React.useCallback(
		v => {
			let t = SelectedType;
			let c = v;

			if (t === 'DISCORD_GUILD') {
				if (timerID2) clearTimeout(timerID2);

				timerID2 = setTimeout(async () => {
					console.log(`${t} ${c}`);

					validateNewStatus(t, c);
				}, 1500);
			}

			if (t === 'DEFAULT') {
				if (c === '') SetValid(false);
				else SetValid(true);
			}
		},
		[SelectedType],
	);

	useEffect(() => {
		ContentChecker(Content);
	}, [Content]);

	const { top, bottom } = useSafeAreaInsets();
	return (
		<KeyboardAvoidingView
			contentContainerStyle={{ flex: 1, backgroundColor: 'red' }}
			style={{ flex: 1, backgroundColor: theme.background, paddingBottom: bottom }}
			behavior="padding"
			keyboardVerticalOffset={-bottom}>
			<Block color={theme.background} paddingTop={top}>
				<Block
					flex={0}
					style={{ borderBottomColor: theme.darker, borderBottomWidth: 1 }}
					paddingLeft={15}
					paddingTop={10}
					paddingBottom={10}>
					<Status demo status={{ id: '', data: { message: Content }, type: StatusTypes[SelectedType], taped: true }} />

					{SelectedType === 'DISCORD_GUILD' && Valid && (
						<Block row hCenter flex={0} marginTop={10}>
							<Text bold marginRight={10}>
								Found:
							</Text>
							<Text marginRight={10} color={theme.textFade} weight="600">
								{GuildResults?.guild.name}
							</Text>
							<FastImage
								source={{ uri: `https://cdn.discordapp.com/icons/${GuildResults?.guild.id}/${GuildResults?.guild.icon}.webp?size=64` }}
								style={{ height: 30, width: 30, borderRadius: 100 }}
							/>
						</Block>
					)}
					<Spacer size={4} />
					{GuildResults !== null && GuildResults?.expires_at && (
						<Text color="#D35A5A">This status will expire on {new Date(GuildResults?.expires_at).toDateString()}</Text>
					)}
				</Block>
				<Block
					flex={0}
					style={{ borderBottomColor: theme.darker, borderBottomWidth: 1 }}
					paddingLeft={15}
					paddingTop={10}
					paddingBottom={10}
					row
					hCenter>
					<IconButton
						name="clipboard"
						color={theme.textFadeLight}
						backgroundColor={theme.darker}
						size={20}
						onPress={pasteClipBoard}
						style={{ marginRight: 5 }}
					/>
					<TextInput
						placeholder="message"
						style={{ color: theme.text, paddingHorizontal: 0, paddingVertical: 10 }}
						placeholderTextColor={theme.textFadeLight}
						value={Content}
						onChangeText={v => SetContent(v)}
					/>
				</Block>

				<Block paddingHorizontal={20}>
					<Fill />
				</Block>

				<Text color={theme.primary} paddingLeft={15} paddingBottom={4}>
					{SelectedType === 'DEFAULT' ? 'Message' : 'Discord server'}
				</Text>

				<Block
					flex={0}
					style={{ height: 75 + bottom, borderTopWidth: 1, borderTopColor: theme.darker }}
					color={theme.background}
					vCenter
					paddingHorizontal={15}>
					<Block row flex={1} hCenter marginBottom={bottom}>
						{STATUS_TYPES_LIST.map((item, index) => (
							<Block
								press
								// @ts-ignore
								onPress={() => selectStatusType(index)}
								style={{ width: 50, height: 50, borderRadius: 12 }}
								key={index}
								color={SelectedType === StatusTypes[index] ? theme.darker1 : theme.darker}
								flex={0}
								marginRight={5}
								vCenter
								hCenter>
								<Icon
									name={item.icon}
									size={20 + (item?.iconExtraSpace || 0)}
									color={SelectedType === StatusTypes[index] ? theme.textFade : theme.textFadeLight}
								/>
							</Block>
						))}
						<Fill />
						<Block
							press
							disabled={Valid === false}
							onPress={() => createPost()}
							style={{
								width: 50,
								height: 50,
								borderRadius: 12,
								opacity: Valid ? 1 : 0.4,
							}}
							color={theme.primary}
							flex={0}
							marginRight={5}
							vCenter
							hCenter>
							<Icon name="arrow-big" size={20} color={'white'} />
						</Block>
					</Block>
				</Block>
			</Block>
		</KeyboardAvoidingView>
	);
};
