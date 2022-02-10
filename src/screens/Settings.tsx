import React from 'react';
import { Block, Button, Fill, Icon, ModalHeader, Row, Spacer, Text } from '@parts';
import { Linking, TouchableOpacity } from 'react-native';
import { useTheme, withTheme } from 'styled-components/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const Settings = () => {
	const { colors, theme } = useTheme();
	return (
		<>
			<ModalHeader title="Settings" />
			<Block paddingHorizontal={20}>
				<Spacer size={25} />
				<Text>Coming More Soon</Text>
				<Spacer size={20} />
				<Row>
					<Block flex={0} vCenter hCenter row press onPress={() => Linking.openURL('https://twitter.com/yourstatusapp')}>
						<Icon name="twitter" size={25} color="#1C9BF0" />
						<Spacer size={5} h />
						<Text color="#1C9BF0" bold>
							@YourStatus
						</Text>
					</Block>
				</Row>
			</Block>
		</>
	);
};

const SettingItem = ({ text }: { text: string }) => {
	const { colors, theme } = useTheme();
	return (
		<Block flex={0} press row style={{ paddingVertical: 15, marginBottom: 10, paddingHorizontal: 15, borderRadius: 12 }} hCenter color={colors.white10}>
			<Icon name="bell" size={20} color={colors.white} />
			<Spacer size={15} h />
			<Text color={colors.white} weight="600">
				{text}
			</Text>
			<Fill />
			<Icon name="chevron" size={15} color={colors.white60} style={{ transform: [{ rotate: '180deg' }] }} />
		</Block>
	);
};
