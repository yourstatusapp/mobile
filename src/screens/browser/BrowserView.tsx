import * as React from 'react';
import styled from 'styled-components/native';
import { WebView } from 'react-native-webview';
import { TopHeading } from '@parts';

interface WebViewProps {
	route: {
		params: {
			url: string;
		};
	};
}

export const BrowserView: React.FC<WebViewProps> = (props) => {
	const { route } = props;

	console.log(route);

	return (
		<WebViewBody>
			<TopHeading text={route.params.url?.split('//')[1]} />
			<WebView source={{ uri: route.params.url }} />
		</WebViewBody>
	);
};

const WebViewBody = styled.View`
	flex: 1;
`;
