import core, { alert, request } from '@core';
import { Row, Avatar, Spacer, Fill, IconButton, Text } from '@parts';
import { usePulse } from '@pulsejs/react';
import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { FlatList } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import styled, { useTheme } from 'styled-components/native';

interface NewfriendsProps {
	route: {
		params: any;
	};
}

export const NewfriendsView: React.FC<NewfriendsProps> = (props) => {
	const { route } = props;
	const theme = useTheme();
	const nav = useNavigation();
	const incomingList = usePulse(core.profile.collection.groups.requests);

	React.useEffect(() => {
		console.log(route.params);
	}, []);

	const replyRequest = async (id: string, owner: string, response: boolean) => {
		await request('post', '/friends/request/' + id, { data: { accept: response } });
		core.profile.collection.removeFromGroups(id, 'requests');
		console.log('replied');
		// if (a === false) return;

		// console.log(a);
	};

	const renderItem1 = ({ item, index }) => (
		<RequestItemContainer key={index}>
			<Row>
				<Avatar src={`https://cdn.yourstatus.app/profile/${item.owner}/${item.avatar}`} size={40} />
				<Spacer size={10} />
				<Text>{item.username || 'none'}</Text>
			</Row>

			<BottomPart>
				<BottomBtn>
					<TouchableHighlight onPress={() => replyRequest(item.id, item.owner, false)} activeOpacity={1}>
						<Text center>Deny</Text>
					</TouchableHighlight>
				</BottomBtn>
				<Spacer size={10} />
				<BottomBtn style={{ backgroundColor: theme.primary }}>
					<TouchableHighlight onPress={() => replyRequest(item.id, item.owner, true)}>
						<Text center color="white">
							Accept
						</Text>
					</TouchableHighlight>
				</BottomBtn>
			</BottomPart>
		</RequestItemContainer>
	);

	return (
		<NewfriendsBody>
			<Spacer size={15} />
			<HeaderContainer>
				<Text color={theme.primary} size={27} weight="bold" style={{ letterSpacing: -0.9 }}>
					Friends requests
				</Text>
				<Fill />
				<IconButton name="plus" size={25} iconSize={20} color={theme.text} onPress={() => nav.goBack()} style={{ transform: [{ rotate: '45deg' }] }} />
			</HeaderContainer>
			<Spacer size={10} />
			<Container>
				<FlatList
					data={incomingList}
					renderItem={renderItem1}
					ListEmptyComponent={() => (
						<>
							<Spacer size={30} />
							<Row center>
								<Text weight="semi-bold" size={18} color={theme.textFade}>
									No incoming friend requests
								</Text>
							</Row>
						</>
					)}
				/>
			</Container>
		</NewfriendsBody>
	);
};

const NewfriendsBody = styled.View`
	flex: 1;
`;
const HeaderContainer = styled(Row)`
	padding: 0px 15px;
`;

const Container = styled.View`
	flex: 1;
`;

const BottomPart = styled(Row)`
	margin-top: 15px;
`;

const RequestItemContainer = styled.View`
	border-bottom-color: ${({ theme }) => theme.step1};
	border-bottom-width: 1px;
	padding: 20px;
	padding-bottom: 15px;
	padding-top: 15px;
`;

const BottomBtn = styled.View`
	width: 100%;
	flex: 1;
	flex-grow: 1;
	background-color: ${({ theme }) => theme.step1};
	padding: 10px;
	border-radius: 12px;
`;
