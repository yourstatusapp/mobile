import React, { useEffect, useState } from 'react';
import { Avatar, Block, IconButton, Line, Spacer, Status, Text } from '@parts';
import styled, { useTheme } from 'styled-components/native';
import { request, TabStackNavParamList } from '@core';
import { useRoute, RouteProp } from '@react-navigation/native';
import { FlatList, KeyboardAvoidingView } from 'react-native';
import { TabbarHeader } from '../parts/components/TabbarHeader';
import { useNavigation } from '@hooks';

export const StatusDetail: React.FC = () => {
	const nav = useNavigation();
	const theme = useTheme();
	const { params } = useRoute<RouteProp<TabStackNavParamList, 'StatusDetail'>>();

	const [newMessage, setNewMessage] = useState<string>('');
	const [commentLoading, setCommentLoading] = useState(false);
	const [comments, setComments] = useState<any[]>([]);

	const getComments = async (id: string) => {
		const res = await request<any[]>('get', `/status/${id}/comments`);

		if (res.data) {
			setComments(res.data);
		}
	};

	const replyOnStatus = React.useCallback(async () => {
		setCommentLoading(true);
		const res = await request('post', `/status/${params.status.id}/reply`, { data: { content: newMessage } });
		setNewMessage('');
		setCommentLoading(false);
		if (res.data) {
			setComments(oldComments => [...oldComments, res.data]);
		}
	}, [newMessage, params.status.id]);

	useEffect(() => {
		if (params?.status.id) getComments(params.status.id);
	}, []);

	return (
		<Block color={theme.background}>
			<TabbarHeader color={theme.backgroundDark} />
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
				<Block row style={{ height: 40 }} flex={0} vCenter hCenter color={theme.backgroundDark}>
					<IconButton
						name="arrow"
						size={24}
						iconSize={16}
						color={theme.text}
						backgroundColor={theme.darker}
						style={{ position: 'absolute', left: 15 }}
						onPress={() => nav.goBack()}
					/>
					<Text bold size={18}>
						{params.username} Status
					</Text>
				</Block>
				<Block hCenter flex={0} paddingTop={20} paddingBottom={15} color={theme.backgroundDark}>
					<Status status={params.status} disableNavigate={true} />
				</Block>
				<Line size={2} color={theme.backgroundDarker} />

				<Block paddingHorizontal={15} flex={0} paddingTop={15}>
					<FlatList
						data={comments}
						ListEmptyComponent={() => (
							<Block hCenter paddingBottom={30}>
								<Text color={theme.textFadeLight}>No comments.</Text>
							</Block>
						)}
						renderItem={({ item }) => (
							<Block row key={item.id} marginBottom={5}>
								<Block row hCenter>
									<Avatar src={[item.sender, item.avatar]} size={25} />
									<Text paddingLeft={8} weight="700">
										{item.username}
										<Text color={theme.textFade}>: {` `}</Text>
										<Text weight="500" color={theme.textFadeLight}>
											{item.content}
										</Text>
									</Text>
								</Block>
							</Block>
						)}
					/>
				</Block>

				<Block row hCenter flex={1} style={{ alignItems: 'flex-end' }} paddingHorizontal={15}>
					<RoundedTextInput
						placeholder="send message"
						onChangeText={v => setNewMessage(v)}
						value={newMessage}
						autoCapitalize={'none'}
						autoCompleteType="off"
						autoCorrect={false}
					/>
					<IconButton
						name="send"
						size={27}
						iconSize={20}
						style={{ marginLeft: 10 }}
						iconStyle={{ paddingRight: 2 }}
						color={theme.backgroundDarker}
						backgroundColor={theme.text}
						onPress={() => replyOnStatus()}
						disabled={commentLoading}
					/>
				</Block>
				<Spacer size={20} />
			</KeyboardAvoidingView>
			<Spacer size={81} />
		</Block>
	);
};

const RoundedTextInput = styled.TextInput`
	border-radius: 50px;
	height: 40px;
	padding: 0px 15px;
	flex: 1;
	color: ${({ theme }) => theme.textFade};
	border: solid 1px ${({ theme }) => theme.darker};
	background-color: ${({ theme }) => theme.backgroundDark};
`;
