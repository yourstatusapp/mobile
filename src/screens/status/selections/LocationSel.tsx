import { Row, SidePadding, SmallButton, SmallInput, Spacer, Text } from '@parts';
import * as React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { usePulse } from '@pulsejs/react';
import core, { calcDistance, LocationType, request } from '@core';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Linking, Platform } from 'react-native';
import { useState } from 'react';
import { listenLocationPosition, LocationState, requestLocationAccess } from '../../../utils/LocationService';
import MapView from 'react-native-maps';

export const LocationSel: React.FC = () => {
	const theme = useTheme();

	// const phonePerms = usePulse(core.app.state.permissions_list);
	const locations = usePulse(core.account.collection.locations.groups.mine);
	const loc_perm_enabled = usePulse(core.app.state.location_service_enabled);
	const current_coords = usePulse(LocationState.coordinates);

	const [LocationName, setLocationName] = useState('');
	const [LocError, setLocError] = useState<boolean>(false);

	const getLocations = async () => {
		const a = await request<LocationType>('get', '/location/me');
		core.account.collection.locations.collect(a, 'mine');
		core.account.state.saved_locations.set(a);
	};

	const createLocation = async () => {
		await request('post', '/location/create', {
			data: {
				title: LocationName,
				lang: current_coords.lat,
				long: current_coords.long,
			},
		});

		await getLocations();
	};

	const openLocWithMaps = (lat: number, lng: number, name?: string) => {
		const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
		const latLng = `${lat},${lng}`;
		const label = name || 'Your location';
		const url = Platform.select({
			ios: `${scheme}${label}@${latLng}`,
			android: `${scheme}${latLng}(${label})`,
		});

		Linking.openURL(url || '');
	};

	const setStatus = async () => {
		// await request('post', '/act');
	};

	const removeLocation = async (id: string) => {
		await request('delete', `/location/${id}/remove`);
		// let newArr = Locations.slice(Locations.indexOf(Locations.filter((v) => v.id === id)[0]), 1);
		// setLocations(newArr);
	};

	React.useEffect(() => {
		if ([0, 1].includes(loc_perm_enabled)) {
			// Request user location access
			requestLocationAccess().then((v) => {
				core.app.state.location_service_enabled.set(v ? 1 : 2);
				if (v === false) {
					return;
				}
				listenLocationPosition();
			});
		}

		getLocations();
	}, []);

	const renderItem = ({ item, index }) => (
		<Locationcard key={index}>
			<Text color={theme.text} size={16}>
				{item.title}you
			</Text>
			<Spacer size={5} />
			<Text> - {calcDistance({ lat: item.lang, long: item.long }, { lat: current_coords.lat, long: current_coords.long })}</Text>

			<Spacer size={10} />
			<Row>
				<SmallButton text="Open maps" onPress={() => openLocWithMaps(item.lang, item.long, item.title)} backgroundColor={theme.step2} />
				<Spacer size={10} />
				<SmallButton text="Set status" backgroundColor={theme.step2} onPress={() => removeLocation(item.id)} />
				<Spacer size={10} />
				<SmallButton text="Delete" backgroundColor="#f87c7c" onPress={() => removeLocation(item.id)} textColor={theme.background} />
			</Row>
		</Locationcard>
	);

	return (
		<SidePadding>
			<ScrollView style={{ flex: 1 }}>
				<Spacer size={10} />

				<Text weight="bold" size={28}>
					Locations
				</Text>
				<Text color={theme.textFade} size={16}>
					You can set locations and when your phone detects its nearby, it will ping us.
				</Text>
				<Spacer size={50} />

				{LocError && (
					<Text weight="medium" color="#FF6767">
						Cannot get location
					</Text>
				)}
				<Text>
					Your coords: (lat){current_coords.lat} + (long){current_coords.long}
				</Text>
				{/* <SmallButton text="Open maps" onPress={() => openLocWithMaps(CurrentCoords[0], CurrentCoords[1])} /> */}
				<Spacer size={20} />
				<SmallInput placeholder="location name" onChangeText={setLocationName} />
				<Spacer size={10} />
				<Row>
					<SmallButton text="Add location" onPress={() => createLocation()} disabled={LocError || LocationName === ''} />
					{/* <Spacer size={10} /> */}
					{/* <SmallButton text="Set status" onPress={() => setStatus()} disabled={LocError} /> */}
				</Row>
				<Spacer size={80} />
				{/*   */}
				{/* <Text size={20} weight="semi-bold">
				Saved Locations
			</Text> */}
				{!!locations?.length && <FlatList data={locations} renderItem={renderItem} contentContainerStyle={{ paddingTop: 10 }} />}
			</ScrollView>
		</SidePadding>
	);
};

const Locationcard = styled.View`
	background-color: ${({ theme }) => theme.step0};
	padding: 10px;
	border-radius: 12px;
	margin-bottom: 15px;
`;

const MapContainer = styled.View`
	background-color: red;
	flex: 1;
	max-height: 300px;
	border-radius: 12px;
`;
