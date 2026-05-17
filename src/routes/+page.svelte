<script>
  import GenerativeHero from '$components/GenerativeHero.svelte';
  import GlassCard from '$components/GlassCard.svelte';
  import StatGrid from '$components/StatGrid.svelte';

  const teaserStats = [
    { value: '28', label: 'Subagents' },
    { value: '5', label: 'ML lanes' },
    { value: '4', label: 'Fusion signals' },
    { value: '1', label: 'Alexa Skill' }
  ];
</script>

<svelte:head>
  <title>Anthony Gatte</title>
</svelte:head>

<section class="hero">
  <GenerativeHero density={28} />
  <div class="hero-inner">
    <div class="eyebrow">Portfolio · 2026</div>
    <h1>Anthony Gatte</h1>
    <p class="lede">
      I build systems that quietly do the right thing without being asked.
      Automation, applied ML, and a smart-home that runs itself.
    </p>
    <div class="cta-row">
      <a href="/home-hub" class="btn primary">Read the Home Hub case study →</a>
      <a href="https://github.com/agatte" target="_blank" rel="noopener" class="btn ghost">GitHub</a>
    </div>
  </div>
</section>

<div class="page">
  <section class="section about">
    <div class="eyebrow">About</div>
    <h2>Practical systems, end to end.</h2>
    <p>
      I build automation tools, ship them to production, and keep them running. The current focus is the
      <strong>Home Hub</strong> — a year-long buildout of an apartment-scale command center that listens
      to my voice, watches the room with a camera, and chooses what the lights and music should do next.
    </p>
    <p>
      Stack-wise I live in Python and SvelteKit, ship to FastAPI and SQLite, and lean on classical ML
      (LightGBM, MediaPipe, YAMNet) instead of pulling in an LLM for every problem. Production from day one — even
      for the side projects.
    </p>
  </section>

  <section class="section">
    <div class="eyebrow">Flagship project</div>
    <h2>Home Hub.</h2>
    <p class="section-lede">
      An always-on personal command center for one apartment. Hue + Sonos + a Latitude running 24/7, with
      mode-aware autopilot, voice control through a custom Alexa Skill, and Indianapolis Colts game-day
      light celebrations.
    </p>

    <GlassCard padding="0" interactive={true} href="/home-hub">
      <div class="teaser">
        <div class="teaser-image">
          <img
            src="/home-hub/gameday-final.jpg"
            alt="Home Hub dashboard during a Colts game"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div class="teaser-body">
          <h3>An apartment that runs itself.</h3>
          <p>
            Four signals fuse into a single mode decision every second. Five autonomous mode-setters keep
            it honest — including a watching-TV-in-bed-after-midnight guard that quietly puts the apartment
            to sleep when you fall asleep with the projector on.
          </p>
          <StatGrid stats={teaserStats} />
          <div class="teaser-cta">Read the case study →</div>
        </div>
      </div>
    </GlassCard>
  </section>
</div>

<style>
  .hero {
    position: relative;
    overflow: hidden;
    padding: clamp(60px, 12vw, 140px) clamp(20px, 4vw, 48px) clamp(80px, 14vw, 160px);
    border-bottom: 1px solid var(--border);
  }

  .hero-inner {
    max-width: var(--max-content);
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .hero .eyebrow {
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 24px;
  }

  .lede {
    max-width: var(--max-narrow);
    font-size: clamp(1.15rem, 2vw, 1.45rem);
    color: var(--text-secondary);
    margin-top: 24px;
    line-height: 1.5;
  }

  .cta-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-top: 36px;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 22px;
    border-radius: var(--radius-sm);
    font-size: 0.95rem;
    font-weight: 500;
    border: 1px solid var(--border);
    background: var(--bg-card);
    color: var(--text-primary);
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.1s ease;
  }

  .btn.primary {
    border-color: var(--accent);
    background: var(--accent-glow);
    color: var(--text-primary);
  }

  .btn:hover { border-color: var(--border-hover); }
  .btn.primary:hover { border-color: var(--accent); }

  .about p + p { margin-top: 16px; }

  .section-lede {
    max-width: var(--max-narrow);
    margin-block: 16px 36px;
    font-size: 1.1rem;
  }

  .teaser {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;
    overflow: hidden;
    border-radius: inherit;
  }

  @media (min-width: 880px) {
    .teaser {
      grid-template-columns: 1.1fr 1fr;
    }
  }

  .teaser-image {
    background: var(--bg-secondary);
    overflow: hidden;
  }

  .teaser-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 16 / 10;
    display: block;
  }

  .teaser-body {
    padding: clamp(24px, 4vw, 40px);
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .teaser-body p {
    margin: 0;
  }

  .teaser-cta {
    margin-top: auto;
    color: var(--accent);
    font-weight: 500;
    letter-spacing: 0.02em;
  }
</style>
