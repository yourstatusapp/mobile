import core, { calcDistance, request } from '@core';
import { state } from '@pulsejs/core';
import Geolocation from 'react-native-geolocation-service';

export const LocationState = {
	coordinates: state<{ long: number; lat: number }>({ long: 0, lat: 0 }),
};

export const requestLocationAccess = async (): Promise<boolean> => {
	const r = await Geolocation.requestAuthorization('always');
	if (r === 'disabled') {
		return false;
	}
	console.log(r);

	return true;
};

export const listenLocationPosition = () => {
	Geolocation.watchPosition(
		async (pos) => {
			LocationState.coordinates.set({ long: pos.coords.longitude, lat: pos.coords.latitude });

			// Check if we are in a range of 100 meters of a location and ping the server that we are at that location
			console.log('locations -> ', core.account.state.saved_locations?.value);

			for (let item of core.account.state.saved_locations?.value) {
				const m = calcDistance({ lat: item.lang, long: item.long }, { lat: pos.coords.latitude, long: pos.coords.longitude });

				if (Math.abs(m) < 100) {
					await request('post', `/location/${item.id}/ping`, {});
					core.account.collection.locations.selectors.current_here.select(item.id);
				}
			}
		},
		(err) => {
			console.log('err', err);
		},
		{ accuracy: { ios: 'best' }, showsBackgroundLocationIndicator: true, distanceFilter: 30 }
	);
};

export const clearGeoWatcher = () => Geolocation.stopObserving();
