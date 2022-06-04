module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		'@babel/plugin-proposal-export-namespace-from',
		[
			'module-resolver',
			{
				root: ['./src'],
				alias: {
					'@core': './src/core',
					'@parts': './src/parts',
					'@hooks': './src/hooks',
				},
				extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.json', '.tsx', '.ts', '.native.js'],
			},
		],

		['react-native-reanimated/plugin', { globals: ['__decode'] }],
	],
	env: {
		production: {
			plugins: ['transform-remove-console'],
		},
	},
};
