import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@hooks';
import { Block, Text, TextButton } from '@parts';
import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

export const EditUsername = () => {
	const { theme } = useTheme();
	// ref
	const bottomSheetRef = useRef<BottomSheet>(null);

	// variables
	const snapPoints = useMemo(() => ['85%', '85%'], []);

	// callbacks
	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
	}, []);

	return (
		<Block>
			<BottomSheet
				ref={bottomSheetRef}
				index={1}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
				handleIndicatorStyle={{ backgroundColor: theme.darker }}
				backgroundStyle={{ backgroundColor: 'transparent' }}
				handleStyle={{
					backgroundColor: theme.backgroundDarker,
					height: 50,
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20,
				}}>
				<View style={{ flex: 1, backgroundColor: theme.backgroundDark }}>
					<TextButton text="close" onPress={() => bottomSheetRef.current?.close()} />
					<Text>Awesome 🎉</Text>
				</View>
			</BottomSheet>
		</Block>
	);
};
