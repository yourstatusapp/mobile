import React from 'react';
import { Path, Svg, G } from 'react-native-svg';
export const Flashlight = ({color,style,size}: {color?:any;style?:any;size:number}) => {return (<Svg style={style} aria-hidden="true"  data-prefix="fas" data-icon="flashlight" 
   viewBox="0 0 640 512" >
  <Path fill={color} d="M384 160H32a32 32 0 0 0-32 32v128a32 32 0 0 0 32 32h352l16.12 10.75c43.14 28.76 92.62 45.67 143.88 50.89V98.36c-51.26 5.22-100.74 22.13-143.88 50.89zm-96 128h-32a32 32 0 0 1 0-64h32a32 32 0 0 1 0 64zM608 96h-32v320h32a32 32 0 0 0 32-32V128a32 32 0 0 0-32-32z" ></Path>
</Svg>);};