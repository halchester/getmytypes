const inquirer = require('inquirer');
const path = require('path');
const getDependencies = require('./utils/getDependencies');

(async () => {
	const { package_manager } = await inquirer.prompt([
		{
			type: 'list',
			message: 'Pick package manager',
			name: 'package_manager',
			choices: ['npm', 'yarn'],
		},
	]);

	const { confirm } = await inquirer.prompt([
		{
			type: 'confirm',
			message: `Installing all type files in your package.json with ${package_manager}`,
			name: 'confirm',
		},
	]);

	if (confirm) {
		let dependencies = await getDependencies();

		console.log(dependencies);
	} else {
		return;
	}
})();
