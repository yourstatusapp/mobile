const fs = require('fs');

const SVG_FOLDER = './svg';
const BUILD_FOLDER = './icons';

const ICON_BASE = `import React from 'react';
import { Path, Svg, G, Defs, ClipPath, Rect } from 'react-native-svg';
export const SVG_NAME = ({color,style,size}: {color?:any;style?:any;size:number}) => {return (%%_SVG_CONTENT_%%);};`;

const MASTER_BASE = `
import React from 'react';
import { View, ViewStyle } from 'react-native'
%%_IMPORTS_%%
export const Icon = ({ name, color, size, style}: {name: string;color?: string;size?: number;style?: ViewStyle;}) => {
	return (
		<View style={style}>
			%%_IMPORTS2_%%
    </View>
  );
};
`;

(async function () {
	fs.rmSync(`${BUILD_FOLDER}`, { recursive: true, force: true });
	fs.mkdirSync(`${BUILD_FOLDER}`, { recursive: true });

	const svgs = fs.readdirSync(SVG_FOLDER, { encoding: 'utf8' });
	let _imports = '';
	let _render = '';
	let count = 0;

	// loop trough the svg folder
	for await (let svg of svgs) {
		console.log(svg);
		let svgTitleName = svg.split('.')[0].charAt(0).toUpperCase() + svg.split('.')[0].slice(1);

		// If there is a dash included, parse the svg title
		if (svgTitleName.includes('-')) {
			svgTitleName =
				svgTitleName.split('-')[0] +
				svgTitleName.split('-')[1].charAt(0).toUpperCase() +
				svgTitleName.split('-')[1].slice(1);
		}

		// Read the contents
		let svgContent = fs
			.readFileSync(`${SVG_FOLDER}/${svg}`, { encoding: 'utf8' })
			.replace('<svg', '<svg style={style}');
		svgContent = parsePropertiesNames(svgContent);
		svgContent = parseColorNames(svgContent);
		svgContent = sizeProperties(svgContent);

		// Remove unused properties
		svgContent = removeProperties(svgContent);

		// Fix all the tag names to capital
		svgContent = fixTags(svgContent);

		// Filter out properties we don't need
		let template = ICON_BASE.replace('%%_SVG_CONTENT_%%', svgContent);

		// update the namespace in the file
		template = template.split('SVG_NAME').join(svgTitleName);

		// Create file
		fs.writeFileSync(`${BUILD_FOLDER}/${svgTitleName}.tsx`, template, {
			encoding: 'utf8',
		});

		// Build the imports and the content for the component
		_imports = _imports + `import{${svgTitleName}}from'./icons/${svgTitleName}';`;
		_render =
			_render +
			`{ name === '${
				svg.split('.')[0].charAt(0) + svg.split('.')[0].slice(1)
			}' && <${svgTitleName} size={size} color={color} style={{ width: size, height: size }} /> }`;
		count++;
	}

	// delete the Main component
	fs.rmSync('./Icon.tsx', { recursive: true, force: true });

	// build file content
	let IconContent = MASTER_BASE.replace('%%_IMPORTS_%%', _imports).replace(
		'%%_IMPORTS2_%%',
		_render,
	);

	// Create file
	fs.writeFileSync('./Icon.tsx', IconContent, { encoding: 'utf8' });
	console.log(`\n🔥 Processed ${count} icons\n`);
})();

const parsePropertiesNames = text => {
	text = text.replaceAll(/(enable-width=)/g, 'enableWidth=');
	text = text.replaceAll(/(enable-linecap=)/g, 'strokeLinecap=');
	text = text.replaceAll(/(enable-linejoin=)/g, 'strokeLinejoin=');
	text = text.replaceAll(/(enable-background=)/g, 'enableBackground=');
	text = text.replaceAll(/(clip-rule=)/g, 'clipRule=');
	text = text.replaceAll(/(clip-path=)/g, 'clipPath=');
	text = text.replaceAll(/(fill-rule=)/g, 'fillRule=');
	text = text.replaceAll(/(stroke-width=)/g, 'strokeWidth=');
	return text;
};

const parseColorNames = text => {
	text = text.replaceAll(/(fill=)"(.+?|)"()/g, 'fill={color}');
	return text;
};

const sizeProperties = text => {
	text = text.replaceAll(/(width=)"(.+?|)"()/g, 'width={size}');
	text = text.replaceAll(/(height=)"(.+?|)"()/g, 'height={size}');
	return text;
};

const removeProperties = text => {
	text = text.replaceAll(/(class=)"(.+?|)"()/g, '');
	text = text.replaceAll(/(xmlns=)"(.+?|)"()/g, '');
	text = text.replaceAll(/(focusable=)"(.+?|)"()/g, '');
	text = text.replaceAll(/(role=)"(.+?|)"()/g, '');
	return text;
};

// Fix all tags
const fixTags = text => {
	text = fixTag(text, 'svg');
	text = fixTag(text, 'path');
	text = fixTag(text, 'g');
	text = fixTag(text, 'defs');
	text = fixTag(text, 'clipPath');
	text = fixTag(text, 'rect');

	return text;
};

// Transform normal tag names to upper case for react native since they don't support lower case starting tags
const fixTag = (text, tagName) => {
	text.split(`<${tagName}`).map(() => {
		text = text?.replace(
			`<${tagName}`,
			`<${
				tagName?.length > 0
					? tagName.charAt(0).toUpperCase() + tagName?.slice(1, tagName.length)
					: tagName.toUpperCase()
			}`,
		);
	});

	text.split(`/${tagName}>`).map(() => {
		text = text?.replace(
			`/${tagName}>`,
			`/${
				tagName?.length > 0
					? tagName.charAt(0).toUpperCase() + tagName?.slice(1, tagName.length)
					: tagName.toUpperCase()
			}>`,
		);
	});

	return text;
};
