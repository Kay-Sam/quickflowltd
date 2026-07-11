(function () {
  var fallbackProducts = (window.QF_PRODUCTS || []).slice();
  var categoryAliases = {
    used: "fairly-used",
    parts: "spare-parts",
  };

  function normalizeCategory(category) {
    return categoryAliases[category] || category || "";
  }

  function normalizeMedia(product) {
    if (Array.isArray(product.media) && product.media.length) {
      return product.media.map(function (item) {
        if (!item) return null;
        if (typeof item === "string") {
          if (item.indexOf("|") > -1) {
            var parts = item.split("|");
            var type = parts[0] === "video" ? "video" : "image";
            var src = parts.slice(1).join("|").trim();
            return src ? { type: type, src: src } : null;
          }
          return item.trim() ? { type: "image", src: item.trim() } : null;
        }
        if (item.src) {
          return {
            type: item.type === "video" ? "video" : "image",
            src: item.src,
          };
        }
        return null;
      }).filter(Boolean);
    }
    if (Array.isArray(product.images) && product.images.length) {
      return product.images.map(function (src) {
        return { type: "image", src: src };
      });
    }
    if (product.image) return [{ type: "image", src: product.image }];
    return [];
  }

  function normalizeSpecs(specs) {
    if (!specs) return null;
    if (typeof specs === "string") {
      try {
        specs = JSON.parse(specs);
      } catch (err) {
        return null;
      }
    }
    if (typeof specs !== "object" || Array.isArray(specs)) return null;

    var cleaned = {};
    Object.keys(specs).forEach(function (key) {
      if (key && specs[key] != null && String(specs[key]).trim() !== "") {
        cleaned[key] = specs[key];
      }
    });

    return Object.keys(cleaned).length ? cleaned : null;
  }

  function normalizeProduct(row) {
    var product = Object.assign({}, row);
    var shortDescription = product.shortDescription || product.short_description || "";
    var description = product.description || shortDescription || "";

    product.id = String(product.id);
    product.category = normalizeCategory(product.category);
    product.price = product.price === "" || product.price == null ? null : Number(product.price);
    product.description = description;
    product.shortDescription = shortDescription || description;
    product.image = product.image || "images/products/placeholder.jpg";
    product.media = normalizeMedia(product);
    product.specs = normalizeSpecs(product.specs);
    product.inStock = product.in_stock !== undefined ? product.in_stock : product.inStock;

    if (product.inStock === undefined) product.inStock = true;

    return product;
  }

  QF.normalizeProduct = normalizeProduct;

  QF.loadProducts = function () {
    if (QF.productsReady) return QF.productsReady;

    QF.productsReady = (async function () {
      if (!window.qfSupabase) {
        window.QF_PRODUCTS = fallbackProducts.map(normalizeProduct);
        return window.QF_PRODUCTS;
      }

      try {
        var result = await window.qfSupabase
          .from("products")
          .select("*");

        if (result.error) throw result.error;

        window.QF_PRODUCTS = result.data && result.data.length
          ? result.data.map(normalizeProduct)
          : fallbackProducts.map(normalizeProduct);
      } catch (err) {
        console.warn("Supabase products failed, using local fallback", err);
        window.QF_PRODUCTS = fallbackProducts.map(normalizeProduct);
      }

      return window.QF_PRODUCTS;
    })();

    return QF.productsReady;
  };
})();
