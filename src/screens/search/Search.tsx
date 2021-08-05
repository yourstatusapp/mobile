import { request } from '@core';
import { Avatar, Fill, IconButton, Input, Row, Spacer, Text } from '@parts';
import * as React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

interface SearchProps {}

let timeoutID;

export const Search: React.FC<SearchProps> = (props) => {
	const theme = useTheme();
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
				<Spacer size={15} />
				<Text weight="semi-bold" size={20}>
					{item.username}
				</Text>
				<Fill />
				<IconButton name="user-add" color="black" size={40} backgroundColor={theme.step3} onPress={() => addFriend(item.owner)} />
			</UserSearchEnty>
		</TouchableOpacity>
	);
	return (
		<SearchBody>
			<Spacer size={20} />
			<Input onChangeText={setSearchName} placeholder="Search for a name" style={{ backgroundColor: theme.step1, paddingHorizontal: 10 }} />
			<Spacer size={20} />
			<FlatList data={List} renderItem={renderItem} />
		</SearchBody>
	);
};

const UserSearchEnty = styled(Row)`
	/* justify-content: space-between; */
	background-color: ${({ theme }) => theme.step1};
	border-radius: 12px;
	padding: 10px;
`;

const SearchBody = styled.View`
	flex: 1;
	padding: 0px 20px;
`;
