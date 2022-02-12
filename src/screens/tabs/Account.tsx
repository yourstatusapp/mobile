import React from 'react';
import { useTheme } from 'styled-components/native';
import { Avatar, Block, Fill, IconButton, Spacer, Text, TextButton } from '@parts';
import { useNavigation } from '@react-navigation/native';
import core from '@core';
import { usePulse } from '@pulsejs/react';
import { MenuView } from '@react-native-menu/menu';
import { launchImageLibrary } from 'react-native-image-picker';

export const Account = () => {
	const nav = useNavigation();
	const { colors } = useTheme();
	const account = usePulse(core.account.state.account);
	const profile = usePulse(core.profile.state.profile);

	const selectAvatar = async () => {
		launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, v => {});
	};

	return (
		<Block scroll paddingHorizontal={20}>
			<Spacer size={20} />
			<Spacer size={50} />
			<Block row flex={0}>
				<Text size={28} bold color={colors.white}>
					Account
				</Text>
				<Fill />
				<IconButton name="cog" size={25} color={colors.white} onPress={() => nav.navigate('settings' as never)} />
			</Block>
			<Spacer size={20} />
			<Block row flex={0}>
				{/* <MenuView
					title="Upload new avatar"
					onPressAction={({ nativeEvent }) => {
						if (nativeEvent.event == '1') {
							selectAvatar();
						}
						if (nativeEvent.event == 2) {
						}
					}}
					actions={[
						{
							id: '1',
							title: `Choose from photo's`,
							image: 'photo',
						},
						{
							id: '2',
							title: 'Make a photo',
							image: 'camera',
						},
					]}>
					<Avatar src={[profile?.account_id, profile?.avatar]} size={120} />
				</MenuView> */}
				<Avatar src={[profile?.account_id, profile?.avatar]} size={120} />
				<Spacer size={20} h />
				<IconButton
					name="pencil"
					color={colors.white80}
					size={25}
					iconSize={15}
					backgroundColor={colors.white20}
					onPress={() => nav.navigate('edit_profile' as never)}
				/>
			</Block>
			<Spacer size={30} />
			<Text>
				<Text bold>Email: </Text>
				{account?.email}
			</Text>
			<Spacer size={20} />

			<Spacer size={20} />
			<Fill />
			<TextButton
				text="Logout"
				textColor={'#ff6b6b'}
				style={{ padding: 4 }}
				onPress={() => {
					nav.reset({ index: 1, routes: [{ name: 'auth' as never }] });
					core.account.state.account.reset();
				}}
			/>
			<Spacer size={90} />
		</Block>
	);
};
