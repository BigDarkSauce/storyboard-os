# Supabase setup and first connection

Storyboard OS uses Supabase Auth + Postgres with row-level security. The public GitHub repository contains no user transcripts or credentials.

## 1. Create a private Supabase project

1. Create a project at https://supabase.com/.
2. In **Project Settings → API**, copy the Project URL and the anon/publishable key.
3. Do not copy, commit, or expose the service-role/secret key.
4. In **Authentication → Providers → Email**, enable email/password sign-in. Confirm the email address if your project requires confirmation.

## 2. Create the database

Open **SQL Editor**, paste all of `supabase/schema.sql`, and run it. The four tables are protected by row-level security. Each signed-in user can access only rows with their own Auth user ID. Audit rows are append-only from the client.

## 3. Install the desktop capture extension (developer/unpacked)

1. Download or clone this repository.
2. In Chrome/Edge, open `chrome://extensions` (or `edge://extensions`).
3. Enable **Developer mode** → **Load unpacked** → select the repository's `extension/` folder.
4. Open the extension popup, enter the Supabase Project URL, anon/publishable key, email and password, then connect.
5. Open or refresh a ChatGPT conversation at chatgpt.com. New and currently rendered messages are captured automatically while capture is enabled.

The extension observes ChatGPT's page DOM. ChatGPT can change its markup; selectors, message identity and SPA navigation therefore require ongoing compatibility tests. Messages already loaded in the page are scanned; older messages that have not been loaded by scrolling may not be present to capture. Treat the first release as beta, not a guaranteed complete transcript recorder.

## 4. Privacy controls

- Pause/resume capture from the extension popup.
- Disconnect the extension to stop authenticated uploads.
- Browser capture runs only on ChatGPT host pages declared in the extension manifest.
- Data is sent to your Supabase project over HTTPS and scoped to the authenticated user by RLS.
- Deleting the extension does not delete records already stored in Supabase. Delete those through an authenticated database interface or SQL using your own user ID.
- Do not use shared/public computers for persistent sign-in. Protect your Supabase account with a strong unique password and MFA where available.

## 5. Mobile support

The first capture bridge targets Chromium desktop browsers. iOS browsers do not support Chrome's desktop extension installation model. Safari on iOS has a separate Safari Web Extension packaging and review/install path; it is not included in this initial build and must be implemented and tested separately. Until then, use ChatGPT's share/copy/export workflow to transfer selected content, or use the Storyboard OS manual Capture workflow. Do not assume background mobile capture is available.

## 6. Learning workspace and profile tables

The schema reserves `learning_workspaces` for the complete board state and `learning_profiles` for an explicitly curated, versioned learning profile. The existing static Action Canvas still uses browser-local storage; cloud state hydration, conflict-safe writes and profile editing are a separate frontend integration step. The presence of these tables alone does not mean cross-device learning-state sync is active.

## 7. Verification checklist

- [ ] SQL ran successfully.
- [ ] Sign in works in the extension popup.
- [ ] A test conversation appears in `conversation_messages` for the signed-in user.
- [ ] A second user cannot read the first user's rows (test with separate accounts).
- [ ] Pause prevents new uploads; resume restores them.
- [ ] Refresh token renewal works after access-token expiry.
- [ ] DOM changes and long conversations are tested after ChatGPT UI updates.
- [ ] A private backup/export and deletion procedure has been tested.
