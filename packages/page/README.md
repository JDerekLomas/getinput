# getinput-page

Floating widget for Next.js (App Router) that lets anyone edit text directly on a live page. Edits save to `input.json`, then Claude Code applies them to source via `/input apply`.

## Install

In your Next.js project:

```bash
npx getinput-page
```

This will:

- Copy `InputWidget.tsx` into `components/`
- Add an `app/api/input` route
- Create `input.json` and add it to `.gitignore`
- **Inject `<InputWidget />` into your root layout**

Run `npm run dev` and you'll see Edit/Comment buttons in the bottom-right corner on `localhost`.

## Usage

| Action | How |
| --- | --- |
| Edit text | Click **Edit**, then click any heading/paragraph/button — type to change it |
| Leave a comment | Click **Comment**, then click any element — type your note |
| Apply edits to source | In Claude Code: `/input apply` |
| View all feedback | In Claude Code: `/input check` |

## Share for review

Click the count badge, then **Share**. You'll get a link with `?getinput` that anyone can open to leave feedback without touching your source. They click **Copy feedback** when done and paste the JSON back to you.

## Not Next.js?

Use the framework-agnostic version:

```html
<script src="https://getinput.io/widget.js"></script>
```

## License

MIT
