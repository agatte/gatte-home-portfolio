<script>
  /** Screenshot gallery with lazy-loaded responsive images.
   *  images: [{ src, alt, caption }] */
  let { images = [] } = $props();
</script>

<div class="gallery">
  {#each images as img, i}
    <figure>
      <img
        src={img.src}
        alt={img.alt}
        loading={i === 0 ? 'eager' : 'lazy'}
        decoding="async"
      />
      {#if img.caption}
        <figcaption>{img.caption}</figcaption>
      {/if}
    </figure>
  {/each}
</div>

<style>
  .gallery {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }

  @media (min-width: 720px) {
    .gallery {
      grid-template-columns: 1fr 1fr;
    }
    .gallery figure:first-child {
      grid-column: 1 / -1;
    }
  }

  figure {
    margin: 0;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    transition: border-color 0.2s ease, transform 0.2s ease;
  }

  figure:hover {
    border-color: var(--border-hover);
    transform: translateY(-2px);
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 10;
    object-fit: cover;
  }

  figcaption {
    padding: 14px 18px 18px;
    font-size: 0.9rem;
    color: var(--text-secondary);
    font-style: italic;
  }

  @media (prefers-reduced-motion: reduce) {
    figure:hover { transform: none; }
  }
</style>
