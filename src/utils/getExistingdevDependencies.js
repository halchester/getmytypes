const { resolve } = require('path');
const { readFileSync } = require('fs');

const path = resolve() + '/package.json';

const getExistingdevDependencies = async () => {
	const { devDependencies } = JSON.parse(readFileSync(path, 'utf-8'));

	if (!devDependencies) {
		return null;
	}
	return Object.keys(devDependencies).map((item) => {
		item = item.split('/');
		return item[1];
	});
};

module.exports = getExistingdevDependencies;
