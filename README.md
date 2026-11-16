# HOROLOGY — Luxury Mechanical Watch Marketplace

A clean, modern multi-page web development project showcasing curated mechanical watches from four premier manufactures: **Rolex**, **Omega**, **Tudor**, and **Grand Seiko**.

---

## 🛠️ Technologies Used
- **HTML5**: Semantic document structure across 5 distinct pages (`index.html`, `watches.html`, `watch-detail.html`, `brands.html`, `about.html`, `contact.html`).
- **CSS3**: Modern responsive layout using CSS Grid, Flexbox, custom color variables, and media queries for mobile/tablet optimization (`style.css`).
- **Vanilla JavaScript**: Pure client-side DOM manipulation without any third-party frameworks, build tools, or libraries (`script.js` and `data.js`).

---

## 🚀 How to Run the Website
1. No web server, node, or npm package installation is required.
2. Double-click **`index.html`** to open it directly in any web browser (Google Chrome, Microsoft Edge, Safari, Firefox).
3. Click any link in the top navigation bar to move between pages.

---

## 📄 Pages Included
1. **`index.html` (Home)**: Minimal hero with `video.webm` background video, key metrics stats bar, curated vault specimens preview, and brand spotlight cards.
2. **`watches.html` (Collection Catalog)**: Full 28-timepiece studio archive with instant live search, brand filter buttons, sort options (price/year), and clickable cards.
3. **`watch-detail.html` (Watch Dossier)**: Dynamic single-watch detail view that loads specifications, pricing, print-ready high-res studio photography, and an interactive "Save to Wishlist" button based on the URL parameter (`?id=...`).
4. **`brands.html` (Heritage Houses)**: Historical profiles of Rolex, Omega, Tudor, and Grand Seiko with direct links to view each brand's watches.
5. **`about.html` (About Us)**: Horological standards, 4 pillars of authenticity, multi-point inspection protocol, and academic project note.
6. **`contact.html` (Concierge & Contact)**: Working interactive inquiry form with validation, showroom details, and expandable FAQ accordions.

---

## 📦 Project Structure
```text
Project/
├── index.html            # Homepage with video.webm hero
├── watches.html          # Watches catalog (28 references with search and filters)
├── watch-detail.html     # Single watch dossier view (2000px high-res support)
├── brands.html           # Brand profiles and history (7 references each)
├── about.html            # About and authenticity standards
├── contact.html          # Inquiries and FAQ accordion
├── style.css             # Main stylesheet
├── data.js               # Watch dataset (28 models + 4 brands)
├── script.js             # Navigation, search, filter, and detail scripts
├── video.webm            # Hero background video
├── catalogue/            # 28 studio-graded watch photos (1024px & 2000px print copies)
│   ├── Rolex/            # Rolex 01.jpg .. Rolex 07.jpg
│   ├── Omega/            # Omega 01.jpg .. Omega 07.jpg
│   ├── Tudor/            # Tudor 01.jpg .. Tudor 07.jpg
│   ├── Grand Seiko/      # Grand Seiko 01.jpg .. Grand Seiko 07.jpg
│   └── print-2000/       # 2000 x 2000 high-res copies
└── README.md             # Project documentation
```
