import React, { useCallback, useMemo, useRef } from 'react';
import { Text } from '@parts';
import { Block } from '../Block';

import BottomSheet from '@gorhom/bottom-sheet';
import { StyleSheet, View } from 'react-native';

export const BottomModalSheet = () => {
	// ref
	const bottomSheetRef = useRef<BottomSheet>(null);

	// variables
	const snapPoints = useMemo(() => ['25%', '50%'], []);

	// callbacks
	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
	}, []);

	return (
		<>
			<BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints} onChange={handleSheetChanges}>
				<View style={styles.contentContainer}>
					<Text>Awesome 🎉</Text>
				</View>
			</BottomSheet>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: 'grey',
	},
	contentContainer: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'red',
	},
});
