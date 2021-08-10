import * as React from 'react';
import styled from 'styled-components/native';
import{ArrowBig}from'./icons/ArrowBig';import{Bell}from'./icons/Bell';import{Chevron}from'./icons/Chevron';import{Conversation}from'./icons/Conversation';import{Eclipse}from'./icons/Eclipse';import{Friends}from'./icons/Friends';import{Global}from'./icons/Global';import{Info}from'./icons/Info';import{Moon}from'./icons/Moon';import{Pencil}from'./icons/Pencil';import{Person}from'./icons/Person';import{Plus}from'./icons/Plus';import{Quil}from'./icons/Quil';import{Search}from'./icons/Search';import{Send}from'./icons/Send';import{Settings}from'./icons/Settings';import{Times}from'./icons/Times';import{Trash}from'./icons/Trash';import{UserAdd}from'./icons/UserAdd';
interface IconProps {
	name: string;
	color?: any;
	size?: any;
	style?: any;
}
export const Icon: React.FC<IconProps> = p => {
	return (
		<IconBody style={p.style}>
			{ p.name === 'arrow-big' && <ArrowBig size={p.size} color={p.color} style={{ width: p.size, height: p.size }} /> }{ p.name === 'bell' && <Bell size={p.size} color={p.color} style={{ width: p.size, height: p.size }} /> }{ p.name === 'chevron' && <Chevron size={p.size} color={p.color} style={{ width: p.size, height: p.size }} /> }{ p.name === 'conversation' && <Conversation size={p.size} color={p.color} style={{ width: p.size, height: p.size }} /> }{ p.name === 'eclipse' && <Eclipse size={p.size} color={p.color} style={{ width: p.size, height: p.size }} /> }{ p.name === 'friends' && <Friends size={p.size} color={p.color} style={{ width: p.size, height: p.size }} /> }{ p.name === 'global' && <Global size={p.size} color={p.color} style={{ width: p.size, height: p.size }} /> }{ p.name === 'info' && <Info size={p.size} color={p.color} style={{ width: p.size, height: p.size }} /> }{ p.name === 'moon' && <Moon size={p.size} color={p.color} style={{ width: p.size, height: p.size }} /> }{ p.name === 'pencil' && <Pencil size={p.size} color={p.color} style={{ width: p.size, height: p.size }} /> }{ p.name === 'person' && <Person size={p.size} color={p.color} style={{ width: p.size, height: p.size }} /> }{ p.name === 'plus' && <Plus size={p.size} color={p.color} style={{ width: p.size, height: p.size }} /> }{ p.name === 'quil' && <Quil size={p.size} color={p.color} style={{ width: p.size, height: p.size }} /> }{ p.name === 'search' && <Search size={p.size} color={p.color} style={{ width: p.size, height: p.size }} /> }{ p.name === 'send' && <Send size={p.size} color={p.color} style={{ width: p.size, height: p.size }} /> }{ p.name === 'settings' && <Settings size={p.size} color={p.color} style={{ width: p.size, height: p.size }} /> }{ p.name === 'times' && <Times size={p.size} color={p.color} style={{ width: p.size, height: p.size }} /> }{ p.name === 'trash' && <Trash size={p.size} color={p.color} style={{ width: p.size, height: p.size }} /> }{ p.name === 'user-add' && <UserAdd size={p.size} color={p.color} style={{ width: p.size, height: p.size }} /> }
    </IconBody>
  );
};
const IconBody = styled.View``;
