import { Collection, request } from '@core';
import { Fill, IconButton, SidePadding, SmallButton, Spacer, Text, TextButton, WideButton } from '@parts';
import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { useState } from 'react';
import { Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FlatList } from 'react-native-gesture-handler';
import styled, { useTheme } from 'styled-components/native';

interface NewpostProps {
	route: {
		params: {
			image: string;
		};
	};
}

export const Newpost: React.FC<NewpostProps> = (props) => {
	const { route } = props;
	const theme = useTheme();
	const nav = useNavigation();
	const [Image, setImage] = useState('');
	const [Coll, setColl] = useState<Collection[]>();
	const [SelectColl, setSelectColl] = useState<Collection>();

	const getMyCollections = async () => {
		const c = await request<Collection[]>('get', '/collection');
		setColl(c);
	};

	const createPost = async () => {
		if (!SelectColl) return;

		const fd = new FormData();
		const uri = Platform.OS === 'android' ? '' : Image.replace('file://', '');
		fd.append('file', {
			uri,
			type: Image.split('.')[1],
			name: Image.split('/').pop(),
		});
		fd.append('type', 0);

		await request('post', `/collection/${SelectColl?.id}/add`, { headers: { 'Content-Type': 'multipart/form-data;' }, data: fd });

		nav.goBack();
	};

	React.useEffect(() => {
		setImage(route.params.image);

		getMyCollections();
	}, []);

	return (
		<NewpostBody>
			<Spacer size={40} />
			<IconButton
				name="arrow-big"
				size={40}
				backgroundColor={theme.textFade}
				color="black"
				style={{ transform: [{ rotate: '180deg' }], position: 'absolute', top: 55, zIndex: 15, left: 10 }}
				onPress={() => nav.goBack()}
			/>
			<FastImage source={{ uri: Image || '' }} style={{ height: 400, width: '100%' }} resizeMode="contain" />
			<SidePadding>
				<Spacer size={20} />
				<Text weight="semi-bold" size={20}>
					Select collection
				</Text>
				<Spacer size={10} />
				<CollsContainer>
					{!!Coll?.length &&
						Coll.map((item, index) => (
							<SmallButton
								text={item.title}
								key={index}
								onPress={() => setSelectColl(item)}
								textColor={item.id === SelectColl?.id ? theme.primary : theme.text}
								style={{ marginRight: 10, marginBottom: 10 }}
							/>
						))}
				</CollsContainer>
				<Fill />
				<WideButton text="Upload" onPress={() => createPost()} disabled={!SelectColl} />
				<Spacer size={30} />
			</SidePadding>
		</NewpostBody>
	);
};

const NewpostBody = styled.View`
	flex: 1;
`;
const CollsContainer = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
`;
