import { BaseButton, Input, Row, SidePadding, SmallButton, SmallInput, Spacer, Text, TextButton } from '@parts';
import * as React from 'react';
import styled, { useTheme } from 'styled-components/native';
import Geolocation from 'react-native-geolocation-service';
import { usePulse } from '@pulsejs/react';
import core, { ActivityLocation, request } from '@core';
import { FlatList } from 'react-native-gesture-handler';
import { Linking, Platform, View } from 'react-native';

interface LocationSelProps {}

export const LocationSel: React.FC<LocationSelProps> = (props) => {
	const {} = props;
	const phonePerms = usePulse(core.app.state.permissions_list);
	const [LocationName, setLocationName] = React.useState('');
	const [Locations, setLocations] = React.useState<ActivityLocation[]>([]);
	const [CurrentCoords, setCurrentCoords] = React.useState<number[]>([]);
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
		if (!phonePerms.geolocation_access) {
			Geolocation.requestAuthorization('whenInUse').then(() => core.app.state.permissions_list.patch({ geolocation_access: true }));
		}
		Geolocation.watchPosition(
			(succ) => {
				console.log('tracking location', succ);
			},
			(err) => {},
			{ enableHighAccuracy: true, interval: 5 * 1000 }
		);

		Geolocation.getCurrentPosition(
			(pos) => {
				console.log(pos);
				setCurrentCoords([pos.coords.latitude, pos.coords.longitude]);
			},
			(error) => {
				// See error code charts below.
				console.log(error.code, error.message);
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
		);
	}, []);

	const openLocWithMaps = (lat, lng) => {
		const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
		const latLng = `${lat},${lng}`;
		const label = 'Your location';
		const url = Platform.select({
			ios: `${scheme}${label}@${latLng}`,
			android: `${scheme}${latLng}(${label})`,
		});

		Linking.openURL(url || '');
	};

	const removeLocation = async (id: string) => {
		await request('delete', `/activity/location/${id}/remove`);
		let newArr = Locations.slice(Locations.indexOf(Locations.filter((v) => v.id === id)[0]), 1);
		setLocations(newArr);
	};

	const renderItem = ({ item, index }) => (
		<Locationcard key={index}>
			<Text weight="semi-bold" size={18}>
				{item.title}
			</Text>
			<Spacer size={5} />
			<Text>{item.lang + ' | ' + item.long}</Text>
			<Spacer size={10} />
			<Row>
				<SmallButton text="Delete" backgroundColor={theme.step3} onPress={() => removeLocation(item.id)} />
			</Row>
		</Locationcard>
	);

	return (
		<SidePadding>
			<Text weight="bold" size={28}>
				Locations
			</Text>
			<Text color={theme.textFade} size={16}>
				You can set locations and when your phone detects its nearby, it will ping us.
			</Text>
			<Spacer size={50} />
			<Text>Your coords: {JSON.stringify(CurrentCoords)}</Text>
			<SmallButton text="Open maps" onPress={() => openLocWithMaps(CurrentCoords[0], CurrentCoords[1])} />
			<Spacer size={10} />
			<SmallInput placeholder="location name" onChangeText={setLocationName} />
			<Spacer size={10} />
			<Row>
				<SmallButton text="save your current location" onPress={() => createLocation()} />
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
	background-color: ${({ theme }) => theme.step1};
	padding: 10px;
	border-radius: 12px;
	margin-bottom: 15px;
`;
