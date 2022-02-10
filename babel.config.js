module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		'transform-remove-console',
		'@babel/plugin-proposal-export-namespace-from',
		[
			'module-resolver',
			{
				root: ['./src'],
				alias: {
					'@core': './src/core',
					'@parts': './src/parts',
				},
				extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.json', '.tsx', '.ts', '.native.js'],
			},
		],
		'react-native-reanimated/plugin',
	],
};
