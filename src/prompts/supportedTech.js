module.exports = {
    // Frontend Templates
    'react': {
        type: 'frontend',
        name: 'React',
        framework: 'react',
        language: 'javascript',
        tool: 'vite',
        description: 'React with JavaScript'
    },
    'react-ts': {
        type: 'frontend',
        name: 'React + TypeScript',
        framework: 'react',
        language: 'typescript',
        tool: 'vite',
        description: 'React with TypeScript'
    },
    'vue': {
        type: 'frontend',
        name: 'Vue',
        framework: 'vue',
        language: 'javascript',
        tool: 'vite',
        description: 'Vue 3 with JavaScript'
    },
    'vue-ts': {
        type: 'frontend',
        name: 'Vue + TypeScript',
        framework: 'vue',
        language: 'typescript',
        tool: 'vite',
        description: 'Vue 3 with TypeScript'
    },
    'vanilla': {
        type: 'frontend',
        name: 'Vanilla JS',
        framework: 'vanilla',
        language: 'javascript',
        tool: 'vite',
        description: 'Plain JavaScript with Vite'
    },
    'vanilla-ts': {
        type: 'frontend',
        name: 'Vanilla + TypeScript',
        framework: 'vanilla',
        language: 'typescript',
        tool: 'vite',
        description: 'Plain TypeScript with Vite'
    },

    // Backend Templates
    'express': {
        type: 'backend',
        name: 'Express',
        framework: 'express',
        language: 'javascript',
        description: 'Express.js REST API'
    },
    'express-ts': {
        type: 'backend',
        name: 'Express + TypeScript',
        framework: 'express',
        language: 'typescript',
        description: 'Express.js with TypeScript'
    },
    'fastify': {
        type: 'backend',
        name: 'Fastify',
        framework: 'fastify',
        language: 'javascript',
        description: 'High-performance Fastify server'
    },
    'fastify-ts': {
        type: 'backend',
        name: 'Fastify + TypeScript',
        framework: 'fastify',
        language: 'typescript',
        description: 'Fastify with TypeScript'
    },
    'nestjs': {
        type: 'backend',
        name: 'NestJS',
        framework: 'nestjs',
        language: 'typescript',
        description: 'Enterprise-grade Node.js framework'
    },

    // Fullstack Templates
    'mern': {
        type: 'fullstack',
        name: 'MERN Stack',
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
        name: 'MERN + TypeScript',
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
}