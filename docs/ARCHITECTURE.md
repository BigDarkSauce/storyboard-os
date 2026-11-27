# Architecture and Recovery

## Product boundary

Storyboard OS is a static browser application. It presents captured learning content as an Action Canvas. It is not a replacement model, a ChatGPT client, or an automatic transcript interceptor.

## Main modules in the first release

- **Action Canvas:** visual workspace and navigation surface.
- **Storyboard branches:** horizontally navigable question paths.
- **Depth lanes:** foundations, main reasoning, and deeper mechanisms / transfer.
- **Reveal engine:** one reasoning unit at a time, with backward stepping.
- **Capture:** paste a conversation or lesson and save it as a new branch.
- **Workspace archive:** import/export JSON for portability.
- **Memory baseline:** separate, read-only repository reference.

## Data layers

1. **ChatGPT memory:** external to this repository; not accessible or editable by this static app.
2. **Repository baseline:** `memory/BASELINE.md`; protected by convention and Git history.
3. **Application source:** version-controlled code and documentation.
4. **Browser workspace:** localStorage data on the current browser/device; export JSON to back it up.

## Update protocol

1. Inspect the current repository before editing.
2. Never overwrite `memory/BASELINE.md` during ordinary updates.
3. Make focused changes and commit them.
4. Validate the changed files and deployment workflow.
5. Provide the commit and repository link in the conversation.
6. For major changes, create a release tag or backup branch before merging.

## Recovery protocol

- **Code rollback:** GitHub → repository → Commits → select a known-good commit → Revert, or create a recovery branch from that commit.
- **Browser data recovery:** use the app's Export button before major edits; restore via Import.
- **Baseline recovery:** retrieve `memory/BASELINE.md` from the initialization commit.
- **ChatGPT memory recovery:** independent of this repository; this project cannot restore or overwrite it.

## Deployment

The GitHub Actions workflow deploys the static repository root to GitHub Pages. Enable Pages with **Settings → Pages → GitHub Actions** if it is not already configured.

## Supabase integration

The current integration design and delivery status are documented in [`INTEGRATION_ROADMAP.md`](INTEGRATION_ROADMAP.md), with setup steps in [`SUPABASE_SETUP.md`](SUPABASE_SETUP.md). The SQL schema is in `supabase/schema.sql`; the Chromium extension is in `extension/`.

The extension uses Supabase Auth and a user JWT to upsert rendered ChatGPT messages into a private table protected by row-level security. It observes the ChatGPT DOM and is therefore best-effort rather than a guaranteed transcript API. Users can pause or disconnect it. Existing cloud records are not deleted when the extension is disconnected.

The Action Canvas remains localStorage-backed until the separate cloud workspace frontend is completed. The workspace and curated profile tables are provisioned as contracts only; they do not themselves enable syncing. Mobile Safari support requires a separately packaged and tested Safari Web Extension. Do not store service-role keys or other secrets in browser code or public repository files.