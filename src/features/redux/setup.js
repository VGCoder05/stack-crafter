const runCommand = require("../../commands/runCommand");
const { copyTemplateFiles } = require("../../utils/fsUtils");
const path = require("path");

async function setupRedux(projectDir) {
  console.log("⚡ Setting up Redux...");

  // 1. Install dependencies
  await runCommand("npm", ["install", "@reduxjs/toolkit", "react-redux"], {
    cwd: projectDir,
  });

  // 2. Copy Redux boilerplate files from templates
  const src = path.join(__dirname, "../../templates/features/redux");
  await copyTemplateFiles(src, path.join(projectDir, "src/redux"));

  // 3. (Optional) inject provider into main.jsx
  // e.g. utils.addImportAndWrap('src/main.jsx', 'Provider', '<Provider store={store}>', '</Provider>');

  console.log("✅ Redux setup complete");
}

module.exports = setupRedux;
