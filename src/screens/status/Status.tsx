import * as React from 'react';
import styled, { useTheme } from 'styled-components';
import core, { niceTime, ProfileType, request, StatusComment } from '@core';
import { FlatList, KeyboardAvoidingView, View } from 'react-native';
import { Avatar, Cul, Fill, IconButton, Row, Spacer, StatusBox, Text } from '@parts';
import { useNavigation } from "@react-navigation/native";
import { usePulse } from '@pulsejs/react';
import { useState } from 'react';

interface StatusProps {
	route: { params: ProfileType };
}

export const Status: React.FC<StatusProps> = (p) => {
	const item = p.route.params;
	const theme = useTheme();
	const nav = useNavigation();

	const comments = usePulse(core.status.collection.comments.getGroup(item?.status?.id));

	const [CommentFocus, setCommentFocus] = useState(false);
	const [CommentText, setCommentText] = useState('');
	const [Loading, setLoading] = useState(false);

	const commentOnStatus = async (id: string) => {
		setLoading(true);

		// request
		const a: any = await request('post', `/status/${id}/reply`, { data: { content: CommentText } });

		// Create the group if not exists
		if (!comments?.length) core.status.collection.comments.createGroup(id);

		// Collect the data
		core.status.collection.comments.collect(a, [id], { patch: true });

		// Clear the input field
		setCommentText('');

		setLoading(false);
	};

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={40} contentContainerStyle={{ flex: 1 }}>
			<StatusInfoBoxBody>
				<Spacer size={10} />
				<Row>
					<IconButton name="plus" size={25} iconSize={20} color={theme.textFade} style={{ transform: [{ rotate: '45deg' }] }} onPress={() => nav.goBack()} />
				</Row>
				<Spacer size={15} />
				<Cul center>
					<Avatar src={`https://cdn.yourstatus.app/profile/${item.account_id}/${item.avatar}`} size={60} />
					<Spacer size={5} />
					<Text size={14} color={theme.textFade}>
						Comment on {item.username} status
					</Text>
					<Spacer size={5} />
					<StatusBox {...item.status} disableTap />
				</Cul>
				<Line />

				<Comments data={comments} />

				<Fill />

				<Row>
					<CommentInput
						defaultValue={CommentText}
						onFocus={() => setCommentFocus(true)}
						onBlur={() => setCommentFocus(false)}
						onChangeText={(v) => setCommentText(v)}
						placeholder="Leave a message"
						placeholderColor={theme.text}
						s
					/>
					<Spacer size={10} />

					<IconButton name="send" size={30} iconSize={20} color={theme.primary} onPress={() => commentOnStatus(item.status.id)} disabled={Loading === true || CommentText === ''} />
				</Row>
				<Spacer size={30} />
			</StatusInfoBoxBody>
		</KeyboardAvoidingView>
	);
};
const StatusInfoBoxBody = styled.View`
	flex: 1;
	padding: 0px 15px;
	background-color: ${({ theme }) => theme.background};
`;

const Line = styled.View`
	height: 1px;
	width: 100%;
	margin: 20px 0px;
	margin-top: 10px;
	margin-bottom: 0px;
	background-color: ${({ theme }) => theme.step2};
`;

const CommentInput = styled.TextInput`
	background-color: ${({ theme }) => theme.step1};
	color: ${({ theme }) => theme.text};
	padding: 0px 15px;
	height: 40px;
	font-weight: 600;
	flex: 1;
	border-radius: 20px;
`;

const Comments: React.FC<{ data: StatusComment[] }> = ({ data }) => {
	const theme = useTheme();

	return (
		<FlatList
			contentContainerStyle={{ paddingTop: 10 }}
			data={data}
			renderItem={({ item, index }) => (
				<CommentItem key={index}>
					<Avatar src={`https://cdn.yourstatus.app/profile/${item.sender}/${item.avatar}`} size={25} />
					<Spacer size={5} />
					<Text weight="semi-bold" size={14}>
						{item.content}
					</Text>
					<Fill />
					<Text color={theme.textFade} weight="bold" size={12}>
						{niceTime(item.id)}
					</Text>
				</CommentItem>
			)}
		/>
	);
};

const CommentItem = styled(Row)`
	padding-bottom: 5px;
`;
