import * as React from 'react';
import styled from 'styled-components/native';
import { request } from '../../core/utils';
import { TabbarContentContainer, Text } from '../../parts';

interface MessagesProps {}

export const Messages: React.FC<MessagesProps> = (props) => {
	// const [Conversations, setConversations] = useState([]);

	// const getMessages = async () => {
	// 	const a = await request('get', '');
	// };
	return (
		<TabbarContentContainer>
			<Text>messages</Text>
		</TabbarContentContainer>
	);
};

