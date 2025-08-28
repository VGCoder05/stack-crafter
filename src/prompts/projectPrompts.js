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
    message: "Select a Vite template:",
    choices: [
      { name: "React", value: "react" },
      { name: "React + TypeScript", value: "react-ts" },
      { name: "Vue", value: "vue" },
      { name: "Vue + TypeScript", value: "vue-ts" },
      { name: "Vanilla", value: "vanilla" },
      { name: "Vanilla + TypeScript", value: "vanilla-ts" },
    ],
    default: "react",
  },
  {
    type: "checkbox",
    name: "features",
    message: "Select the features you want to add:",
    choices: [
      { name: "Redux Toolkit Setup", value: "redux" },
      { name: "Authentication Flow (Placeholder)", value: "auth" },
      { name: "Axios for API calls", value: "axios" },
      { name: "Tailwind CSS", value: "tailwind" },
    ],
  },

  {
    type: "list",
    name: "featureTemplates.redux",
    message: "Select a Redux template:",
    when: (answers) => answers.features.includes("redux"),
    choices: [
      { name: "Basic Redux Setup", value: "basic" },
      { name: "Advanced (Slices, Middleware)", value: "advanced" },
    ],
    default: "basic",
  },
  {
    type: "list",
    name: "featureTemplates.auth",
    message: "Select an Auth template:",
    when: (answers) => answers.features.includes("auth"),
    choices: [
      { name: "JWT Auth", value: "jwt" },
      { name: "Firebase Auth", value: "firebase" },
    ],
    default: "jwt",
  },
  {
    type: "list",
    name: "featureTemplates.tailwind",
    message: "Select a Tailwind setup:",
    when: (answers) => answers.features.includes("tailwind"),
    choices: [
      { name: "Basic Tailwind Config", value: "basic" },
      { name: "Tailwind + Dark Mode + Plugins", value: "advanced" },
    ],
    default: "basic",
  },
  {
    type: "input",
    name: "customDirs",
    message: "Enter extra directories to create in `src` (comma-separated):",
    default: "components,pages,hooks,utils,assets",
  },
];
