import React from 'react';
import { Path, Svg, G } from 'react-native-svg';
export const Eclipse = ({color,style,size}: {color?:any;style?:any;size:number}) => {return (<Svg style={style} aria-hidden="true"  data-prefix="fas" data-icon="ellipsis-v" 
   viewBox="0 0 192 512" >
  <Path fill={color} d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z" ></Path>
</Svg>);};