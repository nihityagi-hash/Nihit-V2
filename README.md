# Nihit Portfolio

A standalone static portfolio using HTML, CSS, and JavaScript. No React, npm packages, API keys, backend, or build step is required.

## Files

Keep all nine files together at the top level of your GitHub repository:

| File | Purpose |
| --- | --- |
| index.html | Page content, interest cards, and popup panels |
| favicon.svg | Scalable teal N browser-tab logo |
| favicon.ico | Browser-tab icon fallback in several sizes |
| style.css | Desktop/mobile layout, colours, and CSS animations |
| app.js | Typing animation, ASCII portrait, assembly effect, light sweep, and study tabs |
| experiences.js | Dino game, Spotify player, and interactive panels |
| nihit-portrait-cutout.png | Transparent portrait used to draw the ASCII effect |
| vercel.json | Static hosting configuration for Vercel |
| README.md | These instructions |

Do not rename files unless you update their references in the code. The original JPEG is not needed. The image asset is required even though the photo toggle has been removed.

## Upload to GitHub

1. Extract the ZIP, or download the nine individual files.
2. Create a repository, for example nihit-portfolio.
3. Use Add file > Upload files (or the upload link for an empty repository).
4. Upload the nine files directly into the repository root. index.html must be visible at the top level, alongside vercel.json. Do not upload only the ZIP, and do not add an extra enclosing folder.
5. Commit the uploaded files to your main branch.

## Deploy on Vercel

1. Sign in to Vercel and create a new project.
2. Import the GitHub repository and grant access if requested.
3. Use these settings:

| Setting | Value |
| --- | --- |
| Framework Preset | Other |
| Root Directory | Repository root (leave the default) |
| Build Command | Empty; no build command |
| Output Directory | . |
| Install Command | No installation needed; leave default |
| Environment Variables | None |

The included vercel.json sets the framework, empty build command, and output directory. Do not enter npm run build.

4. Deploy, then open the resulting URL.
5. Future commits to the connected production branch can trigger updated deployments.

Official Vercel configuration documentation: https://vercel.com/docs/builds/configure-a-build
Official vercel.json documentation: https://vercel.com/docs/project-configuration/vercel-json

## Preview on your computer

Serve the folder over HTTP instead of double-clicking index.html. Canvas image sampling can be blocked when a page uses a file:// URL.

If Python 3 is installed, open a terminal in this folder and run:

```bash
python3 -m http.server 8000
```

On Windows, you can use `py -m http.server 8000`.

Open http://localhost:8000 in your browser. Stop the server with Ctrl+C. Alternatively, use the Live Server extension in VS Code.

## Editing the website

- Edit your introduction, technical skills, setup specifications, and social links in index.html.
- Edit colours, spacing, and responsive layouts in style.css.
- Edit portrait timing and the study-tab content in app.js.
- Edit the Spotify embed URL in experiences.js and its fallback link in index.html together.
- Keep the cutout PNG in the same folder to preserve the ASCII portrait.

## Included behaviour

- Name typing animation on load.
- Portrait assembly entrance followed by a soft light sweep.
- No visible real-photo toggle.
- Mobile-responsive layout and reduced-motion support.
- Academic-interest tabs and technical skills.
- Dino game with keyboard/touch controls, collisions, restart, pause, and locally saved best score.
- Spotify playlist panel. Closing the panel removes the player and stops playback.
- Hardware setup panel; Escape and close controls return you to the page.

Spotify requires internet access. Its playback and sign-in behaviour are controlled by Spotify. Use the Open playlist in Spotify link if the embedded player is blocked by your browser or network.

## Verification

JavaScript syntax, game-state checks, portrait-animation maths, internal links, and required asset references were checked. Live browser playback and a Vercel deployment were not tested in the build environment. After deployment, check the portrait, three interest panels, Spotify playback, keyboard controls, and mobile layout in your browser.
