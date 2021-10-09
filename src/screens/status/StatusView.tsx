import core from '@core';
import { Fill, Icon, IconButton, Row, SmallInput, Spacer, Text, TextButton, WideButton } from '@parts';
import { usePulse } from '@pulsejs/react';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Switch, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import styled, { useTheme } from 'styled-components/native';
import { niceTime, request } from '../../core/utils';

interface StatusProps {}

export const StatusView: React.FC<StatusProps> = (props) => {
	const theme = useTheme();
	const nav = useNavigation();
	const myStatus = usePulse(core.status.state.my_status);

	const [Title, setTitle] = useState('');
	const [Expire, setExpire] = useState(false);
	const [EpireDate, setEpireDate] = useState<Date>(new Date());

	const createStatus = async () => {
		await request('post', '/status/new', { data: { data: { title: Title }, expires_at: Expire ? EpireDate : null } });
		nav.goBack();
		core.status.state.my_status.patch({ data: { title: Title }, expires_at: Expire ? EpireDate : null });
	};

	const ToggleChange = () => setExpire(!Expire);

	const endStatus = async (id: string) => {
		await request('delete', `/status/${id}/end`);
		core.status.state.my_status.reset();
	};

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }} behavior="height" keyboardVerticalOffset={40}>
			<TopHeading style={{ height: 50, backgroundColor: theme.step1 }}>
				<TextButton text="Close" size={18} weight="semi-bold" color={theme.primary} onPress={() => nav.goBack()} />
			</TopHeading>
			<TouchableWithoutFeedback style={{ flex: 1 }} containerStyle={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
				<Spacer size={20} />
				<Text weight="bold" size={28} color={theme.text} center>
					Choose your status
				</Text>
				<Text center color={theme.textFade}>
					You can choose a status how you want to share your friends what you're doing or you want to do.
				</Text>

				<Spacer size={20} />
				<SidePadding>
					{myStatus && (
						<CurrentStatusBox>
							<Row>
								<Row style={{ paddingBottom: 5 }}>
									<Text weight="semi-bold">Current status: </Text>
									<Text>{myStatus.data.title}</Text>
								</Row>

								<Fill />
								<IconButton
									onPress={() => endStatus(myStatus.id)}
									name="plus"
									size={20}
									iconSize={20}
									color="#FF4747"
									backgroundColor={theme.step3}
									iconStyle={{ transform: [{ rotate: '45deg' }] }}
								/>
							</Row>
							<Spacer size={9} />
							<Row>
								<Icon name="history" size={14} color={theme.textFade} />
								<Spacer size={4} />
								<Text size={14} color={theme.textFade}>
									{niceTime(myStatus.id)} ago
								</Text>
							</Row>
						</CurrentStatusBox>
					)}

					<Spacer size={10} />
					<Text>
						Keep the title under <Text weight="bold">33</Text> characters. Currently at:{' '}
						<Text weight="bold" color={Title.length > 33 ? 'red' : theme.text}>
							{Title.length}
						</Text>
					</Text>

					<Spacer size={40} />

					<Text weight="semi-bold" size={20} style={{ marginBottom: 7 }}>
						Title
					</Text>
					<SmallInput onChangeText={setTitle} autoCapitalize="none" autoCorrect={false} autoCompleteType="off" />

					<Spacer size={15} />
					<Row>
						<Text weight="medium">Enable expire date</Text>
						<Fill />
						<Switch value={Expire} onValueChange={ToggleChange} />
					</Row>
					{Expire && (
						<Row center>
							<DatePicker date={EpireDate} minimumDate={new Date()} onDateChange={(v) => setEpireDate(v)} textColor={theme.text} />
						</Row>
					)}

					<Fill />
					<WideButton text="Create Status" onPress={() => createStatus()} disabled={Title === ''} />
					<Spacer size={30} />
				</SidePadding>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

const TopHeading = styled(Row)`
	padding: 0px 20px;
	/* margin-bottom: 10px; */
`;

const SidePadding = styled.View`
	padding: 0px 20px;
	flex: 1;
`;

const CurrentStatusBox = styled.View`
	background-color: ${({ theme }) => theme.step1};
	padding: 8px 10px;
	border-radius: 12px;
	margin-bottom: 20px;
`;
