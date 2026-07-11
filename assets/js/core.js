/* Quickflow — core helpers used by every page */
window.QF = window.QF || {};

QF.fmtNGN = function(n){
  return new Intl.NumberFormat("en-NG",{style:"currency",currency:"NGN",maximumFractionDigits:0}).format(n||0);
};

QF.waLink = function(message){
  var num = (window.QF_SITE && window.QF_SITE.whatsapp) || "";
  return "https://wa.me/" + num + "?text=" + encodeURIComponent(message||"");
};

QF.qs = function(name){
  var u = new URL(window.location.href);
  return u.searchParams.get(name);
};

QF.byId = function(id){ return document.getElementById(id); };

QF.escape = function(s){
  return String(s==null?"":s).replace(/[&<>"']/g, function(c){
    return ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c];
  });
};

QF.findProduct = function(id){
  var target = String(id == null ? "" : id);
  return (window.QF_PRODUCTS||[]).find(function(p){ return String(p.id)===target; });
};

QF.findCategory = function(slug){
  return (window.QF_CATEGORIES||[]).find(function(c){ return c.slug===slug; });
};
