import { Fill, SidePadding, SmallInput, Spacer, TopHeading, WideButton } from '@parts';
import * as React from 'react';
import styled from 'styled-components/native';

interface EditProfileProps {}

export const EditProfile: React.FC<EditProfileProps> = (props) => {
	const {} = props;

	return (
		<EditProfileBody>
			<TopHeading text="Edit profile" />
			<SidePadding>
				<Spacer size={20} />
				<SmallInput placeholder="Location" />
				<Fill />
				<WideButton text="save" />
				<Spacer size={30} />
			</SidePadding>
		</EditProfileBody>
	);
};

const EditProfileBody = styled.View`
	flex: 1;
`;
