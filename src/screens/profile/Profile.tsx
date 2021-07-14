import { RouteConfig, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import styled from 'styled-components/native';
import { Row, Spacer, Text } from '../../parts';
import { Avatar } from '../../parts/Avatar';

interface ProfileProps {
	// route: ;
}

export const Profile: React.FC<ProfileProps> = (props) => {
	const { route } = props;
	const profile = route.params;

	return (
		<ProfileBody>
			<Row>
				<Avatar src={profile.avatar} size={80} />
				<Spacer size={10} />
				<Text weight="bold" size={24}>
					{profile.username}
				</Text>
			</Row>
		</ProfileBody>
	);
};

const ProfileBody = styled.View`
	padding: 20px;
	flex: 1;
`;
