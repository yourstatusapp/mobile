// import original module declarations
import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		name: string;
		text: string;
		textFade: string;
		textFadeLight: string;
		background: string;
		backgroundDarker: string;
		darker: string;
		darker1: string;
		darker2: string;

		primary: string;
	}
}
