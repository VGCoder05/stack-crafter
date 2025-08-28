const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

/**
 * Recursively copy files from source to destination
 * @param {string} src - Source directory path
 * @param {string} dest - Destination directory path
 * @param {Object} options - Copy options
 * @returns {Promise<void>}
 */
async function copyTemplateFiles(src, dest, options = {}) {
  try {
    // Check if source exists
    if (!await fs.pathExists(src)) {
      console.log(chalk.yellow(`⚠️  Source path does not exist: ${src}`));
      return;
    }

    // Ensure destination directory exists
    await fs.ensureDir(dest);

    // Copy with default options
    const copyOptions = {
      overwrite: false,
      errorOnExist: false,
      filter: (src) => {
        // Skip node_modules and .git directories
        const basename = path.basename(src);
        return basename !== 'node_modules' && basename !== '.git';
      },
      ...options
    };

    // Perform the copy
    await fs.copy(src, dest, copyOptions);
    
    console.log(chalk.green(`✅ Copied templates from ${path.basename(src)} to ${path.relative(process.cwd(), dest)}`));
  } catch (error) {
    console.error(chalk.red(`❌ Error copying template files: ${error.message}`));
    throw error;
  }
}

/**
 * Copy a single file with template variable replacement
 * @param {string} srcFile - Source file path
 * @param {string} destFile - Destination file path
 * @param {Object} variables - Variables to replace in template
 * @returns {Promise<void>}
 */
async function copyTemplateFile(srcFile, destFile, variables = {}) {
  try {
    // Ensure destination directory exists
    await fs.ensureDir(path.dirname(destFile));

    // Read the template file
    let content = await fs.readFile(srcFile, 'utf-8');

    // Replace template variables (e.g., {{projectName}})
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      content = content.replace(regex, value);
    });

    // Write to destination
    await fs.writeFile(destFile, content, 'utf-8');
    
    console.log(chalk.gray(`  📄 Created: ${path.relative(process.cwd(), destFile)}`));
  } catch (error) {
    console.error(chalk.red(`❌ Error copying file ${srcFile}: ${error.message}`));
    throw error;
  }
}

/**
 * Check if a file or directory exists
 * @param {string} filePath - Path to check
 * @returns {Promise<boolean>}
 */
async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Read and parse a JSON file
 * @param {string} filePath - Path to JSON file
 * @returns {Promise<Object>}
 */
async function readJsonFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(chalk.red(`❌ Error reading JSON file ${filePath}: ${error.message}`));
    throw error;
  }
}

/**
 * Write object to JSON file
 * @param {string} filePath - Path to JSON file
 * @param {Object} data - Data to write
 * @returns {Promise<void>}
 */
async function writeJsonFile(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(chalk.red(`❌ Error writing JSON file ${filePath}: ${error.message}`));
    throw error;
  }
}

/**
 * Ensure a directory exists, create if it doesn't
 * @param {string} dirPath - Directory path
 * @returns {Promise<void>}
 */
async function ensureDir(dirPath) {
  await fs.ensureDir(dirPath);
}

/**
 * Remove a file or directory
 * @param {string} targetPath - Path to remove
 * @returns {Promise<void>}
 */
async function remove(targetPath) {
  try {
    await fs.remove(targetPath);
  } catch (error) {
    console.error(chalk.red(`❌ Error removing ${targetPath}: ${error.message}`));
    throw error;
  }
}

module.exports = {
  copyTemplateFiles,
  copyTemplateFile,
  pathExists,
  readJsonFile,
  writeJsonFile,
  ensureDir,
  remove,
};