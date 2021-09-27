import * as React from 'react';
import { LocationType } from '@core';
import { Avatar, Fill, Spacer, Row, StatusBox, Text, Icon } from '@parts';
import { TouchableOpacity, View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

interface FriendItemEntryProps {
	item: any;
	index: number;
}

export const FriendItemEntry: React.FC<FriendItemEntryProps> = (props) => {
	const { item, index } = props;
	const nav = useNavigation();
	const theme = useTheme();

	// console.log(props);

	// return (
	// 	<View>
	// 		<Text>test</Text>
	// 	</View>
	// );

	return (
		<FriendItemEntryBody key={index}>
			<View>
				<Avatar src={`https://cdn.yourstatus.app/profile/${item.account_id}/${item.avatar}`} onPress={() => nav.navigate('Profile', { profile: item })} />

				<Fill />
			</View>
			<Spacer size={15} />
			<View>
				<Row>
					{/* <Text color={theme.textFade} size={18} weight="bold">
        @
      </Text>
      <Spacer size={1} /> */}
					<Text weight="medium" size={18}>
						{item.username}
					</Text>

					<Spacer size={10} />
					{item.stories?.length && (
						<ShowStoriesButton onPress={() => nav.navigate('Stories', { ...item })} activeOpacity={0.8}>
							<Text weight="semi-bold" size={12} color={theme.background}>
								New Stories
							</Text>
						</ShowStoriesButton>
					)}
				</Row>
				{item?.location && <LocationBox location={item.location} />}

				{item?.status && (
					<>
						<Spacer size={8} />
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
					</>
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
	flex: 1;
	/* flex-wrap: wrap; */
`;

const PopTagCounter = styled.View`
	background-color: ${({ theme }) => theme.primary};
	padding: 2px 7px;
	border-radius: 50px;
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
