/* Home page */
document.addEventListener("DOMContentLoaded", async function () {
  var cats = QF.byId("home-categories");
  var feat = QF.byId("home-featured");

  function recentFirst(a, b) {
    var aTime = new Date(a.updated_at || a.created_at || 0).getTime();
    var bTime = new Date(b.updated_at || b.created_at || 0).getTime();
    return bTime - aTime;
  }

  function skeleton(count) {
    return Array(count)
      .fill('<div class="skeleton-card"></div>')
      .join("");
  }

  if (cats) cats.innerHTML = skeleton(3);
  if (feat) feat.innerHTML = skeleton(8);

  if (QF.loadProducts) {
    await QF.loadProducts();
  }

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
      .sort(recentFirst)
      .slice(0, 8);

    if (!items.length) {
      items = (window.QF_PRODUCTS || [])
        .slice()
        .sort(recentFirst)
        .slice(0, 8);
    }

    feat.innerHTML = items.map(QF.productCardHTML).join("");
  }
});
