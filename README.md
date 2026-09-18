# Training Grounds

I wanted to make a game. Getting a character to walk turned into a whole side quest.

This little tool came out of that process. Choose a motion, set the camera, and download eight poses as a sprite sheet. Give that sheet and your character still to an image generator. The prompt is included.

[Try it in your browser](https://ananfang.github.io/training-grounds/)

## What’s here

- Walking and planted breathing, with four directions.
- Orthographic camera controls and source-speed playback.
- Transparent 1536 × 512 PNG export: eight 192 × 512 frames.
- Timing JSON and a frame-conversion prompt.
- Hua, an actual generated result from Bloom Beyond the Mirror.

Everything runs in your browser. Image generation happens in your own image tool; this app has no generation API or account system. Results still need a look at game size. Feet can be surprisingly stubborn.

## Run locally

```sh
npm install
npm run dev
```

`npm run build` produces the static site in `dist/`. GitHub Actions publishes `main` to GitHub Pages. The base URL is `/training-grounds/`; change `vite.config.js` if you host elsewhere.

## How I use it

1. Pick a motion and direction. Preview it before exporting.
2. Download the sheet and timing JSON.
3. Attach the motion guide and your original character still, in either order. Paste the copied prompt into your image generator.
4. Slice the returned sheet into eight cells and play at the exported timing. Check the actual output layout first; image generators do not always follow it.

The guide establishes movement. The original still establishes appearance. Avoid feeding a previous generated animation back as the character reference.

## Credits

Built with Codex and Three.js. Walking joint samples come from Quaternius Universal Animation Library, under CC0. The simplified mannequin, shoe adaptation and planted breathing were built for our game workflow. Hua artwork was generated with ImageGen. See [credits and asset terms](CREDITS.md).

Code: MIT. No promise that an image model will follow every pose. This workflow helped us; now you can try it.

## Bring your own animation

Open a self-contained animated `.glb` (up to 30 MB) and choose a clip. It stays in your browser. The tool previews the imported model with its own rig; it does not transfer motion onto our mannequin. External textures and compressed extensions requiring extra decoders aren't supported. In-place, looping clips work best; a one-shot clip doesn't become a seamless loop just because it repeats.
