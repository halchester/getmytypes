const { resolve } = require('path');
const { readFileSync } = require('fs');

const path = resolve() + '/package.json';

const getDependencies = async () => {
	// await readFileSync((err, data) => {
	// 	if (err) {
	// 		throw new Error('File not found!');
	// 	}
	// 	const { dependencies } = JSON.parse(data);

	// 	return Object.keys(dependencies);
	// });
	try {
		const { dependencies } = JSON.parse(readFileSync(path, 'utf-8'));
		return Object.keys(dependencies);
	} catch (err) {
		console.log(err);
	}
};

module.exports = getDependencies;
