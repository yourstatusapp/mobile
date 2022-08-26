import React, { useMemo } from 'react';

import core from '@core';
import { useCallback } from 'react';
import { useSimple } from 'simple-core-state';

export const useAccount = () => {
	const account = useSimple(core.account);
	const profile = useSimple(core.profile);

	const logout = () => {
		core.account.setValue(null);
	};

	const loggedIn = useMemo(() => {
		return !!account?.id;
	}, [account]);

	return { logout, loggedIn, account, profile };
};
