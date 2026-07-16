# Aarogya Hospital Website

A polished, responsive multi-page healthcare website built with **HTML5, CSS3, and vanilla JavaScript**. The project demonstrates frontend architecture, responsive design, accessibility basics, client-side interaction, and deployment preparation without requiring a build tool.

## Features

- Responsive layouts for mobile, tablet, and desktop
- Multi-page navigation and reusable visual design
- Hero section, calls to action, doctor finder, emergency information, and health tips
- Services, diagnostics, health packages, and FAQ accordion
- Filterable gallery with captions, alt text, and lightbox preview
- Contact information, embedded map, and appointment form validation
- Mobile navigation, scroll effects, counters, and interactive cards
- Custom 404 page
- Basic SEO and social-sharing metadata
- Netlify-ready configuration

## Pages

- `index.html` — landing page and key healthcare information
- `about.html` — organisation story, doctors, mission, and care standards
- `services.html` — departments, diagnostics, packages, and frequently asked questions
- `gallery.html` — filterable facility gallery and lightbox
- `contact.html` — contact information, map, and validated appointment form
- `404.html` — custom not-found page

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- SVG assets
- Netlify configuration

## Project Structure

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
├── robots.txt
├── sitemap.xml
├── netlify.toml
└── CHATBOT_SETUP.md
```

## Run Locally

Open `index.html` directly in a browser, or run a local static server:

```bash
npx serve .
```

## Optional Chatbot Configuration

The chatbot integration is disabled until a valid embed URL is configured.

1. Open `js/chatbot-config.js`.
2. Add the approved chatbot embed URL.
3. Save and redeploy the website.

Do not commit private credentials or secret keys.

## Deployment

The site can be deployed as a static project on Netlify or GitHub Pages. No build command is required; publish the repository root.

Before publishing, update canonical URLs, Open Graph URLs, `robots.txt`, and `sitemap.xml` with the real deployed domain.

## Quality Highlights

- Semantic page structure
- Responsive media queries
- Accessible image descriptions
- Form validation
- Clear folder organisation
- Deployment and SEO preparation

## Future Improvements

- Add automated accessibility and HTML validation checks
- Connect the appointment form to a secure backend
- Add performance monitoring and image optimisation
- Add screenshots and a verified live-demo link
- Add end-to-end tests for navigation and forms

## Project Status

Active portfolio project. It is suitable for demonstrating frontend development skills, but any real healthcare deployment would require a secure backend, privacy controls, and professional review.