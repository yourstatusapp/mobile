import core, { FriendItemRenderType } from '@core';
import { useNavigation } from '@hooks';
import { Block, Avatar, Text, Status } from '@parts';

import { usePulse } from '@pulsejs/react';
import React from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled, { useTheme } from 'styled-components/native';

export const FriendComp: React.FC<FriendItemRenderType> = props => {
	const username = props.item.username;
	const nav = useNavigation();
	const bb = usePulse(core.lists.stories.groups.all);

	const userStories = React.useMemo(() => bb.filter(v => v.account_id === props.item.account_id)[0], [props.item.account_id, bb]);

	const openProfile = () => nav.navigate('profile' as never, { username: props.item.username } as never);

	return (
		<FriendCompBody key={props.index}>
			<Block row paddingHorizontal={20}>
				<TouchableOpacity activeOpacity={0.6} onPress={openProfile}>
					<Avatar src={[props.item.account_id, props.item.avatar]} size={45} />
				</TouchableOpacity>
				<Block style={{ paddingLeft: 20 }}>
					<Text weight="700" size={16}>
						{props.item.username ? props.item.username.charAt(0).toUpperCase() + username.slice(1, username.length + 1) : '-'}
					</Text>
					{!!props.item?.status?.length && (
						<FlatList
							data={props.item?.status}
							initialNumToRender={props.item.status.length}
							renderItem={({ item, index }) => (
								<Block key={index} style={{ flexWrap: 'wrap', paddingTop: 6 }}>
									<Status status={item} username={props.item.username} />
								</Block>
							)}
						/>
					)}
				</Block>
			</Block>
			{!!userStories?.stories && (
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
								onPress={() => core.events.storie_viewer.emit({ stories: userStories, clicked_at_index: index })}>
								<FastImage
									key={index}
									source={{ uri: `https://cdn.yourstatus.app/stories/${item.account_id}/${item.picture}` }}
									style={{ height: 120, width: 80, borderRadius: 6, marginRight: 15 }}
								/>
							</TouchableOpacity>
						)}
					/>
				</Block>
			)}
		</FriendCompBody>
	);
};

const FriendCompBody = styled.View`
	padding: 20px 0px;
	border-bottom-color: ${({ theme }) => theme.backgroundDarker};
	border-bottom-style: solid;
	border-bottom-width: 1px;
`;
