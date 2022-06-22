import { atom } from 'recoil';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const localStorageEffect =
	(key: any) =>
	({ setSelf, onSet }: { setSelf: any; onSet: any }) => {
		const savedValue = useAsyncStorage(key).getItem();
		if (savedValue !== null) {
			// @ts-ignore
			setSelf(JSON.parse(savedValue));
		}

		// @ts-ignore
		onSet((newValue, _, isReset) => {
			isReset
				? useAsyncStorage(key).removeItem()
				: useAsyncStorage(key).setItem(JSON.stringify(newValue));
		});
	};

interface Account {
	id: string;
	email: string;
}

export const userData = atom<Account | null>({
	key: 'account',
	default: null,
	effects: [localStorageEffect('account')],
});
