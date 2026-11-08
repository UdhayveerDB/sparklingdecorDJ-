# Sparklingdecor × DJ MAJHAESTIC — Website

A premium, responsive website for **Sparklingdecor** (event decoration — *Turning Moments Into Memories.*) and **DJ MAJHAESTIC** (Punjabi DJ — *Making It Sound Majhaestic.*).

**Stack:** React 19 + TypeScript + Vite + Tailwind CSS 3 + Framer Motion + Lucide icons + React Router.
*Why:* a static single-page app is fast, cheap to host anywhere (Netlify, Vercel, Cloudflare Pages, any web host), needs no server or database, and all enquiries go through WhatsApp click-to-chat, so no backend is required.

---

## 1. Run it locally

Requires **Node.js 20 or newer**.

```bash
npm install
npm run dev          # opens http://localhost:5173
```

Other commands:

| Command | What it does |
|---|---|
| `npm run build` | Generates sitemap/robots, type-checks, builds to `dist/` |
| `npm run preview` | Serves the production build at http://localhost:4173 |
| `npm run typecheck` | TypeScript check only |
| `npm run test:whatsapp` | Tests the WhatsApp message builder and form validators |
| `npm run placeholders` | Regenerates the sample placeholder artwork |

---

## 2. Change the business details (do this first)

Open **`src/config/business.ts`**. Everything customers see is here:

- `contact.whatsappNumber` — digits only, with country code, **no `+`** (e.g. `14165551234`)
- `contact.phoneDisplay` / `contact.phoneDigits`, `contact.email`, `contact.serviceArea`, `contact.businessHours`
- `social.decorInstagram`, `social.djInstagram`, `social.facebook` (full URLs)
- `media.heroVideo` / `media.heroImage` — optional cinematic hero background
- `siteUrl` — your domain (or use the `VITE_SITE_URL` environment variable)

**Empty values are hidden automatically** — the site never shows fake phone numbers or dead social links.

> **Important:** until `whatsappNumber` is filled in, WhatsApp buttons open WhatsApp with the message ready but *without* a target contact. Add your number before launch.

## 3. Replace the sample photos with real ones

Every image is currently generated placeholder artwork marked **"Sample image"**. To use real photos:

1. Copy photos into `public/images/gallery/` (JPG/WebP, ~1600px wide, under ~400 KB each).
2. Open **`src/data/gallery.ts`** and add/edit entries, e.g.
   ```ts
   { id: 'p1', brand: 'decor', category: 'punjabi-weddings',
     src: '/images/gallery/punjabi-stage-01.jpg', width: 1600, height: 1067,
     alt: 'Punjabi wedding stage with marigold garlands' }
   ```
3. Category pages, the Decorations page and the Gallery all read from this one file.
4. Category cover images: `src/data/decorations.ts` (`image`). DJ cards: `src/data/dj.ts`. Rental photos: `src/data/rentals.ts`.
5. The "Sample image" tag disappears automatically for real photos (or turn all tags off with `ui.showPlaceholderLabels: false`).

## 4. Other editable content

| What | File |
|---|---|
| Decoration categories, bullet lists, intros | `src/data/decorations.ts` |
| DJ services, music styles, **mix links** | `src/data/dj.ts` |
| Rental inventory, prices, availability | `src/data/rentals.ts` (prices default to "Request Price") |
| Customer reviews (none are invented) | `src/data/testimonials.ts` |
| FAQs | `src/data/faqs.ts` |
| Navigation menus | `src/data/nav.ts` |
| Event types, guest ranges, music options | `src/data/options.ts` |
| Colours & fonts | `tailwind.config.js` and `index.html` |

## 5. How WhatsApp enquiries work

1. The customer completes the form (quote wizard, DJ booking, contact form, or rental form).
2. The site builds a formatted message from their answers (`src/utils/whatsapp.ts`); empty fields show "Not specified", special characters are URL-encoded.
3. The site opens `https://wa.me/<your number>?text=<encoded message>`.
4. WhatsApp opens with the message pre-filled. **The customer reviews it, can edit it, and presses Send themselves.** The website never sends anything automatically, and says so on screen.

The brand in the greeting is chosen from the services selected (Decorations → Sparklingdecor, DJ → DJ MAJHAESTIC, both → both). Rental enquiries use their own template.

## 6. Pages

Home · Decorations · English Weddings · Punjabi Weddings · Jaago Nights · Birthdays · Engagements · Haldi & Mehndi · Receptions · Other Events · Custom Decorations · DJ MAJHAESTIC · Book a DJ · Rentals · Rental item details · Gallery · About Us · Contact · Get a Quote (+ 404 page).

## 7. Deploy

Build once: `VITE_SITE_URL=https://www.yourdomain.com npm run build` (Windows PowerShell: `$env:VITE_SITE_URL="https://www.yourdomain.com"; npm run build`). Upload the `dist/` folder.

**The site uses clean URLs, so the host must serve `index.html` for unknown paths** (single-page-app fallback):

- **Netlify:** drag-and-drop `dist/`, or connect the repo (build `npm run build`, publish `dist`). `public/_redirects` is already included.
- **Vercel:** import the repo; `vercel.json` is already included.
- **Cloudflare Pages:** build `npm run build`, output `dist`; `_redirects` is honoured.
- **cPanel / Apache:** upload the *contents* of `dist/` and add the included `.htaccess`-style rule (see `public/.htaccess`).


### Host for free on GitHub Pages (no other service needed)

A workflow is included (`.github/workflows/deploy.yml`), so GitHub builds and publishes the site every time you push to `main`.

1. Push the project to a GitHub repository (branch `main`).
2. In the repo go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. Go to the **Actions** tab and wait for "Deploy to GitHub Pages" to finish (about 1–2 minutes). Your site is then live at `https://YOUR-USERNAME.github.io/REPO-NAME/`.
   - Name the repo `YOUR-USERNAME.github.io` to get the shorter address `https://YOUR-USERNAME.github.io/`.
4. **Custom domain (optional):** Settings → Pages → Custom domain, add your domain and the DNS records GitHub shows. Then in **Settings → Secrets and variables → Actions → Variables**, add a variable named `SITE_URL` with your full address (e.g. `https://www.yourdomain.com`) and re-run the workflow.

The base path, sitemap address and a `404.html` fallback (so refreshing any page works) are all handled automatically.

### Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `VITE_SITE_URL` | Recommended | Your public domain, used for the sitemap, robots.txt, canonical and social-share URLs. Without it the sitemap uses a placeholder domain and the build prints a warning. |

## 8. SEO included

Per-page titles and meta descriptions, Open Graph/Twitter tags, canonical URLs, JSON-LD (business, FAQ, breadcrumbs — built only from details you enter), `sitemap.xml` + `robots.txt` (auto-generated on build), lazy-loaded images with alt text, semantic HTML, skip link, keyboard-accessible menus, dialogs and forms, reduced-motion support.
For social sharing previews add a 1200×630 image to `public/` and set `seo.ogImage` in `business.ts`.

## 9. Project structure

```
src/
  config/business.ts     ← all business details
  data/                  ← editable content (gallery, rentals, DJ, FAQs, nav…)
  components/            ← Navbar, Footer, HeroSection, ServiceCard, GalleryGrid,
                           GalleryLightbox, BookingWizard, ContactForm, RentalCard,
                           RentalEnquiry, WhatsAppButton, WhatsAppFloat …
  pages/                 ← one file per page (decoration categories share a template)
  utils/                 ← whatsapp.ts, validation.ts, structuredData.ts
  styles/index.css       ← Tailwind + design-system components
public/images/placeholders/   ← sample artwork (replace via the data files)
scripts/                 ← placeholder generator, SEO generator, WhatsApp tests
```

## 10. Honest notes

- No prices, inventory, equipment, experience, awards, statistics or testimonials have been invented. Rentals show **Request Price** and "Availability on request" until you enter real data.
- Instagram: a live feed needs credentials/third-party tools, so the site shows a clean gallery plus follow buttons (visible only once you add your URLs).
- Do not add copyrighted music. The DJ page only links to mixes **you** list in `src/data/dj.ts`.
