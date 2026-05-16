<script>
  /** Inline SVG of the home-hub architecture block diagram.
   *  Boxes derived from docs/PROJECT_SPEC.md "Current Architecture" section. */
</script>

<div class="diagram-wrap" aria-label="Home Hub architecture diagram">
  <svg viewBox="0 0 900 540" xmlns="http://www.w3.org/2000/svg" role="img">
    <title>Home Hub architecture</title>
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
      </marker>
      <linearGradient id="boxFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(15, 15, 22, 0.85)" />
        <stop offset="100%" stop-color="rgba(10, 10, 15, 0.75)" />
      </linearGradient>
    </defs>

    <!-- Top: client -->
    <g class="node">
      <rect x="340" y="20" width="220" height="56" rx="10" />
      <text x="450" y="46" text-anchor="middle">Browser / Phone (PWA)</text>
      <text x="450" y="64" text-anchor="middle" class="sub">WebSocket + REST</text>
    </g>

    <!-- Core: FastAPI -->
    <g class="node accent">
      <rect x="280" y="140" width="340" height="80" rx="10" />
      <text x="450" y="170" text-anchor="middle" class="title">FastAPI Backend</text>
      <text x="450" y="192" text-anchor="middle" class="sub">async · WebSocket fan-out · SQLite</text>
      <text x="450" y="208" text-anchor="middle" class="sub">SvelteKit static build served at /</text>
    </g>

    <!-- Services row -->
    <g class="node">
      <rect x="40" y="280" width="160" height="64" rx="10" />
      <text x="120" y="306" text-anchor="middle">HueService</text>
      <text x="120" y="324" text-anchor="middle" class="sub">v1 + v2 EventStream</text>
    </g>

    <g class="node">
      <rect x="220" y="280" width="160" height="64" rx="10" />
      <text x="300" y="306" text-anchor="middle">SonosService</text>
      <text x="300" y="324" text-anchor="middle" class="sub">SoCo · TTS</text>
    </g>

    <g class="node">
      <rect x="400" y="280" width="160" height="64" rx="10" />
      <text x="480" y="306" text-anchor="middle">AutomationEngine</text>
      <text x="480" y="324" text-anchor="middle" class="sub">mode · 4-lane fusion</text>
    </g>

    <g class="node">
      <rect x="580" y="280" width="160" height="64" rx="10" />
      <text x="660" y="306" text-anchor="middle">ML Services</text>
      <text x="660" y="324" text-anchor="middle" class="sub">5 lanes shipped</text>
    </g>

    <g class="node">
      <rect x="760" y="280" width="100" height="64" rx="10" />
      <text x="810" y="306" text-anchor="middle">Scheduler</text>
      <text x="810" y="324" text-anchor="middle" class="sub">cron</text>
    </g>

    <!-- Bottom: external devices -->
    <g class="node external">
      <rect x="40" y="420" width="160" height="56" rx="10" />
      <text x="120" y="446" text-anchor="middle">Hue Bridge</text>
      <text x="120" y="464" text-anchor="middle" class="sub">192.168.1.50</text>
    </g>

    <g class="node external">
      <rect x="220" y="420" width="160" height="56" rx="10" />
      <text x="300" y="446" text-anchor="middle">Sonos Era 100</text>
      <text x="300" y="464" text-anchor="middle" class="sub">192.168.1.157</text>
    </g>

    <g class="node external">
      <rect x="400" y="420" width="160" height="56" rx="10" />
      <text x="480" y="446" text-anchor="middle">PC Agent</text>
      <text x="480" y="464" text-anchor="middle" class="sub">process · audio</text>
    </g>

    <g class="node external">
      <rect x="580" y="420" width="160" height="56" rx="10" />
      <text x="660" y="446" text-anchor="middle">Camera (MediaPipe)</text>
      <text x="660" y="464" text-anchor="middle" class="sub">zone · posture · lux</text>
    </g>

    <g class="node external">
      <rect x="760" y="420" width="100" height="56" rx="10" />
      <text x="810" y="446" text-anchor="middle">ESPN</text>
      <text x="810" y="464" text-anchor="middle" class="sub">Game Day</text>
    </g>

    <!-- Connections -->
    <line x1="450" y1="76" x2="450" y2="138" class="link" marker-end="url(#arrow)" />

    <line x1="380" y1="220" x2="120" y2="278" class="link" marker-end="url(#arrow)" />
    <line x1="400" y1="220" x2="300" y2="278" class="link" marker-end="url(#arrow)" />
    <line x1="450" y1="220" x2="480" y2="278" class="link" marker-end="url(#arrow)" />
    <line x1="500" y1="220" x2="660" y2="278" class="link" marker-end="url(#arrow)" />
    <line x1="520" y1="220" x2="810" y2="278" class="link" marker-end="url(#arrow)" />

    <line x1="120" y1="344" x2="120" y2="418" class="link" marker-end="url(#arrow)" />
    <line x1="300" y1="344" x2="300" y2="418" class="link" marker-end="url(#arrow)" />
    <line x1="480" y1="344" x2="480" y2="418" class="link link-up" marker-end="url(#arrow)" />
    <line x1="660" y1="344" x2="660" y2="418" class="link link-up" marker-end="url(#arrow)" />
    <line x1="810" y1="344" x2="810" y2="418" class="link link-up" marker-end="url(#arrow)" />
  </svg>
</div>

<style>
  .diagram-wrap {
    width: 100%;
    overflow-x: auto;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    background: var(--bg-card);
    backdrop-filter: var(--glass-blur) var(--glass-saturate);
    -webkit-backdrop-filter: var(--glass-blur) var(--glass-saturate);
    padding: 24px;
  }

  svg {
    width: 100%;
    height: auto;
    min-width: 720px;
    display: block;
  }

  :global(.diagram-wrap .node rect) {
    fill: url(#boxFill);
    stroke: rgba(255, 255, 255, 0.1);
    stroke-width: 1;
  }

  :global(.diagram-wrap .node.accent rect) {
    stroke: var(--accent);
    stroke-width: 1.5;
  }

  :global(.diagram-wrap .node.external rect) {
    stroke: rgba(255, 255, 255, 0.05);
    stroke-dasharray: 4 4;
  }

  :global(.diagram-wrap .node text) {
    fill: var(--text-primary);
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 500;
  }

  :global(.diagram-wrap .node .title) {
    font-family: var(--font-display);
    font-size: 20px;
    letter-spacing: 0.04em;
  }

  :global(.diagram-wrap .node .sub) {
    fill: var(--text-muted);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.04em;
  }

  :global(.diagram-wrap .link) {
    stroke: rgba(74, 108, 247, 0.4);
    stroke-width: 1.2;
    fill: none;
  }

  :global(.diagram-wrap .link-up) {
    stroke-dasharray: 4 3;
    stroke: rgba(255, 255, 255, 0.12);
  }
</style>
