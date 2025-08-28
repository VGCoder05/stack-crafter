const { spawn } = require("child_process");

// Helper to run a command with proper handling
function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const defaultOptions = {
      stdio: "inherit",
      shell: true,
      ...options,
    };

    const child = spawn(command, args, defaultOptions);

    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Command failed with exit code ${code}`));
      } else {
        resolve();
      }
    });

    child.on("error", (error) => {
      reject(error);
    });
  });
}

module.exports = runCommand