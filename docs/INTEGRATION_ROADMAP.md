# Integration architecture and delivery status

## System topology

```text
ChatGPT web page
   │ DOM observer (desktop extension; explicit opt-in)
   ▼
Browser extension service worker ── Supabase Auth refresh
   │ HTTPS + user JWT + anon key
   ▼
Supabase Postgres (RLS)
   ├── conversation_messages  append/upserted transcript messages
   ├── learning_workspaces    versioned Action Canvas state
   ├── learning_profiles      curated preferences / learning profile
   └── sync_audit             append-only sync events

Storyboard OS static web app
   ├── current release: browser-local workspace + JSON backup
   └── planned next frontend milestone: Supabase sign-in, hydration,
       optimistic versioned saves, realtime refresh, conflict UI
```

## Three sync levels

### A. Conversation sync — desktop beta bridge scaffolded

The extension watches rendered ChatGPT message elements, derives conversation/message identifiers where available, hashes content for deduplication, and upserts records under the authenticated user's ID. It scans messages present in the DOM and observes subsequent mutations.

This is best-effort capture, not a supported ChatGPT transcript API. It may miss unloaded/virtualized history, and selectors can break when ChatGPT changes its frontend. The extension requires user installation and Supabase sign-in. Mobile Safari support is not included yet.

### B. Learning-state sync — database contract created, frontend pending

The `learning_workspaces` row stores a JSON snapshot with a monotonically increasing version. The app must load the row after authentication, save with version-aware conflict detection, and subscribe to changes. Until that frontend work is shipped, the Action Canvas remains localStorage-backed and JSON export/import is the portability path.

Recommended write contract: read current version; update only if the expected version still matches; on conflict, preserve both local and remote snapshots and ask the user which to keep or merge. Never silently last-write-wins across devices.

### C. Memory/profile sync — separated, curated profile contract created

`learning_profiles` stores a versioned JSON profile only when the user explicitly confirms or edits profile data. It is not a direct mirror of ChatGPT internal memory. `memory/BASELINE.md` remains untouched and version-controlled as the original initialization snapshot.

## Security model

- Public GitHub: application source, SQL migrations, extension code and docs only.
- Private Supabase: transcripts, workspace snapshots, profile data and audit events.
- Supabase Auth: per-user JWT.
- RLS: every user-owned row is restricted by `auth.uid() = user_id`.
- Client credentials: project URL + anon/publishable key only. Never use service-role keys in browser code.
- Capture control: user can pause or disconnect the extension.
- Recovery: database backups, JSON exports, Git history and explicit conflict handling.

## Current implementation status

| Capability | Status |
|---|---|
| Supabase schema and RLS policies | Implemented in `supabase/schema.sql` |
| Desktop Chromium extension scaffold | Implemented; beta / requires local installation |
| Automatic capture of rendered ChatGPT messages | Implemented as best-effort DOM observer |
| Supabase authentication and token refresh | Implemented in extension |
| Learning-state cloud hydration and conflict-safe writes | Pending frontend integration |
| Curated profile cloud sync UI | Pending frontend integration |
| iOS Safari extension | Not implemented; separate packaging and testing required |
| Live deployment / credentials / end-to-end verification | Not configured or verified |

## Next milestones

1. Configure a Supabase project and run the SQL migration.
2. Install and test the extension against representative ChatGPT conversations.
3. Add Supabase Auth and version-aware workspace sync to the Action Canvas.
4. Add a profile editor and explicit profile revision history.
5. Package a Safari Web Extension and test on iPhone/iPad; until then mobile uses manual capture.
6. Add automated tests for RLS isolation, deduplication, token refresh, conflict handling and recovery.
