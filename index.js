// index.js
// #!/usr/bin/env node

const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs-extra');
const util = require('util');
const chalk = require('chalk');

// Promisify exec so we can use it with async/await
const exec = util.promisify(require('child_process').exec);

// Main function to run the CLI
async function run() {
    log(chalk.blue('🚀 Welcome to the Vite Project Enhancer!'));

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'What is the name of your project?',
            validate: (input) => input ? true : 'Project name cannot be empty.',
        },
        {
            type: 'checkbox',
            name: 'features',
            message: 'Select the features you want to add:',
            choices: [
                { name: 'Redux Toolkit Setup', value: 'redux' },
                { name: 'Authentication Flow (Placeholder)', value: 'auth' },
                { name: 'Axios for API calls', value: 'axios' },
            ],
        },
        {
            type: 'input',
            name: 'customDirs',
            message: 'Enter extra directories to create in `src` (comma-separated):',
            default: 'components,pages,hooks,utils,assets',
        },
    ]);

    await generateProject(answers);
}

// Helper to run a command and show a spinner or message
async function runCommand(command, message) {
    log(chalk.yellow(`⏳ ${message}...`));
    await exec(command);
    log(chalk.green('✅ Done.'));
}

// The main project generation logic
async function generateProject(options) {
    const { projectName, features, customDirs } = options;
    const projectPath = path.join(process.cwd(), projectName);
    const templatePath = path.join(__dirname, 'templates');

    try {
        // === STEP 1: Scaffold with Vite ===
        const viteCommand = `npm create vite@latest ${projectName} -- --template react`;
        await runCommand(viteCommand, `Initializing Vite project '${projectName}'`);

        // === STEP 2: Install Tailwind CSS ===
        const tailwindDeps = 'tailwindcss postcss autoprefixer';
        await runCommand(`cd ${projectPath} && npm install -D ${tailwindDeps}`, 'Installing Tailwind CSS');
        
        // Copy over pre-made Tailwind config files
        fs.copySync(path.join(templatePath, 'tailwind'), projectPath);
        log(chalk.green('✅ Tailwind configured.'));

        // === STEP 3: Install Additional Dependencies ===
        let depsToInstall = [];
        if (features.includes('redux')) depsToInstall.push('@reduxjs/toolkit react-redux');
        if (features.includes('auth')) depsToInstall.push('react-router-dom'); // Auth needs routing
        if (features.includes('axios')) depsToInstall.push('axios');

        if (depsToInstall.length > 0) {
            await runCommand(`cd ${projectPath} && npm install ${depsToInstall.join(' ')}`, `Installing selected packages`);
        }
        
        // === STEP 4: Scaffold Features & Custom Dirs ===
        log(chalk.yellow('🔧 Scaffolding selected features...'));
        // Copy feature files
        if (features.includes('redux')) {
            fs.copySync(path.join(templatePath, 'features', 'redux', 'src'), path.join(projectPath, 'src'));
        }
        if (features.includes('auth')) {
            fs.copySync(path.join(templatePath, 'features', 'auth', 'src'), path.join(projectPath, 'src'));
        }

        // Create custom directories
        const dirsToCreate = customDirs.split(',').map(d => d.trim()).filter(Boolean);
        for (const dir of dirsToCreate) {
            fs.ensureDirSync(path.join(projectPath, 'src', dir));
        }
        log(chalk.green('✅ Features and custom directories created.'));

        // === STEP 5: Finalize ===
        await runCommand(`cd ${projectPath} && git init`, 'Initializing Git repository');

        log(chalk.green.bold(`\n🎉 Success! Your project '${projectName}' is ready.`));
        console.log('To get started:');
        log(chalk.cyan(`   cd ${projectName}`));
        log(chalk.cyan(`   npm install`)); // Vite sometimes requires one final install
        log(chalk.cyan(`   npm run dev`));

    } catch (error) {
        console.error(chalk.red(`\n❌ An error occurred: ${error.message}`));
        // Clean up created directory on error
        if (fs.existsSync(projectPath)) {
            fs.removeSync(projectPath);
        }
    }
}

run();