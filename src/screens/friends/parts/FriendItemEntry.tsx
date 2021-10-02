import * as React from 'react';
import core, { LocationType, niceTime } from '@core';
import { Avatar, Fill, Spacer, Row, StatusBox, Text, Icon } from '@parts';
import { TouchableOpacity, View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { usePulse } from '@pulsejs/react';

interface FriendItemEntryProps {
	item: any;
	index: number;
}

export const FriendItemEntry: React.FC<FriendItemEntryProps> = (props) => {
	const { item, index } = props;
	const nav = useNavigation();
	const theme = useTheme();

	const stories = usePulse(core.storie.collection.getGroup(`profile/${item.account_id}`));

	// console.log(props);

	// return (
	// 	<View>
	// 		<Text>test</Text>
	// 	</View>
	// );

	return (
		<FriendItemEntryBody key={index}>
			<View>
				<Avatar
					src={`https://cdn.yourstatus.app/profile/${item.account_id}/${item.avatar}`}
					onPress={() => (stories.length ? nav.navigate('Stories', { ...item, stories }) : nav.navigate('Profile', { profile: item }))}
					// onLongPress={() => !stories.length && nav.navigate('Profile', { profile: item })}
					storie_availible={!!stories.length}
				/>
				{/* {stories[0] && (
					<NewStorieAlert onPress={() => nav.navigate('Stories', { ...item, stories })}>
						<Text size={11} weight="semi-bold" color={theme.text}>
							NEW
						</Text>
					</NewStorieAlert>
				)} */}

				<Fill />
			</View>
			<Spacer size={15} />
			<View style={{ flex: 1, alignSelf: 'flex-start' }}>
				<TouchableOpacity activeOpacity={0.8} onPress={() => nav.navigate('Profile', { profile: item })}>
					<Text weight="medium" size={18}>
						{item.username}
					</Text>
				</TouchableOpacity>
				{item?.location && <LocationBox location={item.location} />}

				{item?.status && (
					<View style={{ flex: 1, justifyContent: 'flex-start' }}>
						<Spacer size={5} />
						<StatusContainer>
							<StatusBox {...item.status} />
							<Spacer size={7} />
							{item.status.taps !== 0 && (
								<PopTagCounter>
									<Text weight="semi-bold" size={14} color={theme.background}>
										{item.status.taps}
									</Text>
								</PopTagCounter>
							)}
							{/* <Spacer size={5} />
							<NewBox>
								<Text weight="bold" size={12} color={theme.background}>
									NEW
								</Text>
							</NewBox> */}
							{/* {item.status.data?.title?.length > 20 && <Spacer size={5} />}
							<Text size={12} color={theme.textFade} weight="medium">
								{item.status.data?.title?.length < 20 && <Spacer size={8} />}
								{niceTime(item?.status.id)} ago
							</Text> */}
						</StatusContainer>
					</View>
				)}
			</View>
		</FriendItemEntryBody>
	);
};

const FriendItemEntryBody = styled.View`
	flex-direction: row;
	align-items: center;
	padding: 10px 15px;
	border-bottom-color: ${({ theme }) => theme.step1};
	border-bottom-width: 1px;
`;

const ShowStoriesButton = styled(TouchableOpacity)`
	padding: 2px 6px;
	border-radius: 5px;
	background-color: #68a4e9;
	/* background-color: ${({ theme }) => theme.primary}; */
`;

const StatusContainer = styled.View`
	flex-direction: row;
	align-items: center;
`;

const PopTagCounter = styled.View`
	background-color: ${({ theme }) => theme.primary};
	padding: 2px 7px;
	border-radius: 50px;
`;

const NewStorieAlert = styled(TouchableOpacity)`
	background-color: #fca635;
	padding: 2px;
	border-radius: 12px;
	margin: 0px 5px;
	margin-top: 5px;
	justify-content: center;
	align-items: center;
`;

const StorieCricle = styled.View`
	background-color: ${({ theme }) => theme.primary};
	padding: 4px;
	border-radius: 100px;
`;

export const LocationBox: React.FC<{ location: LocationType }> = (p) => {
	const { location } = p;
	const theme = useTheme();

	return (
		<Row style={{ paddingTop: 5, paddingBottom: 5 }}>
			<Icon name="location" size={9} color={'white'} style={{ marginRight: 5, backgroundColor: theme.primary, padding: 3, borderRadius: 50, paddingTop: 5, paddingRight: 5 }} />
			<Text size={14} color={theme.textFade} style={{ paddingTop: 1 }}>
				{location.title}
			</Text>
		</Row>
	);
};
