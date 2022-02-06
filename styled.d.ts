// import original module declarations
import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		theme: {
			primary: string;
		};
		colors: {
			white10: string;
			white20: string;
			white40: string;
			white60: string;
			white80: string;
			white: string;
			black10: string;
			black20: string;
			black40: string;
			black60: string;
			black80: string;
			black: string;
		};
	}
}
