# getinput

Edit text directly on the page. Feed the changes back to Claude.

Two installation paths, depending on what you're working on.

## 1. Next.js (App Router)

```bash
npx getinput-page
```

Adds `components/InputWidget.tsx`, an `app/api/input` route, an `input.json` file, and mounts `<InputWidget />` in your root layout. Run `npm run dev`, then edit any text in the browser.

## 2. Any other website

```html
<script src="https://getinput.io/widget.js"></script>
```

Works on plain HTML, Vite, Astro, Vue, anything. By default, edits save to `localStorage`; click the count badge to copy them as JSON.

Optional config via `data-*`:

```html
<script
  src="https://getinput.io/widget.js"
  data-endpoint="/api/feedback"
  data-hosts="localhost,staging.example.com"
></script>
```

## How it actually works

| You | Widget |
| --- | --- |
| Click **Edit**, click a heading | Element becomes `contenteditable`, you type the new copy |
| Click **Comment**, click anything | Type a note about that element |
| Save / blur | Edit is appended to feedback (localStorage, file, or POSTed to your endpoint) |

Then in Claude Code:

```
/input apply
```

Claude reads the feedback and rewrites your source files.

## Sharing for review

Click the count badge, then **Share**. You'll get a `?getinput` URL that anyone can open — no install required on their end. They click around, edit copy, then **Copy feedback** and paste the JSON back to you.

## Repository layout

| Path | Purpose |
| --- | --- |
| `packages/page/` | `getinput-page` npm package — Next.js install (`InputWidget.tsx`, `route.ts`, `cli.mjs`) |
| `site/public/widget.js` | Framework-agnostic widget, served from `getinput.io/widget.js` |
| `site/` | Marketing site (Next.js) |
| `skill.md` | Claude Code skill definition |

## License

MIT
