import { usePulse } from '@pulsejs/react';
import * as React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Header, Spacer, TabbarContentContainer, Avatar, IconButton, SmallButton, Row, SidePadding, Text, Fill, Icon } from '@parts';
import ImagePicker from 'react-native-image-crop-picker';
import core, { request } from '@core';
import { Platform, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface AccountProps {}

export const AccountView: React.FC<AccountProps> = (props) => {
	const nav = useNavigation();
	const theme = useTheme();
	const acc = usePulse(core.account.state.ACCOUNT);
	const profile: any = usePulse(core.profile.state.PROFILE);
	const my_status = usePulse(core.status.state.my_status);

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

	const reloadData = async () => {
		const a = await request<{ account: any; profile: any; status: any }>('get', '/account');
		core.account.state.ACCOUNT.set(a.account);
		core.profile.state.PROFILE.set(a.profile);
		core.status.state.my_status.set(a.status);
	};

	return (
		<TabbarContentContainer noSidePadding>
			<Header title="Account" padding />
			<SidePadding>
				<Spacer size={20} />

				<Row>
					<ImageSec>
						<Avatar src={`https://cdn.yourstatus.app/profile/${acc.id}/${profile.avatar}` || ''} size={120} />
						<ImageIconBtn name="pencil" size={20} color={theme.text} onPress={() => selectImage()} />
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
							<Spacer size={10} />
							<SmallButton text="Open Profile" onPress={() => nav.navigate('Profile', { profile, mine: true })} />
						</Row>
					</View>
				</Row>
				<Spacer size={50} />
				<Row>
					<BigButton onPress={() => nav.navigate('Camera')}>
						<Text weight="medium" size={16} color={theme.text} style={{ paddingRight: 10 }}>
							Create story
						</Text>
						<Icon name="camera" size={18} color={theme.textFade} />
					</BigButton>
				</Row>

				{/* <Row>
					<SmallButton text="Reload account" onPress={() => reloadData()} />
				</Row> */}
				{/* <Spacer size={50} />
				<SmallButton text="Open Camera" onPress={() => nav.navigate('Camera')} />
				<Spacer size={15} />
				<SmallButton text="Open Profile" onPress={() => nav.navigate('Profile', { profile, mine: true })} />
				<Spacer size={15} /> */}
				{/* <ImagePicker /> */}
				{/* <SmallButton text="Add photo to collection" onPress={() => nav.navigate('')} /> */}
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

const BigButton = styled(TouchableOpacity)`
	flex-direction: row;
	background-color: ${({ theme }) => theme.step2};
	padding: 12px 10px;
	border-radius: 8px;
`;
