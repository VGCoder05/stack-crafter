// === Install Additional Dependencies ===
async function installDependencies() {
  let depsToInstall = [];
  if (features.includes("redux") && template.includes("react")) {
    depsToInstall.push("@reduxjs/toolkit", "react-redux");
  }
  if (features.includes("auth")) {
    if (template.includes("react")) depsToInstall.push("react-router-dom");
    if (template.includes("vue")) depsToInstall.push("vue-router");
  }
  if (features.includes("axios")) {
    depsToInstall.push("axios");
  }

  if (depsToInstall.length > 0) {
    await runNpmCommand(
      `install ${depsToInstall.join(" ")}`,
      projectPath,
      "Installing selected packages"
    );
  }
}

module.exports = installDependencies;
