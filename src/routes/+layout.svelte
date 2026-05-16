<script>
  import '../app.css';
  import { page } from '$app/state';

  let { children } = $props();
</script>

<div class="shell">
  <nav class="top-nav">
    <a href="/" class="brand">Anthony Gatte</a>
    <div class="links">
      <a href="/" class:active={page.url.pathname === '/'}>Index</a>
      <a href="/home-hub" class:active={page.url.pathname.startsWith('/home-hub')}>Home Hub</a>
      <a href="https://github.com/agatte" target="_blank" rel="noopener">GitHub</a>
    </div>
  </nav>

  <main>
    {@render children?.()}
  </main>

  <footer>
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="name">Anthony Gatte</div>
        <div class="role">Logistics × automation × applied ML</div>
      </div>
      <div class="footer-links">
        <a href="https://github.com/agatte" target="_blank" rel="noopener">GitHub</a>
        <a href="mailto:anthonygatte@gmail.com">Email</a>
      </div>
      <div class="footer-meta">
        <span>gatte-home.com</span>
        <span>·</span>
        <span>Built with SvelteKit on Cloudflare Pages</span>
      </div>
    </div>
  </footer>
</div>

<style>
  .shell {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
  }

  .top-nav {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px clamp(20px, 4vw, 48px);
    background: rgba(8, 8, 12, 0.55);
    backdrop-filter: var(--glass-blur) var(--glass-saturate);
    -webkit-backdrop-filter: var(--glass-blur) var(--glass-saturate);
    border-bottom: 1px solid var(--border);
  }

  .brand {
    font-family: var(--font-display);
    font-size: 1.6rem;
    letter-spacing: 0.04em;
    color: var(--text-primary);
  }

  .links {
    display: flex;
    gap: 24px;
  }

  .links a {
    font-size: 0.9rem;
    color: var(--text-secondary);
    position: relative;
  }

  .links a.active {
    color: var(--text-primary);
  }

  .links a.active::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -6px;
    height: 2px;
    background: var(--accent);
    border-radius: 2px;
  }

  main {
    flex: 1;
  }

  footer {
    border-top: 1px solid var(--border);
    background: var(--bg-secondary);
    margin-top: 80px;
  }

  .footer-inner {
    max-width: var(--max-content);
    margin: 0 auto;
    padding: 48px clamp(20px, 4vw, 48px);
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 24px 48px;
    align-items: center;
  }

  .name {
    font-family: var(--font-display);
    font-size: 1.4rem;
    color: var(--text-primary);
  }

  .role {
    font-size: 0.85rem;
    color: var(--text-muted);
    letter-spacing: 0.04em;
  }

  .footer-links {
    display: flex;
    gap: 20px;
  }

  .footer-links a {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }

  .footer-meta {
    grid-column: 1 / -1;
    padding-top: 24px;
    border-top: 1px solid var(--border);
    color: var(--text-muted);
    font-size: 0.8rem;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  @media (max-width: 600px) {
    .footer-inner {
      grid-template-columns: 1fr;
    }
    .links {
      gap: 16px;
    }
  }
</style>
