# JSON Resume

![og-image](https://github.com/user-attachments/assets/d543f82d-154b-4341-be4f-5cbcdea5837a)

> A lightweight solution to maintain your résumé in type-safe TypeScript with Zod validation, generating JSON and styled HTML on demand.

> [Resume Website](https://raw.githack.com/thatbeautifuldream/json-resume/main/resume.html)

> [Resume from JSON Registry](https://registry.jsonresume.org/thatbeautifuldream)

## Purpose

- Store your entire résumé in a single TypeScript file (`src/resume.data.ts`)
- Validate the data against a Zod schema (`src/resume.schema.ts`) based on the [JSON Resume](https://jsonresume.org/) standard
- Generate a standard `resume.json` file from the TypeScript source
- Render the JSON to a responsive HTML page (`resume.html`) using an off-the-shelf theme

## Files

- `src/resume.data.ts` - your primary resume data source (typed and validated)
- `src/resume.schema.ts` - Zod schema defining the structure and types for validation
- `resume.json` - the **generated** JSON output, compatible with the JSON Resume standard
- `resume.html` - the generated HTML output (can host or share)
- `package.json` - defines dependencies and scripts:
  - `generate:resume` script: Runs `ts-node scripts/generate-resume.ts` to validate `resume.data.ts` and create `resume.json`
  - `render` script: Runs `resumed render resume.json ...` to create `resume.html`
  - Dependencies: `zod` for validation, `ts-node` to run TS scripts, `resumed` CLI, `jsonresume-theme-even` theme.
- `scripts/generate-resume.ts` - the script that validates data and generates `resume.json`
- `pnpm-lock.yaml` - lockfile if you use pnpm (you could also switch to npm or yarn)

## How it works

1.  **Install dependencies:**

    ```bash
    pnpm install
    # or npm install
    ```

2.  **Generate `resume.json`:**

    Update your resume details in `src/resume.data.ts`. Then run:

    ```bash
    pnpm run generate:resume
    # or npm run generate:resume
    ```

    This validates the data using the Zod schema and outputs `resume.json`.

3.  **View or Deploy:**

    Open or deploy `resume.html` anywhere (GitHub Pages, S3, Vercel, Netlify, your personal site, etc.)

## Benefits

- Keep your résumé source strongly-typed and validated using TypeScript and Zod
- Maintain data in a more developer-friendly format (`.ts`)
- Instantly regenerate a consistent, themeable HTML whenever you update your data
- Automatically generate the standard `resume.json` for compatibility with other tools
