import React from 'react';
import { useTheme } from '@hooks';
import { Block, Icon } from '@parts';
import { useCallback, useMemo } from 'react';
import { ViewStyle } from 'react-native';
import { StatusColors } from '../../../parts/Status';
import { StatusTypeEtc, StatusTypes } from '../CreateStatus';

export const StatusSelectedableBox = ({
	statusType,
	selectedType,
	pressHandler,
	disabled,
}: {
	statusType: StatusTypes;
	selectedType: number;
	pressHandler: (v: number) => void;
	disabled: boolean;
}) => {
	const { theme } = useTheme();

	const StatusSelectTypeStyle: ViewStyle = {
		height: 57,
		width: 57,
		flex: 0,
		borderRadius: 12,
	};

	const TypePressHandler = useCallback(() => {
		pressHandler(statusType);
	}, [pressHandler, statusType]);

	const a = useMemo(() => [selectedType === statusType], [selectedType, statusType]);

	return (
		<Block flex={0} marginRight={11} hCenter>
			<Block
				height={10}
				width={10}
				flex={0}
				marginBottom={5}
				opacity={disabled ? 0.4 : 1}
				style={{ borderRadius: 10, opacity: selectedType !== statusType ? 0.4 : 1 }}
				color={StatusColors[theme.name][statusType].backColor}
			/>
			<Block
				color={StatusColors[theme.name][statusType].backColor}
				hCenter
				vCenter
				opacity={disabled ? 0.3 : selectedType === statusType ? 1 : 0.4}
				style={StatusSelectTypeStyle}
				press
				onPress={TypePressHandler}
				disabled={disabled}>
				<Icon
					name={StatusTypeEtc[statusType].icon}
					color={StatusColors[theme.name][statusType].color}
					size={StatusTypeEtc[statusType].iconSize}
				/>
			</Block>
		</Block>
	);
};
