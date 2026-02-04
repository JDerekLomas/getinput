# /input - Human-in-the-loop review tools

Get human input on AI-generated content and web designs.

## Commands

### /input page setup
Add the page feedback widget to the current Next.js project.

Creates:
- `components/InputWidget.tsx` - floating Edit/Comment buttons
- `app/api/input/route.ts` - local JSON storage
- Adds `input.json` to `.gitignore`

### /input check
Read and display pending feedback from `input.json`.

Shows:
- Text edits: original → edited, with file location hints
- Comments: element selector + comment text

### /input apply
Apply text edits from feedback automatically.

For each text-edit:
1. Find the text in source files
2. Replace original with edited
3. Mark as applied

### /input clear
Clear all feedback from `input.json`.

## Workflow

1. User runs `/input page setup` in their project
2. User visits localhost, uses Edit/Comment buttons
3. User tells Claude "check input" or runs `/input check`
4. Claude reads feedback, makes changes
5. Claude runs `/input clear` when done

## File format

`input.json` contains an array of:

```typescript
// Text edit - user edited text directly on page
{
  type: "text-edit",
  selector: "h1.title",        // CSS selector path
  path: "/",                   // page pathname
  original: "Old text",        // what it was
  edited: "New text",          // what user changed it to
  timestamp: "2024-..."
}

// Comment - user left a note on an element
{
  type: "comment",
  selector: "button.cta",
  path: "/about",
  elementText: "Click here",   // text content of element
  comment: "Make this bigger", // user's feedback
  timestamp: "2024-..."
}
```
