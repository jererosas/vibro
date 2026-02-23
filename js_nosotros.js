function qs(sel, root = document) { return root.querySelector(sel); }
function qsa(sel, root = document) { return [...root.querySelectorAll(sel)]; }

// --- Top banner swiper (solo si hay >1 slide)
(function initTopBanner() {
  const banner = document.getElementById("topBanner");
  if (!banner) return;

  const slides = qsa(".swiper-slide", banner);
  if (slides.length <= 1) return;

  new Swiper(banner, {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: slides.length > 1,
    autoplay: { delay: 5000, disableOnInteraction: false },
    navigation: {
      nextEl: qs(".swiper-button-next", banner),
      prevEl: qs(".swiper-button-prev", banner),
    },
  });
})();

// --- Brands swiper
(function initBrandsSwiper() {
  const el = document.getElementById("brandsSwiper");
  if (!el) return;

  new Swiper(el, {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 1.05,
    navigation: {
      nextEl: qs(".swiper-button-next", el),
      prevEl: qs(".swiper-button-prev", el),
    },
    breakpoints: {
      640: { slidesPerView: 2, spaceBetween: 10 },
      1024: { slidesPerView: 3, spaceBetween: 10 },
    },
  });
})();

// --- Header top behavior (como tu headerBarTop)
(function initHeaderBarTop() {
  const headerContainer = document.getElementById("headerContainer");
  if (!headerContainer) return;

  function headerBarTop() {
    const topBannerSpace = 20;
    const headerTopSpace = "25px";
    if (window.scrollY < topBannerSpace) headerContainer.style.top = headerTopSpace;
    else headerContainer.style.top = "0";
  }

  headerBarTop();
  window.addEventListener("scroll", headerBarTop, { passive: true });
})();

// --- Mobile menu open/close
(function initMobileMenu() {
  const headerContainer = document.getElementById("headerContainer");
  const openBtn = document.getElementById("openMenuBtn");
  const closeBtn = document.getElementById("closeMenuBtn");
  const overlay = document.getElementById("menuOverlay");
  const productBtn = document.getElementById("menuProductBtn");

  if (!headerContainer || !openBtn || !closeBtn || !overlay) return;

  const open = () => headerContainer.classList.add("is-menu-open");
  const close = () => headerContainer.classList.remove("is-menu-open");

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", close);

  // close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  // close on resize to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 769) close();
  });

  // product click (simula "checkProducts(event)")
  if (productBtn) {
    productBtn.addEventListener("click", () => {
      close();
      // aquí podrías redirigir al producto real:
      // location.href = "/products/...";
    });
  }
})();

// --- Newsletter fake submit (sin Klaviyo)
(function initNewsletter() {
  const form = document.getElementById("newsletter-footer");
  const success = document.getElementById("newsletterSuccess");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (success) success.hidden = false;
    form.reset();
  });
})();