# Aarogya Hospital — Frontend Website Assignment

Selected topic: **Health Care Website**

A polished, original, multi-page static website for Aarogya Hospital / Health Clinic. It is built with plain **HTML5, CSS3, and vanilla JavaScript** so it can be hosted directly on GitHub and Netlify without a build step.

## Pages

- `index.html` — home page with hero banner, CTA, doctor finder, emergency strip, and health tips
- `about.html` — clinic story, milestones, doctors, mission, and care standards
- `services.html` — departments, diagnostics, health packages, and FAQ accordion
- `gallery.html` — filterable facility gallery with local image assets, captions, alt text, and lightbox preview
- `contact.html` — contact details, map, and appointment form with validation
- `404.html` — custom Netlify-friendly not-found page

## Assignment checklist covered

- Required pages and working navigation
- Proper layout, sections, cards, buttons, footer, readable fonts, and consistent theme
- Responsive mobile, tablet, and desktop design using CSS media queries
- Basic SEO: unique title, meta description, meta keywords, canonical URL, Open Graph tags, one `h1` per page, internal links, and alt text
- JavaScript interactivity: mobile menu, doctor filter/search, FAQ accordion, gallery filter, gallery lightbox, scroll reveal, 3D card tilt, counter animation, and appointment form validation
- Netlify-ready static deployment using `netlify.toml`
- New handcrafted SVG favicon/logo in `assets/favicon.svg`
- Optional chatbot setup through one config file: `js/chatbot-config.js`

## Folder structure

```text
├── index.html
├── about.html
├── services.html
├── gallery.html
├── contact.html
├── 404.html
├── css/
│   └── style.css
├── js/
│   ├── chatbot-config.js
│   └── script.js
├── assets/
│   ├── favicon.svg
│   ├── logo.svg
│   ├── hero-care.svg
│   ├── gallery-reception.svg
│   ├── gallery-emergency.svg
│   ├── gallery-operation-theatre.svg
│   ├── gallery-icu.svg
│   ├── gallery-lab.svg
│   ├── gallery-xray.svg
│   ├── gallery-pediatric.svg
│   ├── gallery-pharmacy.svg
│   ├── gallery-care-team.svg
│   └── og-image.svg
├── robots.txt
├── sitemap.xml
├── netlify.toml
└── CHATBOT_SETUP.md
```

## Run locally

Open `index.html` directly in a browser, or run a small static server:

```bash
npx serve .
```

## Chatbot setup

The website is ready for a chatbot link but does not load a broken placeholder by default.

1. Open `js/chatbot-config.js`.
2. Paste your chatbot embed script URL inside `window.AAROGYA_CHATBOT_EMBED_URL`.
3. Save and redeploy.

Example:

```js
window.AAROGYA_CHATBOT_EMBED_URL = "https://embed.tawk.to/PROPERTY_ID/WIDGET_ID";
```

Full setup steps are in `CHATBOT_SETUP.md`.

## Replace deployment URL before final submission

After Netlify deploys your website, replace this placeholder everywhere:

```text
https://your-netlify-site.netlify.app
```

Use your real Netlify URL in:

- all canonical tags
- Open Graph `og:url` and `og:image`
- `robots.txt`
- `sitemap.xml`

## Netlify deployment

No build command is needed.

- Publish directory: `.`
- Build command: leave empty

You can deploy by dragging this folder into Netlify or by connecting the GitHub repository.

## Final submission placeholders

- GitHub Repository Link: _paste your public GitHub repo link here_
- Netlify Live Website Link: _paste your live Netlify link here_
- Selected Topic: Health Care Website
