const parser = require('@typescript-eslint/parser');
const n8nNodesBase = require('eslint-plugin-n8n-nodes-base');

/**
 * Each target follows the plugin's recommended set; only the deviations are
 * spelled out, so a plugin upgrade brings new rules in by default.
 */
const languageOptions = {
	parser,
	sourceType: 'module',
	parserOptions: {
		project: ['./tsconfig.json'],
		extraFileExtensions: ['.json'],
	},
};

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
	{
		ignores: ['**/*.js', '**/node_modules/**', '**/dist/**'],
	},
	{
		files: ['package.json'],
		plugins: { 'n8n-nodes-base': n8nNodesBase },
		languageOptions,
		rules: {
			...n8nNodesBase.configs.community.rules,
			// The package is scoped, so the starter's default-name check never applies.
			'n8n-nodes-base/community-package-json-name-still-default': 'off',
		},
	},
	{
		files: ['credentials/**/*.ts'],
		plugins: { 'n8n-nodes-base': n8nNodesBase },
		languageOptions,
		rules: {
			...n8nNodesBase.configs.credentials.rules,
			'n8n-nodes-base/cred-class-field-documentation-url-miscased': 'off',
		},
	},
	{
		files: ['nodes/**/*.ts'],
		plugins: { 'n8n-nodes-base': n8nNodesBase },
		languageOptions,
		rules: {
			...n8nNodesBase.configs.nodes.rules,
			// This node declares inputs/outputs as plain string arrays, which the
			// rules only accept in their NodeConnectionType form.
			'n8n-nodes-base/node-class-description-inputs-wrong-regular-node': 'off',
			'n8n-nodes-base/node-class-description-outputs-wrong': 'off',
		},
	},
];
