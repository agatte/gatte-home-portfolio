/**
 * Generate static/og-image.png for social previews (LinkedIn, Twitter, Discord, etc.).
 *
 * One-shot generator: edit the layout below, run `npm run build:og`, commit the
 * resulting PNG. Not part of `npm run build` — Cloudflare Pages just serves the
 * pre-rendered file, so satori + resvg never run in production.
 *
 * Output: 1200×630 PNG matching the site's design tokens.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const fontCacheDir = join(__dirname, '.fonts-cache');

const FONT_SOURCES = [
  {
    name: 'Bebas Neue',
    weight: 400,
    file: 'BebasNeue-Regular.ttf',
    url: 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/bebasneue/BebasNeue-Regular.ttf'
  },
  {
    name: 'Source Sans 3',
    weight: 400,
    file: 'SourceSans3-Regular.ttf',
    url: 'https://cdn.jsdelivr.net/gh/adobe-fonts/source-sans@release/TTF/SourceSans3-Regular.ttf'
  },
  {
    name: 'Source Sans 3',
    weight: 600,
    file: 'SourceSans3-Semibold.ttf',
    url: 'https://cdn.jsdelivr.net/gh/adobe-fonts/source-sans@release/TTF/SourceSans3-Semibold.ttf'
  }
];

const TOKENS = {
  bgPrimary: '#08080c',
  bgGradStart: 'rgba(74, 108, 247, 0.18)',
  bgGradEnd: 'rgba(74, 108, 247, 0)',
  textPrimary: '#e8e9ed',
  textSecondary: '#8b8d97',
  textMuted: '#7c7e8a',
  accent: '#4a6cf7',
  border: 'rgba(255, 255, 255, 0.08)'
};

async function ensureFont({ file, url }) {
  const cached = join(fontCacheDir, file);
  if (existsSync(cached)) return readFile(cached);

  await mkdir(fontCacheDir, { recursive: true });
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(cached, buf);
  console.log(`  cached ${file} (${(buf.byteLength / 1024).toFixed(1)} KB)`);
  return buf;
}

async function loadFonts() {
  const fonts = [];
  for (const src of FONT_SOURCES) {
    const data = await ensureFont(src);
    fonts.push({ name: src.name, data, weight: src.weight, style: 'normal' });
  }
  return fonts;
}

function node(type, props, ...children) {
  const flat = children.flat().filter((c) => c !== null && c !== undefined && c !== false);
  return { type, props: { ...props, children: flat.length === 1 ? flat[0] : flat } };
}

const FLEX = { display: 'flex' };

function buildTree() {
  return node(
    'div',
    {
      style: {
        ...FLEX,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '80px 96px',
        position: 'relative',
        backgroundColor: TOKENS.bgPrimary,
        backgroundImage: `radial-gradient(circle at 18% 12%, ${TOKENS.bgGradStart} 0%, ${TOKENS.bgGradEnd} 60%)`,
        fontFamily: 'Source Sans 3'
      }
    },
    // Eyebrow
    node(
      'div',
      {
        style: {
          ...FLEX,
          alignItems: 'center',
          gap: '14px',
          color: TOKENS.accent,
          fontFamily: 'Source Sans 3',
          fontWeight: 600,
          fontSize: 22,
          letterSpacing: '0.22em',
          textTransform: 'uppercase'
        }
      },
      node('div', {
        style: {
          ...FLEX,
          width: 12,
          height: 12,
          borderRadius: 999,
          backgroundColor: TOKENS.accent
        }
      }),
      node(
        'div',
        { style: { ...FLEX } },
        'gatte-home.com'
      )
    ),
    // Headline + tagline
    node(
      'div',
      {
        style: {
          ...FLEX,
          flexDirection: 'column',
          gap: '28px'
        }
      },
      node(
        'div',
        {
          style: {
            ...FLEX,
            fontFamily: 'Bebas Neue',
            fontSize: 200,
            lineHeight: 0.92,
            letterSpacing: '0.01em',
            color: TOKENS.textPrimary
          }
        },
        'Anthony Gatte'
      ),
      node(
        'div',
        {
          style: {
            ...FLEX,
            fontFamily: 'Source Sans 3',
            fontWeight: 400,
            fontSize: 38,
            lineHeight: 1.35,
            color: TOKENS.textSecondary,
            maxWidth: 920
          }
        },
        'Building automation tools for logistics, and a smart-home that runs itself.'
      )
    ),
    // Footer chip row
    node(
      'div',
      {
        style: {
          ...FLEX,
          gap: '14px',
          alignItems: 'center'
        }
      },
      chip('Python · FastAPI'),
      chip('SvelteKit'),
      chip('Applied ML'),
      chip('Smart home')
    )
  );
}

function chip(text) {
  return node(
    'div',
    {
      style: {
        ...FLEX,
        alignItems: 'center',
        padding: '12px 22px',
        borderRadius: 999,
        border: `1px solid ${TOKENS.border}`,
        backgroundColor: 'rgba(15, 15, 22, 0.6)',
        color: TOKENS.textMuted,
        fontFamily: 'Source Sans 3',
        fontWeight: 500,
        fontSize: 22,
        letterSpacing: '0.04em'
      }
    },
    text
  );
}

async function main() {
  const fonts = await loadFonts();
  const tree = buildTree();

  const svg = await satori(tree, {
    width: 1200,
    height: 630,
    fonts
  });

  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 }
  })
    .render()
    .asPng();

  const outPath = join(projectRoot, 'static', 'og-image.png');
  await writeFile(outPath, png);

  console.log(`✓ Wrote ${outPath} (${(png.byteLength / 1024).toFixed(1)} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
