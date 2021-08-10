import * as React from 'react';import { Path, Svg, G } from 'react-native-svg';interface IconChevronProps {color?: any;style?: any;size: number;}export const Chevron: React.FC<IconChevronProps> = (p) => {return (<Svg style={p.style} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" role="img"
  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" >
  <Path fill={p.color} d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" class=""></Path>
</Svg>);};