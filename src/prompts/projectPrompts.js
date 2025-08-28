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
    choices: [
      // Frontend only
      { 
        name: "React", 
        value: "react",
        type: "frontend",
        framework: "react",
        language: "javascript"
      },
      { 
        name: "React + TypeScript", 
        value: "react-ts",
        type: "frontend",
        framework: "react",
        language: "typescript"
      },
      { 
        name: "Vue", 
        value: "vue",
        type: "frontend",
        framework: "vue",
        language: "javascript"
      },
      { 
        name: "Vue + TypeScript", 
        value: "vue-ts",
        type: "frontend",
        framework: "vue",
        language: "typescript"
      },
      { 
        name: "Vanilla", 
        value: "vanilla",
        type: "frontend",
        framework: "vanilla",
        language: "javascript"
      },
      { 
        name: "Vanilla + TypeScript", 
        value: "vanilla-ts",
        type: "frontend",
        framework: "vanilla",
        language: "typescript"
      },
      
      // Backend only
      { 
        name: "Express", 
        value: "express",
        type: "backend",
        framework: "express",
        language: "javascript"
      },
      { 
        name: "Express + TypeScript", 
        value: "express-ts",
        type: "backend",
        framework: "express",
        language: "typescript"
      },
      { 
        name: "Fastify", 
        value: "fastify",
        type: "backend",
        framework: "fastify",
        language: "javascript"
      },
      
      // Full-stack
      { 
        name: "MERN (MongoDB, Express, React, Node)", 
        value: "mern",
        type: "fullstack",
        frontend: { framework: "react", language: "javascript" },
        backend: { framework: "express", language: "javascript" }
      },
      { 
        name: "MERN + TypeScript", 
        value: "mern-ts",
        type: "fullstack",
        frontend: { framework: "react", language: "typescript" },
        backend: { framework: "express", language: "typescript" }
      },
      { 
        name: "Vue + Express", 
        value: "vue-express",
        type: "fullstack",
        frontend: { framework: "vue", language: "javascript" },
        backend: { framework: "express", language: "javascript" }
      },
    ],
    default: "react",
  },
  
  {
    type: "input",
    name: "customDirs",
    message: "Enter extra directories to create in `src` (comma-separated):",
    default: "components,pages,hooks,utils,assets",
  },
];
