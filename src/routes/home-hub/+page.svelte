<script>
  import GlassCard from '$components/GlassCard.svelte';
  import StatGrid from '$components/StatGrid.svelte';
  import ScreenshotCarousel from '$components/ScreenshotCarousel.svelte';
  import ArchitectureDiagram from '$components/ArchitectureDiagram.svelte';

  const stats = [
    { value: '28', label: 'Subagents', hint: 'Specialized review + audit fleet' },
    { value: '5', label: 'ML lanes', hint: 'Audio · predictor · learner · bandit · lux' },
    { value: '4', label: 'Fusion signals', hint: 'Process · camera · audio · rules' },
    { value: '90d', label: 'Event window', hint: 'Rolling SQLite retention' },
    { value: '5', label: 'Autonomy paths', hint: 'Ways the apartment changes its mind' },
    { value: '1', label: 'Alexa Skill', hint: 'Echo → Lambda → Tunnel → backend' }
  ];

  const screenshots = [
    {
      src: '/home-hub/gameday-final.jpg',
      alt: 'Home Hub dashboard during a Colts game — three-zone celebration palette',
      caption: 'Game Day mode: Colts-blue accents on the desk lamp, warm amber kitchen pair, celebration sequences fire on scoring plays.'
    },
    {
      src: '/home-hub/gameday-skybox.jpg',
      alt: 'Threlte 3D football field with skybox in the Game Day dashboard',
      caption: 'Game Day route renders a live Threlte 3D field — yard markers, end zones, and a generated stadium skybox.'
    },
    {
      src: '/home-hub/gameday-prod.jpg',
      alt: 'Home Hub dashboard production build, final polish',
      caption: 'Production build on the dedicated 1080p Latitude kiosk — glass-card widgets, mode overlay, vital strip.'
    }
  ];

  const stack = [
    'Python 3.11', 'FastAPI', 'asyncio', 'SQLite + SQLAlchemy', 'aiosqlite',
    'SvelteKit', 'Threlte', 'Vite',
    'LightGBM', 'MediaPipe', 'YAMNet', 'scikit-learn',
    'Philips Hue v1 + v2', 'SoCo (Sonos)', 'edge-tts',
    'Cloudflare Tunnel', 'AWS Lambda', 'systemd', 'Docker (Pi-hole)',
    'Sentry'
  ];
</script>

<svelte:head>
  <title>Home Hub — Anthony Gatte</title>
  <meta name="description" content="A year-long buildout of an always-on apartment command center: Hue + Sonos, ML autonomy, custom Alexa Skill, Game Day celebrations." />
</svelte:head>

<div class="page">

  <!-- Hero -->
  <section class="case-hero">
    <div class="eyebrow">Case study · Home Hub</div>
    <h1>An apartment that runs itself.</h1>
    <p class="lede">
      A year-long buildout of an always-on command center for one apartment.
      Lights, music, voice, vision, and game-day celebrations — all reacting to what's
      actually happening in the room, all running on a single Latitude 7420 in the corner.
    </p>
    <div class="meta">
      <span>Solo project</span><span>·</span>
      <span>2025–2026, ongoing</span><span>·</span>
      <a href="https://github.com/agatte/home-hub" target="_blank" rel="noopener">Source on GitHub</a>
    </div>
  </section>

  <!-- Screenshots -->
  <section class="section">
    <ScreenshotCarousel images={screenshots} />
  </section>

  <!-- Walkthrough video -->
  <section class="section">
    <div class="eyebrow">Walkthrough</div>
    <h2>60 seconds of the apartment behaving.</h2>
    <p class="section-lede">
      Mode-switching, light response, the journal page, and the analytics SectorBoard — recorded straight off
      the kiosk.
    </p>
    <GlassCard padding="0">
      <div class="video-wrap">
        <video
          src="/home-hub/walkthrough.mp4"
          poster="/home-hub/gameday-final.jpg"
          controls
          muted
          playsinline
          preload="metadata"
        >
          Your browser doesn't support embedded video. <a href="/home-hub/walkthrough.mp4">Download the walkthrough.</a>
        </video>
      </div>
    </GlassCard>
  </section>

  <!-- Stats -->
  <section class="section">
    <div class="eyebrow">By the numbers</div>
    <h2>What's actually in there.</h2>
    <p class="section-lede">
      Snapshots from the current build — every number is grounded in a shipped feature, not a wishlist.
    </p>
    <StatGrid {stats} />
  </section>

  <!-- Architecture -->
  <section class="section">
    <div class="eyebrow">Architecture</div>
    <h2>One backend, many surfaces.</h2>
    <p class="section-lede">
      A FastAPI core fans state out over WebSocket and serves a SvelteKit static build. Services for Hue, Sonos,
      ML, and the automation engine plug in as long-running async tasks. The PC agent and camera report inward;
      the Alexa Lambda reaches in through a Cloudflare Tunnel.
    </p>
    <ArchitectureDiagram />
  </section>

  <!-- Engineering deep dives -->
  <section class="section">
    <div class="eyebrow">Engineering deep dives</div>
    <h2>Four problems worth talking about.</h2>

    <div class="deep-dives">
      <GlassCard padding="28px">
        <h3>ConfidenceFusion: blending four signals into one mode.</h3>
        <p>
          The apartment has four ways to guess what's going on — what processes are running on my PC,
          what the camera sees (zone + posture + lux), what YAMNet hears in the room, and a small bank
          of learned rules. Each emits a confidence-scored opinion every second.
        </p>
        <p>
          ConfidenceFusion blends them with weights that bend toward whichever signal has been
          freshest, then applies a suppression layer for known footguns: late-night dev tools get
          weighted down, stale process reports yield to fresher camera evidence, and a stamp
          system keeps user-initiated overrides from getting steamrolled by autonomous pushes.
        </p>
      </GlassCard>

      <GlassCard padding="28px">
        <h3>The autonomy gate: five ways the apartment changes its own mind.</h3>
        <p>
          Five autonomous mode-setters can override what the user is doing — each one cost a small
          amount of trust to ship, and each one has a kill switch.
        </p>
        <p>
          Late-night rescue catches dev-tools-still-foreground-at-midnight and flips to relax.
          The zone+posture rule reacts to "bed + reclined" sustained for 180 seconds.
          A watching-sleep-guard fires when you've been reclined in bed under the projector
          for 90 minutes (caught me asleep with YouTube on more than once).
          Two camera-at-desk vetoes block the autonomous pushes while I'm actually present.
        </p>
      </GlassCard>

      <GlassCard padding="28px">
        <h3>Game Day: from ESPN poll to bedroom lamp in &lt;1s.</h3>
        <p>
          On Colts game days the apartment auto-flips into a celebration palette 30 minutes before
          kickoff. An ESPN poll watches play-by-play; scoring plays, big plays, and high-WPA momentum
          swings fire a custom celebration — light sequences, TTS commentary, and a shifted
          color base on the bedroom lamp.
        </p>
        <p>
          The celebration orchestrator runs custom sequences per play type with an 8-second cooldown
          to prevent stacking. Spent enough time tuning latency that the lamp visibly reacts before
          the play-by-play commentary catches up.
        </p>
      </GlassCard>

      <GlassCard padding="28px">
        <h3>Living on a Latitude 7420: deploy.sh, systemd, and a kiosk.</h3>
        <p>
          The whole thing runs on one Dell Latitude in the corner. Ubuntu 24.04, the backend
          as a systemd user service, Firefox in kiosk mode via GNOME autostart, Pi-hole v6 in
          Docker, a cloudflared tunnel exposing one subdomain to the public internet for Alexa.
        </p>
        <p>
          The deploy script pulls fast-forward, conditionally reinstalls deps + rebuilds the
          frontend, restarts the service, and health-checks. The kiosk auto-reloads when the
          WebSocket reports a new build_id. The whole pipeline runs from my dev box on the LAN
          in about 20 seconds.
        </p>
      </GlassCard>
    </div>
  </section>

  <!-- Tech stack -->
  <section class="section">
    <div class="eyebrow">Stack</div>
    <h2>What it's built with.</h2>
    <div class="chips">
      {#each stack as tech}
        <span class="chip">{tech}</span>
      {/each}
    </div>
  </section>

  <!-- Source link -->
  <section class="section source">
    <GlassCard padding="32px" interactive={true} href="https://github.com/agatte/home-hub">
      <div class="source-inner">
        <div>
          <h3>Source on GitHub</h3>
          <p>Full backend + frontend + docs. Spec docs live in <code>docs/</code>; the working guide is in <code>.claude/CLAUDE.md</code>.</p>
        </div>
        <div class="source-arrow">→</div>
      </div>
    </GlassCard>
  </section>

</div>

<style>
  .case-hero {
    margin-top: 32px;
    margin-bottom: 48px;
  }

  .case-hero h1 {
    font-size: clamp(2.5rem, 7vw, 5rem);
    margin-top: 12px;
  }

  .lede {
    max-width: var(--max-narrow);
    font-size: clamp(1.05rem, 1.8vw, 1.3rem);
    margin-top: 20px;
    line-height: 1.55;
  }

  .meta {
    margin-top: 24px;
    color: var(--text-muted);
    font-size: 0.85rem;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
  }

  .meta a { color: var(--accent); }

  .section-lede {
    max-width: var(--max-narrow);
    margin-block: 12px 32px;
    font-size: 1.05rem;
  }

  .video-wrap {
    background: var(--bg-secondary);
    border-radius: inherit;
    overflow: hidden;
  }

  .video-wrap video {
    width: 100%;
    height: auto;
    display: block;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  .deep-dives {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }

  @media (min-width: 820px) {
    .deep-dives {
      grid-template-columns: 1fr 1fr;
    }
  }

  .deep-dives :global(h3) {
    font-family: var(--font-display);
    font-size: 1.6rem;
    letter-spacing: 0.02em;
    margin-bottom: 12px;
    color: var(--text-primary);
  }

  .deep-dives :global(p) {
    margin-bottom: 12px;
  }

  .deep-dives :global(p:last-child) {
    margin-bottom: 0;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .chip {
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--bg-card);
    color: var(--text-secondary);
    font-size: 0.85rem;
    letter-spacing: 0.02em;
    transition: border-color 0.2s ease, color 0.2s ease;
  }

  .chip:hover {
    border-color: var(--border-hover);
    color: var(--text-primary);
  }

  .source-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  .source-inner h3 {
    font-family: var(--font-display);
    font-size: 1.8rem;
    margin-bottom: 6px;
  }

  .source-inner p {
    margin: 0;
  }

  .source-inner code {
    font-family: ui-monospace, 'SF Mono', Menlo, monospace;
    font-size: 0.85em;
    background: rgba(255, 255, 255, 0.04);
    padding: 2px 6px;
    border-radius: 4px;
  }

  .source-arrow {
    font-family: var(--font-display);
    font-size: 2.5rem;
    color: var(--accent);
    flex-shrink: 0;
  }
</style>
