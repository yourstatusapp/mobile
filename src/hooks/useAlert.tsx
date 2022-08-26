import core from '@core';
import React, { useEffect, useMemo, useState } from 'react';
import { useSimple } from 'simple-core-state';

export interface AlertDataType {
	title: string;
	success: boolean;
	desc?: string;
}

interface useAlertProps {
	onUpdate: (e: AlertDataType) => void;
}

export const useAlert = () => {
	const current = useSimple(core.alert);

	const create = (config: AlertDataType) => {
		core.alert.setValue(config);
	};

	const clear = () => {
		core.alert.setValue(null);
	};

	const onUpdate = useMemo(() => {
		console.log('current data is changing');

		return current;
	}, [current]);

	return { createAlert: create, clear, current, onUpdate };
};
