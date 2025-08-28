const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");

// Create custom directories
module.exports = async function customDirectoryGenerator(customDirs) {
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
}

console.log(chalk.green("✅ Custom directories created successfully!"));