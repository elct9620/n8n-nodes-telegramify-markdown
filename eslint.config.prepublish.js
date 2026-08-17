const base = require('./eslint.config.js');

/**
 * Publishing is the point where a leftover starter package name would ship,
 * so the check the everyday config relaxes is enforced here.
 */
/** @type {import('eslint').Linter.Config[]} */
module.exports = [
	...base,
	{
		files: ['package.json'],
		rules: {
			'n8n-nodes-base/community-package-json-name-still-default': 'error',
		},
	},
];
