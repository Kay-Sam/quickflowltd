document.addEventListener("DOMContentLoaded", () => {
  const supabaseClient = window.supabase.createClient(
    "https://ubrqudheimrkpkmnfvbq.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVicnF1ZGhlaW1ya3BrbW5mdmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NDYwNTMsImV4cCI6MjA5NTIyMjA1M30.VyTGGCpL7go2TcoIJcc0Nc5pDq406r90pa2QpCvMu90"
  );

  const els = {
    modal: document.getElementById("modal"),
    form: document.getElementById("productForm"),
    grid: document.getElementById("grid"),
    addBtn: document.getElementById("addBtn"),
    closeBtn: document.getElementById("closeBtn"),
    modalClose: document.getElementById("modalClose"),
    saveBtn: document.getElementById("saveBtn"),
    logoutBtn: document.getElementById("logoutBtn"),
    hamburger: document.getElementById("hamburger"),
    sidebar: document.getElementById("sidebar"),
    sidebarBackdrop: document.getElementById("sidebarBackdrop"),
    menuIcon: document.getElementById("menuIcon"),
    themeBtn: document.getElementById("themeBtn"),
    themeIcon: document.getElementById("themeIcon"),
    toast: document.getElementById("toast"),
    modalTitle: document.getElementById("modalTitle"),
    resultText: document.getElementById("resultText"),
    statTotal: document.getElementById("statTotal"),
    statFeatured: document.getElementById("statFeatured"),
    statStock: document.getElementById("statStock"),
    categoryDonut: document.getElementById("categoryDonut"),
    categoryDonutTotal: document.getElementById("categoryDonutTotal"),
    categoryChart: document.getElementById("categoryChart"),
    availabilityMetrics: document.getElementById("availabilityMetrics"),
    searchInput: document.getElementById("searchInput"),
    filterCategory: document.getElementById("filterCategory"),
    clearFilters: document.getElementById("clearFilters"),
    name: document.getElementById("name"),
    brand: document.getElementById("brand"),
    price: document.getElementById("price"),
    category: document.getElementById("category"),
    kva: document.getElementById("kva"),
    fuel: document.getElementById("fuel"),
    phase: document.getElementById("phase"),
    shortDescription: document.getElementById("shortDescription"),
    desc: document.getElementById("desc"),
    specs: document.getElementById("specs"),
    galleryImages: document.getElementById("galleryImages"),
    image: document.getElementById("image"),
    pdf: document.getElementById("pdf"),
    previewGallery: document.getElementById("previewGallery"),
    inStock: document.getElementById("in_stock"),
    featured: document.getElementById("featured"),
    catalog: document.getElementById("catalog"),
  };

  let products = [];
  let editingId = null;
  let toastTimer = null;
  let statFilter = "all";
  let selectedUploadPreview = null;

  function escapeHTML(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[char]);
  }

  function normalizeCategory(value) {
    return {
      used: "fairly-used",
      parts: "spare-parts",
    }[value] || value || "";
  }

  function categoryLabel(value) {
    return {
      "brand-new": "Brand New",
      "fairly-used": "Fairly Used",
      gas: "Gas Generators",
      "spare-parts": "Spare Parts",
      industrial: "Industrial Power",
      others: "Others",
    }[normalizeCategory(value)] || "Uncategorized";
  }

  function adminImageUrl(src) {
    if (!src) return "../images/products/placeholder.jpg";
    if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) return src;
    if (src.startsWith("/")) return src;
    if (src.startsWith("../")) return src;
    return "../" + src.replace(/^\.?\//, "");
  }

  function displayFileName(src) {
    if (!src) return "";
    try {
      const path = new URL(src, location.href).pathname;
      return decodeURIComponent(path.split("/").pop() || src);
    } catch (err) {
      return src.split("/").pop() || src;
    }
  }

  function normalizeMediaItem(item) {
    if (!item) return null;
    if (typeof item === "string") {
      if (item.includes("|")) {
        const parts = item.split("|");
        const type = parts[0] === "video" ? "video" : "image";
        const src = parts.slice(1).join("|").trim();
        if (!src || src === "undefined" || src === "null") return null;
        return { type, src };
      }

      if (!item.trim() || item === "undefined" || item === "null") return null;
      return { type: "image", src: item };
    }
    if (item.type === "image" && item.src) return { type: "image", src: item.src };
    if (item.type === "video" && item.src) return { type: "video", src: item.src };
    return null;
  }

  function normalizeArray(value) {
    if (Array.isArray(value)) return value;
    if (typeof value === "string" && value.trim().startsWith("[")) {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
      } catch (err) {
        return [];
      }
    }
    return [];
  }

  function productImageList(product) {
    const items = [];
    const images = normalizeArray(product.images);
    const media = normalizeArray(product.media);

    images.forEach(src => {
      if (src && src !== "undefined" && src !== "null") {
        items.push({ type: "image", src });
      }
    });

    media.forEach(item => {
      const normalized = normalizeMediaItem(item);
      if (normalized) items.push(normalized);
    });

    if (product.image && product.image !== "undefined" && product.image !== "null") {
      items.unshift({ type: "image", src: product.image });
    }

    return items.reduce((acc, item) => {
      const key = item.type + "|" + item.src;
      if (!acc.some(existing => existing.type + "|" + existing.src === key)) acc.push(item);
      return acc;
    }, []);
  }

  function formatPrice(value) {
    const amount = Number(value || 0);
    if (!amount) return "Call for Price";
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  function showToast(message, type = "success") {
    clearTimeout(toastTimer);
    els.toast.textContent = message;
    els.toast.className = "toast show " + type;
    toastTimer = setTimeout(() => {
      els.toast.className = "toast";
    }, 3500);
  }

  function setTheme(theme) {
    document.body.dataset.theme = theme;
    localStorage.setItem("qf:admin-theme", theme);
    els.themeIcon.className = theme === "dark" ? "fa-regular fa-sun" : "fa-solid fa-moon";
    els.themeBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }

  function setMenuOpen(isOpen) {
    els.sidebar.classList.toggle("active", isOpen);
    document.body.classList.toggle("sidebar-open", isOpen);
    els.menuIcon.className = isOpen ? "fa-solid fa-xmark menu-icon-close" : "fa-solid fa-bars";
    els.hamburger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    els.hamburger.setAttribute("aria-expanded", String(isOpen));
  }

  function setSaving(isSaving) {
    els.saveBtn.disabled = isSaving;
    els.saveBtn.textContent = isSaving ? "Saving..." : "Save Product";
  }

  function parseSpecs(value) {
    const trimmed = value.trim();
    if (!trimmed) return null;

    try {
      const parsed = JSON.parse(trimmed);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("Specs must be a JSON object.");
      }
      return parsed;
    } catch (err) {
      const specs = {};
      trimmed.split(/\n+/).forEach(line => {
        const parts = line.split(":");
        if (parts.length < 2) return;
        const key = parts.shift().trim();
        const val = parts.join(":").trim();
        if (key && val) specs[key] = val;
      });
      if (Object.keys(specs).length) return specs;
      throw new Error("Specs must be valid JSON or key: value lines.");
    }
  }

  function stringifySpecs(specs) {
    if (!specs) return "";
    if (typeof specs === "string") {
      try {
        specs = JSON.parse(specs);
      } catch (err) {
        return specs;
      }
    }
    if (typeof specs !== "object" || Array.isArray(specs)) return "";
    return Object.keys(specs)
      .filter(key => key && specs[key] != null && String(specs[key]).trim() !== "")
      .map(key => `${key}: ${specs[key]}`)
      .join("\n");
  }

  function parseGallery(value) {
    return value
      .split(/\n+/)
      .map(line => line.trim())
      .filter(Boolean)
      .map(function (line) {
        if (line.startsWith("video|")) {
          const src = line.slice(6).trim();
          return src && src !== "undefined" && src !== "null" ? { type: "video", src } : null;
        }
        if (line.startsWith("image|")) {
          const src = line.slice(6).trim();
          return src && src !== "undefined" && src !== "null" ? { type: "image", src } : null;
        }
        if (line.includes("|")) {
          const parts = line.split("|");
          const type = parts[0] === "video" ? "video" : "image";
          const src = parts.slice(1).join("|").trim();
          return src && src !== "undefined" && src !== "null" ? { type, src } : null;
        }
        return { type: "image", src: line };
      })
      .filter(function (item) {
        return item && item.src && item.src !== "undefined" && item.src !== "null";
      });
  }

  function sanitizeGalleryItems(items) {
    return (items || []).map(normalizeMediaItem).filter(Boolean);
  }

  function serializeGallery(items) {
    return sanitizeGalleryItems(items)
      .map(function (item) {
        return (item.type === "video" ? "video|" : "image|") + item.src;
      })
      .join("\n");
  }

  function renderPreview(items) {
    const cleanItems = sanitizeGalleryItems(items).reduce((acc, item) => {
      const key = item.type + "|" + item.src;
      if (!acc.some(existing => existing.type + "|" + existing.src === key)) acc.push(item);
      return acc;
    }, []);

    if (!cleanItems.length) {
      els.previewGallery.innerHTML = '<span class="preview-empty">No media selected</span>';
      return;
    }

    els.previewGallery.innerHTML = cleanItems.map((item, index) => {
      const isUpload = item.src.startsWith("data:");
      const previewSrc = adminImageUrl(item.src);
      return `
        <div class="preview-item">
          ${
            item.type === "video"
              ? `<video src="${escapeHTML(previewSrc)}" controls playsinline muted></video>`
              : `<img src="${escapeHTML(previewSrc)}" alt="Product media preview">`
          }
          ${index > 0 ? `<button type="button" class="preview-main-btn" data-preview-action="make-main" data-preview-key="${escapeHTML(item.type + "|" + item.src)}" aria-label="Make this the main image"><i class="fa-solid fa-star" aria-hidden="true"></i></button>` : ""}
          <button type="button" class="preview-remove" data-preview-key="${escapeHTML(item.type + "|" + item.src)}" aria-label="Remove media">x</button>
          ${index === 0 ? '<span class="preview-main">Main</span>' : ""}
          ${isUpload ? '<span class="preview-new">New</span>' : ""}
        </div>
      `;
    }).join("");
  }

  function currentPreviewSources() {
    return sanitizeGalleryItems((selectedUploadPreview ? [selectedUploadPreview] : []).concat(parseGallery(els.galleryImages.value)));
  }

  function removeGallerySource(key) {
    if (key.startsWith("image|data:") || key.startsWith("video|data:")) {
      selectedUploadPreview = null;
      els.image.value = "";
      renderPreview(currentPreviewSources());
      return;
    }

    const remaining = sanitizeGalleryItems(parseGallery(els.galleryImages.value)).filter(function (item) {
      return item.type + "|" + item.src !== key;
    });
    els.galleryImages.value = serializeGallery(remaining);
    renderPreview(currentPreviewSources());
  }

  function setPrimaryGallerySource(key) {
    const gallery = sanitizeGalleryItems(parseGallery(els.galleryImages.value));
    const index = gallery.findIndex(function (item) {
      return item.type + "|" + item.src === key;
    });

    if (index <= 0) return;

    const [picked] = gallery.splice(index, 1);
    gallery.unshift(picked);
    els.galleryImages.value = serializeGallery(gallery);
    renderPreview(currentPreviewSources());
  }

  function resetForm() {
    editingId = null;
    selectedUploadPreview = null;
    els.form.reset();
    els.inStock.checked = true;
    els.featured.checked = false;
    els.catalog.checked = false;
    els.pdf.dataset.currentPdf = "";
    els.pdf.title = "";
    els.galleryImages.value = "";
    renderPreview([]);
    els.modalTitle.textContent = "Add Product";
  }

  function openModal(product) {
    resetForm();

    if (product) {
      editingId = product.id;
      els.modalTitle.textContent = "Edit Product";
      els.name.value = product.name || "";
      els.brand.value = product.brand || "";
      els.price.value = product.price || "";
      els.category.value = normalizeCategory(product.category);
      els.kva.value = product.kva || "";
      els.fuel.value = product.fuel || "";
      els.phase.value = product.phase || "";
      els.shortDescription.value = product.shortDescription || product.short_description || "";
      els.desc.value = product.description || "";
      els.specs.value = stringifySpecs(product.specs);
      els.galleryImages.value = serializeGallery(productImageList(product));
      els.inStock.checked = product.in_stock ?? product.inStock ?? true;
      els.featured.checked = product.featured ?? false;
      els.catalog.checked = Boolean(product.catalog || product.pdf);
      if (product.pdf) {
        els.pdf.dataset.currentPdf = product.pdf;
        els.pdf.title = "Current document: " + displayFileName(product.pdf);
      }
      renderPreview(currentPreviewSources());
    }

    els.modal.classList.add("open");
    els.modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    els.modal.classList.remove("open");
    els.modal.setAttribute("aria-hidden", "true");
  }

  function productMatches(product) {
    const category = els.filterCategory.value;
    const q = els.searchInput.value.trim().toLowerCase();

    if (category !== "all" && normalizeCategory(product.category) !== category) return false;
    if (statFilter === "featured" && !product.featured) return false;
    if (statFilter === "stock" && product.in_stock === false) return false;
    if (!q) return true;

    return [
      product.name,
      product.brand,
      product.category,
      product.kva,
      product.description,
      product.shortDescription,
      product.short_description,
    ].join(" ").toLowerCase().includes(q);
  }

  function updateStats() {
    els.statTotal.textContent = products.length;
    els.statFeatured.textContent = products.filter(p => p.featured).length;
    els.statStock.textContent = products.filter(p => p.in_stock !== false).length;

    document.querySelectorAll("[data-stat-filter]").forEach(card => {
      card.classList.toggle("active", card.dataset.statFilter === statFilter);
    });

    renderAnalytics();
  }

  function renderAnalytics() {
    const chartColors = ["#2563eb", "#16a34a", "#d97706", "#7c3aed", "#0891b2", "#dc2626"];
    const categoryCounts = products.reduce((counts, product) => {
      const category = normalizeCategory(product.category) || "others";
      counts[category] = (counts[category] || 0) + 1;
      return counts;
    }, {});

    const categories = Object.keys(categoryCounts).sort((a, b) => categoryCounts[b] - categoryCounts[a]);
    const total = products.length;
    let offset = 0;
    const segments = categories.map((category, index) => {
      const count = categoryCounts[category];
      const start = total ? (offset / total) * 100 : 0;
      offset += count;
      const end = total ? (offset / total) * 100 : 0;
      return `${chartColors[index % chartColors.length]} ${start}% ${end}%`;
    });

    els.categoryDonut.style.background = total
      ? `conic-gradient(${segments.join(", ")})`
      : "conic-gradient(#e2e8f0 0% 100%)";
    els.categoryDonutTotal.textContent = total;

    els.categoryChart.innerHTML = categories.length
      ? categories.map(category => {
        const count = categoryCounts[category];
        const index = categories.indexOf(category);
        const percent = total ? Math.round((count / total) * 100) : 0;

        return `
          <div class="legend-row">
            <span class="legend-dot" style="background:${chartColors[index % chartColors.length]}"></span>
            <div>
              <span>${escapeHTML(categoryLabel(category))}</span>
              <strong>${count} (${percent}%)</strong>
            </div>
          </div>
        `;
      }).join("")
      : '<div class="empty-state compact">No product data yet.</div>';

    const inStock = products.filter(product => product.in_stock !== false).length;
    const outOfStock = products.filter(product => product.in_stock === false).length;
    const featured = products.filter(product => product.featured).length;

    els.availabilityMetrics.innerHTML = `
      <div class="mini-metric">
        <span>In Stock</span>
        <strong>${inStock}</strong>
      </div>
      <div class="mini-metric">
        <span>Out of Stock</span>
        <strong>${outOfStock}</strong>
      </div>
      <div class="mini-metric">
        <span>Featured</span>
        <strong>${featured}</strong>
      </div>
    `;
  }

  function renderProducts() {
    const visible = products.filter(productMatches);

    updateStats();
    const filterLabels = {
      all: "all products",
      featured: "featured products",
      stock: "in-stock products",
    };
    els.resultText.textContent = visible.length + " " + filterLabels[statFilter] + " shown";

    if (!visible.length) {
      els.grid.innerHTML = '<div class="empty-state">No products match your filters.</div>';
      return;
    }

    els.grid.innerHTML = visible.map(product => {
      const stock = product.in_stock !== false;
      const category = normalizeCategory(product.category);

      return `
        <article class="product-card">
          <div class="product-image-wrap">
            <img src="${escapeHTML(adminImageUrl(product.image))}" alt="${escapeHTML(product.name)}" loading="lazy">
          </div>

          <div class="product-card-body">
            <div class="product-card-top">
              <span class="category-badge ${escapeHTML(category)}">${escapeHTML(categoryLabel(category))}</span>
              ${product.featured ? '<span class="status-badge featured">Featured</span>' : ""}
            </div>

            <h3>${escapeHTML(product.name || "Untitled product")}</h3>
            <p>${escapeHTML(product.brand || "No brand")}</p>

            <div class="product-meta">
              <strong>${escapeHTML(formatPrice(product.price))}</strong>
              <span class="status-badge ${stock ? "stock" : "out"}">${stock ? "In Stock" : "Out of Stock"}</span>
            </div>

            <div class="card-actions">
              <button type="button" class="btn secondary" data-action="edit" data-id="${escapeHTML(product.id)}">Edit</button>
              <button type="button" class="btn danger" data-action="delete" data-id="${escapeHTML(product.id)}">Delete</button>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  async function loadProducts() {
    els.grid.innerHTML = '<div class="loading">Loading products...</div>';

    const { data, error } = await supabaseClient
  .from("products")
  .select("*")
  .order("category", { ascending: true })
  .order("updated_at", { ascending: false });

    if (error) {
      els.grid.innerHTML = '<div class="empty-state">Could not load products.</div>';
      showToast(error.message, "error");
      return;
    }

    products = (data || []).map(product => ({
      ...product,
      category: normalizeCategory(product.category),
    }));
    renderProducts();
  }

const order = {
  "brand-new": 1,
  "fairly-used": 2,
  gas: 3,
  industrial: 4,
  "spare-parts": 5,
  others: 6,
};

products.sort((a, b) => {
  const aRank = order[a.category] ?? 99;
  const bRank = order[b.category] ?? 99;

  if (aRank !== bRank) return aRank - bRank;

  return new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at);
});

  async function compressImage(file, options = {}) {
  const {
    maxWidth = 1600,
    maxHeight = 1600,
    quality = 0.72,
    type = "image/webp",
  } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = event => {
      const img = new Image();

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // resize proportionally
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");

        // better rendering quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          blob => {
            if (!blob) {
              reject(new Error("Compression failed"));
              return;
            }

            const compressedFile = new File(
              [blob],
              file.name.replace(/\.\w+$/, ".webp"),
              {
                type,
                lastModified: Date.now(),
              }
            );

            resolve(compressedFile);
          },
          type,
          quality
        );
      };

      img.onerror = reject;
      img.src = event.target.result;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

  async function uploadMediaFile(file) {
    const safeName = file.name.replace(/[^a-z0-9._-]/gi, "-").toLowerCase();
    const baseName = safeName.replace(/\.[^.]+$/, "");
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");
    const originalExt = safeName.split(".").pop() || "bin";
    const maxVideoBytes = 5 * 1024 * 1024;
    let payload = file;
    let ext = originalExt;

    if (isImage) {
      payload = await compressImage(file);
      ext = "webp";
    } else if (isVideo) {
      if (file.size > maxVideoBytes) {
        throw new Error("Video uploads must be 5MB or less.");
      }
      payload = file;
      ext = originalExt;
    }

    const fileName = `${Date.now()}-${baseName}.${ext}`;

    const { error } = await supabaseClient.storage
      .from("products")
      .upload(fileName, payload);

    if (error) throw error;

    const { data } = supabaseClient.storage
      .from("products")
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function uploadDocumentFile(file) {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const allowedExtensions = ["pdf", "doc", "docx"];
    const safeName = file.name.replace(/[^a-z0-9._-]/gi, "-").toLowerCase();
    const ext = (safeName.split(".").pop() || "").toLowerCase();

    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(ext)) {
      throw new Error("Document uploads must be PDF, DOC, or DOCX files.");
    }

    const fileName = `docs/${Date.now()}-${safeName}`;

    const { error } = await supabaseClient.storage
      .from("products")
      .upload(fileName, file);

    if (error) throw error;

    const { data } = supabaseClient.storage
      .from("products")
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function uploadImageIfNeeded(existingImage) {
    const file = els.image.files[0];
    if (!file) return existingImage || "";
    return uploadMediaFile(file);
  }

  async function uploadDocumentIfNeeded(existingPdf) {
    const file = els.pdf.files[0];
    if (!file) return existingPdf || "";
    return uploadDocumentFile(file);
  }

  function appendGalleryImage(item) {
    const gallery = sanitizeGalleryItems(parseGallery(els.galleryImages.value));
    const key = item.type + "|" + item.src;
    if (!gallery.some(function (entry) {
      return entry.type + "|" + entry.src === key;
    })) gallery.push(item);
    els.galleryImages.value = serializeGallery(gallery);
    renderPreview(currentPreviewSources());
  }

  async function saveProduct() {
    setSaving(true);

    try {
      const existing = editingId ? products.find(product => product.id === editingId) : null;
      const pdfUrl = await uploadDocumentIfNeeded((existing && existing.pdf) || "");
      const gallery = sanitizeGalleryItems(parseGallery(els.galleryImages.value));
      const imageUrl = await uploadImageIfNeeded((existing && existing.image) || ((gallery.find(function (item) {
        return item.type === "image";
      }) || {}).src));
      const images = gallery
        .filter(function (item) {
          return item.type === "image";
        })
        .map(function (item) {
          return item.src;
        });
      const existingMedia = existing ? normalizeArray(existing.media) : [];
      const existingVideos = existingMedia.length
        ? existingMedia.filter(item => item && item.type === "video" && item.src)
        : [];
      const mediaEntries = gallery.map(function (item) {
        return { type: item.type, src: item.src };
      });

      if (imageUrl && !images.length) {
        images.unshift(imageUrl);
      }

      const mainImage = images[0] || (existing && existing.image) || "";

      const productData = {
        name: els.name.value.trim(),
        brand: els.brand.value.trim(),
        price: els.price.value ? Number(els.price.value) : null,
        category: normalizeCategory(els.category.value),
        kva: els.kva.value.trim(),
        fuel: els.fuel.value.trim(),
        phase: els.phase.value.trim(),
        short_description: els.shortDescription.value.trim(),
        description: els.desc.value.trim(),
        specs: parseSpecs(els.specs.value),
        image: mainImage,
        images,
        media: mediaEntries.concat(existingVideos),
        pdf: pdfUrl || null,
        catalog: els.catalog.checked || Boolean(pdfUrl),
        in_stock: els.inStock.checked,
        featured: els.featured.checked,
      };

      let result;
      if (editingId) {
        result = await supabaseClient
          .from("products")
          .update(productData)
          .eq("id", editingId);
      } else {
        result = await supabaseClient
          .from("products")
          .insert([productData]);
      }

      if (result.error) throw result.error;

      closeModal();
      showToast(editingId ? "Product updated successfully." : "Product added successfully.");
      void loadProducts().catch(err => {
        console.warn("Product refresh failed after save:", err);
      });
    } catch (err) {
      showToast(err.message || "Could not save product.", "error");
    } finally {
      setSaving(false);
    }
  }

  async function deleteProduct(id) {
    const product = products.find(item => String(item.id) === String(id));
    const confirmed = confirm(`Delete ${product ? product.name : "this product"}?`);
    if (!confirmed) return;

    const { error } = await supabaseClient
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      showToast(error.message, "error");
      return;
    }

    showToast("Product deleted successfully.");
    void loadProducts().catch(err => {
      console.warn("Product refresh failed after delete:", err);
    });
  }

  els.hamburger.addEventListener("click", () => {
    setMenuOpen(!els.sidebar.classList.contains("active"));
  });

  els.sidebarBackdrop.addEventListener("click", () => {
    setMenuOpen(false);
  });

  document.querySelectorAll("[data-stat-filter]").forEach(card => {
    card.addEventListener("click", () => {
      statFilter = card.dataset.statFilter;
      renderProducts();
    });
  });

  els.clearFilters.addEventListener("click", () => {
    statFilter = "all";
    els.searchInput.value = "";
    els.filterCategory.value = "all";
    renderProducts();
  });

  els.themeBtn.addEventListener("click", () => {
    setTheme(document.body.dataset.theme === "dark" ? "light" : "dark");
  });

  els.addBtn.addEventListener("click", () => openModal());
  els.closeBtn.addEventListener("click", closeModal);
  els.modalClose.addEventListener("click", closeModal);
  els.searchInput.addEventListener("input", renderProducts);
  els.filterCategory.addEventListener("change", renderProducts);

  els.image.addEventListener("change", async () => {
    const file = els.image.files[0];
    if (!file) return;

    const kind = file.type.startsWith("video/") ? "video" : "image";

    const reader = new FileReader();
    reader.onload = event => {
      selectedUploadPreview = { type: kind, src: event.target.result };
      renderPreview(currentPreviewSources());
    };
    reader.readAsDataURL(file);

    try {
      els.image.disabled = true;
      showToast(kind === "video" ? "Uploading video..." : "Uploading image...");
      const publicUrl = await uploadMediaFile(file);
      selectedUploadPreview = null;
      els.image.value = "";
      appendGalleryImage({ type: kind, src: publicUrl });
      showToast(kind === "video" ? "Video added to gallery." : "Image added to gallery.");
    } catch (err) {
      showToast(err.message || "Upload failed.", "error");
    } finally {
      els.image.disabled = false;
    }
  });

  els.galleryImages.addEventListener("input", () => {
    renderPreview(currentPreviewSources());
  });

  els.previewGallery.addEventListener("click", event => {
    const button = event.target.closest("button[data-preview-key]");
    if (!button) return;

    if (button.dataset.previewAction === "make-main") {
      setPrimaryGallerySource(button.dataset.previewKey);
      return;
    }

    if (button.classList.contains("preview-remove")) {
      removeGallerySource(button.dataset.previewKey);
    }
  });

  els.grid.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const product = products.find(item => String(item.id) === String(button.dataset.id));
    if (button.dataset.action === "edit" && product) openModal(product);
    if (button.dataset.action === "delete") deleteProduct(button.dataset.id);
  });

  els.form.addEventListener("submit", event => {
    event.preventDefault();
    saveProduct();
  });

  els.logoutBtn.addEventListener("click", async () => {
    await supabaseClient.auth.signOut();
    location.href = "login.html";
  });

  supabaseClient.auth.getSession().then(({ data }) => {
    if (!data.session) {
      location.href = "login.html";
      return;
    }

    loadProducts();
  });

  setTheme(localStorage.getItem("qf:admin-theme") || "light");
});
