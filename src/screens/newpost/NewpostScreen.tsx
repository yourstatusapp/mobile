import core, { alert, Collection, request } from '@core';
import { Fill, IconButton, Row, SidePadding, SmallButton, Spacer, Text, WideButton } from '@parts';
import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { useState } from 'react';
import { Platform, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled, { useTheme } from 'styled-components/native';

interface NewpostProps {
	route: {
		params: {
			image: string;
		};
	};
}

export const NewpostScreen: React.FC<NewpostProps> = (props) => {
	const { route } = props;
	const theme = useTheme();
	const nav = useNavigation();
	const [Coll, setColl] = useState<Collection[]>();
	const [SelectColl, setSelectColl] = useState<Collection>();
	const [UploadType, setUploadType] = useState<'storie' | 'collection'>('storie');

	const getMyCollections = async () => {
		const c = await request<Collection[]>('get', '/collection');
		setColl(c);
	};

	const createPost = async () => {
		const fd = new FormData();
		const uri = Platform.OS === 'android' ? '' : route.params.image.replace('file://', '');
		fd.append('file', {
			uri,
			type: route.params.image.split('.')[1],
			name: route.params.image.split('/').pop(),
		});
		fd.append('type', 0);

		if (UploadType === 'collection') {
			if (!SelectColl) {
				alert({ title: 'Select collection', success: false });
			}
			await request('post', `/collection/${SelectColl?.id}/add`, { headers: { 'Content-Type': 'multipart/form-data;' }, data: fd });
		} else {
			await request('post', '/profile/stories/new', { data: fd, headers: { 'Content-Type': 'multipart/form-data;' } });
		}

		nav.goBack();

		alert({
			title: 'Picture uploaded successfull',
			desc: UploadType === 'collection' ? 'picture has been added to the collection' : 'picture has been uploaded to realtime storier',
			success: true,
		});
	};

	React.useEffect(() => {
		getMyCollections();
	}, []);

	return (
		<NewpostBody>
			<Spacer size={40} />
			<IconButton
				name="arrow-big"
				size={25}
				backgroundColor={theme.step1}
				color={theme.text}
				style={{ transform: [{ rotate: '180deg' }], position: 'absolute', top: 55, zIndex: 15, left: 10 }}
				onPress={() => nav.goBack()}
			/>
			<FastImage source={{ uri: route.params.image || '' }} style={{ height: 400, width: '100%' }} resizeMode="contain" />

			<Spacer size={20} />

			<SidePadding>
				<Text center size={19} weight="bold">
					Choose type
				</Text>
				<Spacer size={11} />
				<Row center>
					<SmallButton text="STORIE" onPress={() => setUploadType('storie')} textColor={UploadType === 'storie' ? theme.primary : theme.text} />
					<Spacer size={20} />
					<SmallButton text="COLLECTION" onPress={() => setUploadType('collection')} textColor={UploadType === 'collection' ? theme.primary : theme.text} />
				</Row>
				<Spacer size={20} />

				{UploadType === 'collection' && (
					<View>
						<Text center size={19} weight="bold">
							Select collection
						</Text>
						<Spacer size={11} />
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
					</View>
				)}

				<Fill />
				<WideButton text="Upload" onPress={() => createPost()} disabled={UploadType === 'collection' ? !SelectColl : false} />
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
