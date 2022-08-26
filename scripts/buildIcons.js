const fs = require('fs');

const ICON_FILE = `
import React from 'react';
import { ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';
import * as icons from '../assets/icons';

interface IIconProps {
	name: Icons;
	size?: number;
	color?: string;
	style?: ViewStyle;
}

$ICONS$

export const Icon = (props: IIconProps) => {
	const s = props?.size || 20;
	return (
		<SvgXml
			xml={icons[props.name]}
			height={s}
			width={s}
			color={props?.color || 'black'}
			style={props?.style}
		/>
	);
};`;
const ICONS_ASSETS_FOLDER = './src/assets/icons';
const SVG_ASSETS_FOLDER = './src/assets/svg';
const ICON_COMPONENT_LOCATION = './src/parts/';
const TS_ICON_FILE_CONTENT = 'export default `$`';

let SVG_COUNT = 0;
let INDEX_FILE_CONTENT = ``;
let EXPORT_ICONS_TYPE_LIST = ``;
let iconsList = [];

const svgs = fs.readdirSync(SVG_ASSETS_FOLDER, { encoding: 'utf8' });

for (let svg of svgs) {
	SVG_COUNT++;
	const friendlyName = svg.replace('-', '_').split('.')[0];

	EXPORT_ICONS_TYPE_LIST = EXPORT_ICONS_TYPE_LIST + `'${friendlyName}' | `;
	iconsList.push(friendlyName);

	INDEX_FILE_CONTENT =
		INDEX_FILE_CONTENT +
		`export { default as ${friendlyName} } from './${svg.split('.')[0]}';`;

	const SVG_CONTENT = fs.readFileSync(SVG_ASSETS_FOLDER + '/' + svg, {
		encoding: 'utf-8',
	});

	// create the ts file
	fs.writeFileSync(
		`${ICONS_ASSETS_FOLDER}/${svg.split('.svg')[0]}.ts`,
		TS_ICON_FILE_CONTENT.replace('$', SVG_CONTENT),
		{ encoding: 'utf8' },
	);
}

// we need to create the index file for the icons
// const INDEX_FILE_CONTENT = `export { default as chevron } from './chevron';`
fs.writeFileSync(`${ICONS_ASSETS_FOLDER}/index.ts`, INDEX_FILE_CONTENT, {
	encoding: 'utf8',
});

const lastIndexOfLine = EXPORT_ICONS_TYPE_LIST.lastIndexOf('|');

EXPORT_ICONS_TYPE_LIST = EXPORT_ICONS_TYPE_LIST.slice(0, lastIndexOfLine);

const NEW_ICON_FILE = ICON_FILE.replace(
	'$ICONS$',
	`export type Icons = ${EXPORT_ICONS_TYPE_LIST};`,
);

fs.writeFileSync(`${ICON_COMPONENT_LOCATION}/Icon.tsx`, NEW_ICON_FILE, {
	encoding: 'utf8',
});

console.log(`\n🔥 Processed ${SVG_COUNT} icons\n`);
