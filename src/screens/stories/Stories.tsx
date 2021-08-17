import { Avatar, Fill, Spacer, Text } from '@parts';
import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled, { useTheme } from 'styled-components/native';
import { niceTime } from '../../core/utils';

interface StoriesProps {
	route: {
		params: any;
	};
}

export const Stories: React.FC<StoriesProps> = (props) => {
	const { route } = props;
	const theme = useTheme();
	const nav = useNavigation();

	const [ImageIndex, setImageIndex] = React.useState<number>(0);
	const [Picture, setPicture] = React.useState('');

	const nextImage = () => {
		setImageIndex(ImageIndex + 1);
	};

	React.useEffect(() => {
		if (route.params.stories.length === ImageIndex) {
			nav.goBack();
		}
	}, [ImageIndex]);

	React.useEffect(() => {
		console.log(route.params);
	}, []);

	return (
		<StoriesBody>
			<Spacer size={40} />

			{/* <Text color="white">{`https://cdn.yourstatus.app/stories/${route.params.account_id}/${route.params.stories[0].picture}`}</Text> */}
			<Text color="white">{Picture}</Text>
			{/* <FastImage
				resizeMode="contain"
				source={{ uri: `https://cdn.yourstatus.app/stories/2252108220859396/c48e5911-dfe8-4593-b539-2d84c8d91b5f.jpg` }}
				style={{ height: Dimensions.get('screen').height - 100, width: Dimensions.get('screen').width }}
			/> */}
			<TouchableOpacity onPress={() => nextImage()} activeOpacity={1} style={{ height: Dimensions.get('screen').height - 100 }}>
				<FastImage
					resizeMode="contain"
					source={{ uri: `https://cdn.yourstatus.app/stories/${route.params.account_id}/${route.params.stories[ImageIndex]?.picture}` }}
					style={{ borderRadius: 10, height: Dimensions.get('screen').height - 100, width: Dimensions.get('screen').width }}
				/>
			</TouchableOpacity>
			<FloatingArea>
				<Avatar src={`https://cdn.yourstatus.app/profile/${route.params.account_id}/${route.params.avatar}`} size={35} />
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
