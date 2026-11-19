# MUSKAN FURNITURES website

React + Vite + Tailwind CSS + GSAP + Framer Motion. Homepage and design system are complete. Remaining pages and Supabase are next.

## Run in the cloud (no local install)

Option A: StackBlitz (easiest)
1. Put this folder in a GitHub repository (github.com → New repository → "uploading an existing file" and drag the folder in).
2. Open https://stackblitz.com/github/YOUR-USERNAME/YOUR-REPO
3. StackBlitz installs packages and starts `npm run dev` automatically. The preview appears on the right.

Option B: GitHub Codespaces
1. Open the repository on GitHub → Code → Codespaces → Create codespace.
2. In the terminal run `npm install` then `npm run dev`.
3. Open the forwarded port 5173 to preview.

## Placeholders
All business details live in `src/data/site.js`. Replace anything in [brackets]. Add photos to `public/images/` as described in `public/images/README.txt`.

## Security
Never put a Supabase service-role key or any secret in frontend code. Only the public anon key goes in `.env` variables prefixed `VITE_`, and admin access will be protected by Supabase Auth with row-level security.

## Custom enquiry form (Supabase setup)
1. Create a free project at supabase.com.
2. Open SQL Editor, paste `supabase/schema.sql`, and run it.
3. In StackBlitz, create a file named `.env` in the project root (copy `.env.example`) and add your URL and anon key from Project Settings → API.
4. Restart the preview. The form at `/custom-order` will save enquiries to Supabase.
