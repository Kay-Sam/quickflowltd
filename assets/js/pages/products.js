(function(){
  var state = {
    cat: QF.qs("cat") || "all",
    q: "",
    sort: "featured"
  };

  async function initProducts() {
    if (QF.loadProducts) {
      await QF.loadProducts();
    }

    render();
  }

  function render(){
    var pool = (window.QF_PRODUCTS||[]).slice();

    if (state.cat !== "all") {
      pool = pool.filter(function(p){
        return p.category === state.cat;
      });
    }

    if(state.q){
      var q = state.q.toLowerCase();
      pool = pool.filter(function(p){
        return (p.name+" "+(p.brand||"")+" "+(p.shortDescription||"")+" "+(p.kva||""))
          .toLowerCase()
          .indexOf(q) > -1;
      });
    }

    if(state.sort==="price-asc")
      pool.sort((a,b)=>(a.price||0)-(b.price||0));

    if(state.sort==="price-desc")
      pool.sort((a,b)=>(b.price||0)-(a.price||0));

    if(state.sort==="featured")
      pool.sort((a,b)=>(b.featured?1:0)-(a.featured?1:0));

    var grid = QF.byId("products-grid");

    if(!pool.length)
      grid.innerHTML = '<div class="empty"><p>No products match your filters.</p></div>';
    else
      grid.innerHTML = pool.map(QF.productCardHTML).join("");

    QF.byId("products-count").textContent =
      pool.length + " product" + (pool.length===1?"":"s");

    document.querySelectorAll(".chip").forEach(function(c){
      c.classList.toggle("active", c.dataset.cat===state.cat);
    });
  }

  document.addEventListener("DOMContentLoaded", function(){
    var chips = QF.byId("products-chips");
    var cats = [{slug:"all",title:"All Products"}]
      .concat(window.QF_CATEGORIES||[]);

    chips.innerHTML = cats.map(function(c){
      return '<button class="chip" data-cat="'+c.slug+'">'+QF.escape(c.title)+'</button>';
    }).join("");

    chips.addEventListener("click", function(e){
      var b = e.target.closest(".chip"); if(!b) return;

      state.cat = b.dataset.cat;
   
      var u = new URL(location.href);
      if(state.cat==="all") u.searchParams.delete("cat");
      else u.searchParams.set("cat", state.cat);

      history.replaceState(null,"",u);
      render();
    });

    QF.byId("products-search")
      .addEventListener("input", function(e){
        state.q = e.target.value;
        render();
      });

    QF.byId("products-sort")
      .addEventListener("change", function(e){
        state.sort = e.target.value;
        render();
      });

    initProducts();
  });
})();
