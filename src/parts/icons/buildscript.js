const fs = require('fs');

const SVG_FOLDER = './svg';
const BUILD_FOLDER = './icons';

const ICON_BASE =
	"import * as React from 'react';import { Path, Svg, G } from 'react-native-svg';interface IconSVG_NAMEProps {color?: any;style?: any;size: number;}export const SVG_NAME: React.FC<IconSVG_NAMEProps> = (p) => {return (%%_SVG_CONTENT_%%);};";

const MASTER_BASE = `import * as React from 'react';
import styled from 'styled-components/native';
%%_IMPORTS_%%
interface IconProps {
	name: string;
	color?: any;
	size?: any;
	style?: any;
}
export const Icon: React.FC<IconProps> = p => {
	return (
		<IconBody style={p.style}>
			%%_IMPORTS2_%%
    </IconBody>
  );
};
const IconBody = styled.View${'``'};
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
		if (svgTitleName.includes('-')) svgTitleName = svgTitleName.split('-')[0] + svgTitleName.split('-')[1].charAt(0).toUpperCase() + svgTitleName.split('-')[1].slice(1);

		// Read the contents
		let svgContent = fs.readFileSync(`${SVG_FOLDER}/${svg}`, { encoding: 'utf8' }).replace('<svg', '<svg style={p.style}');
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
			_render + `{ p.name === '${svg.split('.')[0].charAt(0) + svg.split('.')[0].slice(1)}' && <${svgTitleName} size={p.size} color={p.color} style={{ width: p.size, height: p.size }} /> }`;
		count++;
	}

	// delete the Main component
	fs.rmSync('./Icon.tsx', { recursive: true, force: true });

	// build file content
	let IconContent = MASTER_BASE.replace('%%_IMPORTS_%%', _imports).replace('%%_IMPORTS2_%%', _render);

	// Create file
	fs.writeFileSync('./Icon.tsx', IconContent, { encoding: 'utf8' });
	console.log(`\n🔥 Processed ${count} icons\n`);
})();

const parsePropertiesNames = (text) => {
	if (text?.includes('enable-width')) text.split('enable-width=').map(() => (text = text.replace(/(enable-width=)/, 'enableWidth=')));
	if (text?.includes('enable-linecap')) text.split('enable-linecap=').map(() => (text = text.replace(/(enable-linecap=)/, 'strokeLinecap=')));
	if (text?.includes('enable-linejoin')) text.split('enable-linejoin=').map(() => (text = text.replace(/(enable-linejoin=)/, 'strokeLinejoin=')));
	if (text?.includes('enable-background')) text.split('enable-background=').map(() => (text = text.replace(/(enable-background=)/, 'enableBackground=')));
	if (text?.includes('clip-rule')) text.split('clip-rule=').map(() => (text = text.replace(/(clip-rule=)/, 'clipRule=')));
	if (text?.includes('clip-path')) text.split('clip-path=').map(() => (text = text.replace(/(clip-path=)/, 'clipPath=')));
	if (text?.includes('fill-rule')) text.split('fill-rule=').map(() => (text = text.replace(/(fill-rule=)/, 'fillRule=')));
	if (text?.includes('stroke-width')) text.split('stroke-width=').map(() => (text = text.replace(/(stroke-width=)/, 'strokeWidth=')));

	return text;
};

const parseColorNames = (text) => {
	if (text?.includes('fill=')) text.split('fill=').map(() => (text = text.replace(/(fill=)\"(.+?)\"/, 'fill={p.color}')));
	return text;
};

const sizeProperties = (text) => {
	if (text?.includes('width=')) text.split('width=').map(() => (text = text.replace(/(width=)\"(.+?)\"/, 'width={p.size}')));
	if (text?.includes('height=')) text.split('height=').map(() => (text = text.replace(/(height=)\"(.+?)\"/, 'height={p.size}')));
	return text;
};

const removeProperties = (text) => {
	if (text?.includes('class=')) text.split('class=').map(() => (text = text.replace(/(class=)\"(.+?)\"/, '')));
	return text;
};

// Fix all tags
const fixTags = (text) => {
	text = fixTag(text, 'svg');
	text = fixTag(text, 'path');
	text = fixTag(text, 'g');

	return text;
};

// Transform normal tag names to upper case for react native since they don't support lower case starting tags
const fixTag = (text, tagName) => {
	text.split(`<${tagName}`).map(() => {
		text = text?.replace(`<${tagName}`, `<${tagName?.length > 0 ? tagName.charAt(0).toUpperCase() + tagName?.slice(1, tagName.length) : tagName.toUpperCase()}`);
	});

	text.split(`/${tagName}>`).map(() => {
		text = text?.replace(`/${tagName}>`, `/${tagName?.length > 0 ? tagName.charAt(0).toUpperCase() + tagName?.slice(1, tagName.length) : tagName.toUpperCase()}>`);
	});

	return text;
};
