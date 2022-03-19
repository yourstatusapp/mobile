import core, { AppAlert, request } from '@core';
import CookieManager from '@react-native-cookies/cookies';
import io, { Socket } from 'socket.io-client';

let SOCKET_TOKEN = '';

// const SOCKET_SERVER_URL = process.env.NODE_ENV === 'production' ? 'wss:':''
let socket: Socket;

console.log('socket');

interface IncomingPrivateMessageData {
	message: {
		id: string;
		username: string;
		content: string;
		conversation_id: string;
		account_id: string;
		avatar: string;
	};
}

// const SOCKET_URL = 'wss://api.yourstatus.app/websocket';
const SOCKET_URL = 'ws://192.168.1.2:3020/';

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
		socket = io(SOCKET_URL, { autoConnect: false, query: { key: SOCKET_TOKEN }, auth: { cookie: await CookieManager.get('yourstatus_cookie') } });

		socket?.on('connect', () => {
			console.log(socket.connected);
			core.app.SOCKET_CONNECT.set(true);
		});

		socket?.on('private_message', (v: IncomingPrivateMessageData) => {
			core.lists.messages.collect(v.message, v.message.conversation_id, { method: 'unshift' });
			core.lists.conversations.groups.new_messages.add(v.message.id);
		});

		// socket?.on('user_connected', v => {
		// 	AppAlert(true, 'user_connected', JSON.stringify(v));
		// });

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
