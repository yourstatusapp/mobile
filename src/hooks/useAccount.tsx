import React, { useState } from 'react';

export const useAccount = () => {
	const [loggedIn, setLoggedIn] = useState(false);

	return { loggedIn };
};
