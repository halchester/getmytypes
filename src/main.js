const inquirer = require('inquirer');
const getDependencies = require('./utils/getDependencies');
const { exec } = require('child_process');
const ora = require('ora');
const chalk = require('chalk');

const spinner = ora('Installing ... ');

(async () => {
	const { package_manager } = await inquirer.prompt([
		{
			type: 'list',
			message: 'Pick package manager',
			name: 'package_manager',
			choices: ['npm', 'yarn'],
		},
	]);

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
			message: `I will be installing ${chalk.green(
				type_choices.join(', ')
			)} into your devDependencies.`,
			name: 'confirm',
		},
	]);

	if (confirm) {
		spinner.start();
		exec(command, (err, stdout, stderr) => {
			if (err) {
				spinner.stop();
				throw new Error(err);
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				spinner.stop();
			}
			console.log(`stdout: ${stdout}`);
			spinner.stopAndPersist({ text: 'Successfully installed!' });
		});
	} else {
		return;
	}
})();
