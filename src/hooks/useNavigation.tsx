import { RootstackParamList } from '@core';
import { useNavigation as ReactNavigationUseNavigation, NavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const useNavigation = () => ReactNavigationUseNavigation<NativeStackNavigationProp<RootstackParamList>>();
