import { AppAlert, GuildInvite, request } from '@core';
import { Block, Button, Fill, Icon, Input, Spacer, Status, Text, TextButton } from '@parts';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'styled-components/native';

export enum StatusTypes {
	DEFAULT,
	DISCORD_GUILD,
}

const STATUS_TYPES_LIST = [{ icon: 'message' }, { icon: 'discord', iconExtraSpace: 5 }];
let timerID2: NodeJS.Timeout;

export const NewStatus = () => {
	const [StatusTxt, SetStatusTxt] = useState('');
	const [Error, SetError] = useState('');
	const [Loading, SetLoading] = useState(false);
	const [Expire, SetExpire] = useState(false);
	const nav = useNavigation();
	const theme = useTheme();

	const [SelectedType, SetSelectedType] = useState<keyof typeof StatusTypes>('DEFAULT');
	const [NewValidated, SetNewValidated] = useState(false);
	const [ValidateLoading, SetValidateLoading] = useState(false);
	const [GuildCode, SetGuildCode] = useState('');
	const [GuildResults, SetGuildResults] = useState<GuildInvite | null>();

	const createStatus = async () => {
		SetLoading(true);
		SetError('');

		if (!StatusTxt) {
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

		const res = await request('post', '/status/new', { data: { type: 'DEFAULT', content: StatusTxt?.trimStart()?.trimEnd() } });
		SetLoading(false);

		if (res.data) {
			AppAlert(true, res.message);
			nav.goBack();
		} else {
			SetError(res?.message || '');
		}
	};

	const newGuildStatus = async () => {
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
	};

	const validateNewStatus = async (type: keyof typeof StatusTypes, data: any): Promise<void> => {
		SetValidateLoading(true);
		SetNewValidated(false);

		if (timerID2) clearTimeout(timerID2);

		timerID2 = setTimeout(async () => {
			const res = await request<{ guild: GuildInvite }>('post', '/status/validate', { data: { type, data } });

			SetValidateLoading(false);

			if (res?.data) {
				SetNewValidated(true);
				SetGuildResults(res.data.guild);
			} else {
				SetGuildResults(null);
				return null;
			}
		}, 1500);
	};

	useEffect(() => {
		if (!GuildCode) return;
		validateNewStatus('DISCORD_GUILD', GuildCode);
	}, [GuildCode]);

	return (
		<Block safe paddingHorizontal={20} color={theme.background}>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={60}>
				<Spacer size={20} />
				<Text size={30} weight="700">
					Create new Status
				</Text>

				<Spacer size={20} />
				<Block row flex={0}>
					{STATUS_TYPES_LIST.map((item, index) => (
						<Block
							press
							// @ts-ignore
							onPress={() => SetSelectedType(StatusTypes[index])}
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
				</Block>

				{/* <Block flex={0} row hCenter marginBottom={30}>
					<Fill />
					<Block flex={0} row press style={{ width: 'auto' }} hCenter>
						<Text size={12} paddingRight={5}>
							More info
						</Text>
						<Icon name="info" color="white" size={12} />
					</Block>
				</Block> */}

				{SelectedType === 'DEFAULT' && (
					<Block marginTop={30} flex={1}>
						<Block row flex={1} style={{ minHeight: 50 }}>
							<Status demo status={{ id: '', data: { message: StatusTxt }, type: 0, taped: true }} />
						</Block>
						<Spacer size={20} />
						<Input placeholder="Message" value={StatusTxt} onChange={v => SetStatusTxt(v)} />

						<Spacer size={30} />
						<Button text="Create" disabled={StatusTxt === '' || Loading} onPress={createStatus} />
					</Block>
				)}

				{SelectedType === 'DISCORD_GUILD' && (
					<Block marginTop={30} flex={0}>
						{GuildResults?.guild?.id && <Status status={{ id: '543', data: { name: GuildResults?.guild?.name, invite_code: GuildResults?.code }, type: 1 }} />}
						<Spacer size={20} />

						<Input
							placeholder="Invitation Link/Code"
							value={GuildCode}
							onChange={SetGuildCode}
							style={{ borderColor: NewValidated ? '#62CB4E' : theme.darker1, borderWidth: 1 }}
						/>
						{ValidateLoading && (
							<Block vCenter hCenter marginTop={35}>
								<ActivityIndicator />
							</Block>
						)}
						<Spacer size={20} />
						{NewValidated === true && (
							<Block row hCenter flex={0}>
								<Text bold marginRight={10}>
									Found:
								</Text>
								<Text marginRight={10} color={theme.textFade} weight="600">
									{GuildResults?.guild.name}
								</Text>
								<FastImage
									source={{ uri: `https://cdn.discordapp.com/icons/${GuildResults?.guild.id}/${GuildResults?.guild.icon}.webp?size=64` }}
									style={{ height: 35, width: 35, borderRadius: 100 }}
								/>
							</Block>
						)}
						<Spacer size={4} />
						{GuildResults !== null && GuildResults?.expires_at && (
							<Text color="#D35A5A">This status will expire on {new Date(GuildResults?.expires_at).toDateString()}</Text>
						)}

						<Spacer size={30} />
						<Button text="Create" disabled={Loading || ValidateLoading === true || NewValidated === false} onPress={newGuildStatus} />
					</Block>
				)}

				{/*
				<Spacer size={20} />
				<Status status={{ id: '', content: StatusTxt, type: 0 }} />
				<Spacer size={20} />
				{!!Error && (
					<Text color="red" size={14}>
						{Error}
					</Text>
				)}
				<Spacer size={8} />
				<Input value={StatusTxt} onChange={v => SetStatusTxt(v)} />
				<Spacer size={10} />
				<Block flex={0} row hCenter marginTop={10}>
					<Text>Enable Expire</Text>
					<Fill />
					<Switch
						onValueChange={v => {
							SetExpire(v);
						}}
						value={Expire}
					/>
				</Block>
				{Expire && (
					<Block>
						<DatePicker date={new Date()} minimumDate={new Date()} textColor={theme.white} />
					</Block>
				)} */}

				<Fill />
				<TextButton text="Go back" textColor={theme.textFade} onPress={() => nav.goBack()} />
			</KeyboardAvoidingView>
		</Block>
	);
};
