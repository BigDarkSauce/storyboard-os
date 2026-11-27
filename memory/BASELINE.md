# Protected Memory Baseline — Initial Repository Snapshot

**Status:** Protected reference; do not overwrite as part of routine application updates.
**Captured:** 2026-11-27
**Purpose:** Preserve the learning-system preferences and project requirements available at initialization so the repository can evolve without treating its editable state as the original baseline.

> This is a curated snapshot of context available in the current assistant session, not a complete export of ChatGPT's internal memory. ChatGPT memory is independently managed by ChatGPT and is not modified by this repository.

## Core learning and explanation preferences

- Prefer visually rich, deeply researched, rigorous explanations rather than textbook-style linear exposition.
- Explain prerequisites, concepts, mechanisms, causal relationships, derivations, evidence, assumptions, uncertainty, limitations, and transfer.
- Use source material as the canonical basis when a document or lecture is supplied; inspect the actual source and do not invent mechanisms.
- Prefer question-first discovery, progressive retrieval, prediction, inspection, explanation, derivation, intervention, consequence, reflection, and transfer.
- Use connected, horizontally navigable storyboards with vertically layered depth lanes.
- A typical storyboard beat should have a concise title, conceptual label, and substantive explanation paired with a relevant visual.
- Integrate relevant external images, diagrams, animated processes, and concept-specific simulations where they materially aid understanding.
- Animation should be deliberate and slow, with pause/resume and ideally frame stepping; do not rely on fast autoplay loops.
- Prefer interactive simulations that expose actors, environments, variables, relationships, and causal mechanisms.
- For self-contained browser simulations, favor a single HTML file and Three.js from a CDN when appropriate, runnable by opening the file directly where browser security permits.

## Storyboard Mode

When the user says **Use Storyboard Mode**, create a horizontally navigable connected visual storyboard with adaptive vertical depth lanes. Default lanes:
1. Foundations and prerequisites.
2. Main logical storyline.
3. Deeper mechanisms, applications, limitations, and transfer.

Use sequence numbers, concise titles, conceptual labels, and substantive explanatory text. Pair beats with relevant visuals. The storyboard should be an integrated learning experience, not merely a list of headings.

## Progressive reveal interaction

- Start with a question or problem, not a long overview.
- Reveal exactly one next reasoning unit at a time.
- Preserve earlier revealed content when advancing.
- Support moving backward without losing the branch.
- Preferred controls: Space to reveal the next unit; Ctrl+Z to step backward.
- Keep branches navigable within the same learning workspace.
- Use connected nodes, causal arrows, evidence, assumptions, constraints, mechanisms, variables, relationships, misconceptions, counterfactuals, and transfer prompts where appropriate.

## Knowledge graph and expedition progression

- Represent concepts and prerequisites as a connected graph.
- Support meaningful branching, route choices, discoveries, optional challenges, persistent unlocks, and escalating complexity.
- Use roguelike / Metroidvania progression only when it serves learning; avoid gimmicks.
- Integrate practical memory-palace / loci spatial organization where useful.
- Support rapid rigorous textbook scanning through progressive retrieval and autocomplete-style prompts.

## Visual and interaction quality

- Professional, polished, legible visual design; smooth shading rather than dashed-line decoration.
- Use diagrams, causal maps, annotated structures, cutaways, section sweeps, before/after transitions, exploded views, scale transitions, spatial annotations, and restrained motion when relevant.
- Adapt the visual form to the subject rather than forcing every concept into one template.
- Mobile and desktop layouts should both remain usable.

## Existing project direction

The user's broader learning system separates responsibilities:
- ChatGPT: Knowledge Architect and Pedagogical Director — extract concepts, dependencies, variables, states, relationships, laws, causal mechanisms, constraints, invariants, mathematics, units, assumptions, evidence, and uncertainty.
- Claude or other implementation agents: visual implementation, experiential design, interactive simulations, and procedural environments.

The learning progression envisioned is:
Curiosity → Orientation → Prediction → Inspection → Explanation → Derivation → Intervention → Consequence → Reflection → Transfer.

## Repository protection rules

1. Never modify this baseline during routine feature work.
2. Add new or revised preferences as dated files or append-only change records.
3. Keep application state separate from this baseline.
4. Commit changes so Git history provides a rollback path.
5. Export browser-local workspace data before major changes.
6. Never claim that this repository can read, write, or restore ChatGPT's internal memory.
7. Do not claim automatic ChatGPT conversation synchronization unless a real authorized integration has been built and tested.

## Recovery

- To recover the original repository baseline, inspect this file and the first initialization commit in GitHub history.
- To roll back application code, use GitHub commit history and revert the relevant commit.
- To restore browser workspace data, import a previously exported JSON backup.
- ChatGPT's own memory must be managed separately in ChatGPT Settings → Personalization.