import { request } from '@core';
import { Block, Button, Fill, Input, Spacer, Status, Text, TextButton } from '@parts';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useTheme } from 'styled-components/native';

export const NewStatus = () => {
	const [StatusTxt, SetStatusTxt] = useState('');
	const [Error, SetError] = useState('');
	const [Loading, SetLoading] = useState(false);
	const nav = useNavigation();
	const { colors } = useTheme();

	const createStatus = async () => {
		SetLoading(true);
		if (!StatusTxt) {
			SetLoading(false);
			return;
		}
		const res = await request('post', '/status/new', { data: { type: 'DEFAULT', title: StatusTxt } });

		if (res.data) {
			SetStatusTxt('');
			nav.goBack();
		} else {
			SetLoading(false);
			SetError(res?.message || '');
		}
	};

	return (
		<Block safe paddingHorizontal={20}>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={60}>
				<Spacer size={20} />
				<Text size={30} weight="700">
					Create new Status
				</Text>
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
				<Spacer size={2 * 20} />
				<Button text="Create" disabled={StatusTxt === '' || Loading} onPress={createStatus} />
				<Fill />
				<TextButton text="Go back" textColor={colors.white80} onPress={() => nav.goBack()} />
			</KeyboardAvoidingView>
		</Block>
	);
};
