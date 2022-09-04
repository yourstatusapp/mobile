import core, { FriendItemRenderType } from '@core';
import { useNavigation, useTheme } from '@hooks';
import { Avatar, Block, Status, Text } from '@parts';
import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const FriendComp: React.FC<FriendItemRenderType> = props => {
	const { theme } = useTheme();
	const username = props.item.username;
	const nav = useNavigation();
	// const bb = usePulse(core.lists.stories.groups.all);

	// const userStories = React.useMemo(
	// 	() => bb.filter(v => v.account_id === props.item.account_id)[0],
	// 	[props.item.account_id, bb],
	// );

	const openProfile = () => nav.navigate('Profile', { username: props.item.username });

	const onStatusTapped = (accId: string, statusId: string) => {
		core.friendsList.set(prev => {
			// get index of friend
			let friendIndex = prev.findIndex(value => value.account_id === accId);

			// get index of status from the friend
			const statusIndex = prev[friendIndex].status.findIndex(v => v.id === statusId);

			// Update the taped value from the status that is getting taped
			prev[friendIndex].status[statusIndex].taped = true;

			// return the value
			return prev;
		});
	};

	return (
		<FriendCompBody key={props.index} style={{ borderBottomColor: theme.backgroundDarker }}>
			<Block row paddingHorizontal={20}>
				<TouchableOpacity activeOpacity={0.6} onPress={openProfile}>
					<Avatar src={[props.item.account_id, props.item.avatar]} size={45} />
				</TouchableOpacity>
				<Block style={{ paddingLeft: 20 }}>
					<Text weight="700" size={16}>
						{props.item.username
							? props.item.username.charAt(0).toUpperCase() + username.slice(1, username.length + 1)
							: '-'}
					</Text>
					{!!props.item?.status?.length && (
						<FlatList
							data={props.item?.status}
							initialNumToRender={props.item.status.length}
							renderItem={({ item, index }) => (
								<Block key={index} style={{ flexWrap: 'wrap', paddingTop: 6 }}>
									<Status
										status={item}
										username={props.item.username}
										onTapped={() => onStatusTapped(item.account_id, item.id)}
									/>
								</Block>
							)}
						/>
					)}
				</Block>
			</Block>
			{/* TODO: FIX user stories */}
			{/* {!!userStories?.stories && (
				<Block row marginLeft={15} marginTop={15}>
					<FlatList
						data={userStories.stories}
						initialNumToRender={1}
						horizontal={true}
						maxToRenderPerBatch={4}
						keyExtractor={item => item.id}
						renderItem={({ item, index }) => (
							<TouchableOpacity
								key={item.id}
								onPress={() =>
									core.events.storie_viewer.emit({ stories: userStories, clicked_at_index: index })
								}>
								<FastImage
									key={index}
									source={{
										uri: `https://cdn.yourstatus.app/stories/${item.account_id}/${item.picture}`,
									}}
									style={{ height: 120, width: 80, borderRadius: 6, marginRight: 15 }}
								/>
							</TouchableOpacity>
						)}
					/>
				</Block>
			)} */}
		</FriendCompBody>
	);
};

const FriendCompBody = styled.View`
	padding: 20px 0px;
	border-bottom-color: ${({ theme }) => theme.backgroundDarker};
	border-bottom-style: solid;
	border-bottom-width: 1px;
`;
