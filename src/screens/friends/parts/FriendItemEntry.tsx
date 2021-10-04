import * as React from 'react';
import core, { LocationType, niceTime, snow2time } from '@core';
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
					onLongPress={() => stories.length && nav.navigate('Profile', { profile: item })}
					storie_availible={!!stories.length}
				/>

				<Fill />
			</View>
			<Spacer size={15} />
			<View style={{ flex: 1, alignSelf: 'flex-start' }}>
				<TouchableOpacity activeOpacity={0.8} onPress={() => nav.navigate('Profile', { profile: item })}>
					<Text weight="medium" size={18}>
						{item.username}
					</Text>
				</TouchableOpacity>

				{item?.status && (
					<View style={{ flex: 1, justifyContent: 'flex-start' }}>
						<Spacer size={5} />
						<StatusContainer>
							<StatusBox {...item.status} />
							{new Date(new Date().getTime() - 24 * 60 * 60 * 1000) < snow2time(item.status.id) && (
								<NewBadge>
									<Text size={10} color={theme.background} weight="bold">
										new
									</Text>
								</NewBadge>
							)}
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

const NewBadge = styled.View`
	background-color: #f16464;
	margin-left: 5px;
	border-radius: 20px;
	padding: 2px 6px;
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
	/* background-color: ${({ theme }) => theme.primary}; */
	padding: 2px 7px;
	background-color: red;
	border-top-right-radius: 12;
	height: 20px;
	position: relative;
	right: 10px;
	z-index: 5;
	border-bottom-right-radius: 12;
	/* border-radius: 50px; */
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
