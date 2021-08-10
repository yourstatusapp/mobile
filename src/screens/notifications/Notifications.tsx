import core, { Notification } from '@core';
import { Avatar, Fill, Icon, Row, SidePadding, Spacer, TabbarContentContainer, Text } from '@parts';
import { usePulse } from '@pulsejs/react';
import * as React from 'react';
import { FlatList } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

interface NotificationsProps {}

export const Notifications: React.FC<NotificationsProps> = (props) => {
	const {} = props;

	const list = usePulse(core.notifications.collection.getGroup('default'));

	const ItemSeparatorComponent = () => <DivideLine />;

	return (
		<TabbarContentContainer noSidePadding>
			<SidePadding>
				<Spacer size={20} />
				<FlatList data={list} renderItem={(props) => <NotificationItem {...props} />} ItemSeparatorComponent={ItemSeparatorComponent} />
				<Text>{JSON.stringify(list)}</Text>
			</SidePadding>
		</TabbarContentContainer>
	);
};

const NotificationsBody = styled.View`
	flex: 1;
`;

const DivideLine = styled.View`
	height: 5px;
	background: ${({ theme }) => theme.step1};
	border-radius: 10px;
	width: 90%;
	margin: 20px auto;
`;

interface NotificationItemProps {
	item: Notification;
	index: number;
}

const NotificationItem: React.FC<NotificationItemProps> = (p) => {
	const { item } = p;
	const theme = useTheme();

	switch (item.type) {
		case 'FRIEND_REQUEST':
			return (
				<Row>
					<Avatar src={`https://cdn.yourstatus.app/profile/${item.content.from}/${item.content.avatar}`} size={55} />
					<Text>{item.content}</Text>
					<Fill />
					<Icon name="person" size={20} color={theme.step3} />
				</Row>
			);
	}

	return (
		<Row>
			<Text>{item.content}</Text>
		</Row>
	);
};
