# gatte-home.com — portfolio

Personal portfolio for Anthony Gatte. SvelteKit static site, hosted on Cloudflare Pages, served at `https://gatte-home.com`.

Coexists with `home-hub.gatte-home.com` (Cloudflare Tunnel → Latitude → home-hub backend, used by the Alexa Skill). DNS for that subdomain is managed by `cloudflared` on the Latitude and is independent of this site.

## Local dev

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Build

```bash
npm run build
```

Output lands in `.svelte-kit/cloudflare/`. Cloudflare Pages auto-detects this when the framework preset is `SvelteKit`.

## Deploy

Pushes to `main` trigger a Cloudflare Pages build automatically once the repo is connected. Manual deploy via Wrangler:

```bash
npx wrangler pages deploy .svelte-kit/cloudflare --project-name=gatte-home-portfolio
```

## Custom domain setup (one-time)

1. Cloudflare dashboard → Workers & Pages → `gatte-home-portfolio` → Custom domains
2. Add `gatte-home.com` (apex) and `www.gatte-home.com`
3. Cloudflare → Rules → Redirect Rules → `www.gatte-home.com/*` → `https://gatte-home.com/$1` (301)
4. Verify `home-hub.gatte-home.com` CNAME to `<tunnel>.cfargotunnel.com` is untouched

## Asset pipeline

- Screenshots live in `static/home-hub/`. Three flagship images sourced from the home-hub repo's `gameday-phase*.jpg` files
- Walkthrough video: `static/home-hub/walkthrough.mp4` (record once via OBS at 1280×720, ~60-90s)
- Architecture diagram is inline SVG in `src/lib/components/ArchitectureDiagram.svelte` — edit there

## Routes

- `/` — homepage (hero + about + home-hub teaser)
- `/home-hub` — case study deep dive
