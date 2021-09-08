import { Header, IconButton, SidePadding, Spacer, StatusBox, TabbarContentContainer, Text } from '@parts';
import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import styled from 'styled-components/native';

interface StatusinfoScreenProps {
	navigation: any;
	route: { params: any };
}

export const StatusinfoScreen: React.FC<StatusinfoScreenProps> = (props) => {
	const {} = props;
	const data = props.route.params;
	const nav = useNavigation();

	console.log(data);

	return (
		<TabbarContentContainer noSidePadding>
			<Spacer size={10} />
			<SidePadding>
				<IconButton name="arrow-big" size={40} color="white" style={{ transform: [{ rotate: '180deg' }] }} onPress={() => nav.goBack()} />
				<Spacer size={20} />
				<StatusBox {...data} />
				<Text>{JSON.stringify(data)}</Text>
			</SidePadding>
		</TabbarContentContainer>
	);
};
