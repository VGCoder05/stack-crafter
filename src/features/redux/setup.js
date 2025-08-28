const runCommand = require("../../commands/runCommand");
const { copyTemplateFiles } = require("../../utils/fsUtils");
const path = require("path");
const fs = require("fs-extra");

async function setupRedux(projectDir, options = {}) {

  const { framework = 'react', ts, featureTemplate = 'basic' } = options;
  
  console.log(`⚡ Setting up Redux (${featureTemplate}) for ${framework}...`);

  // 1. Install dependencies based on framework
  const deps = framework === 'react' 
    ? ["@reduxjs/toolkit", "react-redux"]
    : ["@reduxjs/toolkit"]; // Add vue-redux or other framework-specific packages

  await runCommand("npm", ["install", ...deps], {
    cwd: projectDir,
  });

  // 2. Copy Redux boilerplate files from templates
  const templatePath = path.join(__dirname, "../../../templates/features/redux", featureTemplate);
  const targetPath = path.join(projectDir, "src");
    console.log("templatePath : ",templatePath)
    console.log("targetPath : ",targetPath)
  
  if (fs.existsSync(templatePath)) {
    await copyTemplateFiles(templatePath, targetPath);
  }

  // 3. Framework-specific setup
  if (framework === 'react') {
    // TODO: Inject Provider into main.jsx
    console.log("💡 Remember to wrap your App with Redux Provider in main.jsx");
  }

  console.log("✅ Redux setup complete");
}

module.exports = { setup: setupRedux };