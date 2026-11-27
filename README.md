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

## Current limitations

This app does not automatically intercept or redirect every ChatGPT reply. To bring a conversation into the Action Canvas, use **Capture** or import a JSON export. Automatic synchronization would require a separately authorized integration/API workflow.

## Project structure

- `index.html` — self-contained application and interface.
- `memory/BASELINE.md` — protected initialization snapshot.
- `docs/ARCHITECTURE.md` — design, boundaries, and recovery.
- `.github/workflows/pages.yml` — GitHub Pages deployment.

## Safety and reliability

No software can guarantee zero failures. This project favors recoverability: no destructive memory writes, explicit exports, browser-local persistence, and immutable Git commit history.