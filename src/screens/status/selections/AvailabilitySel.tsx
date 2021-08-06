import core from '@core';
import { Avatar, Fill, SidePadding, SmallButton, Spacer, Text, WideButton } from '@parts';
import { usePulse } from '@pulsejs/react';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import DatePicker from 'react-native-date-picker';
import { ScrollView } from 'react-native-gesture-handler';

interface AvailabilitySelProps {}

export const AvailabilitySel: React.FC<AvailabilitySelProps> = (props) => {
	const {} = props;
	const theme = useTheme();

	const profile = usePulse(core.profile.state.PROFILE);
	const [Selected, setSelected] = React.useState('');
	const [AddDate, setAddDate] = React.useState(false);

	return (
		<SidePadding>
			<Text weight="bold" size={28}>
				Choose your availability
			</Text>
			<Text color={theme.textFade}>You can show other people by a circle around your avatar to let them know if you're busy or available</Text>
			<Spacer size={50} />
			<Avatar src={`https://cdn.yourstatus.app/profile/${profile.owner}/${profile.avatar}`} size={90} dot_status={Selected} />
			<Spacer size={40} />

			<BigButton onPress={() => setSelected('available')} selected={Selected === 'available'}>
				<Text weight="semi-bold">Available</Text>
			</BigButton>
			<BigButton onPress={() => setSelected('dnd')} selected={Selected === 'dnd'}>
				<Text weight="semi-bold">Do not disturb</Text>
			</BigButton>
			<BigButton onPress={() => setSelected('')} selected={Selected === ''}>
				<Text weight="semi-bold">none</Text>
			</BigButton>
			<Spacer size={40} />
			{/* <SmallButton text="Add time to expire" onPress={() => setAddDate(!AddDate)} /> */}
			{/* {AddDate ? <DatePicker onDateChange={() => {}} /> : <Spacer size={30} />} */}

			<Fill />
			<WideButton text="Set status" />
			<Spacer size={30} />
		</SidePadding>
	);
};

const BigButton = styled(TouchableOpacity)<{ backColor?: string; selected: boolean }>`
	background-color: ${({ theme }) => theme.step1};
	padding: 15px;
	border-radius: 12px;
	margin-bottom: 10px;
	border: solid 2px ${({ theme, selected }) => (selected ? theme.primary : theme.step1)};
`;
