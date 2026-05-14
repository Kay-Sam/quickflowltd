document.addEventListener("DOMContentLoaded", function () {
  var grid = document.getElementById("gallery-grid");

  grid.innerHTML = (window.QF_GALLERY || [])
    .map(function (img, index) {
      return `
        <div class="gallery-item">
          <img 
            src="${img.src}" 
            alt="${img.caption || "Gallery image"}"
            data-index="${index}"
            class="gallery-img">
        </div>
      `;
    })
    .join("");

  var modal = document.getElementById("img-modal");
  var modalImg = document.getElementById("img-modal-src");
  var modalCaption = document.getElementById("img-modal-caption");
  var closeBtn = document.getElementById("img-close");

  // open modal
  document.addEventListener("click", function (e) {
    var img = e.target.closest(".gallery-img");
    if (!img) return;

    var index = img.getAttribute("data-index");
    var data = window.QF_GALLERY[index];

    modal.style.display = "flex";
    modalImg.src = data.src;
    modalCaption.textContent = data.caption || "";
  });

  // close button
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // click outside
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      modal.style.display = "none";
    }
  });
});