// ==========================================================
// HOROLOGY - Luxury Mechanical Watch Showcase
// JavaScript (script.js) - Theme Toggle, Animations & Concierge Inquiries
// ==========================================================

document.addEventListener("DOMContentLoaded", function () {
  initThemeToggle();
  initNavigation();
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

  // Load saved theme or default to dark
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
      `Website appearance updated to ${newTheme} luxury palette.`
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
// 3. INQUIRE BUTTONS (GIVES MESSAGE & AUTO-FILLS CONTACT FORM)
// ----------------------------------------------------------
function initInquiryButtons() {
  const inquireButtons = document.querySelectorAll(".btn-inquire");
  const timepieceSelect = document.getElementById("inquiry-watch");
  const messageField = document.getElementById("message");
  const contactSection = document.getElementById("contact");
  const contactCard = document.querySelector(".contact-card");

  inquireButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const watchName = btn.getAttribute("data-watch") || "Luxury Timepiece";
      const watchPrice = btn.getAttribute("data-price") || "";
      const watchRef = btn.getAttribute("data-ref") || "";

      // 1. Auto-select in dropdown if present
      if (timepieceSelect) {
        let matched = false;
        for (let i = 0; i < timepieceSelect.options.length; i++) {
          if (timepieceSelect.options[i].text.includes(watchName.split(" ")[0])) {
            timepieceSelect.selectedIndex = i;
            matched = true;
            break;
          }
        }
      }

      // 2. Auto-fill polite concierge message
      if (messageField) {
        messageField.value = `Hello, I would like to inquire about purchasing the ${watchName} (${watchPrice}) [Ref: ${watchRef}]. Please provide availability and shipping details.`;
      }

      // 3. Smooth scroll down to contact section
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

      // 4. Subtle gold pulse animation on form
      if (contactCard) {
        contactCard.classList.remove("highlight");
        void contactCard.offsetWidth; // Force DOM reflow to restart animation
        contactCard.classList.add("highlight");
      }

      // 5. Show luxury confirmation Toast Notification
      showToast(
        "⏱️",
        `Inquiry: ${watchName}`,
        `Timepiece selected (${watchPrice}). We have prepared your inquiry form below.`
      );
    });
  });
}

// ----------------------------------------------------------
// 4. CONTACT FORM SUBMISSION (NO JUMPING & GIVES SUCCESS MESSAGE)
// ----------------------------------------------------------
function initContactForm() {
  const form = document.getElementById("concierge-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop page reload and stop jumping

    const nameInput = document.getElementById("name");
    const contactInput = document.getElementById("contact-input");
    const messageInput = document.getElementById("message");

    const name = nameInput ? nameInput.value.trim() : "";
    const contactInfo = contactInput ? contactInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    // Validation
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
      showToast("⚠️", "Message Required", "Please enter a message or select a timepiece.");
      if (messageInput) messageInput.focus();
      return;
    }

    // Success response
    showToast(
      "✓",
      "Inquiry Sent Successfully!",
      `Thank you, ${name}. Our private horological concierge will reach out via ${contactInfo} within 24 hours.`
    );

    // Reset fields smoothly
    form.reset();
  });
}

// ----------------------------------------------------------
// 5. FLOATING TOAST NOTIFICATION UTILITY
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

  // Close button action
  const closeBtn = toast.querySelector(".toast-close");
  closeBtn.addEventListener("click", function () {
    removeToast(toast);
  });

  container.appendChild(toast);

  // Auto remove after 4.5 seconds
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
