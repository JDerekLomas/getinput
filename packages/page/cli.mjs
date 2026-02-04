#!/usr/bin/env node

import { copyFileSync, mkdirSync, existsSync, readFileSync, writeFileSync, appendFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cwd = process.cwd();

console.log("Setting up getinput-page...\n");

// Detect if this is a Next.js project
const hasAppDir = existsSync(join(cwd, "app"));
const hasSrcAppDir = existsSync(join(cwd, "src/app"));

if (!hasAppDir && !hasSrcAppDir) {
  console.error("Error: No app/ or src/app/ directory found.");
  console.error("This tool is designed for Next.js 13+ projects with the App Router.");
  process.exit(1);
}

const appDir = hasSrcAppDir ? "src/app" : "app";
const componentsDir = hasSrcAppDir ? "src/components" : "components";

// Create directories
mkdirSync(join(cwd, componentsDir), { recursive: true });
mkdirSync(join(cwd, appDir, "api/input"), { recursive: true });

// Copy files
copyFileSync(
  join(__dirname, "InputWidget.tsx"),
  join(cwd, componentsDir, "InputWidget.tsx")
);
console.log(`✓ Created ${componentsDir}/InputWidget.tsx`);

copyFileSync(
  join(__dirname, "route.ts"),
  join(cwd, appDir, "api/input/route.ts")
);
console.log(`✓ Created ${appDir}/api/input/route.ts`);

// Create empty input.json
writeFileSync(join(cwd, "input.json"), "[]");
console.log("✓ Created input.json");

// Add to .gitignore if exists
const gitignorePath = join(cwd, ".gitignore");
if (existsSync(gitignorePath)) {
  const gitignore = readFileSync(gitignorePath, "utf-8");
  if (!gitignore.includes("input.json")) {
    appendFileSync(gitignorePath, "\n# getinput\ninput.json\n");
    console.log("✓ Added input.json to .gitignore");
  }
}

console.log("\nSetup complete!");
console.log("\nNext steps:");
console.log("1. Import InputWidget in your layout:");
console.log(`   import InputWidget from "@/${componentsDir.replace("src/", "")}/InputWidget";`);
console.log("");
console.log("2. Add <InputWidget /> to your layout body");
console.log("");
console.log("3. Run your dev server and use the Edit/Comment buttons");
console.log("");
console.log("4. Tell Claude Code to 'check input' to see feedback");
