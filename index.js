// #!/usr/bin/env node
const inquirer = require('inquirer');
const projectPrompts = require('./src/prompts/projectPrompts');
// const featurePrompts = require('./prompts/featurePrompts');
const projectGenerator = require('./src/generators/projectGenerator');


// Main function to run the CLI
async function run() {
  const answers = await inquirer.prompt([
    ...projectPrompts,
    // ...featurePrompts,
    // other prompts...
  ]);
  await projectGenerator(answers);
}

// Run the CLI
run().catch((error) => {
  console.error(chalk.red(`\n❌ Unexpected error: ${error.message}`));
  process.exit(1);
});
