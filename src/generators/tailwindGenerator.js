// === Install Tailwind CSS if selected ===
async function tailwind() {
  if (features.includes("tailwind")) {
    await runNpmCommand(
      "npm install tailwindcss @tailwindcss/vite",
      projectPath,
      "Installing Tailwind CSS"
    );

    //
    // Update tailwind.config.js
    const viteConfigForTailwind = `
            import { defineConfig } from 'vite'
            import react from '@vitejs/plugin-react'
            import tailwindcss from '@tailwindcss/vite'
    
            // https://vite.dev/config/
            export default defineConfig({
            plugins: [react(), tailwindcss()],
            })`;
    fs.writeFileSync(
      path.join(projectPath, "vite.config.js"),
      viteConfigForTailwind
    );

    // Add Tailwind directives to CSS
    const cssFile = template.includes("react")
      ? "src/index.css"
      : "src/style.css";
    const cssPath = path.join(projectPath, cssFile);
    const tailwindDirectives = `@import "tailwindcss";`;
    // const existingCss = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf8') : '';
    // fs.writeFileSync(cssPath, tailwindDirectives + existingCss);
    fs.writeFileSync(cssPath, tailwindDirectives);

    console.log(chalk.green("✅ Tailwind configured."));
  }
}
