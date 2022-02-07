import { request } from '@core';
import { Block, Button, Fill, Input, Spacer, Status, Text, TextButton } from '@parts';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useTheme } from 'styled-components/native';

export const NewStatus = () => {
	const [StatusTxt, SetStatusTxt] = useState('');
	const [Loading, SetLoading] = useState(false);
	const nav = useNavigation();
	const { colors } = useTheme();

	const createStatus = async () => {
		SetLoading(true);
		if (!StatusTxt) {
			SetLoading(false);
			return;
		}
		const res = await request('post', '/status/new', { data: { data: { title: StatusTxt } } });
		SetLoading(false);
		if (res.data) {
			nav.goBack();
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
				<Status status={{ id: '', data: { title: StatusTxt } }} />
				<Spacer size={20} />
				<Input value={StatusTxt} onChange={v => SetStatusTxt(v)} />
				<Spacer size={2 * 20} />
				<Button text="Create" disabled={StatusTxt === ''} onPress={createStatus} />
				<Fill />
				<TextButton text="Go back" textColor={colors.white80} onPress={() => nav.goBack()} />
			</KeyboardAvoidingView>
		</Block>
	);
};
