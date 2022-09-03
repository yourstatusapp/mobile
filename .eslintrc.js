module.exports = {
	root: true,
	extends: '@react-native-community',
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
	rules: {
		'prettier/prettier': 'error',
		'react-native/no-inline-styles': 0,
		curly: 'off',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['off'],
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			rules: {
				'@typescript-eslint/no-shadow': ['error'],
				'no-shadow': 'off',
				'no-undef': 'off',
			},
		},
	],
};
