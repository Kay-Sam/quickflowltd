document.addEventListener("DOMContentLoaded", function () {
  var id = QF.qs("id");
  var p = QF.findProduct(id);
  var root = QF.byId("product-root");

  if (!p) {
    root.innerHTML =
      '<div class="empty">' +
      "<h2>Product not found</h2>" +
      '<a class="btn btn-primary" href="products.html">Browse all products</a>' +
      "</div>";
    return;
  }

  var cat = QF.findCategory(p.category);

  QF.UI.pageHero({
    eyebrow: cat ? cat.title : "Products",
    title: p.name,
    crumbs: [
      { label: "Products", href: "products.html" },
      cat
        ? {
            label: cat.title,
            href: "products.html?cat=" + cat.slug,
          }
        : null,
      { label: p.name },
    ].filter(Boolean),
  });


/* =========================
   MODAL CLOSE HANDLER
========================= */

document.getElementById("img-close").addEventListener("click", function () {
  document.getElementById("img-modal").style.display = "none";
});

document.getElementById("img-modal").addEventListener("click", function (e) {
  if (e.target.id === "img-modal") {
    this.style.display = "none";
  }
});

  document.title = p.name + " — " + (QF_SITE.name || "");

  /* =========================
     SPECIFICATIONS
  ========================= */

  var specs = p.specs
    ? Object.keys(p.specs)
        .map(function (k) {
          return `
            <div class="spec-row">
              <span>${QF.escape(k)}</span>
              <strong>${QF.escape(p.specs[k])}</strong>
            </div>
          `;
        })
        .join("")
    : "";

  var coreSpecs = [];

  if (p.kva) {
    coreSpecs.push(`
      <div class="spec-row">
        <span>Capacity</span>
        <strong>${QF.escape(p.kva)}</strong>
      </div>
    `);
  }

  if (p.fuel) {
    coreSpecs.push(`
      <div class="spec-row">
        <span>Fuel</span>
        <strong>${QF.escape(p.fuel)}</strong>
      </div>
    `);
  }

  if (p.phase) {
    coreSpecs.push(`
      <div class="spec-row">
        <span>Phase</span>
        <strong>${QF.escape(p.phase)}</strong>
      </div>
    `);
  }

    if (p.hours) {
    coreSpecs.push(`
      <div class="spec-row">
        <span>Hours</span>
        <strong>${QF.escape(p.hours)}</strong>
      </div>
    `);
  }
  if (p.brand) {
    coreSpecs.push(`
      <div class="spec-row">
        <span>Brand</span>
        <strong>${QF.escape(p.brand)}</strong>
      </div>
    `);
  }

  /* =========================
     /* =========================
   MEDIA SLIDER
========================= */

var media =
  Array.isArray(p.media) && p.media.length
    ? p.media
    : Array.isArray(p.images) && p.images.length
    ? p.images.map(function (img) {
        return {
          type: "image",
          src: img
        };
      })
    : p.image
    ? [{
        type: "image",
        src: p.image
      }]
    : [{
        type: "image",
        src: "images/products/placeholder.jpg"
      }];

var currentIndex = 0;

/* =========================
   RENDER MEDIA
========================= */

function renderMainMedia(item) {

  /* VIDEO */
  if (item.type === "video") {
    return `
      <video
        id="main-product-media"
        class="main-product-video"
        controls
        playsinline
        preload="metadata">

        <source src="${item.src}" type="video/mp4">

      </video>
    `;
  }

  /* IMAGE */
  return `
    <img
      id="main-product-media"
      class="main-product-image"
      src="${item.src}"
      alt="${QF.escape(p.name)}">
  `;
}

/* =========================
   GALLERY HTML
========================= */

var galleryHTML = `
  <div class="product-gallery">

    <div class="slider">

      ${
        media.length > 1
          ? `
        <button class="slider-btn prev" id="prevImg">
          ‹
        </button>
      `
          : ""
      }

      <div id="main-slide">
        ${renderMainMedia(media[0])}
      </div>

      ${
        media.length > 1
          ? `
        <button class="slider-btn next" id="nextImg">
          ›
        </button>
      `
          : ""
      }

    </div>

    ${
      media.length > 1
        ? `
      <div class="slider-dots">

        ${media
          .map(function (_, i) {
            return `
              <span
                class="dot ${i === 0 ? "active" : ""}"
                data-index="${i}">
              </span>
            `;
          })
          .join("")}

      </div>
    `
        : ""
    }

  </div>
`;

/* =========================
   UPDATE SLIDER
========================= */

function updateSlider(index) {

  currentIndex = index;

  var container = document.getElementById("main-slide");

  if (!container) return;

  container.innerHTML =
    renderMainMedia(media[currentIndex]);

  /* UPDATE DOTS */
  var dots = document.querySelectorAll(".dot");

  dots.forEach(function (dot) {
    dot.classList.remove("active");
  });

  if (dots[currentIndex]) {
    dots[currentIndex].classList.add("active");
  }
}

/* =========================
   IMAGE MODAL
========================= */

function openImageModal(src, caption) {

  var modal =
    document.getElementById("img-modal");

  var modalImg =
    document.getElementById("img-modal-src");

  var captionBox =
    document.getElementById("img-modal-caption");

  if (!modal) return;

  modal.style.display = "flex";

  modalImg.src = src;

  captionBox.textContent = caption || "";
}

/* =========================
   GLOBAL CLICK EVENTS
========================= */

document.addEventListener("click", function (e) {

  /* NEXT */
  if (e.target.id === "nextImg") {

    currentIndex =
      (currentIndex + 1) % media.length;

    updateSlider(currentIndex);
  }

  /* PREVIOUS */
  if (e.target.id === "prevImg") {

    currentIndex =
      (currentIndex - 1 + media.length) %
      media.length;

    updateSlider(currentIndex);
  }

  /* DOTS */
  if (e.target.classList.contains("dot")) {

    updateSlider(
      parseInt(e.target.dataset.index)
    );
  }

  /* IMAGE MODAL */
  if (
    e.target.id === "main-product-media" &&
    e.target.tagName === "IMG"
  ) {

    openImageModal(
      e.target.src,
      e.target.alt
    );
  }

});

/* =========================
   MODAL CLOSE
========================= */

document
  .getElementById("img-close")
  .addEventListener("click", function () {

    document.getElementById(
      "img-modal"
    ).style.display = "none";

});

document
  .getElementById("img-modal")
  .addEventListener("click", function (e) {

    if (e.target.id === "img-modal") {

      this.style.display = "none";
    }

});


  /* =========================
     PRICE
  ========================= */

  var priceHTML = p.price
    ? QF.fmtNGN(p.price)
    : "Call for Price";

  /* =========================
     ACTION BUTTONS
  ========================= */
  var actionButtons = p.catalog
  ? `
    <a
      class="btn btn-primary btn-lg"
      href="products.html?cat=spare-parts">
      View Spare Parts Catalogue
    </a>

<a
  class="btn btn-outline btn-lg"
  href="${p.pdf || '#'}"
  target="_blank">
    View Price List (PDF)
  </a>

    <a
      class="btn btn-whatsapp btn-lg"
      target="_blank"
      rel="noopener"
      href="${QF.waLink("Hello, I want the spare parts catalogue details")}">
      Request on WhatsApp
    </a>
  `
  : p.price
  ? `
    <button
      class="btn btn-primary btn-lg"
      onclick="QF.Cart.add('${p.id}')">
      Add to Cart
    </button>

    <a
      class="btn btn-whatsapp btn-lg"
      target="_blank"
      rel="noopener"
      href="${QF.waLink(
        "Hello, I'd like to enquire about: " +
          p.name +
          " (" +
          QF.fmtNGN(p.price) +
          ")."
      )}">
      Enquire on WhatsApp
    </a>
  `
  : `
    <a
      class="btn btn-whatsapp btn-lg"
      target="_blank"
      rel="noopener"
      href="${QF.waLink(
        "Hello, I'd like to enquire about the price for: " +
          p.name
      )}">
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

          <span class="card-brand">
            ${QF.escape(p.brand || "")}
          </span>

          <h1>${QF.escape(p.name)}</h1>

          <div class="price" style="font-size:1.8rem;margin:.5rem 0">
            ${priceHTML}
          </div>

          <span class="stock ${
            p.inStock === false
              ? "stock-out"
              : "stock-in"
          }">
            ${
              p.inStock === false
                ? "Sold Out"
                : "In Stock"
            }
          </span>

          <p style="margin-top:1rem">
            ${QF.escape(
              p.description ||
                p.shortDescription ||
                ""
            )}
          </p>

          ${
            coreSpecs.length || specs
              ? `
                <div class="specs">
                  ${coreSpecs.join("")}
                  ${specs}
                </div>
              `
              : ""
          }

          <div style="display:flex;gap:.6rem;flex-wrap:wrap">
            ${actionButtons}
          </div>

        </div>

      </div>

      <div style="margin-top:4rem; margin:1rem">
        <h2>Related products</h2>
        <div class="grid grid-4" id="related"></div>
      </div>

    </div>
  `;


  
  /* =========================
     RELATED PRODUCTS
  ========================= */

  var related = (window.QF_PRODUCTS || [])
    .filter(function (x) {
      return (
        x.id !== p.id &&
        x.category === p.category
      );
    })
    .slice(0, 4);

  if (!related.length) {
    related = (window.QF_PRODUCTS || [])
      .filter(function (x) {
        return x.id !== p.id;
      })
      .slice(0, 4);
  }

  QF.byId("related").innerHTML = related
    .map(QF.productCardHTML)
    .join("");
});