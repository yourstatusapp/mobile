// import original module declarations
import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		background?: string;
		step1?: string;
		step2?: string;
		step3?: string;
		step4?: string;
		navBar?: string;
		navBarFade?: string;
		text?: string;
		primary?: string;
	}
}
