# Training Grounds · launch notes

**Product:** https://ananfang.github.io/training-grounds/
**Source:** https://github.com/ananfang/training-grounds

**Tagline:** Motion guides for AI game character animation

**Description:** I wanted to make a game. Getting a character to walk became a whole side quest. Training Grounds lets you preview 3D motion, export eight-frame sprite guides, and copy a prompt for your image generator. Walking, breathing, four directions, and local animated GLB import. Free and open source.

## Maker comment

Hi everyone, Andy here.

I wanted to build a game. I thought getting a little character to walk would be the easy part.

Well…

After trying different prompts and sprite-sheet layouts, a 3D motion guide finally gave us something we liked. So I made that part into a small tool.

Training Grounds lets you choose a motion, adjust the camera, and export eight poses with a prompt. Bring your original character still to your own image generator. You can also open an animated GLB locally.

I built this with Codex during the Astra challenge. Three.js handles the guide, Quaternius provides the source walking motion, and ImageGen made the Hua example. Image generation is a separate step; there is no generation API hiding behind the download button.

It helped my character finally walk. I hope it helps yours too.

What movement would you want to try next?

## Launch materials

- `launch/thumbnail.png`:240×240.
- `launch/gallery-{1,2,3}.png`:1270×760; actual guide/example artwork with explanatory text.
- Public app is the interactive demo. No hosted video prepared.
- Product Hunt: https://www.producthunt.com/products/training-grounds
- The user completed scheduling and received the challenge welcome email. These notes are the launch copy reference, not a live submission-status check.
