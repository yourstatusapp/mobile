import { usePulse } from '@pulsejs/react';
import * as React from 'react';
import styled, { useTheme } from 'styled-components/native';
import core from '../../core';
import { Header, Spacer, TabbarContentContainer, Text, Avatar, IconButton, SmallButton, Fill, Row } from '../../parts';
import ImagePicker from 'react-native-image-crop-picker';
import { request } from '../../core/utils';
import { Platform } from 'react-native';
import { account } from '../../core/modules';
import { useNavigation } from '@react-navigation/native';

interface AccountProps {}

export const Account: React.FC<AccountProps> = (props) => {
	const nav = useNavigation();
	const theme = useTheme();
	const acc = usePulse(core.account.state.ACCOUNT);
	const profile: any = usePulse(core.profile.state.PROFILE);

	const selectImage = async () => {
		const img = await ImagePicker.openPicker({
			cropping: true,
		});
		console.log(img);

		const uri = Platform.OS === 'android' ? '' : img.path.replace('file://', '');

		const fd = new FormData();
		fd.append('image', {
			uri,
			type: img.mime,
			name: img.path.split('/').pop(),
		});

		await request('patch', '/profile/avatar', {
			headers: {
				'Content-Type': 'multipart/form-data;',
			},
			data: fd,
		});
	};

	return (
		<TabbarContentContainer>
			<Header title="Account" />
			<Spacer size={20} />

			<Row>
				<ImageSec>
					<Avatar src={`https://cdn.yourstatus.app/profile/${acc.id}/${profile.avatar}` || ''} size={120} />
					<ImageIconBtn name="pencil" size={32} iconSize={18} color={theme.text} onPress={() => selectImage()} />
				</ImageSec>
				<Spacer size={20} />
				<Row>
					<SmallButton text="Edit" onPress={() => nav.navigate('EditProfile')} />
				</Row>
			</Row>
		</TabbarContentContainer>
	);
};

const ImageSec = styled(Row)`
	position: relative;
	width: 120px;
`;

const ImageIconBtn = styled(IconButton)`
	position: absolute;
	bottom: 0px;
	right: 0px;
	opacity: 0.5;
	background-color: ${({ theme }) => theme.step4};
`;
