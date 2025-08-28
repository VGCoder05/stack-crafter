
Nice — I’ll give you a concrete, **safe, incremental migration plan** you can follow right away. Each step is small, testable, and includes the exact code snippets you’ll drop into files. Follow them in order and push each step as a small commit/PR so you can rollback easily.

# Summary

Goal: split your current one-file CLI into the structure I suggested (bin, src/{prompts,commands,generators,features,utils,config}, templates). Improve `runCommand` API, avoid brittle `split(' ')`, and make feature scaffolds pluggable.

---

# Migration plan (do these steps in order)

### 1) Create project skeleton (one commit)

Create the folders and add minimal files so repo structure exists.

```
mkdir -p bin src/{prompts,commands,generators,features,utils,config} templates/features
touch bin/cli.js src/index.js src/commands/runCommand.js src/commands/runNpmCommand.js
```

Commit: `chore: add project skeleton`

---

### 2) Move `#!/usr/bin/env node` entry to `bin/cli.js` (small commit)

`bin/cli.js` — keep this file tiny; it just loads your app.

```js
#!/usr/bin/env node
require('../src/index.js');
```

Make executable: `chmod +x bin/cli.js`

Update `package.json` to expose bin:

```json
"bin": {
  "vite-enhancer": "./bin/cli.js"
}
```

Commit: `chore: create CLI entrypoint`

---

### 3) Implement and test `runCommand` wrapper (important core change)

Create `src/commands/runCommand.js`. Use `spawn` with **args array**, default `shell: false`, and keep option overrides.

```js
const { spawn } = require('child_process');

function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const defaultOptions = {
      stdio: 'inherit',   // show output directly
      shell: false,       // safer default; use true only when you need shell features
      ...options
    };

    const child = spawn(command, args, defaultOptions);

    child.once('close', (code) => {
      if (code !== 0) {
        reject(new Error(`"${command} ${args.join(' ')}" failed with exit code ${code}`));
      } else {
        resolve();
      }
    });

    child.once('error', (err) => {
      reject(err);
    });
  });
}

module.exports = runCommand;
```

Commit: `feat(commands): add runCommand wrapper (spawn-based)`

**Why `shell:false`?** safer, avoids shell injection and predictable arg handling. If you *need* shell features (pipes, &&), pass `{ shell: true }` explicitly.

---

### 4) Replace brittle `runNpmCommand` with args-array version

Create `src/commands/runNpmCommand.js`:

```js
const runCommand = require('./runCommand');
const chalk = require('chalk');

async function runNpmCommand(args = ['install'], cwd, message) {
  console.log(chalk.yellow(`⏳ ${message}...`));
  try {
    await runCommand('npm', args, { cwd });
    console.log(chalk.green('✅ Done.'));
  } catch (err) {
    throw err;
  }
}

module.exports = runNpmCommand;
```

**Usage examples**:

* `await runNpmCommand(['install'], projectPath, 'Installing dependencies');`
* `await runNpmCommand(['install', 'axios', 'redux'], projectPath, 'Installing packages');`

Commit: `refactor(commands): runNpmCommand uses args array (no split(' '))`

---

### 5) Extract prompts into `src/prompts/` and wire them

Create `src/prompts/projectPrompts.js` and `src/prompts/featurePrompts.js`. Example `projectPrompts.js`:

```js
module.exports = [
  {
    type: 'input',
    name: 'projectName',
    message: 'What is the name of your project?',
    validate: input => input ? true : 'Project name cannot be empty.',
  },
  {
    type: 'list',
    name: 'template',
    message: 'Select a Vite template:',
    choices: [
      { name: 'React', value: 'react' },
      { name: 'React + TypeScript', value: 'react-ts' },
      { name: 'Vue', value: 'vue' },
      { name: 'Vue + TypeScript', value: 'vue-ts' },
      { name: 'Vanilla', value: 'vanilla' },
      { name: 'Vanilla + TypeScript', value: 'vanilla-ts' },
    ],
    default: 'react'
  }
];
```

Update `src/index.js` to use them:

```js
const inquirer = require('inquirer');
const projectPrompts = require('./prompts/projectPrompts');
const featurePrompts = require('./prompts/featurePrompts');
const projectGenerator = require('./generators/projectGenerator');

async function run() {
  const answers = await inquirer.prompt([
    ...projectPrompts,
    ...featurePrompts,
    // other prompts...
  ]);
  await projectGenerator(answers);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
```

Commit: `feat(prompts): move inquirer prompts to separate files`

---

### 6) Extract project scaffolding to `src/generators/projectGenerator.js`

Move the Vite scaffold + install logic into `src/generators/projectGenerator.js`. Use `runCommand` & `runNpmCommand` you created.

```js
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const runCommand = require('../commands/runCommand');
const runNpmCommand = require('../commands/runNpmCommand');

async function projectGenerator(options) {
  const { projectName, template, features, customDirs } = options;
  const projectPath = path.join(process.cwd(), projectName);

  console.log(chalk.yellow(`⏳ Initializing Vite project '${projectName}'...`));

  // create vite project
  await runCommand('npx', ['create-vite@latest', projectName, '--template', template], { cwd: process.cwd() });

  console.log(chalk.green('✅ Vite project created.'));

  // install dependencies
  await runNpmCommand(['install'], projectPath, 'Installing dependencies');

  // leave further feature scaffolding to featureGenerator
}

module.exports = projectGenerator;
```

Commit: `feat(generators): add projectGenerator to scaffold vite`

---

### 7) Create `src/generators/featureGenerator.js` and feature contract

Add a generator that calls per-feature setup modules.

`src/generators/featureGenerator.js`:

```js
const path = require('path');
const features = require('../features'); // index that maps feature keys to setup functions

async function featureGenerator(projectPath, selectedFeatures, template) {
  for (const featureKey of selectedFeatures) {
    const feature = features[featureKey];
    if (!feature) continue;
    await feature.setup(projectPath, { template });
  }
}

module.exports = featureGenerator;
```

And `src/features/index.js` exports available features:

```js
module.exports = {
  redux: require('./redux/setup'),
  auth: require('./auth/setup'),
  axios: require('./axios/setup'),
  tailwind: require('./tailwind/setup'),
};
```

Commit: `feat(generators): add feature generator and feature index`

---

### 8) Implement a sample feature (Redux) scaffolder

Make `src/features/redux/setup.js`. This is a template for other features.

```js
const fs = require('fs-extra');
const path = require('path');
const runNpmCommand = require('../../commands/runNpmCommand');

async function setup(projectPath, { template }) {
  // install packages
  await runNpmCommand(['install', '@reduxjs/toolkit', 'react-redux'], projectPath, 'Installing Redux Toolkit');

  // copy template files from templates/features/redux/{react,react-ts}
  const featureTemplate = path.join(__dirname, '..', '..', 'templates', 'features', 'redux', template);
  if (fs.existsSync(featureTemplate)) {
    fs.copySync(featureTemplate, projectPath);
  }
}

module.exports = { setup };
```

Add templates under `templates/features/redux/react/...` etc.

Commit: `feat(features): add redux scaffold & setup function`

---

### 9) Hook everything in `src/index.js`

Now wire projectGenerator and featureGenerator in the index.

```js
const projectGenerator = require('./generators/projectGenerator');
const featureGenerator = require('./generators/featureGenerator');

async function run() {
  const answers = await inquirer.prompt([...]);
  await projectGenerator(answers);
  const projectPath = path.join(process.cwd(), answers.projectName);
  await featureGenerator(projectPath, answers.features, answers.template);
  // other steps (tailwind tweaks, custom dirs)
}
```

Commit: `refactor: wire generators in main runner`

---

### 10) Create tests & smoke checks (important)

* Add a test that verifies `runCommand` resolves for `node -v` (or `echo`).
* Add an integration smoke test that runs the CLI to create a project into a tmp directory (like `tmpdir`), then assert folder exists and has `package.json`.

Example (Jest pseudo-test for runCommand):

```js
const runCommand = require('../src/commands/runCommand');

test('runCommand runs a simple command', async () => {
  await expect(runCommand('node', ['-v'])).resolves.toBeUndefined();
});
```

For `runCommand`, mock `child_process.spawn` in unit tests to simulate exit codes.

Commit: `test: add basic tests for runCommand and generator smoke test`

---

### 11) Add linting, pre-commit, CI (one commit)

* Add ESLint & Prettier
* Add Husky + lint-staged to run tests/lint before commit
* Add GitHub Actions workflow `/.github/workflows/ci.yml` to run `npm test` and `npm run lint` on PRs.

Minimal GitHub Actions example:

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: node-version: '20'
      - run: npm ci
      - run: npm test
```

Commit: `chore: add linting, tests, and CI`

---

### 12) Final cleanup & docs

* Add README migration notes and examples of how to write a new feature `setup.js`.
* Add CONTRIBUTING.md with pattern for new features and templates.
* Do a final manual smoke test: `node ./bin/cli.js` → choose minimal options → confirm generated project works (`cd <proj>` then `npm run dev`).

Commit: `docs: add README and contributing guide`

---

# Extra: recommended improvements / best practices

* **Don’t split command strings** — always pass argument arrays. Avoid `command.split(' ')`.
* **Use `shell: true` only when needed.**
* **Prefer `execFile`** when you want buffered output but no shell.
* **Provide dry-run mode** in your CLI (use `--dry-run`) to show what would happen without writing files or installing.
* **Time out long-running commands** (optional). You can add `options.timeout` and handle kills.
* **Graceful cleanup**: if a step fails, leave helpful logs and optionally roll back (you already remove project dir on error; keep that).
* **User input sanitization**: ensure `projectName` is valid for the filesystem (no `../`), use `path.basename` and basic regex.

---

# Example small roadmap (commits/PRs)

1. `chore: add skeleton and entrypoint`
2. `feat(commands): add runCommand and runNpmCommand`
3. `feat(prompts): move prompts to files`
4. `feat(generators): add projectGenerator`
5. `feat(features): add redux feature scaffold`
6. `test: add unit & smoke tests`
7. `chore: add CI and docs`

Each PR should be self-contained and include tests where possible.

---

If you want, I can:

* generate **every file** contents for steps 3–9 (prompts, commands, generators, example feature) in one response so you can copy-paste — say “yes, generate files” and I’ll produce them.
