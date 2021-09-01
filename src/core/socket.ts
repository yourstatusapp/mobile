import core from '@core';
import { io } from 'socket.io-client';

const socket = io('ws://127.0.0.1:8080', {
	port: '8080',
	path: '/ws',
	withCredentials: true,
	transports: ['websocket'],
});

// socket.on('connect', (connect) => {
// 	console.log('connect', connect);
// });

// // receving a ping from the server and ping it back
// socket.on('ping', (c) => {
// 	console.log('ping', c);
// 	// socket.emit('pong', { token: 43215423543 });

// 	socket.emit('pong', { token: 43215423543 });
// });


// export const reconnect = () => {
// 	setTimeout(() => {
// 		socket.io.open((err) => {
// 			console.log('err', err);

// 			if (err) {
// 				reconnect();
// 			}
// 		});
// 	}, 2000);
// };

// socket.on('connect_error', (err) => {
// 	console.log('connect_error', err.message);
// });

// socket.on('connection', (err) => {
// 	console.log('a', err.message);
// });

// socket.on('close', reconnect);

// (function () {
// 	if (core.account.state.logged_in.is(true)) {
// 		console.log('INITIALIZE SOCKETS');
// 		socket.connect();
// 	}
// })();