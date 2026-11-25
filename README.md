# HOROLOGY — Luxury Mechanical Watch Showcase

A modern, high-tech luxury horological showcase website built with **HTML5**, **CSS3**, and **Vanilla JavaScript**.

---

## ✨ Features

1. **Royal Purple & Amethyst Luxury Palette**:
   - **Dark Mode**: Deep midnight obsidian purple (`#0F0A18`, `#171024`) paired with radiant **Royal Violet / Purple** (`#A855F7`), glowing lilac badges (`#C084FC`), and soft orchid accents (`#E879F9`).
   - **Light Mode**: Elegant lavender-tinted sand canvas (`#F7F5FA`, `#FFFFFF`), deep imperial purple (`#7E22CE`), and crisp lilac accents. Soft, comfortable, and sophisticated.
   - Interactive **Dark Mode / Light Mode** switch in the navbar with instant live toggle and `localStorage` persistence.

2. **Cinema Video Hero Screen (`video.webm`)**:
   - High-definition video background (`video.webm`) showing mechanical horology.
   - Custom vignette overlay engineered to keep the video **clearly visible in both Light Mode and Dark Mode** with high-contrast, crystal-clear typography.

3. **Interactive Watch Details Modal ("View Details" Button)**:
   - Each watch card features a **View Details** button (and clickable photo).
   - Opens an animated technical dossier modal with:
     - High-resolution watch photography
     - Detailed historical pedigree and manufacture notes
     - Complete technical specifications table (Case size, materials, bezel, movement calibre, power reserve, water resistance, crystal, bracelet)
     - Direct "Inquire About This Reference" button inside the modal
     - Supports close button (`×`), backdrop click, and `Escape` key.

4. **Concierge Inquire & Auto-Fill System**:
   - Clicking **Inquire** triggers a floating toast notification.
   - Smoothly scrolls to the contact form.
   - Pre-selects the watch in the dropdown and pre-fills the message text with reference details.
   - Pulses the contact card with an animated purple glow.

5. **Smooth Form Handling**:
   - Zero-jump, zero-reload form validation.
   - Accepts either email or phone number.
   - Shows a personalized success toast notification and resets fields cleanly.

6. **3 Curated Benchmark Watches**:
   - **Rolex Submariner Date** (Ref. 126610LN &middot; $14,300)
   - **Omega Speedmaster Moonwatch** (Ref. 310.30.42.50.01.001 &middot; $6,900)
   - **Tudor Black Bay Fifty-Eight** (Ref. M79030N-0001 &middot; $3,800)

7. **Concise, High-Performance JavaScript**:
   - Streamlined `script.js` to ~110 lines while preserving 100% of all interactive functionality.

---

## 📁 Project Structure
```text
Project/
├── index.html       # Single-page semantic HTML5 with video hero & modal
├── style.css        # Royal purple palette, video hero, modal & responsive design
├── script.js        # Streamlined JS for modal, theme toggle, toasts, form
├── video.webm       # High-definition hero background video
├── catalogue/       # Studio photography for Rolex, Omega, Tudor
├── assets/          # Favicons, logo emblems, and icons
└── README.md        # Documentation and presentation notes
```

---

## 🚀 How to Run
Double-click `index.html` to open in any web browser (Chrome, Edge, Safari, Firefox).
