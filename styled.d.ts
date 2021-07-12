// import original module declarations
import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		background?: string;
		navBar?: string;
		navBarFade?: string;
		text?: string;
		primary?: string;
	}
}
