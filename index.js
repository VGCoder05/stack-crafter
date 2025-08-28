// #!/usr/bin/env node
const inquirer = require('inquirer');
const projectPrompts = require('./src/prompts/projectPrompts');
const featurePrompts = require('./src/prompts/featurePrompts');
const projectGenerator = require('./src/generators/projectGenerator');


// Main function to run the CLI
async function run() {
  const answers = await inquirer.prompt([
    ...projectPrompts,
    ...featurePrompts,
  ]);

  // Find the selected template configuration
  const templateConfig = projectPrompts
    .find(p => p.name === 'template')
    .choices
    .find(c => c.value === answers.template);

  await projectGenerator(answers, templateConfig);
}

// Run the CLI
run().catch((error) => {
  console.error(chalk.red(`\n❌ Unexpected error: ${error.message}`));
  process.exit(1);
});
