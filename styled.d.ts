// import original module declarations
import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		background: string;
		step0: string;
		step1: string;
		step2: string;
		step3: string;
		step4: string;
		navBar: string;
		navBarFade: string;
		text: string;
		textFade: string;
		primary: string;
	}
}
