# Recording `walkthrough.mp4`

The case study page at `/home-hub` reserves a slot for a ~75-90s screen capture of the dashboard in action. Until it's recorded, that section shows a "coming soon" placeholder.

This doc is the full recording plan so you can pick it up cold.

## Software

**OBS Studio** — free, cross-platform. Install on the Windows desktop, not the Latitude. https://obsproject.com

## Source

Point a browser on the Windows desktop at `http://192.168.1.210:8000` (the production home-hub on the Latitude) and record the browser window. Real data, no dev-server setup, lights respond live as you click.

The kiosk Latitude itself would be the most "authentic" angle but installing OBS on a lean Ubuntu kiosk box isn't worth it.

## OBS settings (one-time)

**Settings → Output:**
- Output Mode: Simple
- Recording Path: `C:\Users\antho\Videos\` (or anywhere)
- Recording Quality: "High Quality, Medium File Size"
- Recording Format: `mp4` (not `mkv`)
- Encoder: NVENC if your GPU supports it, x264 otherwise

**Settings → Video:**
- Base Canvas: 1920×1080
- **Output (Scaled) Resolution: 1280×720** — don't ship 1080p, portfolio renders at ~1100px max
- FPS: 30

**Settings → Audio:**
- Disable the mic — portfolio video is autoplay-muted

## Scene setup

- Add a Scene called "Walkthrough"
- Add Source → **Window Capture** → pick the browser window
- Right-click the source → Transform → Crop. Crop tightly to the viewport (no browser toolbar, no taskbar)
- Source properties → check **Capture Cursor**

## Shot list (target 75-90 seconds)

Run through once or twice as a dry run before recording. Dashboard at `http://192.168.1.210:8000`.

| Time | Action |
|---|---|
| 0:00–0:08 | **Home page** — hands-off, let the dashboard absorb. Lights, sonos, weather, scene background all visible. |
| 0:08–0:25 | **Mode switching** — click the mode indicator → tap a different mode (e.g., `relax`). Lights animate to the new state. Sonos volume curve shifts. Background scene transitions. |
| 0:25–0:38 | **Navigate to /music** — show the player + recommendation feed. Click a recommendation to preview (30s iTunes clip plays through Sonos). |
| 0:38–0:55 | **Navigate to /journal** — let today's auto-generated markdown narrative render. Scroll once slowly. |
| 0:55–1:15 | **Navigate to /analytics** — the SectorBoard. Hover 2-3 wedges so tooltips render. Optionally click into the lights wedge. |
| 1:15–1:25 | **Back to home** — tap a mode to send the apartment back to where it was. Fade. |

No voiceover, no text overlays. The visual quality of the dashboard is the point.

## Recording

Press **Start Recording** in OBS (bottom-right). Run the shot list. Press **Stop Recording**. Output lands in the configured Recording Path as a timestamped MP4.

## Trimming

If the first take has dead air or a fumble:

- **Easiest**: Windows 11 Photos — right-click → Open with → Photos → Edit & Create → Trim. Drag the handles, save.
- **Better**: **Clipchamp** (built into Windows 11). Import, split/trim, export MP4.
- **Best**: **Shotcut** (free, real editor) if you want to speed-ramp boring sections.

Target final length: 75-90 seconds.

## Compression

Raw OBS output at 1280×720 30fps is 30-50 MB for 90s — too big for a portfolio page. Compress with **Handbrake** (free, https://handbrake.fr):

1. Drag the trimmed MP4 in
2. Preset → **Web → Vimeo YouTube HQ 720p30**
3. **Video** tab → Quality → **RF 26** (default 22 is too high quality / large file)
4. **Audio** tab → remove all audio tracks
5. Output filename → `walkthrough.mp4`
6. **Start Encode**

Target output: **3-6 MB**. If larger, bump RF to 28.

## Deploy

```powershell
# Drop the compressed mp4 in the right place
copy C:\Users\antho\Videos\walkthrough.mp4 C:\Users\antho\Desktop\gatte-home-portfolio\static\home-hub\walkthrough.mp4

cd C:\Users\antho\Desktop\gatte-home-portfolio

# Restore the real <video> element by reverting the "coming soon" placeholder
# (see git history for the commit that added the placeholder — revert just that
#  section in src/routes/home-hub/+page.svelte)

git add static/home-hub/walkthrough.mp4 src/routes/home-hub/+page.svelte
git commit -m "feat: add home-hub walkthrough video"
git push

# Deploy (manual via wrangler — auto-deploy on push isn't wired yet)
npm run build
npx wrangler pages deploy .svelte-kit/cloudflare --commit-dirty=true
```

## Verify

```powershell
curl -I https://gatte-home.com/home-hub/walkthrough.mp4
```

Should be `HTTP/2 200` with `content-type: video/mp4`. Then open https://gatte-home.com/home-hub — the video poster should now show a real play button.

## Common gotchas

- **OBS captures the wrong window**: Window Capture locks onto a window handle that closes when you switch tabs. If the browser disappears mid-recording, use **Display Capture** of one monitor and crop instead.
- **Cursor not visible**: Source properties → "Capture Cursor".
- **File too large after Handbrake**: bump RF from 26 → 28 or 30. Quality drop is barely visible.
- **Video plays but stutters on the live site**: usually bitrate. Re-encode at RF 24 (better quality, larger file) and accept it.
