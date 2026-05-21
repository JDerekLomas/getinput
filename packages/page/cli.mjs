#!/usr/bin/env node

import {
  copyFileSync,
  mkdirSync,
  existsSync,
  readFileSync,
  writeFileSync,
  appendFileSync,
} from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cwd = process.cwd();

const log = (msg) => console.log(msg);
const ok = (msg) => console.log(`[32m✓[0m ${msg}`);
const warn = (msg) => console.log(`[33m![0m ${msg}`);
const err = (msg) => console.error(`[31m×[0m ${msg}`);

log("\nSetting up getinput-page...\n");

const hasAppDir = existsSync(join(cwd, "app"));
const hasSrcAppDir = existsSync(join(cwd, "src/app"));

if (!hasAppDir && !hasSrcAppDir) {
  err("No app/ or src/app/ directory found.");
  log("This tool is for Next.js 13+ projects with the App Router.");
  log("For other frameworks, embed the widget directly:");
  log('  <script src="https://getinput.io/widget.js"></script>');
  process.exit(1);
}

const appDir = hasSrcAppDir ? "src/app" : "app";
const componentsDir = hasSrcAppDir ? "src/components" : "components";

mkdirSync(join(cwd, componentsDir), { recursive: true });
mkdirSync(join(cwd, appDir, "api/input"), { recursive: true });

copyFileSync(
  join(__dirname, "InputWidget.tsx"),
  join(cwd, componentsDir, "InputWidget.tsx")
);
ok(`Created ${componentsDir}/InputWidget.tsx`);

copyFileSync(
  join(__dirname, "route.ts"),
  join(cwd, appDir, "api/input/route.ts")
);
ok(`Created ${appDir}/api/input/route.ts`);

if (!existsSync(join(cwd, "input.json"))) {
  writeFileSync(join(cwd, "input.json"), "[]");
  ok("Created input.json");
} else {
  warn("input.json already exists — leaving it alone");
}

const gitignorePath = join(cwd, ".gitignore");
if (existsSync(gitignorePath)) {
  const gitignore = readFileSync(gitignorePath, "utf-8");
  if (!gitignore.includes("input.json")) {
    appendFileSync(gitignorePath, "\n# getinput\ninput.json\n");
    ok("Added input.json to .gitignore");
  }
}

// Auto-inject <InputWidget /> into the root layout
const layoutCandidates = [
  join(cwd, appDir, "layout.tsx"),
  join(cwd, appDir, "layout.jsx"),
  join(cwd, appDir, "layout.js"),
];

const layoutPath = layoutCandidates.find((p) => existsSync(p));

if (!layoutPath) {
  warn(`No ${appDir}/layout.{tsx,jsx,js} found — you'll need to mount the widget yourself.`);
  log("");
  log("Add to your root layout:");
  log(`  import InputWidget from "@/${componentsDir.replace("src/", "")}/InputWidget";`);
  log("  // then inside <body>:");
  log("  <InputWidget />");
} else {
  const layout = readFileSync(layoutPath, "utf-8");
  const importAlias = `@/${componentsDir.replace("src/", "")}/InputWidget`;
  const importLine = `import InputWidget from "${importAlias}";`;

  if (layout.includes("InputWidget")) {
    warn(`${layoutPath.replace(cwd + "/", "")} already mounts InputWidget — skipping injection`);
  } else {
    let updated = layout;

    // Add import right after the last existing import statement.
    const importRegex = /^import[^\n]*;\n/gm;
    const matches = [...updated.matchAll(importRegex)];
    if (matches.length > 0) {
      const last = matches[matches.length - 1];
      const insertAt = last.index + last[0].length;
      updated = updated.slice(0, insertAt) + importLine + "\n" + updated.slice(insertAt);
    } else {
      updated = importLine + "\n\n" + updated;
    }

    // Insert <InputWidget /> before </body>.
    // Prefer the multi-line case where </body> is on its own line — preserve indent.
    const lineEndBody = /^([ \t]*)<\/body>/m;
    if (lineEndBody.test(updated)) {
      updated = updated.replace(
        lineEndBody,
        (_, indent) => `${indent}  <InputWidget />\n${indent}</body>`
      );
      writeFileSync(layoutPath, updated);
      ok(`Injected <InputWidget /> into ${layoutPath.replace(cwd + "/", "")}`);
    } else if (updated.includes("</body>")) {
      // Fallback: inline inject (when <body>...</body> is on one line)
      updated = updated.replace("</body>", "<InputWidget /></body>");
      writeFileSync(layoutPath, updated);
      ok(`Injected <InputWidget /> into ${layoutPath.replace(cwd + "/", "")}`);
    } else {
      warn(`Could not find </body> in ${layoutPath.replace(cwd + "/", "")} — add <InputWidget /> yourself.`);
    }
  }
}

printNext();

function printNext(importAlias) {
  log("");
  log("[1mNext steps:[0m");
  log("  1. Start your dev server (npm run dev)");
  log("  2. Open localhost in your browser");
  log("  3. Click Edit (bottom-right) to edit any text");
  log("  4. In Claude Code, run [36m/input apply[0m to commit edits to source");
  log("");
  log("Docs: https://getinput.io");
}
