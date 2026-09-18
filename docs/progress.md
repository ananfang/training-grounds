# Training Grounds · build notes

## What works

- Browser motion guides: Quaternius walking samples, simple shoe feet, and custom planted breathing.
- Eight-frame PNG export (1536 × 512), source timing JSON, and a frame-conversion prompt. Image generation happens separately.
- Four facing presets, horizontal rotation, and camera elevation controls.
- Local animated GLB import with clip selection. Uses the imported model and rig; no retargeting.
- English, Taiwanese Traditional Chinese, and Japanese. Browser detection, English fallback, saved language choice. Image prompts stay in English.
- GitHub Pages deployment, launch gallery, Product Hunt badge, and asset credits.

## Checked

- Production build and live deployment.
- Pause, frame stepping, PNG dimensions, prompt copy, direction presets, and motion timing.
- GLB import and return to the mannequin.
- Chinese/Japanese switching and persistence; six language-matching cases.
- No horizontal overflow at 390px.

## Cleanup · September 18, 2026

- Kept the working app, motion samples, example animation, credits, and reusable launch materials.
- Moved the gallery-only character still into `launch/`, outside the published site assets.
- Removed an unused gallery-script import and condensed old build notes.
- Build output and dependencies remain ignored. Local instructions remain private and ignored.
- Verification passed: production build, gallery regeneration in a temporary folder, and diff checks. The existing large Three.js bundle warning remains.
