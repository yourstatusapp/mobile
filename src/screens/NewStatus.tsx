import { AppAlert, GuildInvite, request } from '@core';
import { Block, Button, Fill, Icon, IconButton, Input, Spacer, Status, Text, TextButton } from '@parts';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Switch } from 'react-native';
import DatePicker from 'react-native-date-picker';
import FastImage from 'react-native-fast-image';
import Animated, { SlideInDown } from 'react-native-reanimated';
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
	const { colors } = useTheme();

	const createStatus = async () => {
		SetLoading(true);
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

		const res = await request('post', '/status/new', { data: { type: 'DEFAULT', content: StatusTxt } });

		if (res.data) {
			SetStatusTxt('');
			nav.goBack();
		} else {
			SetLoading(false);
			SetError(res?.message || '');
		}
	};

	const [SelectedType, SetSelectedType] = useState<keyof typeof StatusTypes>('DEFAULT');

	const [NewValidated, SetNewValidated] = useState(false);
	const [ValidateLoading, SetValidateLoading] = useState(false);
	const [GuildCode, SetGuildCode] = useState('');
	const [GuildResults, SetGuildResults] = useState<GuildInvite | null>(null);

	const validateNewStatus = async (type: keyof typeof StatusTypes, data: any) => {
		SetValidateLoading(true);
		const res = await request('post', '/status/validate', { data: { type, data } });
		if (!res.data) {
			SetNewValidated(false);
			SetValidateLoading(true);
			SetGuildResults(null);
			return false;
		}

		SetNewValidated(true);
		SetValidateLoading(true);
		return res.data;
	};

	useEffect(() => {
		if (timerID2) clearTimeout(timerID2);
		console.log(GuildCode);

		timerID2 = setTimeout(async () => {
			let a = await validateNewStatus('DISCORD_GUILD', GuildCode);
			SetGuildResults(a.guild);
		}, 1500);
	}, [GuildCode]);

	return (
		<Block safe paddingHorizontal={20} color="black">
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
							color={SelectedType === StatusTypes[index] ? colors.white40 : colors.white20}
							flex={0}
							marginRight={5}
							vCenter
							hCenter>
							<Icon name={item.icon} size={20 + (item?.iconExtraSpace || 0)} color={SelectedType === StatusTypes[index] ? colors.white : colors.white40} />
						</Block>
					))}
				</Block>

				<Block flex={0} row hCenter marginBottom={30}>
					<Fill />
					<Block flex={0} row press style={{ width: 'auto' }} hCenter>
						<Text size={12} paddingRight={5}>
							More info
						</Text>
						<Icon name="info" color="white" size={12} />
					</Block>
				</Block>

				{SelectedType === 'DEFAULT' && (
					<Block>
						<Status status={{ id: '', content: StatusTxt, type: 0 }} />
						<Spacer size={20} />
						<Input placeholder="Message" value={StatusTxt} onChange={v => SetStatusTxt(v)} />

						<Spacer size={30} />
						<Button text="Create" disabled={StatusTxt === '' || Loading} onPress={createStatus} />
					</Block>
				)}

				{SelectedType === 'DISCORD_GUILD' && (
					<Block>
						{GuildResults !== null && GuildResults?.guild.name && <Status status={{ id: '', content: GuildResults?.guild.name, type: 1 }} />}
						<Spacer size={20} />

						<Input
							placeholder="Invitation Link/Code"
							value={GuildCode}
							onChange={SetGuildCode}
							style={{ borderColor: NewValidated ? '#62CB4E' : colors.white40, borderWidth: 1 }}
						/>
						{ValidateLoading === false && NewValidated && (
							<FastImage
								source={{ uri: `https://cdn.discordapp.com/icons/${GuildResults.id}/${GuildResults.icon}.webp?size=64` }}
								style={{ height: 80, width: 80, borderRadius: 100 }}
							/>
						)}
						<Spacer size={20} />
						{GuildResults !== null && GuildResults?.expires_at && (
							<Text bold>!This status will expire on {new Date(GuildResults?.expires_at).toDateString()}</Text>
						)}

						<Spacer size={30} />
						<Button text="Create" disabled={ValidateLoading === true || NewValidated === false} onPress={createStatus} />
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
						<DatePicker date={new Date()} minimumDate={new Date()} textColor={colors.white} />
					</Block>
				)} */}

				<Fill />
				<TextButton text="Go back" textColor={colors.white80} onPress={() => nav.goBack()} />
			</KeyboardAvoidingView>
		</Block>
	);
};
