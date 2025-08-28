const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");
const featuresConfig = require("../features");

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
    
    // Call the feature's setup function
    if (feature.setup) {
      await feature.setup(projectPath, { 
        framework: baseFramework,
        isTypeScript,
        featureTemplate: selectedTemplate 
      });
    }
  }

  // Create custom directories
  if (customDirs) {
    const dirsToCreate = customDirs
      .split(",")
      .map((d) => d.trim())
      .filter(Boolean);
    
    for (const dir of dirsToCreate) {
      const dirPath = path.join(projectPath, "src", dir);
      fs.ensureDirSync(dirPath);
      console.log(chalk.gray(`📁 Created directory: src/${dir}`));
    }
  }

  console.log(chalk.green("✅ Features and custom directories created successfully!"));
}

module.exports = featureGenerator;