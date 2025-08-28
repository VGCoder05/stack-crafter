const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");
const featuresConfig = require("../features");
const customDirectoryGenerator = require("./customDirectoryGenerator");

async function featureGenerator(
  projectPath,
  selectedFeatures,
  template,
  customDirs,
  featureTemplates
) {
  console.log(chalk.yellow("🔧 Scaffolding selected features..."));

  // Extract the base framework from template (react-ts -> react)
  const baseFramework = template.split('-')[0];
  const isTypeScript = template.includes('-ts');

  // Process each selected feature
  for (const featureKey of selectedFeatures) {
    const feature = featuresConfig[featureKey];
    if (!feature) {
      console.log(chalk.yellow(`⚠️  No handler found for feature: ${featureKey}`));
      continue;
    }

    // Get the specific template for this feature (if user selected one)
    const selectedTemplate = featureTemplates?.[featureKey] || 'basic';
    
    console.log("feature.setup : ",feature.setup)
    // Call the feature's setup function
    if (feature.setup) {
      await feature.setup(projectPath, { 
        framework: baseFramework,
        isTypeScript,
        featureTemplate: selectedTemplate 
      });
    }
  }

  customDirectoryGenerator(customDirs)

  console.log(chalk.green("✅ Features created successfully!"));
}

module.exports = featureGenerator;

