import { AppAlert, request } from '@core';
import { Avatar, Block, Fill, IconButton, Spacer, Text } from '@parts';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

let timeoutID: NodeJS.Timeout;
interface ProfileSearchItem {
	id: string;
	username: string;
	avatar: string;
	friend_status: number;
	account_id: string;
}

export const SearchFriend = () => {
	const nav = useNavigation();
	const { colors } = useTheme();
	const [Username, SetUsername] = useState('');
	const [Results, SetResults] = useState<ProfileSearchItem[]>([]);
	const [Loading, SetLoading] = useState(false);

	const searchUser = async () => {
		const res = await request<ProfileSearchItem[]>('post', '/profile/search', { data: { search: Username } });
		SetLoading(false);
		if (!!res.data) {
			SetResults(res.data);
		}
	};

	const sendFriendRequest = useCallback(
		async (profile_id: string) => {
			const res = await request('post', '/friends/add/' + profile_id);
			if (res.data === true) {
				let a = Results;
				a = a.map(v => {
					if (v.account_id === profile_id) {
						v.friend_status = 1;
					}
					return v;
				});
				SetResults(a);
				AppAlert(true, res.message);
			}
		},
		[Results],
	);

	useEffect(() => {
		SetLoading(true);
		if (timeoutID) clearTimeout(timeoutID);
		timeoutID = setTimeout(() => {
			searchUser();
		}, 1000);
	}, [Username]);

	const goBack = () => nav.goBack();

	const renderItem: ListRenderItem<ProfileSearchItem> = ({ item, index }) => {
		return (
			<Block flex={0} key={index} row style={{ height: 70 }} hCenter>
				<Block flex={0} style={{ width: 45 }} press onPress={() => nav.navigate('profile' as never, { username: item.username } as never)}>
					<Avatar src={[item?.account_id, item?.avatar]} size={45} />
				</Block>
				<Spacer size={15} h />
				<Text bold style={{ maxWidth: 200 }}>
					{item?.username || 'No username'}
				</Text>
				<Fill />
				{item?.friend_status < 2 && (
					<IconButton
						name="plus"
						color={colors.white}
						size={25}
						iconSize={15}
						backgroundColor={colors.black60}
						disabled={item.friend_status === 1}
						onPress={() => sendFriendRequest(item.account_id)}
					/>
				)}
			</Block>
		);
	};

	return (
		<Block safe color={colors.black}>
			<Block color="transparent" paddingHorizontal={20} flex={0} row marginTop={15} paddingBottom={10} style={{ position: 'absolute', zIndex: 6 }}>
				<IconButton
					name="arrow-big"
					size={31}
					iconSize={15}
					backgroundColor={colors.white20}
					color="white"
					style={{ transform: [{ rotate: '180deg' }] }}
					onPress={goBack}
				/>
				<Spacer size={20} h />
				<CustomSearchInput
					autoCapitalize="none"
					autoCorrect={false}
					autoCompleteType="off"
					autoFocus={true}
					onChangeText={v => SetUsername(v)}
					placeholder="Username"
				/>
			</Block>
			<LinearGradient pointerEvents="none" colors={['black', 'transparent']} style={{ position: 'absolute', top: 0, zIndex: 5, width: '100%', height: 100 }} />
			<Block>
				<FlatList
					data={Results}
					renderItem={renderItem}
					contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 70 }}
					ListEmptyComponent={
						<Block hCenter paddingTop={50}>
							<Text color={colors.white80}>{Loading ? 'Loading...' : 'No results'}</Text>
						</Block>
					}
				/>
			</Block>
		</Block>
	);
};

const CustomSearchInput = styled.TextInput`
	border: solid 1px ${({ theme }) => theme.colors.white40};
	flex: 1;
	padding: 0px 15px;
	height: 40px;
	color: white;
	background-color: ${({ theme }) => theme.colors.white20};
	border-radius: 30px;
`;
