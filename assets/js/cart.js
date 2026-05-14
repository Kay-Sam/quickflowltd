/* Cart — localStorage based, used everywhere */
(function(){
  var KEY = "qf:cart:v1";
  var listeners = [];

  function read(){
    try { return JSON.parse(localStorage.getItem(KEY)||"[]"); } catch(e){ return []; }
  }
  function write(items){
    localStorage.setItem(KEY, JSON.stringify(items));
    listeners.forEach(function(fn){ try{ fn(items); }catch(e){} });
    window.dispatchEvent(new CustomEvent("qf:cart-change",{detail:items}));
  }

  var Cart = {
    items: function(){ return read(); },
    count: function(){ return read().reduce(function(s,i){return s+i.qty;},0); },
    add: function(id, qty){
      qty = qty||1;
      var items = read();
      var found = items.find(function(i){return i.id===id;});
      if(found) found.qty += qty; else items.push({id:id,qty:qty});
      write(items);
      Cart.open();
    },
    setQty: function(id, qty){
      var items = read();
      if(qty<=0) items = items.filter(function(i){return i.id!==id;});
      else items = items.map(function(i){return i.id===id?{id:id,qty:qty}:i;});
      write(items);
    },
    remove: function(id){ Cart.setQty(id,0); },
    clear: function(){ write([]); },
    resolved: function(){
      return read().map(function(i){
        var p = QF.findProduct(i.id);
        if(!p) return null;
        return { product:p, qty:i.qty, subtotal: p.price*i.qty };
      }).filter(Boolean);
    },
    total: function(){ return Cart.resolved().reduce(function(s,r){return s+r.subtotal;},0); },
    onChange: function(fn){ listeners.push(fn); },
    open: function(){ document.body.classList.add("cart-open"); var d=QF.byId("qf-drawer"),b=QF.byId("qf-drawer-bd"); if(d){d.classList.add("open");b.classList.add("open");} renderDrawer(); },
    close: function(){ document.body.classList.remove("cart-open"); var d=QF.byId("qf-drawer"),b=QF.byId("qf-drawer-bd"); if(d){d.classList.remove("open");b.classList.remove("open");} },
    checkoutWhatsapp: function(){
      var items = Cart.resolved();
      if(!items.length) return QF.waLink("Hello "+QF_SITE.name+", I'd like to make an enquiry.");
      var lines = ["*New order from "+QF_SITE.name+" website*",""];
      items.forEach(function(r,i){ lines.push((i+1)+". "+r.product.name+" × "+r.qty+" — "+QF.fmtNGN(r.subtotal)); });
      lines.push("","*Total:* "+QF.fmtNGN(Cart.total()),"","Please confirm availability and delivery details.");
      return QF.waLink(lines.join("\n"));
    }
  };

  function renderDrawer(){
    var body = QF.byId("qf-drawer-body");
    var foot = QF.byId("qf-drawer-foot");
    if(!body) return;
    var rs = Cart.resolved();
    if(!rs.length){
      body.innerHTML = '<div class="cart-empty"><p>Your cart is empty.</p><a href="products.html" class="btn btn-primary btn-sm" onclick="QF.Cart.close()">Browse products</a></div>';
      foot.innerHTML = "";
      return;
    }
    body.innerHTML = rs.map(function(r){
      return '<div class="cart-item">'+
        '<img src="'+QF.escape(r.product.image)+'" alt="">'+
        '<div><span class="cart-item-name">'+QF.escape(r.product.name)+'</span>'+
        '<span class="cart-item-meta">'+QF.fmtNGN(r.product.price)+'</span>'+
        '<div class="qty"><button onclick="QF.Cart.setQty(\''+r.product.id+'\','+(r.qty-1)+')">−</button><span>'+r.qty+'</span><button onclick="QF.Cart.setQty(\''+r.product.id+'\','+(r.qty+1)+')">+</button></div>'+
        '</div>'+
        '<div style="text-align:right"><strong>'+QF.fmtNGN(r.subtotal)+'</strong><br><button class="cart-remove" onclick="QF.Cart.remove(\''+r.product.id+'\')">Remove</button></div>'+
      '</div>';
    }).join("");
    foot.innerHTML = '<div class="cart-total"><span>Total</span><span>'+QF.fmtNGN(Cart.total())+'</span></div>'+
      '<a class="btn btn-whatsapp btn-block" target="_blank" rel="noopener" href="'+Cart.checkoutWhatsapp()+'">Checkout via WhatsApp</a>'+
      '<button class="btn btn-ghost btn-block btn-sm" style="margin-top:.4rem" onclick="QF.Cart.clear()">Clear cart</button>';
  }

  Cart.onChange(function(){
    var b = document.querySelector(".cart-badge");
    if(b) b.textContent = Cart.count();
    renderDrawer();
  });

  QF.Cart = Cart;
})();
