import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { request } from '../../core/utils';
import { Fill, Input, Row, Spacer, TabbarContentContainer, Text } from '../../parts';
import { Avatar } from '../../parts/Avatar';
import { IconButton } from '../../parts/Buttons';

interface FriendsProps {}

export const Friends: React.FC<FriendsProps> = (props) => {
	const {} = props;
	const nav = useNavigation();

	const [List, setList] = useState<any>(null);

	React.useEffect(() => {
		request('get', 'friends').then((c) => setList(c));
	}, []);

	return (
		<TabbarContentContainer>
			<Row>
				<Text size={20}>Friends</Text>
				<Fill />
				<IconButton name="settings" size={24} color="black" onPress={() => nav.navigate('Settings')} />
			</Row>
			<Input placeholder="Search" autoCompleteType="off" autoCorrect={false} />
			{/* <Text>{JSON.stringify(List)}</Text> */}
			{List &&
				List.map((v, i) => (
					<TouchableOpacity key={i} onPress={() => nav.navigate('Profile', v)}>
						<Row style={{ paddingBottom: 15 }}>
							<Avatar src={v.avatar} />
							<Spacer size={10} />
							<Text weight="bold">{v.username}</Text>
						</Row>
					</TouchableOpacity>
				))}
		</TabbarContentContainer>
	);
};
