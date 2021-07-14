import * as React from 'react';
import styled from 'styled-components/native';
import{ArrowBig}from'./icons/ArrowBig';import{Conversation}from'./icons/Conversation';import{Friends}from'./icons/Friends';import{Global}from'./icons/Global';import{Person}from'./icons/Person';import{Quil}from'./icons/Quil';import{Settings}from'./icons/Settings';
interface IconProps {
	name: string;
	color?: any;
	size?: any;
	style?: any;
}
export const Icon: React.FC<IconProps> = p => {
	return (
		<IconBody style={p.style}>
			{ p.name === 'arrow-big' && <ArrowBig size={p.size} color={p.color} style={{ width: p.size, height: p.size }} /> }{ p.name === 'conversation' && <Conversation size={p.size} color={p.color} style={{ width: p.size, height: p.size }} /> }{ p.name === 'friends' && <Friends size={p.size} color={p.color} style={{ width: p.size, height: p.size }} /> }{ p.name === 'global' && <Global size={p.size} color={p.color} style={{ width: p.size, height: p.size }} /> }{ p.name === 'person' && <Person size={p.size} color={p.color} style={{ width: p.size, height: p.size }} /> }{ p.name === 'quil' && <Quil size={p.size} color={p.color} style={{ width: p.size, height: p.size }} /> }{ p.name === 'settings' && <Settings size={p.size} color={p.color} style={{ width: p.size, height: p.size }} /> }
    </IconBody>
  );
};
const IconBody = styled.View``;
