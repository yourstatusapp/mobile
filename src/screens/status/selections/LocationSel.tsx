import { BaseButton, Input, Row, SidePadding, SmallButton, SmallInput, Spacer, Text, TextButton } from '@parts';
import * as React from 'react';
import styled, { useTheme } from 'styled-components/native';
import Geolocation from 'react-native-geolocation-service';
import { usePulse } from '@pulsejs/react';
import core, { ActivityLocation, request } from '@core';
import { FlatList } from 'react-native-gesture-handler';
import { Linking, Platform, View } from 'react-native';
import { useState } from 'react';

interface LocationSelProps {}

export const LocationSel: React.FC<LocationSelProps> = (props) => {
	const {} = props;
	const phonePerms = usePulse(core.app.state.permissions_list);
	const [LocationName, setLocationName] = useState('');
	const [Locations, setLocations] = useState<ActivityLocation[]>([]);
	const [CurrentCoords, setCurrentCoords] = useState<number[]>([]);
	const [LocError, setLocError] = useState<boolean>(false);
	const theme = useTheme();

	const getLocations = async () => {
		const a = await request('get', '/activity/location');
		setLocations(a);
	};

	const createLocation = async () => {
		await request('post', '/activity/location/create', {
			data: {
				title: LocationName,
				lang: CurrentCoords[0],
				long: CurrentCoords[1],
			},
		});

		await getLocations();
	};

	React.useEffect(() => {
		getLocations();

		// Check if has permissions, otherwise request it
		// if (!phonePerms.geolocation_access) {
		Geolocation.requestAuthorization('whenInUse').then(() => core.app.state.permissions_list.patch({ geolocation_access: true }));
		// }

		// Geolocation.watchPosition(
		// 	(succ) => {
		// 		console.log('tracking location', succ);
		// 	},
		// 	(err) => {},
		// 	{ enableHighAccuracy: true, interval: 5 * 1000 }
		// );

		Geolocation.getCurrentPosition(
			(pos) => {
				console.log(pos);
				setCurrentCoords([pos.coords.latitude, pos.coords.longitude]);
			},
			(error) => {
				setLocError(true);
				// See error code charts below.
				console.log(error.code, error.message);
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
		);
	}, []);

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
		await request('post', '/act');
	};

	const removeLocation = async (id: string) => {
		await request('delete', `/activity/location/${id}/remove`);
		let newArr = Locations.slice(Locations.indexOf(Locations.filter((v) => v.id === id)[0]), 1);
		setLocations(newArr);
	};

	const renderItem = ({ item, index }) => (
		<Locationcard key={index}>
			<Text color={theme.text} size={16}>
				{item.title}
			</Text>
			<Spacer size={5} />

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

	const PreferenceButtons = [`none`, `city`, `realtime`];

	return (
		<SidePadding>
			<Spacer size={10} />

			<Text weight="bold" size={28}>
				Locations
			</Text>
			<Text color={theme.textFade} size={16}>
				You can set locations and when your phone detects its nearby, it will ping us.
			</Text>
			<Spacer size={50} />

			<Row>
				{PreferenceButtons.map((v, i) => (
					<SmallButton text={v} key={i} style={{ marginRight: 10, borderColor: 'red', borderWidth: 2 }} />
				))}
			</Row>

			{LocError && (
				<Text weight="medium" color="#FF6767">
					Cannot get location
				</Text>
			)}
			{/* <Text>Your coords: {JSON.stringify(CurrentCoords)}</Text> */}
			{/* <SmallButton text="Open maps" onPress={() => openLocWithMaps(CurrentCoords[0], CurrentCoords[1])} /> */}
			<Spacer size={20} />
			<SmallInput placeholder="location name" onChangeText={setLocationName} />
			<Spacer size={10} />
			<Row>
				<SmallButton text="Add location" onPress={() => createLocation()} disabled={LocError} />
				<Spacer size={10} />
				<SmallButton text="Set status" onPress={() => setStatus()} disabled={LocError} />
			</Row>
			<Spacer size={80} />
			<Text size={20} weight="semi-bold">
				Saved Location
			</Text>
			<FlatList data={Locations} renderItem={renderItem} contentContainerStyle={{ paddingTop: 10 }} />
		</SidePadding>
	);
};

const Locationcard = styled.View`
	background-color: ${({ theme }) => theme.step0};
	padding: 10px;
	border-radius: 12px;
	margin-bottom: 15px;
`;
