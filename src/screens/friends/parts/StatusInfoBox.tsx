import { Avatar, Cul, Fill, IconButton, Row, Spacer, StatusBox, Text } from '@parts';
import * as React from 'react';
import styled, { useTheme } from 'styled-components';
import { FlatList, KeyboardAvoidingView, View } from 'react-native';
import core, { niceTime, ProfileType, request, Status, StatusComment } from '@core';
import { useState } from 'react';
import { usePulse } from '@pulsejs/react';

interface StatusInfoBoxProps {
	data: ProfileType;
}

export const StatusInfoBox: React.FC<StatusInfoBoxProps> = (p) => {
	const item = p.data;
	const theme = useTheme();

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
		<StatusInfoBoxBody>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={190} contentContainerStyle={{ flex: 1 }}>
				<Cul center>
					<Avatar src={`https://cdn.yourstatus.app/profile/${item.account_id}/${item.avatar}`} size={40} />
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
					<CommentInput defaultValue={CommentText} onFocus={() => setCommentFocus(true)} onBlur={() => setCommentFocus(false)} onChangeText={(v) => setCommentText(v)} />
					<Spacer size={10} />
					{CommentFocus ? (
						<IconButton
							name="send"
							size={30}
							iconSize={20}
							color={theme.primary}
							onPress={() => commentOnStatus(item.status.id)}
							disabled={Loading === true || CommentText === ''}
						/>
					) : (
						<View style={{ width: 55 }} />
					)}
				</Row>
				<Spacer size={11} />
			</KeyboardAvoidingView>
		</StatusInfoBoxBody>
	);
};

const StatusInfoBoxBody = styled.View`
	flex: 1;
	padding: 10px;
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
