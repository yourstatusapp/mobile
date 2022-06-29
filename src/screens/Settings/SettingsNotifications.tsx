import * as React from 'react';
import core, { AppAlert, request } from '@core';
import { Block, Fill, IconButton, Spacer, Text, TextButton } from '@parts';
import { usePulse } from '@pulsejs/react';
import { Switch } from 'react-native';
import { useTheme } from 'styled-components/native';
import { requestPermissions } from '../../utils/PushNotification';
import { SettingItem } from './index';

export const SettingsNotifications: React.FC = () => {
	const theme = useTheme();
	const notificationsEnabled = usePulse(core.app.notification_permission);
	const CURRENT_DEVICE = usePulse(core.lists.devices.selectors.current);

	const allowNotifications = async () => {
		requestPermissions();
	};

	const UpdateDevice = async (notifications: boolean) => {
		if (!CURRENT_DEVICE?.id) {
			AppAlert(false, 'Failed', 'no device id found');
			return;
		}

		// if no push token, return
		if (!core.app.device_push_token?.value) {
			console.log(core.app.device_push_token?.value);
			AppAlert(false, 'Notification permissions failed');
			return;
		}

		const res = await request('patch', '/account/devices/' + CURRENT_DEVICE.id, {
			data: { notifications, push_token: notifications ? core.app.device_push_token?.value : '' },
		});

		if (res?.data) {
			core.lists.devices.update(CURRENT_DEVICE.id, { notifications });
			core.lists.devices.rebuildGroupsThatInclude(CURRENT_DEVICE.id);
		}
	};

	return (
		<Block color={theme.backgroundDarker}>
			<Spacer size={20} />
			<Text bold size={26} paddingLeft={20}>
				Notifications
			</Text>
			{notificationsEnabled === 0 && (
				<Block flex={0} paddingHorizontal={20} marginBottom={20}>
					<Block
						flex={0}
						color="#FF6666"
						marginTop={15}
						style={{ padding: 10, borderRadius: 8, marginHorizontal: 0 }}>
						<Text color={'#541A1A'} medium>
							We need permission to send notifications
						</Text>
						<Spacer size={15} />
						<TextButton
							onPress={() => allowNotifications()}
							textSize={12}
							textColor={'white'}
							style={{ backgroundColor: '#00000032', padding: 6, borderRadius: 4 }}>
							Allow Notifications
						</TextButton>
					</Block>
				</Block>
			)}
			{/* {notificationsEnabled === 0 && <TextButton onPress={() => enableNotifications()}>Allow Notifications</TextButton>} */}

			<SettingItem
				text="Global notifications"
				RightComponent={() => (
					<Switch value={CURRENT_DEVICE.notifications} onValueChange={v => UpdateDevice(v)} />
				)}
			/>
		</Block>
	);
};
