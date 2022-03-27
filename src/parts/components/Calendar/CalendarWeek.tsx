import React from 'react';
import { FlatList, ListRenderItem, TouchableOpacity, View } from 'react-native';
import { Block, Text } from '@parts';
import { useTheme } from 'styled-components/native';

interface StorieType {
	id: string;
	picture: string;
}

interface DayObject {
	date?: string;
	pictures?: StorieType[];
	empty?: boolean;
}

type Week = {
	week?: DayObject[];
	headingText?: string;
};

export const CalendarWeek: ListRenderItem<Week> = ({ item, index }) => {
	// const theme = useTheme();

	return (
		<Block key={index.toString()} marginTop={item.headingText ? 30 : 0} paddingHorizontal={38}>
			{item.headingText && (
				<Text bold size={18} marginBottom={15}>
					{item.headingText}
				</Text>
			)}

			{item?.week && (
				<Block row style={{ alignItems: 'center' }} vCenter color="blacks">
					<FlatList
						data={item?.week}
						horizontal
						scrollEnabled={false}
						initialNumToRender={7}
						renderItem={v => <DayComponent {...v.item} />}
					/>
				</Block>
			)}
		</Block>
	);
};

interface DayComponentProps extends DayObject {}

const DayComponent = ({ date, empty, pictures }: DayComponentProps) => {
	const theme = useTheme();

	return (
		<Block flex={0} vCenter hCenter style={{ width: 45, height: 45 }}>
			{!empty ? (
				<TouchableOpacity
					onPress={() => {}}
					activeOpacity={0.6}
					style={{
						backgroundColor: !!pictures?.length ? theme.primary : theme.darker,
						height: '100%',
						width: '100%',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<Text size={18} bold>
						{date}
					</Text>
				</TouchableOpacity>
			) : (
				<View
					style={{
						backgroundColor: theme.backgroundDarker,
						height: '100%',
						width: '100%',
						justifyContent: 'center',
						alignItems: 'center',
					}}></View>
			)}
		</Block>
	);
};
