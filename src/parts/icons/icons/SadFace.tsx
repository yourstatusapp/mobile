import * as React from 'react';import { Path, Svg, G } from 'react-native-svg';interface IconSadFaceProps {color?: any;style?: any;size: number;}export const SadFace: React.FC<IconSadFaceProps> = (p) => {return (<Svg style={p.style} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sad-tear" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" ><Path fill={p.color} d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm80 168c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM152 416c-26.5 0-48-21-48-47 0-20 28.5-60.4 41.6-77.8 3.2-4.3 9.6-4.3 12.8 0C171.5 308.6 200 349 200 369c0 26-21.5 47-48 47zm16-176c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm170.2 154.2C315.8 367.4 282.9 352 248 352c-21.2 0-21.2-32 0-32 44.4 0 86.3 19.6 114.7 53.8 13.8 16.4-11.2 36.5-24.5 20.4z" class=""></Path></Svg>);};