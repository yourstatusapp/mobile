import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

interface LocaStorageEffectParams {
	setSelf: (params: any) => void;
	onSet: (param: (newValue: any, oldValue: any, isReset: boolean) => void) => void;
}

export const localStorageEffect = (key: string) => {
	return ({ setSelf, onSet }: LocaStorageEffectParams) => {
		const savedValue = storage.getString(key);
		if (savedValue !== undefined) {
			setSelf(JSON.parse(savedValue));
		}

		onSet((newValue, _, isReset) => {
			isReset ? storage.delete(key) : storage.set(key, JSON.stringify(newValue));
		});
	};
};
