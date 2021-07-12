import * as React from 'react';
import { useState } from 'react';
import { request } from '../../core/utils';
import { Input, TabbarContentContainer, Text } from '../../parts';

interface FriendsProps {}

export const Friends: React.FC<FriendsProps> = (props) => {
	const {} = props;
	const [List, setList] = useState<any>(null);

	React.useEffect(() => {
		request('get', 'friends').then((c) => setList(c));
	}, []);

	return (
		<TabbarContentContainer>
			<Text size={20}>Friends</Text>
			<Input placeholder="Search" />
			{/* <Text>{JSON.stringify(List)}</Text> */}
			{List && List.map((v, i) => <p key={i}>{JSON.stringify(v)}</p>)}
		</TabbarContentContainer>
	);
};
