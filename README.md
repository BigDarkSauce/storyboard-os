# Storyboard OS

A persistent, version-controlled visual learning workspace for turning conversations and source material into navigable storyboards, reasoning chains, knowledge maps, and interactive study experiences.

**Live app:** https://bigdarksauce.github.io/storyboard-os/ (available after GitHub Pages is enabled)

## First release

- Responsive Action Canvas with horizontally navigable learning branches.
- Three adaptive depth lanes: foundations, main storyline, and deeper mechanisms / transfer.
- Progressive one-step reveal with Space and Ctrl+Z keyboard controls.
- Conversation capture and JSON import/export.
- Local browser persistence for workspace edits.
- A separately stored, read-only memory baseline.
- Git history as the source of truth for application versions.

## Run locally

Open `index.html` directly in a modern browser. No build step, package installation, server, or API key is required.

## Publish with GitHub Pages

In the repository, open **Settings → Pages** and select **GitHub Actions** as the build and deployment source. The included workflow deploys the root static site on pushes to `main`. The first deployment may take a few minutes.

## Memory safety model

The file `memory/BASELINE.md` is a preserved snapshot of the learning preferences and system requirements available when this repository was initialized. It is not a live mirror of ChatGPT's private internal memory and cannot read or modify ChatGPT memory. The original ChatGPT memory remains independent.

Application data stored in the browser is separate from Git-tracked files. Export it regularly if you want a portable backup. Repository changes are versioned by Git; use GitHub's commit history or revert a commit to roll back code and documentation.

## Supabase integration (in progress)

The repository now includes a Supabase schema with row-level security, a Chromium desktop capture extension, and setup instructions. The extension can upload rendered ChatGPT messages after you install it and sign in to your own Supabase project. It is a best-effort DOM observer, not an official ChatGPT transcript API; unloaded history may be missed and frontend changes can affect capture.

Start with [`docs/SUPABASE_SETUP.md`](docs/SUPABASE_SETUP.md). The extension lives in [`extension/`](extension/), and the database migration is [`supabase/schema.sql`](supabase/schema.sql).

**Not yet active:** the Action Canvas still stores its learning state in browser-local storage. The database contract for cross-device learning state and curated profile sync exists, but the frontend sign-in, hydration, conflict handling and profile editor remain to be implemented. iOS Safari extension packaging is also a separate future milestone; use manual Capture on mobile for now.

## Project structure

- `index.html` — self-contained application and interface.
- `memory/BASELINE.md` — protected initialization snapshot.
- `docs/ARCHITECTURE.md` — design, boundaries, and recovery.
- `.github/workflows/pages.yml` — GitHub Pages deployment.

## Safety and reliability

No software can guarantee zero failures. This project favors recoverability: no destructive memory writes, explicit exports, browser-local persistence, and immutable Git commit history.