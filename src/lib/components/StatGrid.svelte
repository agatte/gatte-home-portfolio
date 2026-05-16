<script>
  /** Stat chip grid. Each stat: { value, label, hint? } */
  let { stats = [] } = $props();
</script>

<div class="stat-grid">
  {#each stats as stat}
    <div class="stat">
      <div class="value">{stat.value}</div>
      <div class="label">{stat.label}</div>
      {#if stat.hint}
        <div class="hint">{stat.hint}</div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
  }

  .stat {
    background: var(--bg-card);
    backdrop-filter: var(--glass-blur) var(--glass-saturate);
    -webkit-backdrop-filter: var(--glass-blur) var(--glass-saturate);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 20px 18px;
    transition: border-color 0.2s ease, background 0.2s ease;
  }

  .stat:hover {
    border-color: var(--border-hover);
    background: var(--bg-card-hover);
  }

  .value {
    font-family: var(--font-display);
    font-size: 2.6rem;
    line-height: 1;
    color: var(--accent);
    margin-bottom: 8px;
  }

  .label {
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-primary);
  }

  .hint {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-top: 6px;
    line-height: 1.4;
  }
</style>
