const TEMPLATE_REGISTRY = require("./supportedTech")

module.exports = [
  {
    type: "input",
    name: "projectName",
    message: "What is the name of your project?",
    validate: (input) => (input ? true : "Project name cannot be empty."),
  },
  {
    type: "list",
    name: "template",
    message: "Select a template:",
    choices: Object.values(TEMPLATE_REGISTRY),
    default: "react",
  },
  
  {
    type: "input",
    name: "customDirs",
    message: "Enter extra directories to create in `src` (comma-separated):",
    default: "components,pages,hooks,utils,assets",
  },
];
