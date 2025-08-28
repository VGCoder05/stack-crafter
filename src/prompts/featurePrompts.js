const TEMPLATE_REGISTRY = {
  // Frontend Templates
  'react': {
    type: 'frontend',
    displayName: 'React',
    framework: 'react',
    language: 'javascript',
    tool: 'vite',
    description: 'React with JavaScript'
  },
  'react-ts': {
    type: 'frontend',
    displayName: 'React + TypeScript',
    framework: 'react',
    language: 'typescript',
    tool: 'vite',
    description: 'React with TypeScript'
  },
  'vue': {
    type: 'frontend',
    displayName: 'Vue',
    framework: 'vue',
    language: 'javascript',
    tool: 'vite',
    description: 'Vue 3 with JavaScript'
  },
  'vue-ts': {
    type: 'frontend',
    displayName: 'Vue + TypeScript',
    framework: 'vue',
    language: 'typescript',
    tool: 'vite',
    description: 'Vue 3 with TypeScript'
  },
  'vanilla': {
    type: 'frontend',
    displayName: 'Vanilla JS',
    framework: 'vanilla',
    language: 'javascript',
    tool: 'vite',
    description: 'Plain JavaScript with Vite'
  },
  'vanilla-ts': {
    type: 'frontend',
    displayName: 'Vanilla + TypeScript',
    framework: 'vanilla',
    language: 'typescript',
    tool: 'vite',
    description: 'Plain TypeScript with Vite'
  },
  'svelte': {
    type: 'frontend',
    displayName: 'Svelte',
    framework: 'svelte',
    language: 'javascript',
    tool: 'vite',
    description: 'Svelte with JavaScript'
  },
  'svelte-ts': {
    type: 'frontend',
    displayName: 'Svelte + TypeScript',
    framework: 'svelte',
    language: 'typescript',
    tool: 'vite',
    description: 'Svelte with TypeScript'
  },

  // Backend Templates
  'express': {
    type: 'backend',
    displayName: 'Express',
    framework: 'express',
    language: 'javascript',
    description: 'Express.js REST API'
  },
  'express-ts': {
    type: 'backend',
    displayName: 'Express + TypeScript',
    framework: 'express',
    language: 'typescript',
    description: 'Express.js with TypeScript'
  },
  'fastify': {
    type: 'backend',
    displayName: 'Fastify',
    framework: 'fastify',
    language: 'javascript',
    description: 'High-performance Fastify server'
  },
  'fastify-ts': {
    type: 'backend',
    displayName: 'Fastify + TypeScript',
    framework: 'fastify',
    language: 'typescript',
    description: 'Fastify with TypeScript'
  },
  'nestjs': {
    type: 'backend',
    displayName: 'NestJS',
    framework: 'nestjs',
    language: 'typescript',
    description: 'Enterprise-grade Node.js framework'
  },
  'koa': {
    type: 'backend',
    displayName: 'Koa',
    framework: 'koa',
    language: 'javascript',
    description: 'Lightweight Koa.js server'
  },

  // Fullstack Templates
  'mern': {
    type: 'fullstack',
    displayName: 'MERN Stack',
    description: 'MongoDB, Express, React, Node.js',
    frontend: {
      framework: 'react',
      language: 'javascript',
      tool: 'vite'
    },
    backend: {
      framework: 'express',
      language: 'javascript',
      database: 'mongodb'
    }
  },
  'mern-ts': {
    type: 'fullstack',
    displayName: 'MERN + TypeScript',
    description: 'MERN stack with TypeScript',
    frontend: {
      framework: 'react',
      language: 'typescript',
      tool: 'vite'
    },
    backend: {
      framework: 'express',
      language: 'typescript',
      database: 'mongodb'
    }
  },
  'mean': {
    type: 'fullstack',
    displayName: 'MEAN Stack',
    description: 'MongoDB, Express, Angular, Node.js',
    frontend: {
      framework: 'angular',
      language: 'typescript',
      tool: 'angular-cli'
    },
    backend: {
      framework: 'express',
      language: 'typescript',
      database: 'mongodb'
    }
  },
  'mevn': {
    type: 'fullstack',
    displayName: 'MEVN Stack',
    description: 'MongoDB, Express, Vue, Node.js',
    frontend: {
      framework: 'vue',
      language: 'javascript',
      tool: 'vite'
    },
    backend: {
      framework: 'express',
      language: 'javascript',
      database: 'mongodb'
    }
  },
  'pern': {
    type: 'fullstack',
    displayName: 'PERN Stack',
    description: 'PostgreSQL, Express, React, Node.js',
    frontend: {
      framework: 'react',
      language: 'javascript',
      tool: 'vite'
    },
    backend: {
      framework: 'express',
      language: 'javascript',
      database: 'postgresql'
    }
  },
  't3': {
    type: 'fullstack',
    displayName: 'T3 Stack',
    description: 'Next.js, TypeScript, Tailwind, tRPC, Prisma',
    frontend: {
      framework: 'nextjs',
      language: 'typescript',
      tool: 'next'
    },
    backend: {
      framework: 'nextjs-api',
      language: 'typescript',
      database: 'postgresql'
    }
  },
  'vue-express': {
    type: 'fullstack',
    displayName: 'Vue + Express',
    description: 'Vue frontend with Express backend',
    frontend: {
      framework: 'vue',
      language: 'javascript',
      tool: 'vite'
    },
    backend: {
      framework: 'express',
      language: 'javascript'
    }
  },
  'react-fastify': {
    type: 'fullstack',
    displayName: 'React + Fastify',
    description: 'React frontend with Fastify backend',
    frontend: {
      framework: 'react',
      language: 'typescript',
      tool: 'vite'
    },
    backend: {
      framework: 'fastify',
      language: 'typescript'
    }
  },
  'svelte-express': {
    type: 'fullstack',
    displayName: 'SvelteKit + Express',
    description: 'SvelteKit with Express API',
    frontend: {
      framework: 'sveltekit',
      language: 'javascript',
      tool: 'vite'
    },
    backend: {
      framework: 'express',
      language: 'javascript'
    }
  }
};

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