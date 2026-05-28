document.addEventListener("DOMContentLoaded", async function () {
  if (QF.loadProducts) {
    await QF.loadProducts();
  }

  const id = QF.qs("id");
  const p = QF.findProduct(id);
  const root = QF.byId("product-root");

  if (!p) {
    root.innerHTML = `
      <div class="empty">
        <h2>Product not found</h2>
        <a class="btn btn-primary" href="products.html">Browse all products</a>
      </div>
    `;
    return;
  }

  const cat = QF.findCategory(p.category);

  QF.UI.pageHero({
    eyebrow: cat ? cat.title : "Products",
    title: p.name,
    crumbs: [
      { label: "Products", href: "products.html" },
      cat ? { label: cat.title, href: "products.html?cat=" + cat.slug } : null,
      { label: p.name },
    ].filter(Boolean),
  });

  document.title = p.name + " — " + (QF_SITE.name || "");

  /* =========================
     MEDIA NORMALIZATION
  ========================= */

  let media = [];

  if (Array.isArray(p.media) && p.media.length) {
    media = p.media;
  } else if (Array.isArray(p.images) && p.images.length) {
    media = p.images.map(img => ({ type: "image", src: img }));
  } else if (p.image) {
    media = [{ type: "image", src: p.image }];
  } else {
    media = [{ type: "image", src: "images/products/placeholder.jpg" }];
  }

  let currentIndex = 0;

  function renderMedia(item) {
    if (item.type === "video") {
      return `
        <video id="main-media" controls playsinline class="main-product-video">
          <source src="${item.src}" type="video/mp4">
        </video>
      `;
    }

    return `
      <img id="main-media" class="main-product-image" src="${item.src}" alt="${QF.escape(p.name)}">
    `;
  }

  function updateSlider(index) {
    currentIndex = index;

    const container = document.getElementById("main-slide");
    const dots = document.querySelectorAll(".dot");

    if (!container) return;

    container.innerHTML = renderMedia(media[currentIndex]);

    dots.forEach(d => d.classList.remove("active"));
    if (dots[currentIndex]) dots[currentIndex].classList.add("active");
  }

const galleryHTML = `
  <div class="product-gallery">

    <div class="slider">

      ${media.length > 1 ? `<button id="prevBtn" class="slider-btn prev">‹</button>` : ""}

      <div id="main-slide">
        ${renderMedia(media[0])}
      </div>

      ${media.length > 1 ? `<button id="nextBtn" class="slider-btn next">›</button>` : ""}

    </div>

    ${
      media.length > 1
        ? `
      <div class="slider-dots">
        ${media
          .map((_, i) => `
            <span class="dot ${i === 0 ? "active" : ""}" data-index="${i}"></span>
          `)
          .join("")}
      </div>
    `
        : ""
    }

  </div>
`;

  /* =========================
     CLICK EVENTS (ONLY ONCE)
  ========================= */

  document.addEventListener("click", function (e) {
    if (e.target.id === "nextBtn") {
      updateSlider((currentIndex + 1) % media.length);
    }

    if (e.target.id === "prevBtn") {
      updateSlider((currentIndex - 1 + media.length) % media.length);
    }

    if (e.target.classList.contains("dot")) {
      updateSlider(Number(e.target.dataset.index));
    }

    if (e.target.id === "main-media") {
      document.getElementById("img-modal").style.display = "flex";
      document.getElementById("img-modal-src").src = media[currentIndex].src;
      document.getElementById("img-modal-caption").textContent = p.name;
    }
  });

  /* =========================
     MODAL CLOSE
  ========================= */

  document.getElementById("img-close").addEventListener("click", closeModal);
  document.getElementById("img-modal").addEventListener("click", function (e) {
    if (e.target.id === "img-modal") closeModal();
  });

  function closeModal() {
    document.getElementById("img-modal").style.display = "none";
  }

  /* =========================
     SPECIFICATIONS
  ========================= */

  let specsHTML = "";

  if (p.specs && typeof p.specs === "object" && !Array.isArray(p.specs)) {
    specsHTML = Object.keys(p.specs)
      .filter(k => k && p.specs[k] != null && String(p.specs[k]).trim() !== "")
      .map(
        k => `
        <div class="spec-row">
          <span>${QF.escape(k)}</span>
          <strong>${QF.escape(p.specs[k])}</strong>
        </div>
      `
      )
      .join("");
  }

  const coreSpecs = [];

  if (p.kva)
    coreSpecs.push(`<div class="spec-row"><span>Capacity</span><strong>${QF.escape(p.kva)}</strong></div>`);

  if (p.fuel)
    coreSpecs.push(`<div class="spec-row"><span>Fuel</span><strong>${QF.escape(p.fuel)}</strong></div>`);

  if (p.phase)
    coreSpecs.push(`<div class="spec-row"><span>Phase</span><strong>${QF.escape(p.phase)}</strong></div>`);

  if (p.hours)
    coreSpecs.push(`<div class="spec-row"><span>Hours</span><strong>${QF.escape(p.hours)}</strong></div>`);

  if (p.brand)
    coreSpecs.push(`<div class="spec-row"><span>Brand</span><strong>${QF.escape(p.brand)}</strong></div>`);

  /* =========================
     ACTION BUTTONS
  ========================= */

  const actionButtons = p.catalog
    ? `
      <a class="btn btn-primary btn-lg" href="products.html?cat=spare-parts">View Spare Parts Catalogue</a>

      <a class="btn btn-outline btn-lg" href="${p.pdf || "#"}" target="_blank">
        View Price List (PDF)
      </a>

      <a class="btn btn-whatsapp btn-lg" target="_blank" rel="noopener"
        href="${QF.waLink("Hello, I want the spare parts catalogue details")}">
        Request on WhatsApp
      </a>
    `
    : p.price
    ? `
      <button class="btn btn-primary btn-lg" onclick="QF.Cart.add('${p.id}')">
        Add to Cart
      </button>

      <a class="btn btn-whatsapp btn-lg" target="_blank" rel="noopener"
        href="${QF.waLink(
          "Hello, I'd like to enquire about: " + p.name + " (" + QF.fmtNGN(p.price) + ")"
        )}">
        Enquire on WhatsApp
      </a>
    `
    : `
      <a class="btn btn-whatsapp btn-lg" target="_blank" rel="noopener"
        href="${QF.waLink("Hello, I'd like to enquire about the price for: " + p.name)}">
        Request Price on WhatsApp
      </a>
    `;

  /* =========================
     RENDER PAGE
  ========================= */

  root.innerHTML = `
    <div class="container product-detail">
      <div class="product-grid">

        ${galleryHTML}

        <div class="product-info">

          <span class="card-brand">${QF.escape(p.brand || "")}</span>

          <h1>${QF.escape(p.name)}</h1>

          <div class="price">${p.price ? QF.fmtNGN(p.price) : "Call for Price"}</div>

          <p>${QF.escape(p.description || p.shortDescription || "")}</p>

          ${
            coreSpecs.length || specsHTML
              ? `<div class="specs">${coreSpecs.join("")}${specsHTML}</div>`
              : ""
          }

          <div style="display:flex;gap:.6rem;flex-wrap:wrap">
            ${actionButtons}
          </div>

        </div>
      </div>

      <div style="margin-top:4rem">
        <h2>Related Products</h2>
        <div class="grid grid-4" id="related"></div>
      </div>

    </div>
  `;

  /* =========================
     RELATED PRODUCTS
  ========================= */

  let related = (window.QF_PRODUCTS || [])
    .filter(x => x.id !== p.id && x.category === p.category)
    .slice(0, 4);

  if (!related.length) {
    related = (window.QF_PRODUCTS || []).filter(x => x.id !== p.id).slice(0, 4);
  }

  QF.byId("related").innerHTML = related.map(QF.productCardHTML).join("");
});
