# 1947 on Vilakazi Street — Website Project

## Project Title
1947 on Vilakazi Street — Website Redesign (WEDE5020 POE, Part 2)

## Student Information
- **Name:** Vuyokazi Hlatshwayo
- **Institution:** IIE Rosebank College
- **Qualification:** Bachelor of Information Technology in Business Systems
- **Module:** WEDE5020 — Web Development

## Project Overview
This project proposes and builds a redesigned website for 1947 on Vilakazi Street, an existing fine-dining restaurant located at 7156 Vilakazi Street, Orlando West, Soweto. The redesign addresses specific weaknesses identified in the restaurant's current live website, including slow-loading elements, missing enquiry functionality for private/corporate bookings, and a single-location contact map.

## Website Goals and Objectives
- Improve usability and mobile performance versus the current live site.
- Enable table reservations and menu browsing without a phone call.
- Introduce a dedicated enquiry channel for private functions, corporate bookings, and the Chef's Table experience.
- Present the restaurant's Vilakazi Street heritage story prominently for tourist visitors.

## Key Features and Functionality
- 5 pages: Home, About Us, Menu, Enquiries, Contact
- Responsive navigation with mobile toggle menu
- Enquiry and Contact forms with client-side JavaScript validation
- Dual embedded maps (restaurant location + visitor parking point)
- Semantic HTML5 structure (header, nav, main, footer)

## Timeline and Milestones
| Week | Milestone |
|------|-----------|
| 1 | Proposal approval, content research and sourcing |
| 2 | Sitemap, wireframes, file structure, initial HTML build |
| 3 | Content integration, styling, navigation, cross-browser testing |
| 4 | Final refinements, README, Part 1 submission |

## Part 1 Details
Part 1 covered the website proposal, content research, sitemap, initial HTML structure, and basic styling for all 5 pages.

## Part 2 Details
Part 2 covers CSS styling and responsive design for the desktop solution: an external stylesheet, base styles and a CSS reset, a fluid typography scale, CSS Grid/Flexbox layout, visual styling (colour, background, border, box-shadow), interactive pseudo-classes (`:hover`, `:focus`, `:active`), and responsive design using breakpoints, relative units, and responsive images (`srcset`/`picture`). All feedback from Part 1 was actioned first (see Changelog).

## Sitemap
```
Home (index.html)
├── About Us (about.html)
├── Menu (menu.html)
├── Enquiries (enquiry.html)
└── Contact (contact.html)
```
All pages share a common header/navigation and footer, and link to each other directly (flat structure, no sub-pages).

## File Structure
```
/
├── index.html
├── about.html
├── menu.html
├── enquiry.html
├── contact.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── images/
    ├── home-hero-800.jpg / -1400.jpg / -2000.jpg       (homepage hero background)
    ├── home-interior-400.jpg / -800.jpg / -1200.jpg    (homepage "Our Story" photo)
    ├── about-history-400.jpg / -800.jpg / -1200.jpg    (About "Our History" photo)
    └── menu-cellar-400.jpg / -800.jpg                  ("From the Cellar" photo)
```
Each photo is provided at multiple widths and served with `<picture>`/`srcset` so the browser downloads the size appropriate to the viewport. Team member photos were not available at time of submission, so team cards use styled initials avatars in the site's colour palette instead of placeholder boxes.

## Changelog

### Part 1
- **v0.1** — Initial repository setup, file/folder structure created.
- **v0.2** — Homepage, About, Menu, Enquiry, and Contact pages built with semantic HTML5.
- **v0.3** — Shared stylesheet added (fine-dining colour palette: burgundy, charcoal, gold, cream; Fraunces + Karla typefaces).
- **v0.4** — Mobile navigation toggle and form validation JavaScript added.
- **v0.5** — README.md documentation completed for Part 1 submission.

### Part 2 — Feedback edits from Part 1
- **v0.6** — Reviewed lecturer feedback from Part 1 and actioned corrections across all five pages before starting new Part 2 work.

### Part 2 — CSS styling and responsive design
- **v0.7** — Extended the CSS reset in `styles.css` (list styles, image/media defaults, heading and form-control normalisation) on top of the existing box-sizing reset.
- **v0.8** — Added a fluid typography scale using CSS custom properties (`--step-1` to `--step4`, built with `clamp()`) so headings resize smoothly between mobile and desktop instead of jumping at breakpoints.
- **v0.9** — Refactored repeated inline `style=""` attributes across `index.html`, `about.html`, `menu.html`, `contact.html`, and `enquiry.html` into reusable utility classes (`.title-lg`, `.title-md`, `.measure`, `.mb-sm/md/lg`, `.center-v`, `.start-v`, `.text-center`, `.btn-outline-burgundy`, `.card--on-dark`, `.subheading`), so styling now cascades from the stylesheet with a minimum number of selectors rather than being repeated per element.
- **v0.10** — Added `box-shadow` to cards, the responsive photo frames, and the sticky header for visual depth; added `:active` states to buttons and nav links alongside the existing `:hover`/`:focus-visible` states.
- **v0.11** — Sourced and processed real restaurant photography (interior/lounge shots taken on-site) to replace the placeholder blocks on the Home ("Our Story"), Home (hero background), and Menu ("From the Cellar") sections. Each photo was exported at three widths and wired up with `<picture>`/`srcset`/`sizes` so the browser loads an appropriately sized file per device — this satisfies the responsive-images requirement (3.3) without shipping one oversized image to mobile users. Background shots were deliberately cropped to exclude other diners for privacy.
- **v0.12** — The About page "Our History" photo and the three team member photos (Founder, Head Chef, Sommelier) were not available at submission time. Rather than leave the dashed placeholder boxes, the About "Our History" spot uses a real (cropped, people-free) interior shot, and the team cards use a small `.avatar` component — a styled monogram in the site's burgundy/gold palette — as an intentional design choice.
- **v0.13** — Documented explicit breakpoints in `styles.css`: desktop (default, >820px), tablet (≤820px, existing `.grid-3`/`.grid-2` single-column stacking), and a new mobile refinement at ≤480px (hero padding, full-width buttons, stacked hero actions).
- **v0.14** — Confirmed relative units are used throughout for responsiveness: `rem`/`em` for type and spacing, `%`/`ch` for content widths (`.measure`, form inputs at `width:100%`), and `clamp()` for fluid values.
- **v0.15** — Verified layout in browser dev tools across desktop, tablet, and mobile widths (see screenshot evidence, if included per lecturer instructions).

## References
- 1947 on Vilakazi Street. (2026) *1947 on Vilakazi Street*. Available at: https://1947onvilakazi.co.za (Accessed: 11 August 2026).
- Mail & Guardian. (2022) *Soweto's 1947 on Vilakazi Street is a township portrait*. Available at: https://mg.co.za/friday/2022-10-07-soweto-s-1947-on-vilakazi-street-is-a-township-portrait/ (Accessed: 11 August 2026).
- Mbanje, S. and Lunga, C. (2022) *Business Management for Southern African Students*. Cape Town: Juta.
