/* Contact form -> WhatsApp */
document.addEventListener("DOMContentLoaded", function(){
  var f = QF.byId("contact-form");
  if(!f) return;
  f.addEventListener("submit", function(e){
    e.preventDefault();
    var data = new FormData(f);
    var msg = "*New enquiry from website*\n\n"+
      "Name: "+(data.get("name")||"")+"\n"+
      "Phone: "+(data.get("phone")||"")+"\n"+
      "Email: "+(data.get("email")||"")+"\n"+
      "Interest: "+(data.get("interest")||"")+"\n\n"+
      "Message:\n"+(data.get("message")||"");
    window.open(QF.waLink(msg), "_blank");
  });
});
