import core, { request, RootstackParamList } from '@core';
import { useNavigation, useTheme } from '@hooks';
import { Avatar, Block, IconButton, Line, Spacer, Status, TabbarHeader, Text } from '@parts';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useSimple } from 'simple-core-state';
import styled from 'styled-components/native';

type Props = NativeStackScreenProps<RootstackParamList, 'ReplyStatus'>;

interface IStatusReplyMessage {
	id: string;
	content: string;
	status_id: string;
	sender: string;
	avatar: string;
	username: string;
}

export const ReplyStatus = ({ route }: Props) => {
	const { theme } = useTheme();
	const nav = useNavigation();

	const profile = useSimple(core.profile);
	const [newMessage, setNewMessage] = useState<string>('');
	const [commentLoading, setCommentLoading] = useState(false);
	const [comments, setComments] = useState<IStatusReplyMessage[]>([]);

	const getComments = async (id: string) => {
		const res = await request<any[]>('get', `/status/${id}/comments`);

		if (res.data) {
			setComments(res.data);
		}
	};

	const replyOnStatus = React.useCallback(async () => {
		setCommentLoading(true);
		const res = await request<any>('post', `/status/${route.params.status.id}/reply`, {
			data: { content: newMessage },
		});
		setNewMessage('');
		setCommentLoading(false);
		if (res.data) {
			setComments(oldComments => [...oldComments, { ...res.data, username: profile?.username }]);
		}
	}, [newMessage, route.params.status.id]);

	useEffect(() => {
		getComments(route.params.status.id);
	}, []);

	const MessageCompRenderItem: ListRenderItem<IStatusReplyMessage> = ({ item }) => (
		<Block flex={0} row key={item.id} marginBottom={5}>
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
	);

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
						{route.params.username} Status
					</Text>
				</Block>
				<Block hCenter flex={0} paddingTop={20} paddingBottom={15} color={theme.backgroundDark}>
					<Status status={route.params.status} disableTap />
				</Block>
				<Line size={2} color={theme.backgroundDarker} />

				<Block paddingHorizontal={15} flex={1} paddingTop={15}>
					<FlashList
						data={comments}
						ListEmptyComponent={() => (
							<Block hCenter paddingBottom={30}>
								<Text color={theme.textFadeLight}>No comments.</Text>
							</Block>
						)}
						renderItem={MessageCompRenderItem}
					/>
				</Block>

				<Block row hCenter flex={0} style={{ alignItems: 'flex-end' }} paddingHorizontal={15}>
					<RoundedTextInput
						placeholder="Send a rpely"
						placeholderTextColor={theme.textFadeLight}
						onChangeText={(v: string) => setNewMessage(v)}
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
						iconStyle={{ paddingRight: 5 }}
						color={theme.backgroundDarker}
						backgroundColor={theme.text}
						onPress={() => replyOnStatus()}
						disabled={commentLoading}
					/>
				</Block>
				<Spacer size={20} />
			</KeyboardAvoidingView>
			{/* <Spacer size={81} /> */}
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
