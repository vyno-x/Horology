// ==========================================================
// HOROLOGY - Concise JavaScript (script.js)
// Theme Toggle, Video Hero Navigation, Watch Dossier Modal, Toasts & Inquiries
// ==========================================================

const WATCHES = {
  "rolex-submariner": {
    brand: "Rolex Manufacture", title: "Submariner Date", ref: "Ref. 126610LN", price: "$14,300",
    image: "catalogue/Rolex/Rolex 01.jpg",
    desc: "First launched in 1953, the Submariner is the archetype of the luxury diving tool watch. Featuring an Oystersteel case, black Cerachrom ceramic bezel with platinum graduations, and Calibre 3235 perpetual movement.",
    specs: { "Case Diameter": "41 mm", "Case Material": "Oystersteel (904L)", "Bezel": "Unidirectional Cerachrom", "Movement": "Calibre 3235 Perpetual", "Power Reserve": "70 Hours", "Water Resistance": "300 m / 1,000 ft", "Crystal": "Sapphire with Cyclops", "Bracelet": "Oyster with Glidelock" }
  },
  "omega-speedmaster": {
    brand: "Omega Manufacture", title: "Speedmaster Moonwatch", ref: "Ref. 310.30.42.50.01.001", price: "$6,900",
    image: "catalogue/Omega/Omega 01.jpg",
    desc: "Flight-qualified by NASA for all manned space missions and worn on the Moon during Apollo 11. Powered by the METAS Master Chronometer Co-Axial Calibre 3861 with 15,000 gauss magnetic resistance.",
    specs: { "Case Diameter": "42 mm", "Case Material": "Stainless Steel", "Bezel": "Aluminum 'Dot Over 90'", "Movement": "Co-Axial Master 3861", "Winding": "Manual-Wind Chronograph", "Power Reserve": "50 Hours", "Water Resistance": "50 m / 165 ft", "Anti-Magnetic": "15,000 Gauss" }
  },
  "tudor-blackbay": {
    brand: "Tudor Manufacture", title: "Black Bay Fifty-Eight", ref: "Ref. M79030N-0001", price: "$3,800",
    image: "catalogue/Tudor/Tudor 01.jpg",
    desc: "Commemorating Tudor's historic 1958 diver (Ref. 7924). Vintage 39mm proportions, warm gilt dial accents, Snowflake hands, and the COSC in-house Calibre MT5402 with weekend-proof 70-hour reserve.",
    specs: { "Case Diameter": "39 mm", "Case Material": "Satin Stainless Steel", "Bezel": "Matte Black Aluminum", "Movement": "Manufacture MT5402 (COSC)", "Power Reserve": "70 Hours", "Water Resistance": "200 m / 660 ft", "Crystal": "Domed Sapphire", "Bracelet": "Riveted Steel Safety Clasp" }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Theme Toggle (Ochre & Forest Green Palette)
  const themeBtn = document.getElementById("theme-toggle");
  const applyTheme = (theme) => {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    if (themeBtn) {
      const icon = themeBtn.querySelector(".theme-icon");
      const text = themeBtn.querySelector(".theme-text");
      if (icon) icon.textContent = theme === "light" ? "☀️" : "🌙";
      if (text) text.textContent = theme === "light" ? "Light" : "Dark";
    }
  };
  applyTheme(localStorage.getItem("horology_theme") || "dark");

  themeBtn?.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const nextTheme = isLight ? "dark" : "light";
    applyTheme(nextTheme);
    localStorage.setItem("horology_theme", nextTheme);
    showToast(nextTheme === "light" ? "☀️" : "🌙", `${nextTheme.toUpperCase()} Mode`, `Theme updated to ${nextTheme} palette.`);
  });

  // 2. Smooth Section Navigation
  document.querySelectorAll("[data-scroll]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById(btn.getAttribute("data-scroll"))?.scrollIntoView({ behavior: "smooth" });
    });
  });

  // 3. Watch Details Modal
  const modal = document.getElementById("watch-modal");
  const closeModal = () => { modal?.classList.remove("active"); document.body.style.overflow = ""; };

  document.querySelectorAll(".btn-details, .watch-image-wrap").forEach(el => {
    el.addEventListener("click", () => {
      const w = WATCHES[el.getAttribute("data-watch-key")];
      if (!w || !modal) return;
      document.getElementById("modal-img").src = w.image;
      document.getElementById("modal-brand").textContent = w.brand;
      document.getElementById("modal-title").textContent = w.title;
      document.getElementById("modal-ref").textContent = w.ref;
      document.getElementById("modal-price").textContent = w.price;
      document.getElementById("modal-desc").textContent = w.desc;
      
      const specsTable = document.getElementById("modal-specs");
      specsTable.innerHTML = Object.entries(w.specs).map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join("");

      document.getElementById("modal-inquire-btn").onclick = () => {
        closeModal();
        triggerInquiry(w.title, w.price, w.ref);
      };

      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  document.getElementById("modal-close-btn")?.addEventListener("click", closeModal);
  modal?.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  // 4. Inquire Action Helper
  const triggerInquiry = (name, price, ref) => {
    const select = document.getElementById("inquiry-watch");
    const msg = document.getElementById("message");
    const card = document.querySelector(".contact-card");

    if (select) {
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].text.toLowerCase().includes(name.toLowerCase().split(" ")[0])) {
          select.selectedIndex = i;
          break;
        }
      }
    }
    if (msg) msg.value = `Hello, I would like to inquire about purchasing the ${name} (${price}) [${ref}]. Please provide availability and shipping details.`;
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    
    if (card) {
      card.classList.remove("highlight");
      void card.offsetWidth;
      card.classList.add("highlight");
    }
    showToast("⏱️", `Inquiry: ${name}`, `Timepiece selected (${price}). Concierge form prepared below.`);
  };

  document.querySelectorAll(".btn-inquire").forEach(btn => {
    btn.addEventListener("click", () => {
      triggerInquiry(btn.dataset.watch, btn.dataset.price, btn.dataset.ref);
    });
  });

  // 5. Contact Form Submission (No reload, no jumping)
  document.getElementById("concierge-form")?.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name")?.value.trim();
    const contact = document.getElementById("contact-input")?.value.trim();
    const message = document.getElementById("message")?.value.trim();

    if (!name || !contact || !message) {
      showToast("⚠️", "Required Fields", "Please complete your name, contact, and message.");
      return;
    }

    showToast("✓", "Inquiry Sent!", `Thank you, ${name}. Our concierge will contact you via ${contact} within 24 hours.`);
    e.target.reset();
  });
});

// 6. Floating Toast Notifications
function showToast(icon, title, message) {
  let box = document.getElementById("toast-container") || Object.assign(document.createElement("div"), { id: "toast-container", className: "toast-container" });
  if (!box.parentElement) document.body.appendChild(box);

  const t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = `<div class="toast-icon">${icon}</div><div class="toast-content"><h4>${title}</h4><p>${message}</p></div><button type="button" class="toast-close">&times;</button>`;
  
  const dismiss = () => { t.classList.add("toast-hide"); setTimeout(() => t.remove(), 300); };
  t.querySelector(".toast-close").onclick = dismiss;
  box.appendChild(t);
  setTimeout(dismiss, 4200);
}
