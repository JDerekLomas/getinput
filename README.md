# getinput

Human-in-the-loop review tools for AI workflows.

## Tools

| Tool | Purpose | Use case |
|------|---------|----------|
| **page** | Spatial web feedback | Click elements, edit text inline, leave comments on live sites |
| **picks** | Asset selection | Swipe through photos/images, thumbs up/down |
| **sift** | Generation review | Approve/reject AI outputs with notes for prompt refinement |

## Core principles

1. **Minimal friction** - One click to start, one click to decide
2. **Accumulates as text** - Copy/paste feedback anytime
3. **Claude Code readable** - `/input check` shows pending feedback
4. **Local first** - Works without accounts, stores to JSON

## Usage with Claude Code

```bash
# Add page feedback widget to current project
/input page setup

# Check accumulated feedback
/input check

# Apply text edits automatically
/input apply

# Clear resolved feedback
/input clear
```

## Installation

### Page feedback (Next.js)

```bash
npx getinput-page
```

Adds:
- `components/InputWidget.tsx` - floating feedback widget
- `app/api/input/route.ts` - local JSON storage
- `input.json` - feedback file (gitignored)

### Picks (standalone)

```bash
npx getinput-picks ./images/*.jpg
```

Opens a local review UI for the matched files.

### Sift (standalone)

```bash
npx getinput-sift ./outputs/
```

Opens a review UI for AI-generated content with rejection notes.

## License

MIT
