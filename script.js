// ==========================================================
// HOROLOGY - Luxury Mechanical Watch Showcase
// JavaScript (script.js) - Video Hero, Modal Dossier, Animations & Theme
// ==========================================================

// Watch Database for Interactive Details Modal
const WATCH_DETAILS = {
  "rolex-submariner": {
    brand: "Rolex Manufacture",
    title: "Submariner Date",
    ref: "Ref. 126610LN",
    price: "$14,300",
    image: "catalogue/Rolex/Rolex 01.jpg",
    badge: "Professional Diver",
    desc: "First launched in 1953, the Rolex Submariner is the quintessential diving tool watch. Featuring an updated 41mm Oystersteel case, a black Cerachrom ceramic bezel with platinum coated graduations, and the chronometer-certified in-house Calibre 3235 perpetual movement with Chronergy escapement.",
    specs: {
      "Case Diameter": "41 mm",
      "Case Material": "Oystersteel (904L Alloy)",
      "Bezel": "Unidirectional 60-min Cerachrom Ceramic",
      "Movement": "Rolex Calibre 3235 Perpetual Automatic",
      "Power Reserve": "Approximately 70 Hours",
      "Water Resistance": "300 meters / 1,000 feet",
      "Crystal": "Sapphire with Cyclops Date Magnifier",
      "Bracelet": "Oyster 3-link with Glidelock Clasp"
    }
  },
  "omega-speedmaster": {
    brand: "Omega Manufacture",
    title: "Speedmaster Moonwatch",
    ref: "Ref. 310.30.42.50.01.001",
    price: "$6,900",
    image: "catalogue/Omega/Omega 01.jpg",
    badge: "Flight Chronograph",
    desc: "Flight-qualified by NASA in 1965 for all manned space exploration and worn on the lunar surface during Apollo 11. Powered by the METAS-certified Master Chronometer Co-Axial Calibre 3861 with free-sprung balance and extreme 15,000-gauss magnetic field resistance.",
    specs: {
      "Case Diameter": "42 mm",
      "Case Material": "Stainless Steel (Asymmetric Case)",
      "Bezel": "Anodized Aluminum with 'Dot Over 90'",
      "Movement": "Omega Co-Axial Master Chronometer 3861",
      "Winding": "Manual-Wind Chronograph",
      "Power Reserve": "Approximately 50 Hours",
      "Water Resistance": "50 meters / 165 feet",
      "Anti-Magnetic": "Resistant to 15,000 Gauss"
    }
  },
  "tudor-blackbay": {
    brand: "Tudor Manufacture",
    title: "Black Bay Fifty-Eight",
    ref: "Ref. M79030N-0001",
    price: "$3,800",
    image: "catalogue/Tudor/Tudor 01.jpg",
    badge: "Heritage Diver",
    desc: "Commemorating Tudor's historic 1958 divers' watch (Ref. 7924). Scaled to vintage 39mm proportions, this reference combines warm gilt dial markers, signature Snowflake hands, and the COSC-certified in-house Calibre MT5402 movement built for weekend-proof reliability.",
    specs: {
      "Case Diameter": "39 mm",
      "Case Material": "Satin-Finished Stainless Steel",
      "Bezel": "Unidirectional Matte Black Aluminum Disc",
      "Movement": "Manufacture Calibre MT5402 (COSC)",
      "Power Reserve": "Approximately 70 Hours",
      "Water Resistance": "200 meters / 660 feet",
      "Crystal": "Domed Scratch-Resistant Sapphire",
      "Bracelet": "Riveted Steel with Folding Safety Clasp"
    }
  }
};

document.addEventListener("DOMContentLoaded", function () {
  initThemeToggle();
  initNavigation();
  initWatchModal();
  initInquiryButtons();
  initContactForm();
});

// ----------------------------------------------------------
// 1. DARK / LIGHT MODE THEME TOGGLE
// ----------------------------------------------------------
function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  const themeIcon = toggleBtn.querySelector(".theme-icon");
  const themeText = toggleBtn.querySelector(".theme-text");

  const savedTheme = localStorage.getItem("horology_theme") || "dark";
  applyTheme(savedTheme);

  toggleBtn.addEventListener("click", function () {
    const currentTheme = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem("horology_theme", newTheme);

    showToast(
      newTheme === "light" ? "☀️" : "🌙",
      `${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} Mode Enabled`,
      `Website appearance updated to ${newTheme} aesthetic.`
    );
  });

  function applyTheme(theme) {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      if (themeIcon) themeIcon.textContent = "☀️";
      if (themeText) themeText.textContent = "Light";
    } else {
      document.documentElement.removeAttribute("data-theme");
      if (themeIcon) themeIcon.textContent = "🌙";
      if (themeText) themeText.textContent = "Dark";
    }
  }
}

// ----------------------------------------------------------
// 2. SMOOTH SECTION NAVIGATION
// ----------------------------------------------------------
function initNavigation() {
  const navButtons = document.querySelectorAll("[data-scroll]");

  navButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const targetId = button.getAttribute("data-scroll");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
}

// ----------------------------------------------------------
// 3. INTERACTIVE WATCH DETAILS MODAL ("SHOW WATCH CARD DETAILS")
// ----------------------------------------------------------
function initWatchModal() {
  const modalOverlay = document.getElementById("watch-modal");
  const closeBtn = document.getElementById("modal-close-btn");
  const detailButtons = document.querySelectorAll(".btn-details, .watch-image-wrap");

  if (!modalOverlay) return;

  // Elements inside modal
  const modalImg = document.getElementById("modal-img");
  const modalBrand = document.getElementById("modal-brand");
  const modalTitle = document.getElementById("modal-title");
  const modalRef = document.getElementById("modal-ref");
  const modalPrice = document.getElementById("modal-price");
  const modalDesc = document.getElementById("modal-desc");
  const modalSpecs = document.getElementById("modal-specs");
  const modalInquireBtn = document.getElementById("modal-inquire-btn");

  // Open modal on click
  detailButtons.forEach(function (el) {
    el.addEventListener("click", function () {
      const watchKey = el.getAttribute("data-watch-key");
      const data = WATCH_DETAILS[watchKey];
      if (!data) return;

      // Populate modal content
      if (modalImg) {
        modalImg.src = data.image;
        modalImg.alt = data.title;
      }
      if (modalBrand) modalBrand.textContent = data.brand;
      if (modalTitle) modalTitle.textContent = data.title;
      if (modalRef) modalRef.textContent = data.ref;
      if (modalPrice) modalPrice.textContent = data.price;
      if (modalDesc) modalDesc.textContent = data.desc;

      // Build specs table rows
      if (modalSpecs) {
        modalSpecs.innerHTML = "";
        for (const [key, value] of Object.entries(data.specs)) {
          const row = document.createElement("tr");
          row.innerHTML = `<td>${key}</td><td>${value}</td>`;
          modalSpecs.appendChild(row);
        }
      }

      // Configure modal inquire button
      if (modalInquireBtn) {
        modalInquireBtn.onclick = function () {
          closeModal();
          triggerInquiry(data.title, data.price, data.ref);
        };
      }

      // Open with animation
      modalOverlay.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background scroll
    });
  });

  // Close modal handlers
  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });
}

// ----------------------------------------------------------
// 4. INQUIRE ACTION (MESSAGE TOAST + AUTO-FILL CONTACT FORM)
// ----------------------------------------------------------
function initInquiryButtons() {
  const inquireButtons = document.querySelectorAll(".btn-inquire");

  inquireButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const watchName = btn.getAttribute("data-watch") || "Luxury Timepiece";
      const watchPrice = btn.getAttribute("data-price") || "";
      const watchRef = btn.getAttribute("data-ref") || "";

      triggerInquiry(watchName, watchPrice, watchRef);
    });
  });
}

function triggerInquiry(watchName, watchPrice, watchRef) {
  const timepieceSelect = document.getElementById("inquiry-watch");
  const messageField = document.getElementById("message");
  const contactSection = document.getElementById("contact");
  const contactCard = document.querySelector(".contact-card");

  // Auto-select watch in dropdown
  if (timepieceSelect) {
    for (let i = 0; i < timepieceSelect.options.length; i++) {
      if (timepieceSelect.options[i].text.toLowerCase().includes(watchName.toLowerCase().split(" ")[0])) {
        timepieceSelect.selectedIndex = i;
        break;
      }
    }
  }

  // Pre-fill concierge message
  if (messageField) {
    messageField.value = `Hello, I would like to inquire about purchasing the ${watchName} (${watchPrice}) [${watchRef}]. Please provide availability and shipping details.`;
  }

  // Smooth scroll to contact
  if (contactSection) {
    contactSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  // Animate pulse on contact card
  if (contactCard) {
    contactCard.classList.remove("highlight");
    void contactCard.offsetWidth;
    contactCard.classList.add("highlight");
  }

  // Floating toast notification
  showToast(
    "⏱️",
    `Inquiry: ${watchName}`,
    `Timepiece selected (${watchPrice}). Concierge form prepared below.`
  );
}

// ----------------------------------------------------------
// 5. CONTACT FORM SUBMISSION (NO JUMPING & GIVES SUCCESS MESSAGE)
// ----------------------------------------------------------
function initContactForm() {
  const form = document.getElementById("concierge-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop jump and stop reload

    const nameInput = document.getElementById("name");
    const contactInput = document.getElementById("contact-input");
    const messageInput = document.getElementById("message");

    const name = nameInput ? nameInput.value.trim() : "";
    const contactInfo = contactInput ? contactInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    if (!name) {
      showToast("⚠️", "Name Required", "Please enter your full name before submitting.");
      if (nameInput) nameInput.focus();
      return;
    }

    if (!contactInfo) {
      showToast("⚠️", "Contact Required", "Please provide your email address or phone number.");
      if (contactInput) contactInput.focus();
      return;
    }

    if (!message) {
      showToast("⚠️", "Message Required", "Please specify a question or select a timepiece.");
      if (messageInput) messageInput.focus();
      return;
    }

    // Success response
    showToast(
      "✓",
      "Inquiry Sent Successfully!",
      `Thank you, ${name}. Our private horological concierge will reach out via ${contactInfo} within 24 hours.`
    );

    form.reset();
  });
}

// ----------------------------------------------------------
// 6. TOAST NOTIFICATION UTILITY
// ----------------------------------------------------------
function showToast(icon, title, message) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";

  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-content">
      <h4>${title}</h4>
      <p>${message}</p>
    </div>
    <button type="button" class="toast-close" aria-label="Close notification">&times;</button>
  `;

  const closeBtn = toast.querySelector(".toast-close");
  closeBtn.addEventListener("click", function () {
    removeToast(toast);
  });

  container.appendChild(toast);

  setTimeout(function () {
    removeToast(toast);
  }, 4500);

  function removeToast(el) {
    if (!el || !el.parentElement) return;
    el.classList.add("toast-hide");
    setTimeout(function () {
      if (el.parentElement) {
        el.parentElement.removeChild(el);
      }
    }, 300);
  }
}
