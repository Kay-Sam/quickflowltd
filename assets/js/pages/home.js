/* Home page */
document.addEventListener("DOMContentLoaded", function () {
  var cats = QF.byId("home-categories");
  var feat = QF.byId("home-featured");

  /* =========================
     SHOW SKELETON FIRST (optional but recommended)
  ========================= */

  function skeleton(count) {
    return Array(count)
      .fill('<div class="skeleton-card"></div>')
      .join("");
  }

  if (cats) cats.innerHTML = skeleton(3);
  if (feat) feat.innerHTML = skeleton(4);

  /* =========================
     LOAD DATA (simulate small delay or real fetch later)
  ========================= */

  setTimeout(function () {
    if (cats) {
      cats.innerHTML = (window.QF_CATEGORIES || [])
        .map(QF.categoryCardHTML)
        .join("");
    }

    if (feat) {
      var items = (window.QF_PRODUCTS || [])
        .filter(function (p) {
          return p.featured;
        })
        .slice(0, 4);

      if (!items.length) {
        items = (window.QF_PRODUCTS || []).slice(0, 4);
      }

      feat.innerHTML = items.map(QF.productCardHTML).join("");
    }
  }, 300);
});