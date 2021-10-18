import * as React from 'react';
import core, { alert, LocationType, niceTime, request, snow2time, Status, StatusComment } from '@core';
import { Avatar, Fill, Spacer, Row, StatusBox, Text, Icon, IconButton, Cul } from '@parts';
import { FlatList, KeyboardAvoidingView, LayoutAnimation, TouchableOpacity, View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { usePulse } from '@pulsejs/react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useState } from 'react';
import { StatusInfoBox } from './StatusInfoBox';

interface FriendItemEntryProps {
	item: any;
	index: number;
	onStatusPress: (v: Status) => void;
}

export const FriendItemEntry: React.FC<FriendItemEntryProps> = (props) => {
	const { item, index, onStatusPress } = props;
	const nav = useNavigation();
	const theme = useTheme();
	const ThemeName = usePulse(core.ui.state.Theme);
	const [Loading, setLoading] = useState(false);
	const stories = usePulse(core.storie.collection.getGroup(`profile/${item.account_id}`));
	const comments = usePulse(core.status.collection.comments.getGroup(item?.status?.id));

	const [CommentFocus, setCommentFocus] = useState(false);
	const [CommentText, setCommentText] = useState('');

	// const SheetShadow = React.useMemo(
	// 	() => [
	// 		{
	// 			shadowColor: ThemeName === 'dark' ? '#4e4e4e' : '#6b6b6b',
	// 			// shadowColor: '#000',
	// 			shadowOffset: {
	// 				width: 0,
	// 				height: 9,
	// 			},
	// 			shadowOpacity: 0.48,
	// 			shadowRadius: 11.95,
	//
	// 			elevation: 18,
	// 		},
	// 	],
	// 	[ThemeName]
	// );

	// // This will be called when opening a createstatus for the comments
	// const getComments = async (id: string) => {
	// 	const a: any = await request('get', `/createstatus/${id}/comments`);
	// 	core.createstatus.collection.comments.collect(a, [id]);
	// };


	// const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);



	// const handleStyle = { backgroundColor: theme.background, height: 0, borderTopColor: theme.step2, borderTopWidth: 1 };
	// const backgroundStyle = { backgroundColor: theme.background, borderTopLeftRadius: 50, borderTopRightRadius: 50 };

	return (
		<FriendItemEntryBody key={index}>
			<View>
				<Avatar
					src={`https://cdn.yourstatus.app/profile/${item.account_id}/${item.avatar}`}
					onPress={() =>
						stories.length
							? nav.navigate('Stories', {
									...item,
									stories,
							  })
							: nav.navigate('Profile', { profile: item })
					}
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
					<Row style={{ flex: 1, justifyContent: 'flex-start', marginTop: 5 }}>
						<StatusContainer>
							<StatusBox {...item.status} onPress={() => onStatusPress(item)} />
							{!item.status.taped && new Date(new Date().getTime() - 24 * 60 * 60 * 1000) < snow2time(item.status.id) && (
								<NewBadge>
									<Text size={10} color={theme.background} weight="bold">
										new
									</Text>
								</NewBadge>
							)}
						</StatusContainer>
						<Spacer size={10} />
						{/* <IconButton name="chat" size={18} iconSize={16} color={theme.textFade} onPress={() => handlePresentModalPress()} /> */}
					</Row>
				)}
			</View>
		</FriendItemEntryBody>
	);
};

const FriendItemEntryBody = styled.View`
	flex-direction: row;
	align-items: center;
	padding: 10px 15px;
	/* border-bottom-color: ${({ theme }) => theme.step1}; */
	/* border-bottom-width: 1px; */
`;

const NewBadge = styled.View`
	background-color: #f16464;
	margin-left: 5px;
	border-radius: 20px;
	padding: 2px 6px;
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

const StatusContainer = styled.View`
	flex-direction: row;
	align-items: center;
`;

const Line = styled.View`
	height: 1px;
	width: 100%;
	margin: 20px 0px;
	margin-top: 10px;
	margin-bottom: 0px;
	background-color: ${({ theme }) => theme.step2};
`;

export const LocationBox: React.FC<{ location: LocationType }> = (p) => {
	const { location } = p;
	const theme = useTheme();

	return (
		<Row style={{ paddingTop: 5, paddingBottom: 5 }}>
			<Icon
				name="location"
				size={9}
				color={'white'}
				style={{
					marginRight: 5,
					backgroundColor: theme.primary,
					padding: 3,
					borderRadius: 50,
					paddingTop: 5,
					paddingRight: 5,
				}}
			/>
			<Text size={14} color={theme.textFade} style={{ paddingTop: 1 }}>
				{location.title}
			</Text>
		</Row>
	);
};

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
	/* padding: 2px 0px; */
	padding-bottom: 5px;
`;
