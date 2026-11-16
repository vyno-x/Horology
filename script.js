// ==========================================================
// HOROLOGY - Luxury Mechanical Watch Marketplace
// Main JavaScript (script.js)
// Plain Vanilla JavaScript for Multi-Page Navigation
// ==========================================================

document.addEventListener("DOMContentLoaded", function () {
  // 1. Initialize mobile hamburger menu
  initMobileMenu();

  // 2. Highlight current page link in navbar
  highlightCurrentPage();

  // 3. Initialize saved / wishlist counter from localStorage
  updateWishlistBadge();

  // 4. Initialize specific page logic based on current page elements
  if (document.getElementById("featured-watch-grid")) {
    initHomePage();
  }

  if (document.getElementById("catalog-watch-grid")) {
    initCatalogPage();
  }

  if (document.getElementById("watch-detail-container")) {
    initDetailPage();
  }

  if (document.getElementById("brands-container")) {
    initBrandsPage();
  }

  if (document.getElementById("contact-form")) {
    initContactPage();
  }
});

// ==========================================================
// 1. NAVIGATION & MOBILE MENU
// ==========================================================
function initMobileMenu() {
  const toggleBtn = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener("click", function () {
    navMenu.classList.toggle("open");
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (!toggleBtn.contains(event.target) && !navMenu.contains(event.target)) {
      navMenu.classList.remove("open");
    }
  });
}

function highlightCurrentPage() {
  const links = document.querySelectorAll(".nav-link");
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  links.forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// ==========================================================
// 2. WISHLIST / SAVED COUNTER (localStorage)
// ==========================================================
function getWishlist() {
  try {
    const saved = localStorage.getItem("horology_wishlist");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

function saveWishlist(list) {
  try {
    localStorage.setItem("horology_wishlist", JSON.stringify(list));
  } catch (e) {}
}

function toggleWishlistWatch(watchId) {
  let list = getWishlist();
  const index = list.indexOf(watchId);
  let isSaved = false;

  if (index > -1) {
    list.splice(index, 1);
    isSaved = false;
  } else {
    list.push(watchId);
    isSaved = true;
  }

  saveWishlist(list);
  updateWishlistBadge();
  return isSaved;
}

function updateWishlistBadge() {
  const counter = document.getElementById("wishlist-counter");
  if (!counter) return;
  const list = getWishlist();
  counter.textContent = list.length;
}

// ==========================================================
// 3. WATCH CARD HTML GENERATOR
// ==========================================================
function createWatchCardHTML(watch) {
  return `
    <article class="watch-card">
      <div class="watch-card-image">
        <span class="badge watch-card-badge">${escapeHTML(watch.brand)}</span>
        <img 
          src="${watch.image}" 
          alt="${escapeHTML(watch.brand + ' ' + watch.model)}"
          onerror="this.onerror=null; this.src='assets/images/watches/rolex/rolex-submariner-126610ln.jpg';"
          loading="lazy"
        />
      </div>
      <div class="watch-card-body">
        <span class="watch-brand-name">${escapeHTML(watch.brand)}</span>
        <h3 class="watch-model-title">${escapeHTML(watch.model)}</h3>
        <p class="watch-meta">Ref. ${escapeHTML(watch.reference)} · ${watch.year}</p>
        <div class="watch-specs-brief">
          <span>📏 ${escapeHTML(watch.caseSize)}</span>
          <span>⚡ ${escapeHTML(watch.category)}</span>
        </div>
        <div class="watch-card-footer">
          <span class="watch-price">${escapeHTML(watch.price)}</span>
          <a href="watch-detail.html?id=${encodeURIComponent(watch.id)}" class="btn btn-outline btn-sm">
            View Watch
          </a>
        </div>
      </div>
    </article>
  `;
}

// Helper to prevent any HTML injection
function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==========================================================
// 4. HOME PAGE (index.html)
// ==========================================
function initHomePage() {
  const grid = document.getElementById("featured-watch-grid");
  if (!grid || typeof WATCHES === "undefined") return;

  // Ensure background video autoplays smoothly
  const heroVideo = document.querySelector(".hero-video");
  if (heroVideo) {
    heroVideo.play().catch(function () {});
  }

  // Filter 6 featured timepieces
  const featured = WATCHES.filter(function (w) {
    return w.featured;
  }).slice(0, 6);

  grid.innerHTML = featured.map(createWatchCardHTML).join("");
}

// ==========================================================
// 5. CATALOG PAGE (watches.html)
// ==========================================================
function initCatalogPage() {
  const grid = document.getElementById("catalog-watch-grid");
  const searchInput = document.getElementById("search-input");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const sortSelect = document.getElementById("sort-select");
  const countDisplay = document.getElementById("results-count");

  if (!grid || typeof WATCHES === "undefined") return;

  // Read URL query parameter if user clicked a brand link from another page (e.g. watches.html?brand=Rolex)
  const urlParams = new URLSearchParams(window.location.search);
  let activeBrand = urlParams.get("brand") || "All";
  let searchQuery = urlParams.get("search") || "";

  // Highlight initial active filter button from URL
  filterBtns.forEach(function (btn) {
    const brand = btn.getAttribute("data-brand");
    if (brand.toLowerCase() === activeBrand.toLowerCase()) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  if (searchInput && searchQuery) {
    searchInput.value = searchQuery;
  }

  // Render function with current filter/search/sort state
  function renderCatalog() {
    let results = WATCHES.slice();

    // 1. Filter by Brand
    if (activeBrand && activeBrand !== "All") {
      results = results.filter(function (w) {
        return w.brand.toLowerCase() === activeBrand.toLowerCase();
      });
    }

    // 2. Filter by Search Query
    const query = (searchInput ? searchInput.value : "").trim().toLowerCase();
    if (query) {
      results = results.filter(function (w) {
        return (
          w.brand.toLowerCase().includes(query) ||
          w.model.toLowerCase().includes(query) ||
          w.reference.toLowerCase().includes(query) ||
          w.category.toLowerCase().includes(query)
        );
      });
    }

    // 3. Sort Results
    const sortVal = sortSelect ? sortSelect.value : "featured";
    if (sortVal === "price-asc") {
      results.sort(function (a, b) { return a.priceNum - b.priceNum; });
    } else if (sortVal === "price-desc") {
      results.sort(function (a, b) { return b.priceNum - a.priceNum; });
    } else if (sortVal === "year-desc") {
      results.sort(function (a, b) { return b.year - a.year; });
    }

    // Update count display
    if (countDisplay) {
      countDisplay.textContent = `Showing ${results.length} of ${WATCHES.length} Timepieces`;
    }

    // Render cards
    if (results.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <p style="font-size: 1.2rem; margin-bottom: 10px;">No matching timepieces found.</p>
          <p style="font-size: 0.9rem;">Try adjusting your search query or brand filter.</p>
        </div>
      `;
    } else {
      grid.innerHTML = results.map(createWatchCardHTML).join("");
    }
  }

  // Event Listeners for Filters
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("active"); });
      this.classList.add("active");
      activeBrand = this.getAttribute("data-brand");
      renderCatalog();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      renderCatalog();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      renderCatalog();
    });
  }

  // Initial render
  renderCatalog();
}

// ==========================================================
// 6. WATCH DETAIL PAGE (watch-detail.html)
// ==========================================================
function initDetailPage() {
  const container = document.getElementById("watch-detail-container");
  if (!container || typeof WATCHES === "undefined") return;

  // Get watch ID from URL parameter (e.g. ?id=rolex-submariner-126610ln)
  const urlParams = new URLSearchParams(window.location.search);
  const watchId = urlParams.get("id");

  // Find watch in dataset, or default to first watch if not found
  let watch = WATCHES.find(function (w) { return w.id === watchId; });
  if (!watch) {
    watch = WATCHES[0];
  }

  // Update page title dynamically
  document.title = `${watch.brand} ${watch.model} — Horology Dossier`;

  // Check if watch is already in wishlist
  const wishlist = getWishlist();
  const isSaved = wishlist.includes(watch.id);

  container.innerHTML = `
    <a href="watches.html" class="back-link">← Back to Watch Collection</a>
    
    <div class="detail-layout">
      <!-- Left: Large High-Resolution Image Box -->
      <div class="detail-image-box">
        <img 
          src="${watch.image}" 
          alt="${escapeHTML(watch.brand + ' ' + watch.model)}"
          onerror="this.onerror=null; this.src='assets/images/watches/rolex/rolex-submariner-126610ln.jpg';"
        />
      </div>

      <!-- Right: Detailed Specifications and Purchasing Info -->
      <div class="detail-content">
        <div class="detail-brand-badge">
          <span class="badge">${escapeHTML(watch.brand)}</span>
          <span class="badge" style="margin-left: 6px;">${escapeHTML(watch.condition)}</span>
        </div>

        <h1 class="detail-title">${escapeHTML(watch.model)}</h1>
        <p class="detail-reference">Reference: ${escapeHTML(watch.reference)} · Year ${watch.year}</p>

        <div class="detail-price-box">
          <div>
            <div class="detail-price-label">Certified Valuation</div>
            <div class="detail-price-value">${escapeHTML(watch.price)}</div>
          </div>
          <span class="badge" style="background: rgba(34, 197, 94, 0.15); color: #4ade80; border-color: rgba(34, 197, 94, 0.3);">
            ● In Stock
          </span>
        </div>

        <p class="detail-description">${escapeHTML(watch.description)}</p>

        <h3 style="font-family: var(--font-serif); font-size: 1.1rem; margin-bottom: 12px; color: var(--text-main);">
          Technical Specifications
        </h3>

        <table class="specs-table">
          <tbody>
            <tr>
              <td>Case Diameter</td>
              <td>${escapeHTML(watch.caseSize)}</td>
            </tr>
            <tr>
              <td>Case Material</td>
              <td>${escapeHTML(watch.caseMaterial)}</td>
            </tr>
            <tr>
              <td>Movement</td>
              <td>${escapeHTML(watch.movement)}</td>
            </tr>
            <tr>
              <td>Power Reserve</td>
              <td>${escapeHTML(watch.powerReserve)}</td>
            </tr>
            <tr>
              <td>Water Resistance</td>
              <td>${escapeHTML(watch.waterResistance)}</td>
            </tr>
            <tr>
              <td>Bezel</td>
              <td>${escapeHTML(watch.bezel)}</td>
            </tr>
            <tr>
              <td>Dial</td>
              <td>${escapeHTML(watch.dialColor)}</td>
            </tr>
            <tr>
              <td>Crystal</td>
              <td>${escapeHTML(watch.crystal)}</td>
            </tr>
            <tr>
              <td>Bracelet / Clasp</td>
              <td>${escapeHTML(watch.bracelet)}</td>
            </tr>
          </tbody>
        </table>

        <div class="detail-actions">
          <button id="save-watch-btn" class="btn ${isSaved ? 'btn-primary' : 'btn-outline'}">
            ${isSaved ? '★ Saved to Wishlist' : '☆ Save to Wishlist'}
          </button>
          <a href="contact.html?watch=${encodeURIComponent(watch.brand + ' ' + watch.model + ' (Ref ' + watch.reference + ')')}" class="btn btn-primary">
            Inquire / Book Appointment
          </a>
        </div>
      </div>
    </div>
  `;

  // Wire Save button
  const saveBtn = document.getElementById("save-watch-btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", function () {
      const savedNow = toggleWishlistWatch(watch.id);
      if (savedNow) {
        saveBtn.textContent = "★ Saved to Wishlist";
        saveBtn.className = "btn btn-primary";
      } else {
        saveBtn.textContent = "☆ Save to Wishlist";
        saveBtn.className = "btn btn-outline";
      }
    });
  }
}

// ==========================================================
// 7. BRANDS PAGE (brands.html)
// ==========================================================
function initBrandsPage() {
  const container = document.getElementById("brands-container");
  if (!container || typeof BRANDS === "undefined") return;

  container.innerHTML = BRANDS.map(function (brand) {
    return `
      <div class="brand-card">
        <div class="brand-icon-circle">${escapeHTML(brand.name.substring(0, 1))}</div>
        <h3 class="brand-title">${escapeHTML(brand.name)}</h3>
        <p class="brand-origin">${escapeHTML(brand.origin)} · Est. ${brand.founded}</p>
        <p class="brand-desc">${escapeHTML(brand.description)}</p>
        <div class="brand-models-list">
          <strong>Key References:</strong> ${brand.keyModels.join(" · ")}
        </div>
        <a href="watches.html?brand=${encodeURIComponent(brand.name)}" class="btn btn-outline btn-sm" style="margin-top: auto;">
          Explore ${escapeHTML(brand.name)} Collection →
        </a>
      </div>
    `;
  }).join("");
}

// ==========================================================
// 8. CONTACT PAGE (contact.html)
// ==========================================================
function initContactPage() {
  const form = document.getElementById("contact-form");
  const modal = document.getElementById("thankyou-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const watchSelect = document.getElementById("interest-select");

  // Pre-fill watch interest if arriving from a specific watch detail link (e.g. contact.html?watch=Rolex...)
  const urlParams = new URLSearchParams(window.location.search);
  const requestedWatch = urlParams.get("watch");
  if (requestedWatch && watchSelect) {
    // Check if an option exists or set the message
    const messageField = document.getElementById("message-field");
    if (messageField) {
      messageField.value = `Hello, I am interested in inquiring about the ${requestedWatch}. Please provide availability and appointment details.`;
    }
  }

  // Form submission handler
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Form validation
      const name = document.getElementById("name-field").value.trim();
      const email = document.getElementById("email-field").value.trim();

      if (!name || !email) {
        alert("Please enter both your name and email address.");
        return;
      }

      // Show confirmation modal
      if (modal) {
        modal.classList.add("active");
      }
      form.reset();
    });
  }

  if (modalCloseBtn && modal) {
    modalCloseBtn.addEventListener("click", function () {
      modal.classList.remove("active");
    });
  }

  // FAQ Accordion toggles
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    const question = item.querySelector(".faq-question");
    if (question) {
      question.addEventListener("click", function () {
        // Close other items
        faqItems.forEach(function (other) {
          if (other !== item) other.classList.remove("open");
        });
        // Toggle clicked item
        item.classList.toggle("open");
      });
    }
  });
}

