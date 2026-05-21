---
name: input
description: Get human feedback on AI-generated web work. Use when the user wants reviewers (or themselves) to edit copy directly in the browser and apply those edits back to source.
---

# /input — direct in-browser editing for AI work

This skill installs and operates the **getinput** widget — a floating Edit/Comment overlay that lets anyone fix copy on a live page. The edits land in `input.json`, and `/input apply` rewrites the source files to match.

## /input page setup

Install the widget into the project at the current working directory.

**If it's a Next.js (App Router) project**, run:

```bash
npx -y getinput-page
```

This copies `components/InputWidget.tsx`, adds an `app/api/input` route, mounts `<InputWidget />` in the root layout, creates `input.json`, and gitignores it. Then tell the user to run their dev server.

**For other projects (plain HTML, Vite, Astro, etc.)**, add the script tag to the page:

```html
<script src="https://getinput.io/widget.js"></script>
```

Edits save to localStorage by default; the user clicks the count badge → **Copy JSON** to export.

## /input check

Show the current pending feedback.

```bash
cat input.json
```

Parse and summarize:
- **Text edits**: `"original" → "edited"` with the selector
- **Comments**: comment text with the element it points at

## /input apply

For each `text-edit` entry in `input.json`:
1. Search the source tree (`app/`, `src/`, `components/`, `pages/`, `public/*.html`) for the exact `original` string
2. Replace with `edited`
3. Report each file changed

Skip entries where the original text appears more than once — surface those to the user for manual disambiguation.

After applying, ask whether to clear the feedback file (`/input clear`).

## /input clear

```bash
echo '[]' > input.json
```

## /input share

Print the share URL: take the current dev/preview URL and append `?getinput`. Tell the user that anyone who opens that link will see the widget, can leave edits, and clicks **Copy feedback** to paste the JSON back. No server needed on their side.

## Notes for Claude

- When pasted feedback JSON arrives via chat, write it to `input.json` then run the apply step.
- If a project has neither `app/` nor a static HTML file, ask whether the user wants the npm install (Next.js) or the script-tag install (everything else).
- The widget only shows on `localhost`/`127.0.0.1` by default, or when `?getinput` is in the URL. Production safety.

## Source

- npm: <https://www.npmjs.com/package/getinput-page>
- GitHub: <https://github.com/JDerekLomas/getinput>
- Web: <https://getinput.io>
