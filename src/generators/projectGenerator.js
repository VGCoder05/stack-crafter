const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");
const { runCommand, runNpmCommand } = require("../commands/index");
const featureGenerator = require("./featureGenerator");

async function projectGenerator(options) {
  const { projectName, template, features, customDirs, featureTemplates } =
    options;
  const projectPath = path.join(process.cwd(), projectName);

  try {
    // === STEP 1: Scaffold with Vite ===
    console.log(
      chalk.yellow(`⏳ Initializing Vite project '${projectName}'...`)
    );

    // create vite project
    await runCommand(
      "npx",
      ["create-vite@latest", projectName, "--template", template],
      { stdio: "pipe" }
    ); // Use 'pipe' to suppress interactive prompts

    console.log(chalk.green("✅ Vite project created."));

    // === STEP 2: Install base dependencies ===
    await runNpmCommand(["install"], projectPath, "Installing dependencies");

    if (features && features.length > 0)
      await featureGenerator(
        projectPath,
        features,
        template,
        customDirs,
        featureTemplates
      );

    // leave further feature scaffolding to featureGenerator

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
