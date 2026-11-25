# HOROLOGY — Luxury Mechanical Watch Showcase

A modern, high-tech luxury horological showcase website built with **HTML5**, **CSS3**, and **Vanilla JavaScript**.

---

## ✨ Features

1. **Ochre & Calm Light Themes**:
   - **Dark Mode**: Warm, rich **Ochre** (`#D9923B`) paired with a deep charcoal obsidian background (`#0C0E12`).
   - **Light Mode**: Refined, understated warm stone & soft amber bronze (`#A86C29`), calm and subtle without being glaring or overwhelming.
   - Interactive **Dark Mode / Light Mode** switch in the navbar with `localStorage` persistence.

2. **Cinema Video Hero Screen (`video.webm`)**:
   - High-definition video background (`video.webm`) with balanced contrast overlays.
   - Fully and clearly visible in **both Light Mode and Dark Mode**.

3. **Interactive Watch Details Modal ("View Details" Button)**:
   - Each watch card features a **View Details** button (and clickable photo).
   - Opens an animated technical dossier modal with:
     - High-resolution watch photography
     - Detailed historical pedigree and manufacture notes
     - Complete technical specifications table (Case size, materials, calibre, power reserve, water resistance, crystal, bracelet)
     - Direct "Inquire About This Reference" button inside the modal
     - Supports close button (`×`), backdrop click, and `Escape` key.

4. **Concierge Inquire & Auto-Fill System**:
   - Clicking **Inquire** triggers a floating toast notification.
   - Smoothly scrolls to the contact form.
   - Pre-selects the watch in the dropdown and pre-fills the message text with reference details.
   - Pulses the contact card with an animated ochre glow.

5. **Smooth Form Handling**:
   - Zero-jump, zero-reload form validation.
   - Shows a personalized success toast notification and resets fields cleanly.

6. **3 Curated Benchmark Watches**:
   - **Rolex Submariner Date** (Ref. 126610LN &middot; $14,300)
   - **Omega Speedmaster Moonwatch** (Ref. 310.30.42.50.01.001 &middot; $6,900)
   - **Tudor Black Bay Fifty-Eight** (Ref. M79030N-0001 &middot; $3,800)

7. **Concise, High-Performance JavaScript**:
   - Streamlined `script.js` to ~130 lines while preserving 100% of all interactive functionality.

---

## 📁 Project Structure
```text
Project/
├── index.html       # Single-page semantic HTML5 with video hero & modal
├── style.css        # Ochre & soft light mode themes, video hero, animations
├── script.js        # Streamlined JS for modal, theme toggle, toasts, form
├── video.webm       # High-definition hero background video
├── catalogue/       # Studio photography for Rolex, Omega, Tudor
├── assets/          # Favicons, logo emblems, and icons
└── README.md        # Documentation and presentation notes
```

---

## 🚀 How to Run
Double-click `index.html` to open in any web browser (Chrome, Edge, Safari, Firefox).
