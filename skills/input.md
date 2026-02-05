# /input - Human-in-the-loop review tools

Get human input on AI-generated content. Review locally or share with others.

## Modalities

| Mode | Use case | Trigger phrases |
|------|----------|-----------------|
| **page** | Web design feedback | "review the site", "design feedback", "edit the copy" |
| **picks** | Asset selection | "review photos", "select images", "curate these" |
| **sift** | AI output review | "review generations", "check outputs", "refine prompts" |

---

## /input share

Share a link so others can give feedback on your site.

### How it works:
Just add `?getinput` to any page URL:
```
https://your-site.com?getinput
https://your-site.com/about?getinput
http://localhost:3000?getinput
```

When visitors open this link:
1. The feedback widget appears (even if they're not on localhost)
2. They can Edit text or leave Comments
3. They click "Copy feedback to send" and paste it back to you
4. You paste their JSON into `/input apply` to make the changes

### Generating share links:
- Click the "Share" button in the widget to copy a share link
- Or manually add `?getinput` to any URL

### No server required:
In share mode, feedback isn't stored on your server - visitors just copy/paste it back to you via Slack, email, etc. This means:
- Works on static sites
- No API endpoint needed for reviewers
- Simple and portable

---

## /input page setup

Add visual feedback widget to current Next.js project.

### Step 1: Copy files
```bash
mkdir -p app/api/input
cp ~/getinput/packages/page/InputWidget.tsx components/
cp ~/getinput/packages/page/route.ts app/api/input/route.ts
echo '[]' > input.json
echo 'input.json' >> .gitignore
```

### Step 2: Add to layout.tsx
```tsx
import InputWidget from "@/components/InputWidget";

// Inside <body>, after {children}:
<InputWidget />
```

### Step 3: User visits localhost
- **Edit button** (amber): Click text to edit inline
- **Comment button** (blue): Click any element, leave a note

---

## /input picks setup [glob]

Generate a photo/image review UI. User swipes through, picks or rejects with reasons.

### Step 1: Get file list
```bash
ls [glob pattern] # e.g., ls ./public/images/*.jpg
```

### Step 2: Create app/review/page.tsx

Generate a review page with:
- Image display (click to pick)
- Arrow key navigation
- Pick button (green, or tap image)
- Reject with reason input
- Export textarea showing picks and rejects with reasons
- Copy to clipboard button

Use the pattern from `~/dereklomas-site/src/app/review/page.tsx` as reference.

Key features:
- `items` array with `{ id, src }` for each file
- Keyboard: ←→ navigate, ↑/space to pick
- Picks stored in Set, rejects in Map with reason
- Export format:
```
PICKS:
- /images/photo1.jpg
- /images/photo3.jpg

REJECTS:
- /images/photo2.jpg: too dark
- /images/photo4.jpg: wrong aspect ratio
```

---

## /input check [url]

Read and display pending feedback. Optionally check feedback for a specific URL.

### For local page feedback:
```bash
cat input.json
```

### For shared URL feedback:
```bash
# URL is hashed to find the file
curl "http://localhost:3000/api/input?url=https://example.com"
```

Or check the input-data directory:
```bash
ls input-data/  # Shows hashed feedback files
cat input-data/*.json
```

Parse and show:
- **Text edits**: `"Original text" → "Edited text"` (selector for context)
- **Comments**: `[selector]: "User's comment"`
- **reviewUrl**: Which URL the feedback is for (if shared)

### For picks:
Prompt user: "Visit /review, make your selections, then paste the export here"

---

## /input apply

For each text-edit in `input.json`:
1. Search source files for exact `original` text
2. Replace with `edited` text
3. Report what was changed

---

## /input clear [url]

Clear feedback. Optionally specify a URL to clear only that URL's feedback.

### Clear local feedback:
```bash
echo '[]' > input.json
```

### Clear feedback for a shared URL:
```bash
curl -X DELETE "http://localhost:3000/api/input?url=https://example.com"
```

### Clear all shared feedback:
```bash
rm -rf input-data/
```

---

## Source files

All source code is at `~/getinput/`:
- `packages/page/InputWidget.tsx` - feedback widget component
- `packages/page/route.ts` - API route for JSON storage
- Reference review UI: `~/dereklomas-site/src/app/review/page.tsx`
