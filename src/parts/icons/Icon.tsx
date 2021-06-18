import * as React from 'react';
import styled from 'styled-components/native';
import{ArrowBig}from'./icons/ArrowBig';import{Friends}from'./icons/Friends';import{Global}from'./icons/Global';import{Person}from'./icons/Person';
interface IconProps {
	name: string;
	color?: any;
	size?: any;
	style?: any;
}
export const Icon: React.FC<IconProps> = p => {
	return (
		<IconBody style={p.style}>
			{ p.name === 'arrow-big' && <ArrowBig color={p.color} style={{ width: p.size, height: p.size }} /> }{ p.name === 'friends' && <Friends color={p.color} style={{ width: p.size, height: p.size }} /> }{ p.name === 'global' && <Global color={p.color} style={{ width: p.size, height: p.size }} /> }{ p.name === 'person' && <Person color={p.color} style={{ width: p.size, height: p.size }} /> }
    </IconBody>
  );
};
const IconBody = styled.View``;
