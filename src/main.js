const inquirer = require('inquirer');
const getDependencies = require('./utils/getDependencies');
const { exec } = require('child_process');
const ora = require('ora');
const chalk = require('chalk');
const getPackageManager = require('./utils/getPackageManager');

const spinner = ora('Installing ... ');

getPackageManager();

(async () => {
	const package_manager = await getPackageManager();

	let dependencies = await getDependencies();

	let command = `${package_manager} ${
		package_manager === 'yarn' ? 'add' : 'install'
	} -D`;

	const { type_choices } = await inquirer.prompt([
		{
			type: 'checkbox',
			message: `Pick what type files you want to install 
  ${chalk.red('Some packages may not have type files!')}`,
			name: 'type_choices',
			choices: dependencies,
		},
	]);

	type_choices.forEach((d) => (command += ' ' + `@types/${d}`));

	const { confirm } = await inquirer.prompt([
		{
			type: 'confirm',
			message: `I will be installing ${chalk.underline(
				'@types'
			)} of ${chalk.green(
				type_choices.join(', ')
			)} into your devDependencies with ${chalk.green(package_manager)}.`,
			name: 'confirm',
		},
	]);

	if (confirm) {
		spinner.start();
		exec(command, (err, _stdout) => {
			if (err) {
				console.error(err.message);
				spinner.stopAndPersist({ symbol: '❌', text: 'Installation failed!' });
				return;
			}
			spinner.stopAndPersist({ text: 'Successfully installed!' });
		});
	} else {
		return;
	}
})();
