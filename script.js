// Üst bar kaydırma efekti
var ustbar = document.getElementById("ustbar");
var yukariBtn = document.getElementById("yukariBtn");
function kaydirmaKontrol() {
  if (ustbar) ustbar.classList.toggle("kaydi", window.scrollY > 24);
  if (yukariBtn) yukariBtn.classList.toggle("gorunur", window.scrollY > 600);
}
window.addEventListener("scroll", kaydirmaKontrol, { passive: true });
kaydirmaKontrol();
if (yukariBtn) yukariBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Mobil menü
var menuBtn = document.getElementById("menuBtn");
var mobilMenu = document.getElementById("mobilMenu");
if (menuBtn && mobilMenu) {
  menuBtn.addEventListener("click", function () {
    var acik = mobilMenu.classList.toggle("acik");
    menuBtn.setAttribute("aria-expanded", String(acik));
    menuBtn.setAttribute("aria-label", acik ? "Menüyü kapat" : "Menüyü aç");
    menuBtn.textContent = acik ? "✕" : "☰";
    document.body.style.overflow = acik ? "hidden" : "";
  });
}

// Görünüme girince animasyon
var ogeler = document.querySelectorAll(".gorun");
if ("IntersectionObserver" in window) {
  var gozlemci = new IntersectionObserver(function (girisler) {
    girisler.forEach(function (g, i) {
      if (g.isIntersecting) {
        setTimeout(function () { g.target.classList.add("aktif"); }, i * 70);
        gozlemci.unobserve(g.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
  ogeler.forEach(function (o) { gozlemci.observe(o); });
} else {
  ogeler.forEach(function (o) { o.classList.add("aktif"); });
}

// Proje galerisi (lightbox)
(function () {
  var kutu = document.getElementById("kutu");
  var liste = window.PROJELER || [];
  if (!kutu || !liste.length) return;
  var foto = document.getElementById("kutuFoto");
  var yazi = document.getElementById("kutuYazi");
  var index = 0;

  function goster(i) {
    index = (i + liste.length) % liste.length;
    var p = liste[index];
    foto.src = p.gorsel;
    foto.alt = p.alt;
    yazi.innerHTML = "<strong>" + p.ad + "</strong> — " + p.aciklama;
    kutu.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function kapat() {
    kutu.hidden = true;
    document.body.style.overflow = "";
  }
  document.querySelectorAll(".foto-btn").forEach(function (b) {
    b.addEventListener("click", function () { goster(Number(b.dataset.index)); });
  });
  document.getElementById("kutuKapat").addEventListener("click", kapat);
  document.getElementById("kutuOnceki").addEventListener("click", function () { goster(index - 1); });
  document.getElementById("kutuSonraki").addEventListener("click", function () { goster(index + 1); });
  kutu.addEventListener("click", function (e) { if (e.target === kutu) kapat(); });
  document.addEventListener("keydown", function (e) {
    if (kutu.hidden) return;
    if (e.key === "Escape") kapat();
    if (e.key === "ArrowRight") goster(index + 1);
    if (e.key === "ArrowLeft") goster(index - 1);
  });
})();
