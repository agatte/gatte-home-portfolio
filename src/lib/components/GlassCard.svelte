<script>
  /** Mirrors the home-hub dashboard's .widget primitive — glass blur + subtle border + 14px radius. */
  let {
    as = 'div',
    padding = '24px',
    interactive = false,
    href = null,
    children
  } = $props();

  const Tag = href ? 'a' : as;
</script>

<svelte:element
  this={Tag}
  class="glass-card"
  class:interactive={interactive || !!href}
  href={href}
  style:padding
>
  {@render children?.()}
</svelte:element>

<style>
  .glass-card {
    background: var(--bg-card);
    backdrop-filter: var(--glass-blur) var(--glass-saturate);
    -webkit-backdrop-filter: var(--glass-blur) var(--glass-saturate);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    display: block;
    color: inherit;
    text-decoration: none;
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
    min-width: 0;
  }

  .glass-card.interactive {
    cursor: pointer;
  }

  .glass-card.interactive:hover {
    border-color: var(--border-hover);
    background: var(--bg-card-hover);
    transform: translateY(-2px);
  }

  @media (prefers-reduced-motion: reduce) {
    .glass-card.interactive:hover { transform: none; }
  }
</style>
