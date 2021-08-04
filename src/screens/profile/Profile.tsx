import * as React from 'react';
import styled from 'styled-components/native';
import { Avatar, Row, Spacer, Text } from '@parts';

interface ProfileProps {
	route: any;
}

export const Profile: React.FC<ProfileProps> = (props) => {
	const { route } = props;
	const profile = route.params;

	return (
		<ProfileBody>
			<Row>
				<Avatar src={`https://cdn.yourstatus.app/profile/${route.params.owner}/${route.params.avatar}`} size={100} />
				<Spacer size={20} />
				<Text weight="bold" size={24}>
					{profile.username}
				</Text>
			</Row>
		</ProfileBody>
	);
};

const ProfileBody = styled.View`
	background-color: ${({ theme }) => theme.background};
	padding: 20px;
	flex: 1;
`;
