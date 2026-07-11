/* UI: header, footer, drawer, FAB injected on every page */
(function(){
  var S = window.QF_SITE || {};
  var shellInjected = false;

  function navLinks(active){
    var items = [
      ["index.html","Home"],
      ["about.html","About"],
      ["products.html","Products"],
      ["services.html","Services"],
      // ["properties.html","Projects"],
      ["gallery.html","Gallery"],
      ["contact.html","Contact"]
    ];
    return items.map(function(i){
      var cls = (active===i[0])?' class="active"':'';
      return '<a href="'+i[0]+'"'+cls+'>'+i[1]+'</a>';
    }).join("");
  }

/* HEADER */
function injectHeader(){

  var active = (location.pathname.split("/").pop() || "index.html");

  var count = QF.Cart.count ? QF.Cart.count() : 0;

  var html =
    '<header class="site-header"><div class="container bar">'+

      '<a class="brand" href="index.html">'+
        '<span>'+QF.escape(S.name||"Quickflow Ltd")+'</span>'+
      '</a>'+

      '<nav class="nav">'+navLinks(active)+'</nav>'+

      '<div class="header-actions">'+

        '<button class="cart-btn" onclick="QF.Cart.open()" aria-label="Open cart">'+
          '<i class="fa-solid fa-cart-shopping cart-icon"></i>'+

          (count > 0
            ? '<span class="cart-badge">'+count+'</span>'
            : '')+

        '</button>'+

        '<button class="menu-toggle" onclick="document.getElementById(\'qf-mobile-nav\').classList.toggle(\'open\')" aria-label="Toggle menu">☰</button>'+

      '</div>'+

    '</div>'+

    '<div class="container">'+
      '<nav id="qf-mobile-nav" class="mobile-nav">'+
        navLinks(active)+
      '</nav>'+
    '</div>'+

    '</header>';

  var slot = document.getElementById("qf-header");

  if(slot) slot.outerHTML = html;
}


/* UPDATE CART BADGE */
function updateCartBadge(){

  var btn = document.querySelector(".cart-btn");

  if(!btn) return;

  var oldBadge = btn.querySelector(".cart-badge");

  if(oldBadge){
    oldBadge.remove();
  }

  var count = QF.Cart.count ? QF.Cart.count() : 0;

  if(count > 0){

    btn.insertAdjacentHTML(
      "beforeend",
      '<span class="cart-badge">'+count+'</span>'
    );

  }

}
  function injectFooter(){
    var soc = S.social||{};
    var html =
      '<footer class="site-footer"><div class="container">'+
        '<div class="footer-grid">'+
          '<div>'+
            '<div class="brand" style="color:#fff"><span>'+QF.escape(S.name||"")+'</span></div>'+
            '<p style="margin-top:1rem;color:rgba(255,255,255,.7)">'+QF.escape(S.description||"")+'</p>'+
            '<div class="social">'+
  (soc.whatsapp
    ? '<a href="'+soc.whatsapp+'" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>'
    : '')+
'</div>'+
          '</div>'+
          '<div><h4>Quick Links</h4><ul>'+
            '<li><a href="about.html">About Us</a></li>'+
            '<li><a href="services.html">Services</a></li>'+
            '<li><a href="products.html">Products</a></li>'+
            '<li><a href="gallery.html">Gallery</a></li>'+
            '<li><a href="contact.html">Contact</a></li>'+
          '</ul></div>'+
          '<div><h4>Products</h4><ul>'+
            (window.QF_CATEGORIES||[]).map(function(c){return '<li><a href="products.html?cat='+c.slug+'">'+QF.escape(c.title)+'</a></li>';}).join("")+
          '</ul></div>'+
 '<div><h4>Contact</h4><ul>'+

'<li><i class="fa-solid fa-phone"></i> '+
  (S.phones || []).map(function(phone){
    return '<a href="tel:'+phone.replace(/\s+/g,"")+'">'+QF.escape(phone)+'</a>';
  }).join(', ')+
'</li>'+

'<li><i class="fa-solid fa-envelope"></i> <a href="mailto:'+QF.escape(S.email||"")+'">'+QF.escape(S.email||"")+'</a></li>'+

'<li><i class="fa-solid fa-location-dot"></i> ' +
'<a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=' +
encodeURIComponent(S.address || "") +
'">' +
QF.escape(S.address || "") +
'</a></li>'+

'<li><i class="fa-regular fa-clock"></i> '+QF.escape(S.hours||"")+'</li>'+

'</ul></div>'+
        '</div>'+
      '<div class="footer-bottom">'+

'<div class="footer-bottom-main">'+
  '<span class="footer-copy">© '+(new Date().getFullYear())+' '+QF.escape(S.legalName||S.name||"")+'. All rights reserved.</span>'+
  '<span class="footer-tagline">Power Solutions You Can Trust</span>'+
'</div>'+

  '<div class="footer-credit">'+
    'Built by <a href="https://kaysotech.com.ng" target="_blank" rel="noopener">Kaysotech</a>'+
  '</div>'+

'</div>'+
      '</div></footer>';
    var slot = document.getElementById("qf-footer");
    if(slot) slot.outerHTML = html;
  }

  function injectDrawer(){
    var html =
      '<div id="qf-drawer-bd" class="drawer-backdrop" onclick="QF.Cart.close()"></div>'+
      '<aside id="qf-drawer" class="drawer" aria-label="Shopping cart">'+
        '<div class="drawer-head"><h3>Your Cart</h3><button class="btn btn-ghost btn-sm" onclick="QF.Cart.close()">✕</button></div>'+
        '<div id="qf-drawer-body" class="drawer-body"></div>'+
        '<div id="qf-drawer-foot" class="drawer-foot"></div>'+
      '</aside>'+
      '<a id="wa-fab" class="wa-fab" target="_blank" rel="noopener" aria-label="Chat on WhatsApp" href="'+
QF.waLink("Hello "+(S.name||"")+", I'd like to make an enquiry.")+
'"><i class="fa-brands fa-whatsapp"></i></a>';
    var d = document.createElement("div");
    d.innerHTML = html;
    document.body.appendChild(d);
  }

function pageHero(opts){
  if(!opts) return;

  var slot = document.getElementById("qf-pagehero");
  if(!slot) return;

  //  build breadcrumb trail
  var all = [
    { label: "Home", href: "index.html" }
  ].concat(opts.crumbs || []);

  var crumbs = all.map(function(c, i){
    if(i === all.length - 1){
      return '<span class="current">'+QF.escape(c.label)+'</span>';
    }
    return '<a href="'+c.href+'">'+QF.escape(c.label)+'</a>';
  }).join('<span class="sep">›</span>');

  //  render hero
  slot.outerHTML =
    '<section class="page-hero"><div class="container">'+
      (opts.eyebrow ? '<span class="eyebrow">'+QF.escape(opts.eyebrow)+'</span>' : "")+
      '<h1>'+QF.escape(opts.title)+'</h1>'+
      (opts.description ? '<p>'+QF.escape(opts.description)+'</p>' : "")+
      '<nav class="crumbs">'+crumbs+'</nav>'+
    '</div></section>';
}

QF.UI = {
  injectHeader: injectHeader,
  injectFooter: injectFooter,
  injectDrawer: injectDrawer,
  pageHero: pageHero,
  updateCartBadge: updateCartBadge
};

function injectShell() {
  if (shellInjected || !document.body) return;
  shellInjected = true;
  injectHeader();
  injectFooter();
  injectDrawer();
}

injectShell();

document.addEventListener("DOMContentLoaded", function () {
  injectShell();

  document.title =
    (document.title || S.name) +
    (document.title.indexOf(S.name) > -1
      ? ""
      : " — " + (S.name || ""));

  const fab = document.querySelector(".wa-fab");
  const hero = document.querySelector(".hero");

  if (!fab) return;

  /* HOMEPAGE */
  if (hero) {

    const triggerPoint = hero.offsetHeight * 0.6;

    window.addEventListener("scroll", () => {
      if (window.scrollY > triggerPoint) {
        fab.classList.add("show");
      } else {
        fab.classList.remove("show");
      }
    });

  }

  /* OTHER PAGES */
  else {
    fab.classList.add("show");
  }

});
  
})();
