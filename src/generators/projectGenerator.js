const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");
const { runCommand, runNpmCommand } = require("../commands/index");
const featureGenerator = require("./featureGenerator");
const frontend = require("./frontendGenerator");
const backend = require("./backendGenerator");

async function projectGenerator(options, templateConfig) {

  console.log(templateConfig)


  try {
    // Create project structure based on template type
    switch (templateConfig.type) {
      case 'frontend':
        await frontend(options)
        break;

      case 'backend':
        await backend(options)
        break;

      case 'fullstack':
        await frontend(options);
        await backend(options);
        break;

      default:
        throw new Error(`Unknown template type: ${templateConfig.type}`);
    }

    console.log(
      chalk.green.bold(`\n🎉 Success! Your project '${projectName}' is ready.`)
    );
    console.log("\nTo get started:");
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

module.exports = projectGenerator;
