import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Avatar, Block, Text } from '@parts';
import { useRoute } from '@react-navigation/native';
import { AccountType, ProfileType, request } from '@core';
import FastImage from 'react-native-fast-image';
import { StyleSheet } from 'react-native';
import { useTheme } from 'styled-components/native';

export const Profile = () => {
	const { params } = useRoute();
	const { colors } = useTheme();
	// @ts-ignore
	const usr_name = params.username;
	const [ProfileData, SetProfile] = useState<ProfileType | false>(false);
	const [Loaded, SetLoaded] = useState(false);

	const getProfile = async () => {
		const res = await request<ProfileType>('get', '/profile/' + usr_name);
		if (res?.data) {
			SetProfile(res.data);
		}
		SetLoaded(true);
	};

	// const memoizedCB = useCallback(getProfile, [params.username, ]);

	useEffect(() => {
		getProfile();
	}, []);

	if (!ProfileData.account_id) {
		<Block safe color="red">
			<Text>{Loaded ? 'Failed to load profile' : 'Loading profile data'}</Text>
		</Block>;
	} else {
		return (
			<Block safe paddingHorizontal={20}>
				<Avatar srcObj={[ProfileData.account_id, ProfileData.avatar]} size={100} />
				<Text bold size={40} style={{ paddingTop: 30 }}>
					{ProfileData.username}
				</Text>
				<Text bold size={14} color={colors.white80} style={{ paddingTop: 30 }}>
					{ProfileData.bio}
				</Text>
			</Block>
		);
	}
};
