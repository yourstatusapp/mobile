import { alert, request } from '@core';
import { Avatar, Fill, Icon, IconButton, Input, Row, Spacer, Text } from '@parts';
import { state } from '@pulsejs/core';
import { usePulse } from '@pulsejs/react';
import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

interface SearchProps {}
interface ProfileSearchResult {
	account_id: string;
	username: string;
	avatar: string;
	friend_status: number;
}

let timeoutID;

const list = state<ProfileSearchResult[]>([]);

export const SearchView: React.FC<SearchProps> = () => {
	const theme = useTheme();
	const nav = useNavigation();
	const [SearchName, setSearchName] = useState('');
	const l = usePulse(list);
	const [Loading, setLoading] = useState<boolean>(false);
	// const [List, setList] = useState<ProfileSearchResult[]>([]);

	const searchUser = async (name: string) => {
		const a = await request<ProfileSearchResult[]>('post', '/profile/search', { data: { search: name } });
		list.set(a);
		// setList(a);
		setLoading(false);
	};

	const addFriend = async (id: string) => {
		await request('post', '/friends/add/' + id);
		// Get index from id
		const index = l.indexOf(l.filter((v) => v.account_id === id)[0]);
		let newArr = l;

		newArr[index].friend_status = 1;
		console.log(newArr);

		list.set(newArr);

		alert({ success: true, title: 'Friend request sent', desc: 'You will receive a notification once accepted' });
	};

	React.useEffect(() => {
		if (SearchName === '') {
			return;
		}
		setLoading(true);
		clearTimeout(timeoutID);
		timeoutID = setTimeout(() => {
			searchUser(SearchName);
			// console.log('searcing');
		}, 500);
	}, [SearchName]);

	// useEffect(() => {
	// 	console.log(list.value);
	// }, [list.value]);

	// 0 = nothing
	// 1 = pending
	// 2 = accepted
	// 3 = denied;
	const renderItem = ({ item, index }: { item: ProfileSearchResult; index: number }) => (
		<UserSearchEnty key={index}>
			{/* <TouchableOpacity onPress={() => nav.navigate('Profile', { profile: item })}> */}
			<Avatar src={`https://cdn.yourstatus.app/profile/${item.account_id}/${item.avatar}`} size={50} />
			{/* </TouchableOpacity> */}
			<Spacer size={10} />
			<Text color={theme.textFade} weight="bold" size={18}>
				@
			</Text>
			<Spacer size={2} />
			<Text weight="semi-bold" size={18} color={theme.text}>
				{item.username}
			</Text>
			<Fill />
			{item.friend_status < 2 && (
				<IconButton name="user-add" color={theme.text} size={20} backgroundColor={theme.step1} onPress={() => addFriend(item.account_id)} disabled={item.friend_status === 1} />
			)}
		</UserSearchEnty>
	);

	return (
		<SearchBody>
			<TopCard>
				<Spacer size={20} />
				<Row style={{ paddingHorizontal: 20 }}>
					<Text size={30} weight="bold" color={theme.text}>
						Search users
					</Text>
					<Fill />
					<IconButton name="times" size={23} color={theme.text} backgroundColor={theme.step3} onPress={() => nav.goBack()} />
				</Row>
				<Text size={15} weight="semi-bold" color={theme.textFade} style={{ paddingHorizontal: 20 }}>
					Find your friends to add to see their status
				</Text>

				<Spacer size={20} />
				<View style={{ position: 'relative', paddingHorizontal: 20 }}>
					{Loading && <ActivityIndicator color={theme.primary} style={{ position: 'absolute', right: 30, zIndex: 10, top: 0, bottom: 0 }} />}
					<SearchInput
						onChangeText={setSearchName}
						placeholder="Search for a name"
						autoCapitalize="none"
						autoCompleteType="off"
						placeholderTextColor={theme.textFade}
						autoCorrect={false}
					/>
				</View>
			</TopCard>

			<FlatList
				data={l}
				renderItem={renderItem}
				style={{ flex: 1 }}
				contentContainerStyle={{ paddingTop: 10 }}
				ListEmptyComponent={() =>
					Loading === false && SearchName !== '' ? (
						<Row center style={{ paddingTop: 50 }}>
							<Text weight="medium" size={20} color={theme.textFade}>
								No results
							</Text>
							<Spacer size={10} />
							<Icon name="sad-face" size={35} color={theme.textFade} style={{ opacity: 0.6 }} />
						</Row>
					) : (
						<></>
					)
				}
			/>
		</SearchBody>
	);
};

const SearchInput = styled(Input)`
	color: ${({ theme }) => theme.text};
	background-color: ${({ theme }) => theme.background};
	padding: 0px 20px;
`;

const UserSearchEnty = styled(Row)`
	/* border-radius: 12px; */
	padding: 10px 20px;
	border-bottom-color: ${({ theme }) => theme.step2};
	border-bottom-width: 1px;
`;

const SearchBody = styled.View`
	flex: 1;
	/* padding: 0px 20px; */
	background-color: ${({ theme }) => theme.background};
`;

const TopCard = styled.View`
	background-color: ${({ theme }) => theme.step1};
	padding-bottom: 20px;
	border-bottom-left-radius: 25px;
	border-bottom-right-radius: 25px;
`;
