/* Properties / Projects */
document.addEventListener("DOMContentLoaded", function(){
  var grid = QF.byId("properties-grid");
  grid.innerHTML = (window.QF_PROPERTIES||[]).map(function(p){
    return '<article class="card">'+
      '<div class="card-img"><img src="'+QF.escape(p.image)+'" alt="'+QF.escape(p.title)+'" loading="lazy"></div>'+
      '<div class="card-body">'+
        '<span class="card-brand">'+QF.escape(p.location)+' · '+QF.escape(p.capacity)+'</span>'+
        '<h3 class="card-title">'+QF.escape(p.title)+'</h3>'+
        '<p class="card-desc" style="-webkit-line-clamp:3">'+QF.escape(p.summary)+'</p>'+
      '</div>'+
    '</article>';
  }).join("");
});
