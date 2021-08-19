const { resolve } = require('path');
const { readFileSync } = require('fs');

const path = resolve() + '/package.json';

const getDependencies = async () => {
	try {
		const { dependencies } = JSON.parse(readFileSync(path, 'utf-8'));
		return Object.keys(dependencies);
	} catch (err) {
		console.log(err);
	}
};

module.exports = getDependencies;
