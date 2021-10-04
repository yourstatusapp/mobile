import * as React from 'react';import { Path, Svg, G } from 'react-native-svg';interface IconMapMarkerProps {color?: any;style?: any;size: number;}export const MapMarker: React.FC<IconMapMarkerProps> = (p) => {return (<Svg style={p.style} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map-marker" role="img"
  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" >
  <Path fill={p.color} d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z" ></Path>
</Svg>);};