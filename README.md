# JSON Resume

> A lightweight solution to maintain your résumé in machine-readable JSON and generate a styled HTML version on demand.

## Purpose

- Store your entire résumé in a single JSON file (`resume.json`) following the [JSON Resume](https://jsonresume.org/) schema
- Render it to a responsive HTML page (`resume.html`) using an off-the-shelf theme

## Files

- `resume.json` - your full resume data (basics, work history, skills, projects, etc.)
- `resume.html` - the generated HTML output (can host or share)
- `package.json` - defines dependencies and the "render" script:
  - `resumed` - the CLI tool that reads your JSON and emits HTML
  - `jsonresume-theme-even` - the CSS/HTML template used for styling
- `pnpm-lock.yaml` - lockfile if you use pnpm (you could also switch to npm or yarn)

## How it works

1. Install dependencies:

   ```bash
   pnpm install
   # or npm install
   ```

2. Run the render script:

   ```bash
   pnpm run render
   # or npm run render
   ```

   This invokes:

   ```bash
   resumed render resume.json --theme jsonresume-theme-even
   ```

3. Open or deploy `resume.html` anywhere (GitHub Pages, S3, your personal site, etc.)

## Benefits

- Keep your résumé source under version control in JSON
- Instantly regenerate a consistent, themeable HTML whenever you update your data
- Swap in new JSON Resume themes without touching your content
