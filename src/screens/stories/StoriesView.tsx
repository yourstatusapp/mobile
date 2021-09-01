import { Avatar, Fill, Spacer, Text } from '@parts';
import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { niceTime } from '../../core/utils';

interface StoriesProps {
	route: {
		params: any;
	};
}

export const StoriesView: React.FC<StoriesProps> = (props) => {
	const { route } = props;
	const nav = useNavigation();

	const [ImageIndex, setImageIndex] = React.useState<number>(0);

	const nextImage = () => {
		// TODO: Check if this works
		if (ImageIndex > route.params.stories.length - 2) {
			nav.goBack();
			return;
		}
		setImageIndex(ImageIndex + 1);
	};

	return (
		<StoriesBody>
			<Spacer size={60} />
			<TouchableOpacity onPress={() => nextImage()} activeOpacity={1} style={{ height: Dimensions.get('screen').height - 100 }}>
				<StorieImage resizeMode="contain" source={{ uri: `https://cdn.yourstatus.app/stories/${route.params.owner}/${route.params.stories[ImageIndex]?.picture}` }} />
			</TouchableOpacity>
			<FloatingArea>
				<Avatar src={`https://cdn.yourstatus.app/profile/${route.params.owner}/${route.params.avatar}`} size={35} />
				<Spacer size={10} />
				<Text weight="semi-bold" color="white">
					{route.params.username}
				</Text>
				<Fill />
				<Text color="white" size={14} weight="medium">
					{niceTime(route.params.stories[ImageIndex]?.id)} ago
				</Text>
			</FloatingArea>
		</StoriesBody>
	);
};

const StoriesBody = styled.View`
	flex: 1;
	background-color: black;
`;

const StorieImage = styled(FastImage)`
	border-radius: 10px;
	height: ${() => Dimensions.get('screen').height - 100}px;
	width: ${() => Dimensions.get('screen').width}px;
`;

const FloatingArea = styled.View`
	flex-direction: row;
	align-items: center;
	background-color: #0000008b;
	position: absolute;
	width: 100%;
	top: 54;
	z-index: 50;
	padding: 8px 10px;
`;
