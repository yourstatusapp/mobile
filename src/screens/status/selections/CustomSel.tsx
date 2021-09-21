import core, { request } from '@core';
import { Fill, Row, SidePadding, SmallInput, Spacer, Text, WideButton } from '@parts';
import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { Switch } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

interface CustomSelProps {}

export const CustomSel: React.FC<CustomSelProps> = (props) => {
	const {} = props;
	const theme = useTheme();
	const nav = useNavigation();
	const [Title, setTitle] = useState('');
	const [Expire, setExpire] = useState(false);
	const [EpireDate, setEpireDate] = useState<Date>(new Date());

	const createStatus = async () => {
		await request('post', '/status/new', { data: { data: { title: Title }, expires_at: Expire ? EpireDate : null } });
		nav.goBack();
		core.status.state.my_status.patch({ data: { title: Title }, expires_at: Expire ? EpireDate : null });
	};

	const ToggleChange = () => setExpire(!Expire);

	return (
		<SidePadding>
			<Spacer size={10} />
			<Text weight="bold" size={28}>
				Create your status
			</Text>
			<Spacer size={50} />

			<Text weight="medium" size={20} style={{ marginBottom: 10, marginLeft: 5 }}>
				Your status title
			</Text>
			<SmallInput onChangeText={setTitle} autoCapitalize="none" autoCorrect={false} autoCompleteType="off" />
			<Spacer size={50} />
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
	);
};
