/**
 * Server hook: stamp security headers on every SvelteKit response.
 *
 * Why this and not just static/_headers? On Cloudflare Pages with the
 * SvelteKit Worker adapter (svelte.config.js: `routes.include: ['/*']`),
 * page HTML is rendered by _worker.js and returned directly — Cloudflare
 * Pages' static `_headers` file only applies to the bundled assets it
 * actually serves itself (under `/_app/immutable/*`). To stamp headers
 * on the HTML responses too, we have to do it inside the Worker.
 *
 * `static/_headers` is still useful and intentionally kept — it covers
 * the static asset path, and Cloudflare reads it for static files even
 * if the Worker doesn't.
 *
 * Audit context: the 2026-05-17 portfolio security audit found zero XSS
 * sinks (no {@html}, no innerHTML, no user input rendered, no forms),
 * so `'unsafe-inline'` on script-src is acceptable for now; SvelteKit
 * emits an inline hydration <script> per page. Tighten via SvelteKit's
 * kit.csp hash-mode in a future iteration if anything XSS-relevant lands.
 *
 * HSTS with `includeSubDomains` is the load-bearing one: gatte-home.com
 * shares its apex with home-hub.gatte-home.com (Cloudflare Tunnel into
 * the apartment-automation backend). Forcing the whole apex to HTTPS-only
 * blocks protocol-downgrade as a stepping stone into the home-hub API.
 */

const CSP =
  "default-src 'self'; " +
  "img-src 'self' data: blob:; " +
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
  "script-src 'self' 'unsafe-inline'; " +
  "connect-src 'self'; " +
  "font-src 'self' data: https://fonts.gstatic.com; " +
  "media-src 'self'; " +
  "object-src 'none'; " +
  "base-uri 'self'; " +
  "form-action 'self'; " +
  "frame-ancestors 'none'";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const response = await resolve(event);
  // setdefault-style — never clobber a route that has already set a stricter
  // value for its own reasons.
  if (!response.headers.has('X-Content-Type-Options')) {
    response.headers.set('X-Content-Type-Options', 'nosniff');
  }
  if (!response.headers.has('X-Frame-Options')) {
    response.headers.set('X-Frame-Options', 'DENY');
  }
  if (!response.headers.has('Referrer-Policy')) {
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  }
  if (!response.headers.has('Permissions-Policy')) {
    response.headers.set(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=()'
    );
  }
  if (!response.headers.has('Strict-Transport-Security')) {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains'
    );
  }
  if (!response.headers.has('Content-Security-Policy')) {
    response.headers.set('Content-Security-Policy', CSP);
  }
  return response;
}
