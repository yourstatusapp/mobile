import React, { useEffect, useState } from 'react';
import { Avatar, Block, Spacer, Status, Text } from '@parts';
import { useRoute } from '@react-navigation/native';
import { ProfileType, request } from '@core';

import { useTheme } from 'styled-components/native';

export const Profile = () => {
	const { params } = useRoute();
	const { colors } = useTheme();
	// @ts-ignore
	const usr_name = params.username;
	const [ProfileData, SetProfile] = useState<ProfileType>();
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

	if (!ProfileData) {
		return (
			<Block safe>
				<Text>{Loaded ? 'Failed to load profile' : 'Loading profile data'}</Text>
			</Block>
		);
	} else {
		return (
			<Block paddingHorizontal={20}>
				<Spacer size={60} />
				<Avatar src={[ProfileData.account_id, ProfileData.avatar]} size={100} />
				<Text bold size={40} style={{ paddingTop: 20 }}>
					{ProfileData.username}
				</Text>
				<Spacer size={10} />
				{ProfileData.status && <Status status={ProfileData.status} />}
				<Text bold size={14} color={colors.white80} style={{ paddingTop: 20 }}>
					{ProfileData.bio}
				</Text>
			</Block>
		);
	}
};
