import * as React from 'react';import { Path, Svg, G } from 'react-native-svg';interface IconArrowBigProps {color?: any;style?: any;}export const ArrowBig: React.FC<IconArrowBigProps> = (p) => {return (<Svg style={p.style} width="26" height="23" viewBox="0 0 26 23" fill={p.color}
  xmlns="http://www.w3.org/2000/svg">
  <Path d="M0 8.73458V14.2597C0 15.0251 0.620913 15.6409 1.3927 15.6409H11.9985C12.5508 15.6409 12.9985 16.0887 12.9985 16.6409V21.6149C12.9985 22.8466 14.4957 23.4624 15.3777 22.5933L25.5909 12.4755C26.1364 11.9345 26.1364 11.0597 25.5909 10.5187L15.3777 0.406652C14.5015 -0.462399 12.9985 0.153419 12.9985 1.38505V6.3533C12.9985 6.90559 12.5508 7.3533 11.9985 7.3533H1.3927C0.620913 7.3533 0 7.96912 0 8.73458Z" fill={p.color}/>
</Svg>
);};