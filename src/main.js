const inquirer = require('inquirer');
const getDependencies = require('./utils/getDependencies');
const { exec } = require('child_process');
const ora = require('ora');

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
			message: 'Pick what type files you want to install',
			name: 'type_choices',
			choices: dependencies,
		},
	]);

	type_choices.forEach((d) => (command += ' ' + `@types/${d}`));

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
})();
