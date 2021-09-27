import core, { calcDistance, request } from '@core';
import { state } from '@pulsejs/core';
// import Geolocation from 'react-native-geolocation-service';
import BackgroundGeolocation from 'react-native-background-geolocation';

export const LocationState = {
	coordinates: state<{ long: number; lat: number }>({ long: 0, lat: 0 }),
};

export const startGeoLocation = () => {
	BackgroundGeolocation.ready(
		{
			// Geolocation Config
			desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
			distanceFilter: 50,
			// Activity Recognition
			stopTimeout: 1,
			// Application config
			debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
			logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
			stopOnTerminate: false, // <-- Allow the background-service to continue tracking when user closes the app.
			startOnBoot: true, // <-- Auto start tracking when device is powered-up.
			// HTTP / SQLite config
			url: 'http://yourserver.com/locations',
			batchSync: false, // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
			autoSync: true, // <-- [Default: true] Set true to sync each location to server as it arrives.
			headers: {
				// <-- Optional HTTP headers
				// 'X-FOO': 'bar',
			},
			params: {
				// <-- Optional HTTP params
				// auth_token: 'maybe_your_server_authenticates_via_token_YES?',
			},
		},
		(state) => {
			console.log('- BackgroundGeolocation is configured and ready: ', state.enabled);

			if (!state.enabled) {
				////
				// 3. Start tracking!
				//
				BackgroundGeolocation.start(function () {
					console.log('- Start success');
				});
			}
		}
	);
};

export const destroyGeoListeners = () => {
	BackgroundGeolocation.removeListeners();
};

// This handler fires when movement states changes (stationary->moving; moving->stationary)
BackgroundGeolocation.onMotionChange((l) => {
	console.log(l);
});

// This event fires when a change in motion activity is detected
BackgroundGeolocation.onActivityChange((l) => {
	console.log(l);
});

// This event fires when the user toggles location-services authorization
BackgroundGeolocation.onProviderChange((l) => {
	console.log(l);
});

BackgroundGeolocation.onLocation(
	(l) => {
		console.log('location > ', l);
	},
	(err) => {
		console.log(err);
	}
);

// export const requestLocationAccess = async (): Promise<boolean> => {
// 	const r = await Geolocation.requestAuthorization('always');
// 	if (r === 'disabled') {
// 		return false;
// 	}
// 	console.log(r);

// 	return true;
// };

// export const listenLocationPosition = () => {
// 	Geolocation.watchPosition(
// 		async (pos) => {
// 			LocationState.coordinates.set({ long: pos.coords.longitude, lat: pos.coords.latitude });

// 			// Check if we are in a range of 100 meters of a location and ping the server that we are at that location
// 			console.log('locations -> ', core.account.state.saved_locations?.value);

// 			for (let item of core.account.state.saved_locations?.value) {
// 				const m = calcDistance({ lat: item.lang, long: item.long }, { lat: pos.coords.latitude, long: pos.coords.longitude });

// 				if (Math.abs(m) < 100) {
// 					await request('post', `/location/${item.id}/ping`, {});
// 					core.account.collection.locations.selectors.current_here.select(item.id);
// 				}
// 			}
// 		},
// 		(err) => {
// 			console.log('err', err);
// 		},
// 		{ accuracy: { ios: 'best' }, showsBackgroundLocationIndicator: true, distanceFilter: 30 }
// 	);
// };

// export const clearGeoWatcher = () => Geolocation.stopObserving();
