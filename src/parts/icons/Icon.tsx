
import React from 'react';
import { View, ViewStyle } from 'react-native'
import{ArrowBig}from'./icons/ArrowBig';import{Bell}from'./icons/Bell';import{CameraFlip}from'./icons/CameraFlip';import{Camera}from'./icons/Camera';import{Chat}from'./icons/Chat';import{Checkmark}from'./icons/Checkmark';import{Chevron}from'./icons/Chevron';import{Cog}from'./icons/Cog';import{Conversation}from'./icons/Conversation';import{Dev}from'./icons/Dev';import{Discord}from'./icons/Discord';import{Eclipse}from'./icons/Eclipse';import{Finger}from'./icons/Finger';import{Flashlight}from'./icons/Flashlight';import{Friends}from'./icons/Friends';import{Global}from'./icons/Global';import{HeartOutline}from'./icons/HeartOutline';import{Heart}from'./icons/Heart';import{History}from'./icons/History';import{Image}from'./icons/Image';import{Incoming}from'./icons/Incoming';import{Info}from'./icons/Info';import{Link}from'./icons/Link';import{Location}from'./icons/Location';import{MapMarker}from'./icons/MapMarker';import{Map}from'./icons/Map';import{Moon}from'./icons/Moon';import{Pencil}from'./icons/Pencil';import{Person}from'./icons/Person';import{Phone}from'./icons/Phone';import{Plus}from'./icons/Plus';import{Quil}from'./icons/Quil';import{SadFace}from'./icons/SadFace';import{Search}from'./icons/Search';import{Send}from'./icons/Send';import{Settings}from'./icons/Settings';import{Sparkle}from'./icons/Sparkle';import{Spotify}from'./icons/Spotify';import{Switch}from'./icons/Switch';import{Times}from'./icons/Times';import{Trash}from'./icons/Trash';import{Twitter}from'./icons/Twitter';import{UserAdd}from'./icons/UserAdd';import{Verified}from'./icons/Verified';
export const Icon = ({ name, color, size, style}: {name: string;color?: string;size?: number;style?: ViewStyle;}) => {
	return (
		<View style={style}>
			{ name === 'arrow-big' && <ArrowBig size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'bell' && <Bell size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'camera-flip' && <CameraFlip size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'camera' && <Camera size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'chat' && <Chat size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'checkmark' && <Checkmark size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'chevron' && <Chevron size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'cog' && <Cog size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'conversation' && <Conversation size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'dev' && <Dev size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'discord' && <Discord size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'eclipse' && <Eclipse size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'finger' && <Finger size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'flashlight' && <Flashlight size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'friends' && <Friends size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'global' && <Global size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'heart-outline' && <HeartOutline size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'heart' && <Heart size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'history' && <History size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'image' && <Image size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'incoming' && <Incoming size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'info' && <Info size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'link' && <Link size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'location' && <Location size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'map-marker' && <MapMarker size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'map' && <Map size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'moon' && <Moon size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'pencil' && <Pencil size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'person' && <Person size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'phone' && <Phone size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'plus' && <Plus size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'quil' && <Quil size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'sad-face' && <SadFace size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'search' && <Search size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'send' && <Send size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'settings' && <Settings size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'sparkle' && <Sparkle size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'spotify' && <Spotify size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'switch' && <Switch size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'times' && <Times size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'trash' && <Trash size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'twitter' && <Twitter size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'user-add' && <UserAdd size={size} color={color} style={{ width: size, height: size }} /> }{ name === 'verified' && <Verified size={size} color={color} style={{ width: size, height: size }} /> }
    </View>
  );
};
