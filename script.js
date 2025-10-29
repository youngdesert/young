// Product data
const products = [
  {
    id: "1",
    name: "Essential Black Tee",
    description: "Premium cotton blend, oversized fit. The staple piece.",
    price: 45,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    tags: ["tees", "basics"],
    isNew: true,
    featured: true,
    stock: 12,
  },
  {
    id: "2",
    name: "Bold Graphic Hoodie",
    description: "Heavy weight fleece with embroidered logo. Limited run.",
    price: 89,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80",
    tags: ["hoodies", "graphics"],
    discount: 15,
    featured: true,
    stock: 4, // low stock
  },
  {
    id: "3",
    name: "Minimal Cap",
    description: "6-panel cap with subtle branding. One size fits all.",
    price: 35,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80",
    tags: ["accessories"],
    featured: true,
    stock: 20,
  },
  {
    id: "4",
    name: "Cargo Pants",
    description: "Relaxed fit cargo pants with multiple pockets.",
    price: 95,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    tags: ["bottoms"],
    isNew: true,
    stock: 6,
  },
  {
    id: "5",
    name: "White Logo Tee",
    description: "Classic white tee with chest logo. Timeless piece.",
    price: 45,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=80",
    tags: ["tees", "basics"],
    discount: 20,
    stock: 2, // almost gone
  },
  {
    id: "6",
    name: "Vintage Wash Hoodie",
    description: "Washed for a lived-in feel. Every piece is unique.",
    price: 99,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
    tags: ["hoodies"],
    stock: 9,
  },
  {
    id: "7",
    name: "Oversized Coach Jacket",
    description: "Water-resistant shell with snap buttons.",
    price: 125,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
    tags: ["outerwear"],
    isNew: true,
    stock: 5,
  },
  {
    id: "8",
    name: "Beanie",
    description: "Ribbed knit beanie with embroidered logo.",
    price: 28,
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&q=80",
    tags: ["accessories"],
    stock: 18,
  },
  {
    id: "9",
    name: "Distressed Jeans",
    description: "Slim fit denim with strategic distressing.",
    price: 110,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
    tags: ["bottoms"],
    discount: 10,
    stock: 3, // low
  },
  {
    id: "10",
    name: "Tech Windbreaker",
    description: "Lightweight packable windbreaker. Perfect for layering.",
    price: 85,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    tags: ["outerwear"],
    stock: 14,
  },
  {
    id: "11",
    name: "Graphic Print Tee",
    description: "Bold graphics inspired by street art. Screen printed.",
    price: 48,
    image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&q=80",
    tags: ["tees", "graphics"],
    isNew: true,
    stock: 7,
  },
  {
    id: "12",
    name: "Bucket Hat",
    description: "Classic bucket hat in premium cotton twill.",
    price: 38,
    image: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=600&q=80",
    tags: ["accessories"],
    stock: 11,
  },
];

// ----- STATE -----
let cart = [];
let searchQuery = "";
let selectedTags = [];
let sortBy = "featured";

// ----- ELEMENTS -----
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const searchWrap = document.getElementById("searchWrap");
const searchDropdown = document.getElementById("searchDropdown");
const searchResultsBox = document.getElementById("searchResults");
const searchFooterHint = document.getElementById("searchFooterHint");

const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");
const cartSidebar = document.getElementById("cartSidebar");
const cartCloseBtn = document.getElementById("cartCloseBtn");

const modal = document.getElementById("modal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");

const topGrid = document.getElementById("topGrid");
const offersRow = document.getElementById("offersRow");
const productGrid = document.getElementById("productGrid");
const tagFilters = document.getElementById("tagFilters");
const sortSelect = document.getElementById("sortSelect");
const toast = document.getElementById("toast");

// ===========================
// INIT
// ===========================
function init() {
  if (topGrid) renderTopProducts();
  if (offersRow) renderOffers();
  if (productGrid) renderProducts();
  if (tagFilters) renderTagFilters();
  updateCartCount();

  setupEventListeners();
}

//
// ===========================
// EVENT LISTENERS / GLOBAL UI
// ===========================
function setupEventListeners() {
  // --- MOBILE NAV ---
  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
      toggleMobileNav();
    });

    // Close mobile menu when clicking a link inside it (good for phones)
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("active");
      });
    });

    // If viewport resizes up to desktop, force-close mobile nav so it doesn't get stuck open
    window.addEventListener("resize", () => {
      // match the breakpoint in CSS where .hamburger disappears (768px)
      if (window.innerWidth >= 768) {
        mobileNav.classList.remove("active");
      }
    });
  }

  // --- SEARCH ---
  if (searchBtn && searchInput) {
    // Click the "Enter ↵" chip
    searchBtn.addEventListener("click", () => {
      handleSearch();
      hideSearchDropdown();
    });

    // Press Enter in the field
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleSearch();
        hideSearchDropdown();
      }
    });

    // Live type-ahead suggestions
    searchInput.addEventListener("input", handleLiveSearch);

    // Focus: re-open dropdown if it already has results
    searchInput.addEventListener("focus", () => {
      if (
        searchDropdown &&
        searchDropdown.dataset.hasResults === "true" &&
        searchResultsBox &&
        searchResultsBox.innerHTML.trim() !== ""
      ) {
        searchDropdown.hidden = false;
      }
    });
  }

  // --- CLICK-AWAY GLOBAL HANDLER ---
  document.addEventListener("click", (e) => {
    // CART SIDEBAR CLICK-AWAY (desktop & mobile)
    if (cartSidebar && cartSidebar.classList.contains("active")) {
      const clickInsideSidebar = cartSidebar.contains(e.target);
      const clickOnCartBtn = cartBtn && cartBtn.contains(e.target);
      if (!clickInsideSidebar && !clickOnCartBtn) {
        toggleCart(false);
      }
    }

    // SEARCH DROPDOWN CLICK-AWAY
    if (searchWrap && searchDropdown) {
      const insideSearchWrap = searchWrap.contains(e.target);
      const insideDropdown = searchDropdown.contains(e.target);
      if (!insideSearchWrap && !insideDropdown) {
        hideSearchDropdown();
      }
    }
  });

  // --- CART OPEN/CLOSE ---
  if (cartBtn && cartSidebar) {
    cartBtn.addEventListener("click", () => toggleCart(true));
  }
  if (cartCloseBtn) {
    cartCloseBtn.addEventListener("click", () => toggleCart(false));
  }

  // --- MODAL CLOSE ---
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", closeModal);
  }
  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  // --- SORT SELECT ---
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      sortBy = e.target.value;
      renderProducts();
    });
  }

  // --- ESC KEY GLOBAL ---
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      toggleCart(false);
      hideSearchDropdown();
      if (mobileNav) mobileNav.classList.remove("active");
    }
  });
}

// Mobile nav toggle logic
function toggleMobileNav() {
  if (!mobileNav) return;
  mobileNav.classList.toggle("active");
}

// ===========================
// SEARCH
// ===========================
function handleSearch() {
  if (!searchInput) return;
  searchQuery = searchInput.value.toLowerCase();
  renderProducts();

  // smooth scroll to product grid so results are visible (on pages that have it)
  if (productGrid) {
    productGrid.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function handleLiveSearch() {
  if (!searchInput) return;
  const q = searchInput.value.trim().toLowerCase();

  if (!q) {
    hideSearchDropdown();
    return;
  }

  const matches = products.filter((p) => {
    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  });

  renderSearchDropdown(matches.slice(0, 5), q);
}

function renderSearchDropdown(list, queryText) {
  if (!searchDropdown || !searchResultsBox || !searchFooterHint) return;

  // If no matches, calm empty state
  if (list.length === 0) {
    searchResultsBox.innerHTML = `
      <div class="search-empty">
        <div>No results for <span class="search-empty-query">"${queryText}"</span></div>
        <div style="font-size:.7rem;opacity:.7;">Try a different keyword</div>
      </div>
    `;
    searchFooterHint.textContent = "Press ↵ to search full catalog";
    searchDropdown.hidden = false;
    searchDropdown.dataset.hasResults = "false";
    return;
  }

  // Build result rows
  searchResultsBox.innerHTML = list
    .map((p) => {
      const finalPrice = p.discount
        ? (p.price * (1 - p.discount / 100)).toFixed(2)
        : p.price.toFixed(2);

      // Price block (shows old price if discounted)
      const priceBlock = p.discount
        ? `
            <div class="search-price">
              <div>$${finalPrice}</div>
              <div style="font-size:.65rem; color:var(--muted); text-decoration:line-through;">
                $${p.price.toFixed(2)}
              </div>
            </div>
          `
        : `
            <div class="search-price">
              <div>$${finalPrice}</div>
            </div>
          `;

      return `
        <div class="search-item" data-product-id="${p.id}">
          <div class="search-thumb">
            <img src="${p.image}" alt="${p.name}" />
          </div>

          <div class="search-meta">
            <div class="search-name">${p.name}</div>
            <div class="search-extra">${p.description}</div>
          </div>

          ${priceBlock}
        </div>
      `;
    })
    .join("");

  // Footer hint
  searchFooterHint.textContent = "Click for quick view";

  // Reveal dropdown
  searchDropdown.hidden = false;
  searchDropdown.dataset.hasResults = "true";

  // Click → Quick View (works nicely on touch screens too)
  const rows = searchResultsBox.querySelectorAll(".search-item");
  rows.forEach((row) => {
    row.addEventListener("click", () => {
      const pid = row.getAttribute("data-product-id");
      const prod = products.find((p) => p.id === pid);
      if (prod) {
        openQuickView(prod);
        hideSearchDropdown();
      }
    });
  });
}

function hideSearchDropdown() {
  if (!searchDropdown) return;
  searchDropdown.hidden = true;
}

// ===========================
// CART
// ===========================
function toggleCart(open) {
  if (!cartSidebar) return;
  cartSidebar.classList.toggle("active", open);
  if (open) renderCart();
}

function addToCart(product) {
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartCount();
  showToast(`${product.name} added to cart!`);
}

function updateCartQuantity(id, quantity) {
  const item = cart.find((item) => item.id === id);
  if (item) {
    item.quantity = Math.max(1, quantity);
    renderCart();
  }
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCartCount();
  renderCart();
  showToast("Item removed from cart");
}

function updateCartCount() {
  if (!cartCount) return;
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = count;
}

function renderCart() {
  if (!cartSidebar) return;

  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  if (!cartItems || !cartTotal) return;

  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
    cartTotal.textContent = "$0.00";
    return;
  }

  let total = 0;
  cartItems.innerHTML = cart
    .map((item) => {
      const finalPrice = item.discount
        ? item.price * (1 - item.discount / 100)
        : item.price;
      total += finalPrice * item.quantity;

      return `
        <div class="cart-item">
          <div class="cart-item-img">
            <img src="${item.image}" alt="${item.name}" />
          </div>
          <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">$${finalPrice.toFixed(2)}</div>
            <div class="cart-item-controls">
              <div class="cart-qty">
                <button onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})">−</button>
                <span>${item.quantity}</span>
                <button onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})">+</button>
              </div>
              <button class="cart-remove" onclick="removeFromCart('${item.id}')">🗑️</button>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  cartTotal.textContent = `$${total.toFixed(2)}`;
}

// ===========================
// MODAL / QUICK VIEW
// ===========================
function openQuickView(product) {
  if (!modal) return;

  const finalPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const lowStock = product.stock !== undefined && product.stock <= 5;

  const modalContent = document.getElementById("modalContent");
  if (!modalContent) return;

  modalContent.innerHTML = `
    <div class="modal-grid">
      <div class="modal-img">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="modal-details">
        <h2>${product.name}</h2>
        <p class="muted">${product.description}</p>
        
        <div class="product-tags" style="margin: 1rem 0;">
          ${product.tags.map((tag) => `<span class="product-tag">${tag}</span>`).join("")}
        </div>

        <div class="modal-badges">
          ${product.discount ? `<span class="product-badge badge-discount">-${product.discount}% OFF</span>` : ""}
          ${product.isNew ? `<span class="product-badge badge-new">NEW</span>` : ""}
          ${lowStock ? `<span class="product-badge badge-low">LOW STOCK</span>` : ""}
        </div>

        <div class="modal-price">
          <span class="modal-price-current">$${finalPrice.toFixed(2)}</span>
          ${product.discount ? `<span class="modal-price-old">$${product.price.toFixed(2)}</span>` : ""}
        </div>

        <div class="modal-actions">
          <button class="btn primary" onclick="addToCart(products.find(p => p.id === '${product.id}')); closeModal();">
            🛒 Add to Cart
          </button>
          <button class="btn btn-outline" onclick="closeModal()">Continue Shopping</button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
}

// ===========================
// TOAST
// ===========================
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// ===========================
// PRODUCT RENDERING
// ===========================
function createProductCard(product) {
  const finalPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const lowStock = product.stock !== undefined && product.stock <= 5;

  return `
    <div class="product-card">
      <div class="product-img">
        <img src="${product.image}" alt="${product.name}" />
        ${product.discount ? `<div class="product-badge badge-discount">-${product.discount}%</div>` : ""}
        ${product.isNew ? `<div class="product-badge badge-new">NEW</div>` : ""}
        ${lowStock ? `<div class="product-badge badge-low">LOW</div>` : ""}

        <button class="quick-add"
          onclick="addToCart(products.find(p => p.id === '${product.id}'))">
          + Cart
        </button>
      </div>
      <div class="product-content">
        <h3>${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-tags">
          ${product.tags.map((tag) => `<span class="product-tag">${tag}</span>`).join("")}
        </div>
        <div class="product-footer">
          <div class="product-price">
            <span class="price-current">$${finalPrice.toFixed(2)}</span>
            ${product.discount ? `<span class="price-old">$${product.price.toFixed(2)}</span>` : ""}
          </div>
        </div>
        <div class="product-actions">
          <button class="btn btn-sm btn-outline"
            onclick="openQuickView(products.find(p => p.id === '${product.id}'))">
            Quick View
          </button>
          <button class="btn btn-sm primary"
            onclick="addToCart(products.find(p => p.id === '${product.id}'))">
            🛒 Add
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderTopProducts() {
  if (!topGrid) return;
  const topProducts = products.filter((p) => p.featured);
  topGrid.innerHTML = topProducts.map(createProductCard).join("");
}

function renderOffers() {
  if (!offersRow) return;
  const offerProducts = products.filter((p) => p.discount);
  offersRow.innerHTML = offerProducts.map(createProductCard).join("");
}

function renderProducts() {
  if (!productGrid) return;

  let filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery) ||
      p.description.toLowerCase().includes(searchQuery);
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => p.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  // Sort current view
  switch (sortBy) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      // "newest" = items marked isNew first
      filtered.sort((a, b) => (b.isNew === true) - (a.isNew === true));
      break;
    default: // "featured"
      filtered.sort((a, b) => (b.featured === true) - (a.featured === true));
  }

  if (filtered.length === 0) {
    productGrid.innerHTML =
      '<div style="grid-column: 1 / -1; text-align: center; padding: 4rem 0; color: var(--muted);">No products found. Try adjusting your filters.</div>';
  } else {
    productGrid.innerHTML = filtered.map(createProductCard).join("");
  }

  syncTagButtonsUI();
}

// ===========================
// TAG FILTERS
// ===========================
function renderTagFilters() {
  if (!tagFilters) return;
  const allTags = [...new Set(products.flatMap((p) => p.tags))];
  tagFilters.innerHTML = allTags
    .map(
      (tag) =>
        `<button class="tag" data-tag="${tag}" onclick="toggleTag('${tag}')">${tag}</button>`
    )
    .join("");

  syncTagButtonsUI();
}

// Keep the tag button "active" states synced to selectedTags
function syncTagButtonsUI() {
  if (!tagFilters) return;
  const tagButtons = tagFilters.querySelectorAll(".tag");
  tagButtons.forEach((btn) => {
    const tag = btn.getAttribute("data-tag");
    if (selectedTags.includes(tag)) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function toggleTag(tag) {
  if (selectedTags.includes(tag)) {
    selectedTags = selectedTags.filter((t) => t !== tag);
  } else {
    selectedTags.push(tag);
  }

  renderProducts();
}

// ===========================
// BOOT
// ===========================
init();
