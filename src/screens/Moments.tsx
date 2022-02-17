import React, { useEffect, useState } from 'react';
import { Avatar, Block, Text } from '@parts';
import { AppAlert, request } from '@core';
import { FlatList, ListRenderItem, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

interface MomentTypeItem {
	id: string;
	account_id: string;
	picture: string;
	avatar: string;
	username: string;
}

export const Moments = () => {
	const nav = useNavigation();
	const { colors } = useTheme();
	const [List, SetList] = useState<MomentTypeItem[]>();

	const getMoments = async () => {
		const res = await request<MomentTypeItem[]>('get', '/profile/stories');
		if (Array(res.data)) {
			SetList(res.data);
		}
		// if (!!res?.data?.length) {

		// 	//
		// } else {
		// }
	};

	useEffect(() => {
		getMoments();
	}, []);

	const renderItem: ListRenderItem<MomentTypeItem> = ({ item, index }) => {
		const openProfile = () => nav.navigate('profile' as never, { username: item.username } as never);
		return (
			<Block key={index} flex={0} marginBottom={40} style={{ borderTopColor: colors.white20, borderTopWidth: 1 }}>
				<Block row flex={0} style={{ padding: 10 }} hCenter>
					<TouchableOpacity activeOpacity={0.6} onPress={openProfile}>
						<Avatar src={[item.account_id, item.avatar]} size={40} />
					</TouchableOpacity>
					<Text paddingLeft={10} bold>
						{item.username}
					</Text>
				</Block>

				<FastImage source={{ uri: `https://cdn.yourstatus.app/stories/${item.account_id}/${item.picture}` }} style={{ width: '100%', height: 500 }} />
			</Block>
		);
	};

	return (
		<Block safe>
			<Text bold size={40}>
				Moments
			</Text>
			{/* <Text>{List}</Text> */}
			<FlatList
				data={List}
				renderItem={renderItem}
				initialNumToRender={10}
				maxToRenderPerBatch={5}
				showsVerticalScrollIndicator={false}
				keyExtractor={item => item.account_id}
				removeClippedSubviews={true}
				getItemLayout={(data, index) => ({ length: 581, offset: 581 * index, index })}
			/>
		</Block>
	);
};
