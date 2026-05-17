/* Reusable card renderer */

QF.renderMedia = function (media) {
  if (!media || !media.length) return "";

  return media.map(function (item) {

    if (item.type === "image") {
      return `<img src="${item.src}" class="gallery-item" loading="lazy">`;
    }

    if (item.type === "video") {
      return `
        <video class="gallery-item" controls>
          <source src="${item.src}" type="video/mp4">
        </video>
      `;
    }

    return "";

  }).join("");
};
QF.productCardHTML = function (p) {
  var stockClass = p.inStock === false ? "stock-out" : "stock-in";

  var stockText = p.inStock === false ? "Sold Out" : "In Stock";

  /* PRICE */
  var priceHTML = p.price ? QF.fmtNGN(p.price) : "<p>Call for Price<p>";

  /* ACTION BUTTONS */
  var actionButtons = p.price
    ? `
      <button
        class="btn btn-primary btn-sm"
        onclick="QF.Cart.add('${p.id}')">
        Add to Cart
      </button>

      <a
        class="btn btn-outline btn-sm"
        target="_blank"
        rel="noopener"
        href="${QF.waLink(
          "Hello, I'm interested in: " +
            p.name +
            " (" +
            QF.fmtNGN(p.price) +
            ").",
        )}">
        Chat
      </a>
    `
    : `
      <a
        class="btn btn-primary btn-sm"
        target="_blank"
        rel="noopener"
        href="${QF.waLink(
          "Hello, I'd like to enquire about the price for: " + p.name,
        )}">
        Request Price
      </a>
    `;

  return `
    <article class="card">

<a class="card-img" href="product.html?id=${encodeURIComponent(p.id)}">

<div class="card-media">
  ${QF.renderMedia
    ? QF.renderMedia(
        p.media && p.media.length
          ? p.media
          : [{ type: "image", src: p.image }]
      )
    : `<img src="${QF.escape(p.image)}" alt="${QF.escape(p.name)}">`
  }
</div>

  ${p.kva ? `<span class="tag tag-kva">${QF.escape(p.kva)}</span>` : ""}

  ${p.featured ? `<span class="tag tag-featured">Featured</span>` : ""}

</a>

      <div class="card-body">

        <span class="card-brand">
          ${QF.escape(p.brand || "")}
        </span>

        <a
          class="card-title"
          href="product.html?id=${encodeURIComponent(p.id)}">

          ${QF.escape(p.name)}

        </a>

        ${
          p.shortDescription
            ? `
            <p class="card-desc">
              ${QF.escape(p.shortDescription)}
            </p>
          `
            : ""
        }

        <div class="card-meta">

          <div>
            <span class="label-tiny">Price</span>

<div class="${p.price ? "price" : "call-price"}">
  ${priceHTML}
</div>
          </div>

          <span class="stock ${stockClass}">
            ${stockText}
          </span>

        </div>

        <div class="card-actions">
          ${actionButtons}
        </div>

      </div>

    </article>
  `;
};
QF.categoryCardHTML = function (c) {
  return `
    <a class="cat-card" href="products.html?cat=${encodeURIComponent(c.slug)}">
      <img src="${QF.escape(c.image)}" alt="${QF.escape(c.title)}" loading="lazy">

      <div class="cat-card-body">
        <h3>${QF.escape(c.title)}</h3>
        <p>${QF.escape(c.short)}</p>

        <span class="cat-cta">Shop Now →</span>
      </div>
    </a>
  `;
};

