import * as React from 'react';import { Path, Svg, G } from 'react-native-svg';interface IconLocationProps {color?: any;style?: any;size: number;}export const Location: React.FC<IconLocationProps> = (p) => {return (<Svg style={p.style} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="location-arrow" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><Path fill={p.color} d="M444.52 3.52L28.74 195.42c-47.97 22.39-31.98 92.75 19.19 92.75h175.91v175.91c0 51.17 70.36 67.17 92.75 19.19l191.9-415.78c15.99-38.39-25.59-79.97-63.97-63.97z" class=""></Path></Svg>);};