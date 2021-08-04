import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { request } from '../../core/utils';
import { Avatar, Header, Row, Spacer, TabbarContentContainer, Text } from '@parts';

interface FriendsProps {}

export const Friends: React.FC<FriendsProps> = (props) => {
	const {} = props;
	const nav = useNavigation();

	const [List, setList] = useState<any>(null);
	const [PendingList, setPendingList] = useState<any[]>();

	React.useEffect(() => {
		request<{ friends: any[]; incoming_pending: any[] }>('get', '/friends').then((c) => {
			setList(c.friends);
			setPendingList(c.incoming_pending);
		});
	}, []);

	return (
		<TabbarContentContainer>
			<Header title="Friends" />
			{/* <Row>
				<Text size={20}>Friends</Text>
				<Fill />
				<IconButton name="settings" size={24} color="black" onPress={() => nav.navigate('Settings')} />
			</Row> */}
			{/* <Input placeholder="Search" autoCompleteType="off" autoCorrect={false} /> */}
			{/* <TextButton text="Incoming friend requests" onPress={() => nav.navigate('Friendrequests', PendingList)} /> */}
			{List &&
				List.map((v, i) => (
					<TouchableOpacity key={i} onPress={() => nav.navigate('Profile', v)}>
						<Row style={{ paddingBottom: 15 }}>
							<Avatar src={`https://cdn.yourstatus.app/profile/${v.owner}/${v.avatar}`} />
							<Spacer size={10} />
							<Text weight="bold">{v.username}</Text>
						</Row>
					</TouchableOpacity>
				))}
		</TabbarContentContainer>
	);
};
