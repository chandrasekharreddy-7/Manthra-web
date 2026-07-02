# Aarogya Hospital — Website

A multi-page static site for a multi-specialty hospital: 5 pages, a working doctor search/filter, an appointment form with client-side validation, and an FAQ accordion. Plain HTML, CSS, and JavaScript — no build step, no frameworks.

**Live site:** _add your Netlify URL here after deploying_

## Structure

```
├── index.html          Home
├── about.html           Hospital story + full doctor directory
├── services.html        Departments, health packages, diagnostics, FAQ
├── gallery.html          Facility gallery (filterable)
├── contact.html          Contact info, appointment form, map
├── 404.html               Custom not-found page
├── css/style.css          All styles
├── js/script.js           Nav toggle, doctor finder, FAQ, form validation, gallery filter
├── assets/favicon.svg
├── robots.txt
├── sitemap.xml
└── netlify.toml
```

## Local preview

No build tools required. Either open `index.html` directly in a browser, or serve it locally so relative paths and the map embed behave the same as production:

```
npx serve .
```

## Before you deploy

1. **Domain** — `index.html`, `about.html`, `services.html`, `gallery.html`, and `contact.html` each have a `<link rel="canonical">` and Open Graph tags pointing at `https://aarogyahospital.example/...`. Once you have a real Netlify URL, do a find-and-replace across all five files.
2. **Live chat** — every page includes a Tawk.to snippet before `</body>` with placeholder IDs:
   ```html
   s1.src = 'https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
   ```
   Create a free account at [tawk.to](https://www.tawk.to), copy your Property ID and Widget ID from **Administration → Chat Widget**, and replace both placeholders on all 5 pages.
3. **Appointment form** — `initAppointmentForm()` in `js/script.js` validates and shows a success message, but there's no backend wired up. Point the form at whatever you're using to actually receive requests (Formspree, a serverless function, etc.) before treating submissions as real.

## Deployment

**Netlify:** drag the project folder into Netlify, or connect the GitHub repo and set the publish directory to `.` (already configured in `netlify.toml`).

**GitHub:** initialize a repo, commit, and push:
```
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## SEO checklist covered

- Unique `<title>` and meta description per page
- One `<h1>` per page, semantic `<h2>`/`<h3>` hierarchy
- `alt` text / `aria-label` on every image and illustrated visual
- Open Graph + Twitter card tags
- `Hospital` structured data (JSON-LD) on the homepage
- `robots.txt` + `sitemap.xml`
- Simple, descriptive file names (`about.html`, `services.html`, etc.)
