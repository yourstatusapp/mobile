import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTheme } from '@hooks';
import { Block, Text } from '@parts';
import * as React from 'react';
import { useCallback } from 'react';
import styled from 'styled-components/native';

export interface IBaseSheetProps {
	open: boolean;
	onClose: () => void;
	children?: React.ReactNode;
}

export const BottomSheet = ({ open, onClose, children }: IBaseSheetProps) => {
	const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
	const { theme } = useTheme();

	// variables
	const snapPoints = React.useMemo(() => ['25%', '50%'], []);

	// callbacks
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	React.useEffect(() => {
		if (open) handlePresentModalPress();
	}, [open]);

	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
	}, []);

	const HANDLE_BORDER_RADIUS = 13;
	return (
		<>
			<BottomSheetModal
				ref={bottomSheetModalRef}
				index={1}
				detached
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
				onDismiss={onClose}
				handleIndicatorStyle={{ backgroundColor: theme.backgroundDarker }}
				containerStyle={{}}
				style={{ borderRadius: 40, backgroundColor: 'green' }}
				handleStyle={{
					backgroundColor: theme.backgroundDark,
					borderTopLeftRadius: HANDLE_BORDER_RADIUS,
					borderTopRightRadius: HANDLE_BORDER_RADIUS,
					height: 50,
				}}>
				{children}
			</BottomSheetModal>
		</>
	);
};
