import { usePulse } from '@pulsejs/react';
import * as React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Header, Spacer, TabbarContentContainer, Avatar, IconButton, SmallButton, Row, SidePadding, Text } from '@parts';
import ImagePicker from 'react-native-image-crop-picker';
import core, { request } from '@core';
import { Platform, View } from 'react-native';
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
		<TabbarContentContainer noSidePadding>
			<Header title="Account" padding />
			<SidePadding>
				<Spacer size={20} />

				<Row>
					<ImageSec>
						<Avatar src={`https://cdn.yourstatus.app/profile/${acc.id}/${profile.avatar}` || ''} size={120} />
						<ImageIconBtn name="pencil" size={32} color={theme.text} onPress={() => selectImage()} />
					</ImageSec>
					<Spacer size={25} />
					<View>
						{profile.username ? (
							<Text size={22} weight="semi-bold">
								{profile.username}
							</Text>
						) : (
							<Text size={20} style={{ color: theme.textFade }}>
								No username
							</Text>
						)}
						<Text>{profile.location}</Text>
						<Spacer size={20} />
						<Row>
							<SmallButton text="Edit" onPress={() => nav.navigate('EditProfile')} />
						</Row>
					</View>
				</Row>
			</SidePadding>
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
