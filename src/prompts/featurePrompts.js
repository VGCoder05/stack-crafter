const TEMPLATE_REGISTRY = require("./supportedTech")

// Define features by category
const FRONTEND_FEATURES = [
  { name: "Redux Toolkit Setup", value: "redux" },
  { name: "Axios for API calls", value: "axios" },
  { name: "Tailwind CSS", value: "tailwind" },
  { name: "React Router", value: "router" },
  { name: "State Management (Zustand)", value: "zustand" },
];

const BACKEND_FEATURES = [
  { name: "Authentication (JWT/Session)", value: "auth" },
  { name: "Database Setup", value: "database" },
  { name: "CORS Configuration", value: "cors" },
  { name: "API Rate Limiting", value: "rateLimit" },
  { name: "File Upload (Multer)", value: "fileUpload" },
  { name: "Email Service", value: "email" },
];

const TEMPLATES = [
  // Frontend feature templates
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
    type: "list",
    name: "featureTemplates.router",
    message: "Select a Router setup:",
    when: (answers) => answers.features.includes("router"),
    choices: [
      { name: "Basic Routes", value: "basic" },
      { name: "Protected Routes + Layouts", value: "advanced" },
    ],
    default: "basic",
  },

  // Backend feature templates
  {
    type: "list",
    name: "featureTemplates.auth",
    message: "Select an Auth template:",
    when: (answers) => answers.features.includes("auth"),
    choices: [
      { name: "JWT Authentication", value: "jwt" },
      { name: "Session-based Auth", value: "session" },
      { name: "OAuth (Google, GitHub)", value: "oauth" },
    ],
    default: "jwt",
  },
  {
    type: "list",
    name: "featureTemplates.database",
    message: "Select a Database:",
    when: (answers) => answers.features.includes("database"),
    choices: [
      { name: "MongoDB with Mongoose", value: "mongodb" },
      { name: "PostgreSQL with Prisma", value: "postgresql" },
      { name: "MySQL with Sequelize", value: "mysql" },
    ],
    default: "mongodb",
  },
  {
    type: "list",
    name: "featureTemplates.email",
    message: "Select an Email Service:",
    when: (answers) => answers.features.includes("email"),
    choices: [
      { name: "Nodemailer (SMTP)", value: "nodemailer" },
      { name: "SendGrid", value: "sendgrid" },
      { name: "AWS SES", value: "aws-ses" },
    ],
    default: "nodemailer",
  },
]

module.exports = [
  {
    type: "checkbox",
    name: "features",
    message: "Select the features you want to add:",
    choices: (answers) => {
      // Get template configuration
      const templateConfig = TEMPLATE_REGISTRY[answers.template];

      if (!templateConfig) return [];

      // Return features based on template type
      switch (templateConfig.type) {
        case 'frontend':
          return FRONTEND_FEATURES;

        case 'backend':
          return BACKEND_FEATURES;

        case 'fullstack':
          return [
            { name: "--- Frontend Features ---", value: "divider-frontend", disabled: true },
            ...FRONTEND_FEATURES,
            { name: "--- Backend Features ---", value: "divider-backend", disabled: true },
            ...BACKEND_FEATURES,
          ];

        default:
          return [];
      }
    },
    filter: (selected) => {
      // Remove dividers from the final selection
      return selected.filter(item => !item.startsWith('divider-'));
    }
  },
  ...TEMPLATES,
];