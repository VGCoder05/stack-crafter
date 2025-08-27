#!/usr/bin/env node

const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const { spawn } = require('child_process');

// Main function to run the CLI
async function run() {
    console.log(chalk.blue('🚀 Welcome to the Vite Project Enhancer!'));

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'What is the name of your project?',
            validate: (input) => input ? true : 'Project name cannot be empty.',
        },
        {
            type: 'list',
            name: 'template',
            message: 'Select a Vite template:',
            choices: [
                { name: 'React', value: 'react' },
                { name: 'React + TypeScript', value: 'react-ts' },
                { name: 'Vue', value: 'vue' },
                { name: 'Vue + TypeScript', value: 'vue-ts' },
                { name: 'Vanilla', value: 'vanilla' },
                { name: 'Vanilla + TypeScript', value: 'vanilla-ts' },
            ],
            default: 'react'
        },
        {
            type: 'checkbox',
            name: 'features',
            message: 'Select the features you want to add:',
            choices: [
                { name: 'Redux Toolkit Setup', value: 'redux' },
                { name: 'Authentication Flow (Placeholder)', value: 'auth' },
                { name: 'Axios for API calls', value: 'axios' },
                { name: 'Tailwind CSS', value: 'tailwind' },
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

// Helper to run a command with proper handling
function runCommand(command, args = [], options = {}) {
    return new Promise((resolve, reject) => {
        const defaultOptions = {
            stdio: 'inherit',
            shell: true,
            ...options
        };

        const child = spawn(command, args, defaultOptions);

        child.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Command failed with exit code ${code}`));
            } else {
                resolve();
            }
        });

        child.on('error', (error) => {
            reject(error);
        });
    });
}

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

// The main project generation logic
async function generateProject(options) {
    const { projectName, template, features, customDirs } = options;
    const projectPath = path.join(process.cwd(), projectName);
    const templatePath = path.join(__dirname, 'templates');

    try {
        // === STEP 1: Scaffold with Vite ===
        console.log(chalk.yellow(`⏳ Initializing Vite project '${projectName}'...`));

        // Use npx to run create-vite with the non-interactive flag
        await runCommand('npx', [
            'create-vite@latest',
            projectName,
            '--template',
            template
        ], { stdio: 'pipe' }); // Use 'pipe' to suppress interactive prompts

        console.log(chalk.green('✅ Vite project created.'));

        // === STEP 2: Install base dependencies ===
        await runNpmCommand('install', projectPath, 'Installing dependencies');

        // === STEP 3: Install Tailwind CSS if selected ===
        if (features.includes('tailwind')) {
            await runNpmCommand('npm install tailwindcss @tailwindcss/vite', projectPath, 'Installing Tailwind CSS');

            // 
            // Update tailwind.config.js
            const viteConfigForTailwind = `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})`;
            fs.writeFileSync(path.join(projectPath, 'vite.config.js'), viteConfigForTailwind);

            // Add Tailwind directives to CSS
            const cssFile = template.includes('react') ? 'src/index.css' : 'src/style.css';
            const cssPath = path.join(projectPath, cssFile);
            const tailwindDirectives = `@import "tailwindcss";`;
            // const existingCss = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf8') : '';
            // fs.writeFileSync(cssPath, tailwindDirectives + existingCss);
            fs.writeFileSync(cssPath, tailwindDirectives);

            console.log(chalk.green('✅ Tailwind configured.'));
        }

        // === STEP 4: Install Additional Dependencies ===
        let depsToInstall = [];
        if (features.includes('redux') && template.includes('react')) {
            depsToInstall.push('@reduxjs/toolkit', 'react-redux');
        }
        if (features.includes('auth')) {
            if (template.includes('react')) depsToInstall.push('react-router-dom');
            if (template.includes('vue')) depsToInstall.push('vue-router');
        }
        if (features.includes('axios')) {
            depsToInstall.push('axios');
        }

        if (depsToInstall.length > 0) {
            await runNpmCommand(`install ${depsToInstall.join(' ')}`, projectPath, 'Installing selected packages');
        }

        // === STEP 5: Scaffold Features & Custom Dirs ===
        console.log(chalk.yellow('🔧 Scaffolding selected features...'));

        // Copy feature templates if they exist
        if (fs.existsSync(templatePath)) {
            features.forEach(feature => {
                const featurePath = path.join(templatePath, 'features', feature, template);
                if (fs.existsSync(featurePath)) {
                    fs.copySync(featurePath, projectPath);
                }
            });
        }

        // Create custom directories
        const dirsToCreate = customDirs.split(',').map(d => d.trim()).filter(Boolean);
        for (const dir of dirsToCreate) {
            fs.ensureDirSync(path.join(projectPath, 'src', dir));
        }
        console.log(chalk.green('✅ Features and custom directories created.'));

        /*
        // === STEP 6: Initialize Git ===
        await runCommand('git', ['init'], { cwd: projectPath });
        console.log(chalk.green('✅ Git repository initialized.'));

        // === STEP 7: Create initial commit ===
        await runCommand('git', ['add', '.'], { cwd: projectPath });
        await runCommand('git', ['commit', '-m', 'Initial commit'], { cwd: projectPath });
*/
        console.log(chalk.green.bold(`\n🎉 Success! Your project '${projectName}' is ready.`));
        console.log('\nTo get started:');
        console.log(chalk.cyan(`   cd ${projectName}`));
        console.log(chalk.cyan(`   npm run dev`));

    } catch (error) {
        console.error(chalk.red(`\n❌ An error occurred: ${error.message}`));
        // Clean up created directory on error
        if (fs.existsSync(projectPath)) {
            fs.removeSync(projectPath);
        }
        process.exit(1);
    }
}

// Run the CLI
run().catch(error => {
    console.error(chalk.red(`\n❌ Unexpected error: ${error.message}`));
    process.exit(1);
});