import { request } from '@core';
import { Avatar, Fill, IconButton, Input, Row, Spacer, Text } from '@parts';
import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

interface SearchProps {}

let timeoutID;

export const Search: React.FC<SearchProps> = (props) => {
	const theme = useTheme();
	const nav = useNavigation();
	const [SearchName, setSearchName] = React.useState('');
	const [List, setList] = React.useState([]);

	const searchUser = async (name: string) => {
		const a = await request('post', '/profile/search', { data: { search: name } });
		setList(a);
	};

	const addFriend = async (id: string) => {
		const a = await request('post', '/friends/add/' + id);
	};

	React.useEffect(() => {
		if (SearchName === '') {
			return;
		}

		clearTimeout(timeoutID);
		timeoutID = setTimeout(() => {
			searchUser(SearchName);
			// console.log('searcing');
		}, 1000);
	}, [SearchName]);

	const renderItem = ({ item, index }) => (
		<TouchableOpacity activeOpacity={0.5}>
			<UserSearchEnty key={index}>
				<Avatar src={`https://cdn.yourstatus.app/profile/${item.owner}/${item.avatar}`} size={60} />
				<Spacer size={10} />
				<Text weight="semi-bold" size={18} color={theme.text}>
					{item.username}
				</Text>
				<Fill />
				<IconButton name="user-add" color={theme.text} size={35} backgroundColor={theme.step1} onPress={() => addFriend(item.owner)} />
			</UserSearchEnty>
		</TouchableOpacity>
	);
	return (
		<SearchBody>
			<Spacer size={20} />
			<Row>
				<Text size={30} weight="bold" color={theme.text}>
					Search users
				</Text>
				<Fill />
				<IconButton name="times" size={35} color={theme.text} onPress={() => nav.goBack()} />
			</Row>
			<Text size={14} weight="semi-bold" color={theme.textFade}>
				Find your friends to add to see their status
			</Text>

			<Spacer size={20} />
			<Input onChangeText={setSearchName} placeholder="Search for a name" style={{ backgroundColor: theme.step1, paddingHorizontal: 10, color: theme.text }} />
			<Spacer size={10} />
			<FlatList data={List} renderItem={renderItem} contentContainerStyle={{ paddingTop: 20 }} />
		</SearchBody>
	);
};

const UserSearchEnty = styled(Row)`
	/* justify-content: space-between; */
	/* background-color: ${({ theme }) => theme.step0}; */
	border-radius: 12px;
	/* padding: 10px 0px; */
`;

const SearchBody = styled.View`
	flex: 1;
	padding: 0px 20px;
	background-color: ${({ theme }) => theme.background};
`;
