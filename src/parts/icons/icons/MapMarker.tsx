import React from 'react';
import { Path, Svg, G } from 'react-native-svg';
export const MapMarker = ({color,style,size}: {color?:any;style?:any;size:number}) => {return (<Svg style={style} aria-hidden="true"  data-prefix="fas" data-icon="map-marker" 
   viewBox="0 0 384 512" >
  <Path fill={color} d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z" ></Path>
</Svg>);};