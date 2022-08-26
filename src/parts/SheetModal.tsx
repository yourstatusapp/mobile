import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useTheme } from '@hooks';

interface SheetModalProps {
	ref?: React.Ref<BottomSheetMethods>;
	triggerModal?: boolean;
	openModal?: boolean;
	children: React.ReactNode;
}

const handlerBorderRadius = 15;

export const SheetModal: React.FC<SheetModalProps> = ({
	openModal,
	children,
	triggerModal,
}) => {
	const { theme } = useTheme();
	// ref
	const bottomSheetRef = useRef<BottomSheet>(null);

	// callbacks
	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
	}, []);

	// variables
	const snapPoints = useMemo(() => ['99%', '99%'], []);

	useEffect(() => {
		console.log('triggerModal');
		bottomSheetRef.current?.snapToIndex(1);
	}, [triggerModal]);

	useEffect(() => {
		openModal && bottomSheetRef.current?.snapToIndex(1);
	}, [openModal]);

	return (
		<BottomSheet
			ref={bottomSheetRef}
			index={-1}
			snapPoints={snapPoints}
			onChange={handleSheetChanges}
			enablePanDownToClose
			backgroundStyle={{
				backgroundColor: theme.backgroundDarker,
			}}
			// bottomInset={81}
			handleHeight={30}
			handleIndicatorStyle={{ backgroundColor: theme.textFadeLight }}
			handleStyle={{
				justifyContent: 'center',
				backgroundColor: theme.backgroundDark,
				height: 30,
				borderTopLeftRadius: handlerBorderRadius,
				borderTopRightRadius: handlerBorderRadius,
			}}>
			{children}
		</BottomSheet>
	);
};
