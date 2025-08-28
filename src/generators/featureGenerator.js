const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");
const featuresConfig = require("../features"); // index that maps feature keys to setup functions

async function featureGenerator(
  projectPath,
  selectedFeatures,
  template,
  customDirs,
  featureTemplates
) {
  console.log(chalk.yellow("🔧 Scaffolding selected features..."));

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
        template,
        featureTemplate: selectedTemplate 
      });
    }

    // Copy feature template files if they exist
    const featurePath = path.join(
      __dirname, 
      "..", 
      "templates", 
      "features", 
      featureKey,
      selectedTemplate
    );

    console.log(`📁 Checking for feature template at: ${featurePath}`);

    if (fs.existsSync(featurePath)) {
      console.log(chalk.blue(`📋 Copying ${featureKey} (${selectedTemplate}) template files...`));
      fs.copySync(featurePath, projectPath, { overwrite: false });
    } else {
      console.log(chalk.yellow(`⚠️  No template files found for ${featureKey} (${selectedTemplate})`));
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