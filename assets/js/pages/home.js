/* Home page */
document.addEventListener("DOMContentLoaded", function(){
  var cats = QF.byId("home-categories");
  if(cats) cats.innerHTML = (window.QF_CATEGORIES||[]).map(QF.categoryCardHTML).join("");

  var feat = QF.byId("home-featured");
  if(feat){
    var items = (window.QF_PRODUCTS||[]).filter(function(p){return p.featured;}).slice(0,4);
    if(!items.length) items = (window.QF_PRODUCTS||[]).slice(0,4);
    feat.innerHTML = items.map(QF.productCardHTML).join("");
  }
});
