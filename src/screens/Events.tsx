import * as React from 'react';
import { Avatar, Block, HeadingBlurOverlay, Icon, IconButton, TabbarHeader, Text } from '@parts';
import core, { request } from '@core';
import { usePulse } from '@pulsejs/react';
import { FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation } from '@hooks';

export const Events = () => {
	const theme = useTheme();
	const nav = useNavigation();
	const a = usePulse(core.lists.events.groups.all);
	const getEvents = async () => {
		const res = await request<any[]>('get', '/events');
		if (res?.data) {
			console.log(res.data);

			core.lists.events.collect(res.data, 'all');
		}
	};

	React.useEffect(() => {
		getEvents();
	}, []);

	return (
		<Block color={theme.background}>
			{/* <TabbarHeader /> */}
			<FlatList
				style={{ padding: 60, paddingHorizontal: 10 }}
				data={a}
				renderItem={({ item }) => (
					<Block
						key={item.id}
						color={theme.backgroundDarker}
						style={{ padding: 10, borderRadius: 8 }}
						marginBottom={20}
						press
						onPress={() => nav.navigate('Event', { event_id: item.id })}>
						<Block row hCenter marginBottom={8}>
							<Avatar src={[item.account_id, item.avatar]} size={25} />
							<Text medium marginLeft={5}>
								{item?.username}
							</Text>
						</Block>
						<Text bold size={18} marginBottom={15}>
							{item?.title}
						</Text>
						{item?.description && <Text marginBottom={10}>{item.description}</Text>}
						{!!item?.location && (
							<Block row paddingTop={15} hCenter>
								<Icon name="location" size={14} color={theme.textFadeLight} />
								<Text marginLeft={5} color={theme.textFadeLight} weight="700">
									{item?.location}
								</Text>
							</Block>
						)}
					</Block>
				)}
			/>
			<HeadingBlurOverlay />
		</Block>
	);
};
