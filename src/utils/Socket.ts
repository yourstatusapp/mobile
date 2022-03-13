import core, { AppAlert, request } from '@core';
import CookieManager from '@react-native-cookies/cookies';
import io, { Socket } from 'socket.io-client';

let SOCKET_TOKEN = '';

// const SOCKET_SERVER_URL = process.env.NODE_ENV === 'production' ? 'wss:':''
let socket: Socket;

console.log('socket');

export const connectToSocket = async () => {
	// check if we are logged in
	if (!core.account.logged_in.value) {
		return;
	}

	if (core.app.SOCKET_CONNECT.value === true) {
		return;
	}

	// get a websocket connection
	const res = await request<string>('post', '/auth/websocket/generate');

	core.app.SOCKET_TOKEN.set(res.data);

	if (res.data) {
		SOCKET_TOKEN = res.data;
		setTimeout(() => {
			socket.connect();
		}, 100);
		socket = io('ws://192.168.1.5:3020/', { autoConnect: false, query: { key: SOCKET_TOKEN }, auth: { cookie: await CookieManager.get('yourstatus_cookie') } });

		socket?.on('connect', () => {
			console.log(socket.connected);
			core.app.SOCKET_CONNECT.set(true);
		});
		socket?.on('disconnect', () => {
			// AppAlert(false, 'd');
			core.app.SOCKET_CONNECT.set(false);
		});
	} else {
		return;
	}
};

export const sendMessageToSocket = () => {
	socket.emit('order:read', { test: false });
};
