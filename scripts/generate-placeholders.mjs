/**
 * Generates tasteful SVG placeholder artwork into public/images/placeholders.
 * These are NOT real photos — replace them with your own (see README).
 * Run: npm run placeholders   (only needed if you want to regenerate them)
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images', 'placeholders');
mkdirSync(out, { recursive: true });

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const hash = (s) => [...s].reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) >>> 0, 7);
const f = (n) => Math.round(n * 10) / 10;

const GOLD = '#c9a96e';

/** palette: [bgTop, bgBottom, accentA, accentB] */
const themes = {
  english: ['#fbf7ef', '#ecdcd2', '#f0d5d0', '#ffffff'],
  punjabi: ['#4a1220', '#8a2a3e', '#e0a23a', '#f4d79a'],
  jaago: ['#2e0b14', '#6e1f2f', '#e9bfc0', '#f4d79a'],
  birthday: ['#fdf0ee', '#e9bfc0', '#b76e79', '#c9a96e'],
  engagement: ['#f6e7e3', '#d9a9a4', '#b76e79', '#fff7ea'],
  haldi: ['#f9e7a8', '#e0a23a', '#f6c445', '#7a1f2e'],
  other: ['#26231f', '#4a3f33', '#c9a96e', '#f0d5d0'],
  reception: ['#f7f1e6', '#d9c3a1', '#c9a96e', '#ffffff'],
  custom: ['#2c1a22', '#7a3b4b', '#c9a96e', '#f0d5d0'],
  dj: ['#0b0a09', '#2e0b14', '#c9a96e', '#b76e79'],
  rental: ['#f7f1e6', '#e6d8c0', '#c9a96e', '#6e1f2f'],
};

const sparkles = (r, w, h, n, fill) =>
  Array.from({ length: n }, () => {
    const x = r() * w, y = r() * h, s = 5 + r() * 14;
    return `<path d="M${f(x)} ${f(y - s)}L${f(x + s * 0.28)} ${f(y - s * 0.28)}L${f(x + s)} ${f(y)}L${f(x + s * 0.28)} ${f(y + s * 0.28)}L${f(x)} ${f(y + s)}L${f(x - s * 0.28)} ${f(y + s * 0.28)}L${f(x - s)} ${f(y)}L${f(x - s * 0.28)} ${f(y - s * 0.28)}Z" fill="${fill}" opacity="${f(0.25 + r() * 0.6)}"/>`;
  }).join('');

const blooms = (r, cx, cy, spread, n, cols) =>
  Array.from({ length: n }, () => {
    const a = r() * Math.PI * 2, d = Math.sqrt(r()) * spread;
    const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d * 0.7, rad = 14 + r() * 26;
    const c = cols[Math.floor(r() * cols.length)];
    return `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rad)}" fill="${c}" opacity="${f(0.55 + r() * 0.4)}"/><circle cx="${f(x)}" cy="${f(y)}" r="${f(rad * 0.38)}" fill="${GOLD}" opacity="0.7"/>`;
  }).join('');

function motif(kind, r, w, h, p) {
  const [, , a, b] = p;
  const cx = w / 2;
  switch (kind) {
    case 'english':
    case 'reception':
    case 'engagement': {
      const rw = w * 0.34, top = h * 0.16;
      let s = `<path d="M${f(cx - rw)} ${f(h * 0.86)}V${f(top + rw)}A${f(rw)} ${f(rw)} 0 0 1 ${f(cx + rw)} ${f(top + rw)}V${f(h * 0.86)}" fill="none" stroke="${GOLD}" stroke-width="7" opacity="0.9"/>`;
      s += `<path d="M${f(cx - rw + 22)} ${f(h * 0.86)}V${f(top + rw)}A${f(rw - 22)} ${f(rw - 22)} 0 0 1 ${f(cx + rw - 22)} ${f(top + rw)}V${f(h * 0.86)}" fill="none" stroke="${GOLD}" stroke-width="2" opacity="0.6"/>`;
      s += blooms(r, cx - rw, top + rw * 0.9, 70, 14, [a, b]) + blooms(r, cx + rw, top + rw * 0.9, 70, 14, [a, b]);
      s += blooms(r, cx, top + 6, 120, 16, [a, b]);
      if (kind === 'engagement') s += `<circle cx="${f(cx - 26)}" cy="${f(h * 0.62)}" r="40" fill="none" stroke="${GOLD}" stroke-width="6"/><circle cx="${f(cx + 26)}" cy="${f(h * 0.62)}" r="40" fill="none" stroke="${GOLD}" stroke-width="6"/>`;
      if (kind === 'reception') s += Array.from({ length: 5 }, (_, i) => `<path d="M${f(cx - 120 + i * 60)} ${f(top - 10)}V${f(top + 50 + (i % 2) * 24)}" stroke="${GOLD}" stroke-width="2"/><circle cx="${f(cx - 120 + i * 60)}" cy="${f(top + 62 + (i % 2) * 24)}" r="12" fill="${GOLD}" opacity="0.85"/>`).join('');
      s += `<rect x="${f(w * 0.08)}" y="${f(h * 0.86)}" width="${f(w * 0.84)}" height="${f(h * 0.05)}" rx="6" fill="${GOLD}" opacity="0.3"/>`;
      return s;
    }
    case 'punjabi':
    case 'haldi': {
      let s = '';
      for (let row = 0; row < 4; row++) {
        for (let i = 0; i < 12; i++) {
          const x = (i + 0.5) * (w / 12) + (row % 2) * 18, y = 40 + row * 34;
          s += `<circle cx="${f(x)}" cy="${f(y)}" r="22" fill="${row % 2 ? a : b}" opacity="0.9"/><circle cx="${f(x)}" cy="${f(y)}" r="9" fill="${GOLD}"/>`;
        }
      }
      s += `<rect x="${f(w * 0.16)}" y="${f(h * 0.3)}" width="${f(w * 0.68)}" height="${f(h * 0.5)}" rx="14" fill="none" stroke="${GOLD}" stroke-width="5"/>`;
      s += `<rect x="${f(w * 0.2)}" y="${f(h * 0.34)}" width="${f(w * 0.6)}" height="${f(h * 0.42)}" rx="8" fill="none" stroke="${GOLD}" stroke-width="1.5" opacity="0.7"/>`;
      s += blooms(r, w * 0.2, h * 0.78, 80, 10, [a, b]) + blooms(r, w * 0.8, h * 0.78, 80, 10, [a, b]);
      return s;
    }
    case 'jaago': {
      let s = '';
      for (let i = 0; i < 9; i++) {
        const x = (i + 0.5) * (w / 9), len = 80 + r() * h * 0.38, rad = 22 + r() * 16;
        s += `<path d="M${f(x)} 0V${f(len)}" stroke="${GOLD}" stroke-width="2"/><circle cx="${f(x)}" cy="${f(len + rad)}" r="${f(rad * 2.4)}" fill="${a}" opacity="0.12"/><circle cx="${f(x)}" cy="${f(len + rad)}" r="${f(rad)}" fill="${i % 2 ? a : b}" opacity="0.95"/><circle cx="${f(x)}" cy="${f(len + rad)}" r="${f(rad * 0.4)}" fill="#fff" opacity="0.8"/>`;
      }
      s += `<path d="M0 ${f(h * 0.92)}Q${f(cx)} ${f(h * 0.78)} ${f(w)} ${f(h * 0.92)}V${f(h)}H0Z" fill="${GOLD}" opacity="0.25"/>`;
      return s;
    }
    case 'birthday': {
      let s = '';
      const cols = [a, b, '#f0d5d0', '#e9bfc0', '#ffffff'];
      for (let i = 0; i < 14; i++) {
        const x = 60 + r() * (w - 120), y = 80 + r() * h * 0.55, rx = 30 + r() * 24;
        s += `<path d="M${f(x)} ${f(y + rx * 1.3)}Q${f(x + (r() - 0.5) * 50)} ${f(y + rx * 2.6)} ${f(x + (r() - 0.5) * 30)} ${f(h * 0.95)}" fill="none" stroke="${GOLD}" stroke-width="1.5" opacity="0.6"/><ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(rx * 1.22)}" fill="${cols[i % cols.length]}" opacity="0.92"/><ellipse cx="${f(x - rx * 0.3)}" cy="${f(y - rx * 0.4)}" rx="${f(rx * 0.2)}" ry="${f(rx * 0.32)}" fill="#fff" opacity="0.5"/>`;
      }
      return s;
    }
    case 'other':
    case 'custom': {
      let s = '';
      for (let i = 0; i < 6; i++) {
        const rad = 40 + i * 46;
        s += `<circle cx="${f(cx)}" cy="${f(h * 0.5)}" r="${rad}" fill="none" stroke="${GOLD}" stroke-width="${f(2.5 - i * 0.3)}" opacity="${f(0.8 - i * 0.1)}"/>`;
      }
      s += `<path d="M${f(cx)} ${f(h * 0.3)}l${f(10)} ${f(30)}l${f(30)} ${f(10)}l${f(-30)} ${f(10)}l${f(-10)} ${f(30)}l${f(-10)} ${f(-30)}l${f(-30)} ${f(-10)}l${f(30)} ${f(-10)}z" fill="${GOLD}"/>`;
      return s;
    }
    case 'dj': {
      let s = '';
      for (let i = 0; i < 5; i++) {
        const x = w * (0.12 + i * 0.19);
        s += `<polygon points="${f(x)},0 ${f(x - 70 - r() * 80)},${f(h)} ${f(x + 70 + r() * 80)},${f(h)}" fill="${i % 2 ? b : a}" opacity="${f(0.1 + r() * 0.12)}"/>`;
      }
      s += `<circle cx="${f(w * 0.34)}" cy="${f(h * 0.66)}" r="${f(h * 0.2)}" fill="#0b0a09" stroke="${GOLD}" stroke-width="3"/><circle cx="${f(w * 0.34)}" cy="${f(h * 0.66)}" r="${f(h * 0.12)}" fill="none" stroke="${GOLD}" opacity="0.5"/><circle cx="${f(w * 0.34)}" cy="${f(h * 0.66)}" r="${f(h * 0.04)}" fill="${GOLD}"/>`;
      s += `<circle cx="${f(w * 0.66)}" cy="${f(h * 0.66)}" r="${f(h * 0.2)}" fill="#0b0a09" stroke="${GOLD}" stroke-width="3"/><circle cx="${f(w * 0.66)}" cy="${f(h * 0.66)}" r="${f(h * 0.12)}" fill="none" stroke="${GOLD}" opacity="0.5"/><circle cx="${f(w * 0.66)}" cy="${f(h * 0.66)}" r="${f(h * 0.04)}" fill="${GOLD}"/>`;
      s += Array.from({ length: 24 }, (_, i) => { const bh = 14 + r() * h * 0.22; return `<rect x="${f(w * 0.1 + i * (w * 0.8 / 24))}" y="${f(h * 0.3 - bh)}" width="${f(w * 0.8 / 24 - 6)}" height="${f(bh)}" rx="2" fill="${GOLD}" opacity="${f(0.35 + r() * 0.5)}"/>`; }).join('');
      return s;
    }
    case 'rental': return '';
    default: return '';
  }
}

function rentalShape(name, w, h, p) {
  const [, , a, b] = p;
  const cx = w / 2, cy = h / 2;
  switch (name) {
    case 'arch':
      return `<path d="M${f(cx - 170)} ${f(h * 0.82)}V${f(cy - 20)}A170 170 0 0 1 ${f(cx + 170)} ${f(cy - 20)}V${f(h * 0.82)}" fill="none" stroke="${a}" stroke-width="12"/><circle cx="${f(cx - 170)}" cy="${f(cy + 40)}" r="34" fill="${b}" opacity="0.8"/><circle cx="${f(cx + 170)}" cy="${f(cy + 40)}" r="34" fill="${b}" opacity="0.8"/>`;
    case 'backdrop':
      return `<rect x="${f(cx - 210)}" y="${f(h * 0.2)}" width="420" height="${f(h * 0.6)}" rx="10" fill="none" stroke="${a}" stroke-width="10"/><rect x="${f(cx - 190)}" y="${f(h * 0.2 + 20)}" width="380" height="${f(h * 0.6 - 40)}" rx="6" fill="${b}" opacity="0.14"/><path d="M${f(cx - 210)} ${f(h * 0.8)}v40M${f(cx + 210)} ${f(h * 0.8)}v40" stroke="${a}" stroke-width="10"/>`;
    case 'florals':
      return `<path d="M${f(cx - 70)} ${f(h * 0.82)}L${f(cx - 50)} ${f(cy + 40)}H${f(cx + 50)}L${f(cx + 70)} ${f(h * 0.82)}Z" fill="${a}" opacity="0.9"/>` + Array.from({ length: 9 }, (_, i) => `<circle cx="${f(cx - 100 + i * 25)}" cy="${f(cy - 20 - (i % 3) * 34)}" r="${28 + (i % 2) * 8}" fill="${i % 2 ? '#e9bfc0' : '#f0d5d0'}"/><circle cx="${f(cx - 100 + i * 25)}" cy="${f(cy - 20 - (i % 3) * 34)}" r="9" fill="${a}"/>`).join('');
    case 'centrepiece':
      return `<ellipse cx="${f(cx)}" cy="${f(h * 0.78)}" rx="190" ry="24" fill="${a}" opacity="0.4"/><path d="M${f(cx - 40)} ${f(h * 0.78)}Q${f(cx)} ${f(cy)} ${f(cx + 40)} ${f(h * 0.78)}Z" fill="${a}"/>` + Array.from({ length: 6 }, (_, i) => `<circle cx="${f(cx - 80 + i * 32)}" cy="${f(cy - 50 + (i % 2) * 26)}" r="30" fill="#f0d5d0"/><circle cx="${f(cx - 80 + i * 32)}" cy="${f(cy - 50 + (i % 2) * 26)}" r="10" fill="${b}" opacity="0.7"/>`).join('');
    case 'table':
      return `<ellipse cx="${f(cx)}" cy="${f(cy - 20)}" rx="190" ry="48" fill="${a}"/><path d="M${f(cx)} ${f(cy + 20)}V${f(h * 0.82)}M${f(cx - 90)} ${f(h * 0.82)}H${f(cx + 90)}" stroke="${a}" stroke-width="14" stroke-linecap="round"/>`;
    case 'chair':
      return `<path d="M${f(cx - 80)} ${f(h * 0.22)}V${f(cy + 20)}H${f(cx + 80)}V${f(h * 0.22)}" fill="none" stroke="${a}" stroke-width="12" stroke-linejoin="round"/><path d="M${f(cx - 60)} ${f(h * 0.3)}H${f(cx + 60)}M${f(cx - 60)} ${f(h * 0.4)}H${f(cx + 60)}" stroke="${a}" stroke-width="5"/><path d="M${f(cx - 90)} ${f(cy + 20)}H${f(cx + 90)}M${f(cx - 76)} ${f(cy + 20)}V${f(h * 0.84)}M${f(cx + 76)} ${f(cy + 20)}V${f(h * 0.84)}" stroke="${a}" stroke-width="12" stroke-linecap="round"/>`;
    case 'prop':
      return `<circle cx="${f(cx)}" cy="${f(cy - 20)}" r="120" fill="none" stroke="${a}" stroke-width="10"/><circle cx="${f(cx)}" cy="${f(cy - 20)}" r="96" fill="${b}" opacity="0.12"/><path d="M${f(cx)} ${f(cy + 100)}V${f(h * 0.84)}M${f(cx - 70)} ${f(h * 0.84)}H${f(cx + 70)}" stroke="${a}" stroke-width="10" stroke-linecap="round"/><path d="M${f(cx - 40)} ${f(cy - 20)}h80" stroke="${a}" stroke-width="4"/>`;
    case 'stand':
      return `<path d="M${f(cx)} ${f(h * 0.2)}V${f(h * 0.82)}M${f(cx - 60)} ${f(h * 0.82)}H${f(cx + 60)}" stroke="${a}" stroke-width="12" stroke-linecap="round"/><ellipse cx="${f(cx)}" cy="${f(h * 0.24)}" rx="90" ry="20" fill="${a}"/><ellipse cx="${f(cx)}" cy="${f(h * 0.46)}" rx="70" ry="16" fill="${a}" opacity="0.7"/>`;
    default:
      return `<rect x="${f(cx - 110)}" y="${f(cy - 80)}" width="220" height="160" rx="14" fill="none" stroke="${a}" stroke-width="10"/><path d="M${f(cx - 110)} ${f(cy - 20)}H${f(cx + 110)}" stroke="${a}" stroke-width="6"/><circle cx="${f(cx)}" cy="${f(cy - 20)}" r="16" fill="${b}"/>`;
  }
}

function svg(name, theme, w, h, kind, rentalName) {
  const p = themes[theme];
  const r = rng(hash(name));
  const body = rentalName ? rentalShape(rentalName, w, h, p) : motif(kind || theme, r, w, h, p);
  const darkBg = ['punjabi', 'jaago', 'other', 'custom', 'dj'].includes(theme);
  const sp = sparkles(r, w, h, rentalName ? 8 : 22, darkBg ? '#f4e8cf' : GOLD);
  const glow = `<radialGradient id="g" cx="${f(20 + r() * 60)}%" cy="${f(10 + r() * 40)}%" r="70%"><stop offset="0" stop-color="${p[3]}" stop-opacity="${darkBg ? 0.28 : 0.55}"/><stop offset="1" stop-color="${p[3]}" stop-opacity="0"/></radialGradient>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="Placeholder artwork"><defs><linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p[0]}"/><stop offset="1" stop-color="${p[1]}"/></linearGradient>${glow}</defs><rect width="${w}" height="${h}" fill="url(#b)"/><rect width="${w}" height="${h}" fill="url(#g)"/>${body}${sp}<rect x="14" y="14" width="${w - 28}" height="${h - 28}" fill="none" stroke="${GOLD}" stroke-width="1.5" opacity="0.55"/></svg>`;
}

const sizes = { 1: [1200, 900], 2: [900, 1200], 3: [1200, 900], 4: [1000, 1000] };
let count = 0;
const write = (file, s) => { writeFileSync(join(out, file), s); count++; };

for (const theme of ['english', 'punjabi', 'jaago', 'birthday', 'engagement', 'haldi', 'other', 'reception', 'custom']) {
  for (const n of [1, 2, 3, 4]) {
    const [w, h] = sizes[n];
    write(`${theme}-${n}.svg`, svg(`${theme}-${n}`, theme, w, h));
  }
}
for (const kind of ['setup', 'atmosphere', 'wedding', 'dancefloor', 'performance']) {
  for (const n of [1, 2]) {
    const [w, h] = sizes[n === 1 ? 1 : 2];
    write(`dj-${kind}-${n}.svg`, svg(`dj-${kind}-${n}`, 'dj', w, h, 'dj'));
  }
}
for (const name of ['arch', 'backdrop', 'florals', 'centrepiece', 'table', 'chair', 'prop', 'stand', 'other']) {
  write(`rental-${name}.svg`, svg(`rental-${name}`, 'rental', 1000, 1000, 'rental', name));
}
console.log(`Wrote ${count} placeholder images to ${out}`);
