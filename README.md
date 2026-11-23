# HOROLOGY — Luxury Mechanical Watch Showcase

A modern, high-tech luxury horological showcase website built with **HTML5**, **CSS3**, and **Vanilla JavaScript**.

---

## ✨ Features

1. **Obsidian & Electric Azure Titanium Theme**:
   - High-contrast, clean color palette (Obsidian Void `#07090E` with Electric Azure `#00D4FF`).
   - Interactive **Dark Mode / Light Mode** toggle in the navigation bar with `localStorage` persistence.
   - Smooth transitions across all components and typography.

2. **Video Hero Screen**:
   - High-definition video background (`video.webm`) with dark overlay and smooth entrance animation.

3. **Watch Card Details Modal ("View Details" Button)**:
   - Each watch card features a **View Details** button (and clickable watch photo).
   - Clicking opens an animated technical dossier modal with:
     - High-resolution photography
     - Complete historical pedigree and manufacture notes
     - Full technical specifications table (Case size, materials, calibre, power reserve, water resistance, crystal, bracelet)
     - Direct "Inquire About This Reference" button inside the modal
     - Smooth backdrop blur, close button (`×`), and `Escape` key support.

4. **Interactive Inquire & Concierge Auto-Fill**:
   - Clicking **Inquire** triggers a floating toast notification.
   - Smoothly scrolls to the contact form.
   - Pre-selects the watch in the dropdown and pre-fills the message text with reference details.
   - Pulses the contact card with an animated accent glow.

5. **Smooth Form Handling**:
   - Zero-jump, zero-reload form validation.
   - Shows a personalized success toast notification and resets fields cleanly.

6. **3 Curated Benchmark Watches**:
   - **Rolex Submariner Date** (Ref. 126610LN &middot; $14,300)
   - **Omega Speedmaster Moonwatch** (Ref. 310.30.42.50.01.001 &middot; $6,900)
   - **Tudor Black Bay Fifty-Eight** (Ref. M79030N-0001 &middot; $3,800)

---

## 📁 Project Structure
```text
Project/
├── index.html       # Single-page semantic HTML5 with video hero & modal
├── style.css        # Obsidian/Azure palette, dark/light modes, animations
├── script.js        # Watch details modal, theme toggle, toasts, form handling
├── video.webm       # High-definition hero background video
├── catalogue/       # Studio photography for Rolex, Omega, Tudor
├── assets/          # Favicons, logo emblems, and icons
└── README.md        # Documentation and presentation notes
```

---

## 🚀 How to Run
Double-click `index.html` to open in any web browser (Chrome, Edge, Safari, Firefox).
