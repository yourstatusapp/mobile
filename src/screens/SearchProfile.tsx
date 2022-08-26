import { AppAlert, request } from '@core';
import { Avatar, Block, Fill, IconButton, RoundyInput, Spacer, TabbarHeader, Text } from '@parts';
import React, { useCallback, useEffect, useState } from 'react';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useTheme } from '@hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

let timeoutID: NodeJS.Timeout;
interface ProfileSearchItem {
	id: string;
	username: string;
	avatar: string;
	friend_status: number;
	account_id: string;
}

export const SearchProfile = () => {
	const nav = useNavigation();
	const { theme } = useTheme();
	const { top } = useSafeAreaInsets();
	const [Username, SetUsername] = useState('');
	const [Results, SetResults] = useState<ProfileSearchItem[]>([]);
	const [Loading, SetLoading] = useState(false);

	const searchUser = async () => {
		const res = await request<ProfileSearchItem[]>('post', '/profile/search', {
			data: { search: Username },
		});
		SetLoading(false);
		if (res?.data) {
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
		if (timeoutID) {
			clearTimeout(timeoutID);
		}

		timeoutID = setTimeout(() => {
			searchUser();
		}, 1000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [Username]);

	const goBack = () => nav.goBack();

	const renderItem: ListRenderItem<ProfileSearchItem> = ({ item, index }) => {
		return (
			<Block flex={0} key={index} row height={70} hCenter paddingHorizontal={20}>
				<Block
					flex={0}
					width={45}
					press
					onPress={() => nav.navigate('Profile' as never, { username: item.username } as never)}>
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
						color={theme.background}
						size={21}
						iconSize={15}
						backgroundColor={theme.darker}
						disabled={item.friend_status === 1}
						onPress={() => sendFriendRequest(item.account_id)}
					/>
				)}
			</Block>
		);
	};

	const SEARCH_HEADER_INNER_HEIGHT = 60;
	return (
		<Block color={theme.background}>
			{/* SEARCH HEADER */}
			<Block
				flex={0}
				height={top + SEARCH_HEADER_INNER_HEIGHT}
				style={{
					position: 'absolute',
					top: 0,
					zIndex: 5,
				}}
				width="100%"
				color={theme.backgroundDark}
				row>
				<Block
					marginTop={top}
					height={SEARCH_HEADER_INNER_HEIGHT}
					paddingHorizontal={10}
					color={theme.backgroundDark}
					width={'100%'}
					style={{ position: 'relative', borderBottomColor: theme.backgroundDarker, borderBottomWidth: 1 }}
					row
					hCenter>
					<IconButton
						name="arrow"
						size={24}
						// iconSize={17}
						// backgroundColor={theme.darker}
						color={theme.textFadeLight}
						style={{ transform: [{ rotate: '0deg' }] }}
						onPress={goBack}
					/>
					<Spacer size={8} h />
					<CustomSearchInput
						autoCapitalize="none"
						autoCorrect={false}
						autoCompleteType="off"
						autoFocus={true}
						onChangeText={(v: string) => SetUsername(v)}
						placeholder="Username"
					/>
				</Block>
			</Block>

			{/* <Block
				color="transparent"
				paddingHorizontal={10}
				flex={0}
				row
				marginTop={15}
				paddingBottom={10}
				style={{ top: top, position: 'absolute', zIndex: 6 }}>
				<IconButton
					name="arrow"
					size={30}
					iconSize={17}
					backgroundColor={theme.darker}
					color={theme.textFadeLight}
					style={{ transform: [{ rotate: '0deg' }] }}
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
			</Block> */}
			{/* <LinearGradient
				pointerEvents="none"
				colors={[theme.background, theme.name === 'dark' ? '#00000000' : '#FFFFFF00']}
				style={{ position: 'absolute', top: 0, zIndex: 5, width: '100%', height: 100 }}
			/> */}
			<Block>
				<FlashList
					data={Results}
					renderItem={renderItem}
					contentContainerStyle={{
						paddingTop: top + SEARCH_HEADER_INNER_HEIGHT,
						paddingBottom: 30,
					}}
					// style={{ paddingHorizontal: 20 }}
					ListEmptyComponent={
						<Block hCenter paddingTop={50}>
							<Text color={theme.textFade}>{Loading ? 'Loading...' : 'No results'}</Text>
						</Block>
					}
				/>
			</Block>
		</Block>
	);
};

const CustomSearchInput = styled.TextInput`
	border: solid 1px ${({ theme }) => theme.darker};
	flex: 1;
	padding: 0px 10px;
	height: 40px;
	width: 100%;
	color: ${({ theme }) => theme.text};
	background-color: ${({ theme }) => theme.backgroundDarker};
	border-radius: 12px;
`;
