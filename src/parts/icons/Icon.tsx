import * as React from 'react';
import styled from 'styled-components/native';
import{ArrowBig}from'./icons/ArrowBig';
interface IconProps {
	name: string;
	color?: any;
	size?: any;
	style?: any;
}
export const Icon: React.FC<IconProps> = p => {
	return (
		<IconBody style={p.style}>
			{ p.name === 'arrow-big' && <ArrowBig color={p.color} style={{ width: p.size, height: p.size }} /> }
    </IconBody>
  );
};
const IconBody = styled.View``;
