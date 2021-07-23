import { Row, TabbarContentContainer, Text } from '@parts';
import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { request } from '../../core/utils';

interface ConversationProps {
	route: {
		name: string;
		key: string;
		params: any;
	};
}

export const Conversation: React.FC<ConversationProps> = (props) => {
	const { route } = props;
	const [Messages, setMessages] = useState<any[]>([]);

	const getMessage = async () => {
		const a = await request<any[]>('get', '/conversation/' + route.params.owner);
		console.log(a);
		
		setMessages(a);
	};

	useEffect(() => {
		getMessage();
	}, []);

	return (
		<ConversationBody>
			<Text>CONVERSATION</Text>
			{Messages?.map((v, i) => (
				<Row key={i}>
					<Text>{v.content}</Text>
				</Row>
			))}
		</ConversationBody>
	);
};

const ConversationBody = styled(TabbarContentContainer)`
	flex: 1;
`;
