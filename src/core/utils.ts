import axios from 'axios';

export const request = async (method: 'post' | 'get', path: string, data?: any): Promise<object> => {
	try {
		const a = await axios({
			method,
			data,
			headers: {
				'Content-Type': 'application/json',
			},
			url: 'http://localhost:8080/' + path,
			withCredentials: true,
		});
		return a.data.data;
	} catch (error) {
		console.log(error);
		return {};
	}
};
