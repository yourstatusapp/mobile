import React, { useState } from 'react';

export interface AlertDataType {
	title: string;
	success: boolean;
	desc?: string;
}

export const useAlert = () => {
	const [current, setCurrent] = useState<AlertDataType | null>(null);

	const create = (config: AlertDataType) => {
		setCurrent(config);
	};

	const clear = () => {
		setCurrent(null);
	};

	return { create, clear, current };
};
