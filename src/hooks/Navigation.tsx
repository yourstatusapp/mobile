import { GlobalParamList } from '@core';
import {
	useNavigation as ReactNavigationUseNavigation,
	NavigationProp,
} from '@react-navigation/native';

export const useNavigation = () => ReactNavigationUseNavigation<NavigationProp<GlobalParamList>>();
