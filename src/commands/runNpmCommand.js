const chalk = require('chalk');
const runCommand = require('./runCommand');

// Helper to run npm commands in a specific directory
async function runNpmCommand(command, cwd, message) {
    console.log(chalk.yellow(`⏳ ${message}...`));
    try {
        await runCommand('npm', command.split(' '), { cwd });
        console.log(chalk.green('✅ Done.'));
    } catch (error) {
        throw error;
    }
}

module.exports = runNpmCommand
