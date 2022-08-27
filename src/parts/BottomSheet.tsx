import { BottomSheetModal, BottomSheetView, useBottomSheetDynamicSnapPoints } from '@gorhom/bottom-sheet';
import { useTheme } from '@hooks';
import { Block, Text } from '@parts';
import * as React from 'react';
import { useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export interface IBaseSheetProps {
	open: boolean;
	onClose: () => void;
	close?: boolean;
	children?: React.ReactNode;
}

export const BottomSheet = ({ open, onClose, children, close }: IBaseSheetProps) => {
	const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
	const { theme } = useTheme();
	const { bottom } = useSafeAreaInsets();

	const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
		useBottomSheetDynamicSnapPoints(['CONTENT_HEIGHT']);

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

	React.useEffect(() => {
		console.log('c', close);

		if (close) {
			bottomSheetModalRef.current?.close();
		}
	}, [close]);

	const HANDLE_BORDER_RADIUS = 13;
	return (
		<>
			<BottomSheetModal
				ref={bottomSheetModalRef}
				index={0}
				snapPoints={animatedSnapPoints}
				handleHeight={animatedHandleHeight}
				contentHeight={animatedContentHeight}
				onChange={handleSheetChanges}
				onDismiss={onClose}
				handleIndicatorStyle={{ backgroundColor: theme.darker1 }}
				style={{ borderRadius: 40, backgroundColor: theme.background }}
				backgroundComponent={() => <Block color={theme.background} flex={1}></Block>}
				handleStyle={{
					backgroundColor: theme.backgroundDark,
					borderTopLeftRadius: HANDLE_BORDER_RADIUS,
					borderTopRightRadius: HANDLE_BORDER_RADIUS,
					height: 30,
				}}>
				<BottomSheetView
					onLayout={handleContentLayout}
					style={{ paddingBottom: bottom, backgroundColor: theme.backgroundDark }}>
					{children}
				</BottomSheetView>
			</BottomSheetModal>
		</>
	);
};
