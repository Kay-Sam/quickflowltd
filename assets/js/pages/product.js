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
     IMAGE SLIDER
  ========================= */

  var images =
    Array.isArray(p.images) && p.images.length
      ? p.images
      : p.image
      ? [p.image]
      : ["images/products/placeholder.jpg"];

  var currentIndex = 0;

  var galleryHTML = `
    <div class="product-gallery">

      <div class="slider">

        ${
          images.length > 1
            ? `
          <button class="slider-btn prev" id="prevImg">
            ‹
          </button>
        `
            : ""
        }

        <img
          id="main-product-img"
          src="${QF.escape(images[0])}"
          alt="${QF.escape(p.name)}"
        >

        ${
          images.length > 1
            ? `
          <button class="slider-btn next" id="nextImg">
            ›
          </button>
        `
            : ""
        }

      </div>

      ${
        images.length > 1
          ? `
        <div class="slider-dots">
          ${images
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
     PRICE
  ========================= */

  var priceHTML = p.price
    ? QF.fmtNGN(p.price)
    : "Call for Price";

  /* =========================
     ACTION BUTTONS
  ========================= */

  var actionButtons = p.price
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

      <div style="margin-top:4rem;">
        <h2>Related products</h2>
        <div class="grid grid-4" id="related"></div>
      </div>

    </div>
  `;

  /* =========================
     SLIDER LOGIC
  ========================= */

  function updateSlider(i) {
    var img = document.getElementById("main-product-img");
    var dots = document.querySelectorAll(".dot");

    if (!img) return;

    currentIndex = i;

    img.src = images[currentIndex];

    dots.forEach(function (d) {
      d.classList.remove("active");
    });

    if (dots[currentIndex]) {
      dots[currentIndex].classList.add("active");
    }
  }

  document.addEventListener("click", function (e) {

    /* NEXT */
    if (e.target.id === "nextImg") {
      currentIndex =
        (currentIndex + 1) % images.length;

      updateSlider(currentIndex);
    }

    /* PREV */
    if (e.target.id === "prevImg") {
      currentIndex =
        (currentIndex - 1 + images.length) %
        images.length;

      updateSlider(currentIndex);
    }

    /* DOTS */
    if (e.target.classList.contains("dot")) {
      updateSlider(
        parseInt(e.target.dataset.index)
      );
    }
  });

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