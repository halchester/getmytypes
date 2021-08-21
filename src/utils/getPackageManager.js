const { resolve } = require('path');
const { existsSync } = require('fs');
const chalk = require('chalk');

const lockFiles = {
	'yarn.lock': 'yarn',
	'package-lock.json': 'npm',
};

const getPackageManager = async () => {
	const path = resolve();

	for (let lockFile of Object.keys(lockFiles)) {
		if (existsSync(path + `/${lockFile}`)) {
			console.log(
				chalk.greenBright(
					`Detected ${lockFile} in your directory, setting package manager to ${lockFiles[lockFile]}`
				)
			);
			return { package_manager: lockFiles[lockFile] };
		}
	}
};

module.exports = getPackageManager;
