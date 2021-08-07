import { Row, Avatar, Spacer, Fill, SmallButton } from '@parts';
import * as React from 'react';
import { FlatList, Text } from 'react-native';
import styled from 'styled-components/native';

interface NewfriendsProps {}

export const Newfriends: React.FC<NewfriendsProps> = (props) => {
	const renderItem1 = ({ item, index }) => (
		<Row key={index} style={{ paddingHorizontal: 15 }}>
			<Avatar src={`https://cdn.yourstatus.app/profile/${item.owner}/${item.avatar}`} size={40} />
			<Spacer size={10} />
			<Text>{item.username || 'none'}</Text>
			{/* <Spacer size={10} /> */}
			<Fill />
			<SmallButton text="accept" />
			<Spacer size={10} />
			<SmallButton text="deny" />
		</Row>
	);

	return (
		<NewfriendsBody>
			<FlatList data={PendingList} renderItem={renderItem1} />
		</NewfriendsBody>
	);
};

const NewfriendsBody = styled.View`
	flex: 1;
`;
