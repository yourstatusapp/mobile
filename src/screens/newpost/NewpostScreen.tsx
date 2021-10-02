import core, { alert, Collection, request } from '@core';
import { Fill, IconButton, Row, SidePadding, SmallButton, Spacer, TabbarContentContainer, Text, WideButton } from '@parts';
import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { useState } from 'react';
import { Dimensions, Platform, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled, { useTheme } from 'styled-components/native';

interface NewpostProps {
	route: {
		params: {
			image: string;
		};
	};
}

interface UploadprogressType {
	loaded: number;
	total: number;
}

const deviceWidth = Dimensions.get('screen').width;

export const NewpostScreen: React.FC<NewpostProps> = (props) => {
	const { route } = props;
	const theme = useTheme();
	const nav = useNavigation();
	const [Coll, setColl] = useState<Collection[]>();
	const [SelectColl, setSelectColl] = useState<Collection>();
	const [UploadType, setUploadType] = useState<'storie' | 'collection'>('storie');
	const [Loading, setLoading] = useState(false);
	const [Loaded, setLoaded] = useState<number>(0);

	const getMyCollections = async () => {
		const c = await request<Collection[]>('get', '/collection');
		setColl(c);
	};

	const createPost = async () => {
		setLoading(true);
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
			await request('post', `/collection/${SelectColl?.id}/add`, { headers: { 'Content-Type': 'multipart/form-data;' }, data: fd, onUploadProgress: uploading });
		} else {
			await request('post', '/profile/stories/new', { data: fd, headers: { 'Content-Type': 'multipart/form-data;' }, onUploadProgress: uploading });
		}

		nav.goBack();

		alert({
			title: 'Picture uploaded successfull',
			desc: UploadType === 'collection' ? 'picture has been added to the collection' : 'picture has been uploaded to realtime storier',
			success: true,
		});

		setLoading(false);
	};

	const uploading = (UploadProgress: UploadprogressType) => {
		const percentage = (UploadProgress.loaded / UploadProgress.total) * 100;
		setLoaded(percentage);
	};

	React.useEffect(() => {
		getMyCollections();
	}, []);

	return (
		<NewpostBody>
			<FastImage source={{ uri: route.params.image || '' }} style={{ height: '100%', width: deviceWidth, opacity: Loading ? 0.8 : 1 }} resizeMode="cover" />
			<UploadProgress style={{ width: Loaded + '%' }}></UploadProgress>
			<FloatingBox>
				<Fill />
				<Text size={15}>Upload to story</Text>
				<Spacer size={10} />
				<IconButton
					name="send"
					size={27}
					iconSize={23}
					color={'white'}
					backgroundColor={theme.step4}
					iconStyle={{ paddingRight: 3 }}
					onPress={() => createPost()}
					disabled={Loading === true}
				/>
				<Spacer size={20} />
			</FloatingBox>
		</NewpostBody>
	);
};

const NewpostBody = styled(TabbarContentContainer).attrs({ style: { backgroundColor: 'black' } })`
	flex: 1;
	background-color: black;
`;

const UploadBtn = styled.View``;

const FloatingBox = styled(Row)`
	position: absolute;
	bottom: 0;
	height: 70px;
	width: 100%;
	/* background-color: ${({ theme }) => theme.background}20; */
	z-index: 10;
`;

const UploadProgress = styled.View`
	height: 5px;
	border-radius: 20px;
	background-color: ${({ theme }) => theme.primary};
	/* width: 100%; */
	bottom: 0%;
	position: absolute;
`;
