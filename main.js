document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // CUSTOM CURSOR
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");

  if (dot && ring) {
    let mouseX = 0,
      mouseY = 0;
    let ringX = 0,
      ringY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    });

    (function animateCursor() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      requestAnimationFrame(animateCursor);
    })();
  }

  // PRELOADER + HERO ENTRANCE
  const preloader = document.getElementById("preloader");
  const panelLeft = document.querySelector(".panel-left");
  const panelRight = document.querySelector(".panel-right");
  const preloaderLogo = document.querySelector(".preloader-logo");
  const preloaderLetters = document.querySelectorAll(".pl");
  const preloaderTagline = document.querySelector(".preloader-tagline");

  const titleEl = document.getElementById("title");
  const titleHTML = titleEl.innerHTML;
  titleEl.innerHTML = titleHTML
    .split(/(<[^>]+>|[^<\s]+)/g)
    .filter(Boolean)
    .map((part) => {
      if (part.startsWith("<")) return part;
      if (part.trim() === "") return part;
      return `<span class="word-wrap"><span class="word">${part}</span></span>`;
    })
    .join(" ");

  const words = titleEl.querySelectorAll(".word");

  const tl = gsap.timeline();

  tl.to(
    preloaderLogo,
    {
      opacity: 1,
      duration: 0.01,
    },
    0.1,
  )

    .to(
      preloaderLetters,
      {
        opacity: 1,
        y: 0,
        duration: 0.35,
        stagger: 0.06,
        ease: "power3.out",
      },
      0.15,
    )

    .to(
      preloaderTagline,
      {
        opacity: 0.45,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      0.85,
    )

    .to(
      [preloaderLetters, preloaderTagline],
      {
        y: -8,
        duration: 0.4,
        ease: "power2.inOut",
      },
      1.3,
    )

    .to(
      preloaderLogo,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      },
      1.5,
    )

    .to(
      panelLeft,
      {
        xPercent: -100,
        duration: 0.85,
        ease: "power3.inOut",
      },
      1.6,
    )

    .to(
      panelRight,
      {
        xPercent: 100,
        duration: 0.85,
        ease: "power3.inOut",
      },
      1.6,
    )

    .call(
      () => {
        preloader.style.display = "none";
      },
      [],
      2.5,
    )

    .fromTo(
      ".hero-right",
      {
        opacity: 0,
        x: 80,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power3.out",
      },
      2.1,
    )

    .fromTo(
      ".Cup-MokaNoir",
      {
        rotate: 4,
        y: 30,
      },
      {
        rotate: -6,
        y: 0,
        duration: 1,
        ease: "power3.out",
      },
      2.1,
    )

    .fromTo(
      ".hero-left",
      {
        opacity: 0,
        x: -60,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      2.25,
    )

    .fromTo(
      ".hero-eyebrow",
      {
        opacity: 0,
        y: 16,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      2.4,
    )

    .fromTo(
      words,
      {
        opacity: 0,
        y: 28,
        rotateX: -20,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.5,
        stagger: 0.09,
        ease: "power3.out",
      },
      2.55,
    )

    .fromTo(
      "#sub",
      {
        opacity: 0,
        y: 16,
      },
      {
        opacity: 0.65,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      2.95,
    )

    .fromTo(
      ".boutons",
      {
        opacity: 0,
        y: 16,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
      },
      3.1,
    )

    .fromTo(
      ".hero-stats",
      {
        opacity: 0,
        y: 14,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
      },
      3.22,
    )

    .fromTo(
      ".hero-badge",
      {
        opacity: 0,
        scale: 0.4,
        rotate: -30,
      },
      {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)",
      },
      3.0,
    )

    .fromTo(
      ".scroll-hint",
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      3.4,
    );

  // ABOUT
  gsap.fromTo(".about-main-img", {
  clipPath: "inset(0 100% 0 0)",
}, {
  clipPath: "inset(0 0% 0 0)",
  duration: 1.1,
  ease: "power3.inOut",
  scrollTrigger: {
    trigger: ".about-section",
    start: "top 75%",
  }
});

  gsap.fromTo(
    ".about-year-badge",
    {
      scale: 0,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
      delay: 0.6,
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 70%",
      },
    },
  );

  gsap.fromTo(
    ".about-text-col .section-eyebrow",
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: { trigger: ".about-text-col", start: "top 78%" },
    },
  );

  gsap.fromTo(
    ".about-text-col .section-title",
    {
      opacity: 0,
      y: 24,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      delay: 0.1,
      scrollTrigger: { trigger: ".about-text-col", start: "top 78%" },
    },
  );

  gsap.fromTo(
    ".about-text-col .section-body",
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.15,
      ease: "power2.out",
      delay: 0.2,
      scrollTrigger: { trigger: ".about-text-col", start: "top 78%" },
    },
  );

  gsap.fromTo(
    ".about-cta",
    {
      opacity: 0,
      y: 16,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: "power2.out",
      delay: 0.4,
      scrollTrigger: { trigger: ".about-text-col", start: "top 78%" },
    },
  );

  // MENU — Header + Flip 3D cards
  gsap.fromTo(
    ".menu-section .section-eyebrow",
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: { trigger: ".menu-section", start: "top 80%" },
    },
  );

  gsap.fromTo(
    ".menu-section .section-title",
    {
      opacity: 0,
      y: 24,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      delay: 0.1,
      scrollTrigger: { trigger: ".menu-section", start: "top 80%" },
    },
  );

  gsap.fromTo(
    ".menu-card",
    {
      opacity: 0,
      y: 60,
      scale: 0.92,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".menu-grid",
        start: "top 82%",
      },
    },
  );

  // PROCESS — Draw line + steps pop
  gsap.fromTo(
    ".process-section .section-eyebrow",
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: { trigger: ".process-section", start: "top 80%" },
    },
  );

  gsap.fromTo(
    ".process-section .section-title",
    {
      opacity: 0,
      y: 24,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      delay: 0.1,
      scrollTrigger: { trigger: ".process-section", start: "top 80%" },
    },
  );

  gsap.fromTo(
    ".process-connector",
    {
      scaleX: 0,
      transformOrigin: "left center",
    },
    {
      scaleX: 1,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".process-steps",
        start: "top 80%",
      },
    },
  );

  gsap.fromTo(
    ".process-step",
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.2,
      scrollTrigger: {
        trigger: ".process-steps",
        start: "top 80%",
      },
    },
  );

  // HISTOIRE — Draw line scrub + dots + contenu
  gsap.fromTo(
    ".histoire-section .section-eyebrow",
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: { trigger: ".histoire-section", start: "top 80%" },
    },
  );

  gsap.fromTo(
    ".histoire-section .section-title",
    {
      opacity: 0,
      y: 24,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      delay: 0.1,
      scrollTrigger: { trigger: ".histoire-section", start: "top 80%" },
    },
  );

  document.querySelectorAll(".timeline-item").forEach((item, i) => {
    const isEven = i % 2 !== 0;
    const dot = item.querySelector(".timeline-dot");
    const content = item.querySelector(".timeline-content");
    const year = item.querySelector(".timeline-year");

    gsap.fromTo(
      dot,
      {
        scale: 0,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: { trigger: item, start: "top 80%" },
      },
    );

    gsap.fromTo(
      content,
      {
        opacity: 0,
        x: isEven ? 30 : -30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.15,
        scrollTrigger: { trigger: item, start: "top 80%" },
      },
    );

    if (year) {
      gsap.fromTo(
        year,
        {
          opacity: 0,
          x: isEven ? -20 : 20,
        },
        {
          opacity: 0.15,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.1,
          scrollTrigger: { trigger: item, start: "top 80%" },
        },
      );
    }
  });

  // ORIGINES — Header + stagger diagonal
  gsap.fromTo(
    ".origines-section .section-eyebrow",
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 0.8,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: { trigger: ".origines-section", start: "top 80%" },
    },
  );

  gsap.fromTo(
    ".origines-section .section-title",
    {
      opacity: 0,
      y: 24,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      delay: 0.1,
      scrollTrigger: { trigger: ".origines-section", start: "top 80%" },
    },
  );

  gsap.fromTo(
    ".origines-sub",
    {
      opacity: 0,
      y: 16,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      delay: 0.2,
      scrollTrigger: { trigger: ".origines-section", start: "top 80%" },
    },
  );

  const originesCards = document.querySelectorAll(".origine-card");
  const originesXMap = [-40, -15, 15, 40];
  originesCards.forEach((card, i) => {
    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 30,
        x: originesXMap[i] ?? 0,
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 0.65,
        ease: "power3.out",
        delay: i * 0.08,
        scrollTrigger: {
          trigger: ".origines-grid",
          start: "top 82%",
        },
      },
    );
  });

  // BOUTIQUE — Header + scale reveal
  gsap.fromTo(
    ".boutique-section .section-eyebrow",
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: { trigger: ".boutique-section", start: "top 80%" },
    },
  );

  gsap.fromTo(
    ".boutique-section .section-title",
    {
      opacity: 0,
      y: 24,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      delay: 0.1,
      scrollTrigger: { trigger: ".boutique-section", start: "top 80%" },
    },
  );

  gsap.fromTo(
    ".boutique-card",
    {
      opacity: 0,
      y: 60,
      scale: 0.92,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".boutique-grid",
        start: "top 82%",
      },
    },
  );

  // CADEAUX — Texte gauche + cards cascade
  gsap.fromTo(
    ".cadeaux-text",
    {
      opacity: 0,
      x: -50,
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".cadeaux-section",
        start: "top 78%",
      },
    },
  );

  document.querySelectorAll(".cadeau-card").forEach((card, i) => {
    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 50,
        rotation: i === 1 ? 0 : i === 0 ? -3 : 3,
      },
      {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 0.65,
        ease: "power3.out",
        delay: i * 0.12,
        scrollTrigger: {
          trigger: ".cadeaux-cards",
          start: "top 82%",
        },
      },
    );
  });

  // TESTIMONIALS — Featured first + sides slide
  gsap.fromTo(
    ".testimonials-inner .section-eyebrow",
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: { trigger: ".testimonials-section", start: "top 80%" },
    },
  );

  gsap.fromTo(
    ".testimonials-inner .section-title",
    {
      opacity: 0,
      y: 24,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      delay: 0.1,
      scrollTrigger: { trigger: ".testimonials-section", start: "top 80%" },
    },
  );

  gsap.fromTo(
    ".featured-testi",
    {
      opacity: 0,
      scale: 0.9,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".testimonials-grid",
        start: "top 82%",
      },
    },
  );

  const testiCards = document.querySelectorAll(
    ".testi-card:not(.featured-testi)",
  );
  const testiX = [-40, 40];
  testiCards.forEach((card, i) => {
    gsap.fromTo(
      card,
      {
        opacity: 0,
        x: testiX[i],
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.15,
        scrollTrigger: {
          trigger: ".testimonials-grid",
          start: "top 82%",
        },
      },
    );
  });

  // CTA — + form bounce
  gsap.fromTo(
    ".cta-deco",
    {
      opacity: 0,
      scale: 0,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
      scrollTrigger: { trigger: ".cta-section", start: "top 80%" },
    },
  );

  gsap.fromTo(
    ".cta-section .section-eyebrow",
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 0.8,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      delay: 0.1,
      scrollTrigger: { trigger: ".cta-section", start: "top 80%" },
    },
  );

  gsap.fromTo(
    ".cta-title",
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      delay: 0.2,
      scrollTrigger: { trigger: ".cta-section", start: "top 80%" },
    },
  );

  gsap.fromTo(
    ".cta-sub",
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      delay: 0.35,
      scrollTrigger: { trigger: ".cta-section", start: "top 80%" },
    },
  );

  gsap.fromTo(
    ".cta-form",
    {
      opacity: 0,
      y: 30,
      scale: 0.96,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.4)",
      delay: 0.45,
      scrollTrigger: { trigger: ".cta-section", start: "top 80%" },
    },
  );

  gsap.fromTo(
    ".cta-disclaimer",
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 0.4,
      delay: 0.6,
      scrollTrigger: { trigger: ".cta-section", start: "top 80%" },
    },
  );

  // CONTACT — Info gauche + form droite
  gsap.fromTo(
    ".contact-info",
    {
      opacity: 0,
      x: -50,
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 78%",
      },
    },
  );

  gsap.fromTo(
    ".reservation-form",
    {
      opacity: 0,
      x: 50,
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.1,
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 78%",
      },
    },
  );

  // FOOTER — Colonnes stagger
  gsap.fromTo(
    ".footer-brand",
    {
      opacity: 0,
      y: 24,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".footer",
        start: "top 90%",
      },
    },
  );

  gsap.fromTo(
    ".footer-col",
    {
      opacity: 0,
      y: 24,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.15,
      scrollTrigger: {
        trigger: ".footer",
        start: "top 90%",
      },
    },
  );

  // NAVBAR SCROLL
  const navbar = document.querySelector(".navbar-container");
  ScrollTrigger.create({
    start: "top -60",
    onEnter: () =>
      gsap.to(navbar, {
        paddingTop: "16px",
        duration: 0.4,
        ease: "power2.out",
      }),
    onLeaveBack: () =>
      gsap.to(navbar, {
        paddingTop: "30px",
        duration: 0.4,
        ease: "power2.out",
      }),
  });

  // CTA EMAIL MICRO-INTERACTION
  const ctaInput = document.querySelector(".cta-input");
  const ctaForm = document.querySelector(".cta-form");

  if (ctaInput && ctaForm) {
    ctaInput.addEventListener("focus", () => {
      ctaForm.style.borderColor = "rgba(201, 169, 110, 0.6)";
      ctaForm.style.boxShadow = "0 0 0 3px rgba(201, 169, 110, 0.1)";
    });
    ctaInput.addEventListener("blur", () => {
      ctaForm.style.borderColor = "rgba(201, 169, 110, 0.25)";
      ctaForm.style.boxShadow = "none";
    });

    document.querySelector(".cta-btn")?.addEventListener("click", async () => {
      const val = ctaInput.value.trim();
      if (!val) return;
      const btn = document.querySelector(".cta-btn");
      btn.textContent = "Envoi…";
      btn.disabled = true;
      try {
        const res = await fetch("https://formspree.io/f/mrejkkdv", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ type: "Newsletter", email: val }),
        });
        if (res.ok) {
          ctaInput.value = "";
          btn.textContent = "✓ Parfait !";
          btn.style.background = "#a8c898";
          setTimeout(() => {
            btn.textContent = "S'abonner";
            btn.style.background = "";
            btn.disabled = false;
          }, 2500);
        } else throw new Error();
      } catch {
        btn.textContent = "Erreur — Réessayer";
        btn.style.background = "#c27474";
        setTimeout(() => {
          btn.textContent = "S'abonner";
          btn.style.background = "";
          btn.disabled = false;
        }, 2500);
      }
    });
  }

  // MINI CART
  const miniCart = document.getElementById("miniCart");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartClose = document.getElementById("cartClose");
  const cartItemsEl = document.getElementById("cartItems");
  const cartFooter = document.getElementById("cartFooter");
  const cartTotal = document.getElementById("cartTotal");

  let cart = [];

  function openCart() {
    miniCart.classList.add("open");
    cartOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  function closeCart() {
    miniCart.classList.remove("open");
    cartOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  cartClose?.addEventListener("click", closeCart);
  cartOverlay?.addEventListener("click", closeCart);

  function formatPrice(price) {
    return price.toLocaleString("fr-FR") + " FCFA";
  }
  function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  function renderCart() {
    if (cart.length === 0) {
      cartItemsEl.innerHTML =
        '<p class="cart-empty">Votre panier est vide.</p>';
      cartFooter.style.display = "none";
      return;
    }
    cartFooter.style.display = "block";
    cartTotal.textContent = formatPrice(getCartTotal());
    cartItemsEl.innerHTML = cart
      .map(
        (item, idx) => `
      <div class="cart-item" data-idx="${idx}">
        <div class="cart-item-icon">${item.icon}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${formatPrice(item.price)}</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" data-action="dec" data-idx="${idx}">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" data-action="inc" data-idx="${idx}">+</button>
        </div>
        <button class="cart-item-remove" data-idx="${idx}" aria-label="Supprimer">✕</button>
      </div>
    `,
      )
      .join("");

    cartItemsEl.querySelectorAll(".qty-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx);
        if (btn.dataset.action === "inc") cart[idx].qty++;
        else {
          cart[idx].qty--;
          if (cart[idx].qty <= 0) cart.splice(idx, 1);
        }
        renderCart();
      });
    });
    cartItemsEl.querySelectorAll(".cart-item-remove").forEach((btn) => {
      btn.addEventListener("click", () => {
        cart.splice(parseInt(btn.dataset.idx), 1);
        renderCart();
      });
    });
  }

  function addToCart(name, price, icon) {
    const existing = cart.find((item) => item.name === name);
    if (existing) existing.qty++;
    else cart.push({ name, price: parseInt(price), icon, qty: 1 });
    renderCart();
    openCart();
  }

  document.querySelectorAll(".menu-card .menu-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".menu-card");
      addToCart(card.dataset.name, card.dataset.price, "☕");
    });
  });
  document.querySelectorAll(".boutique-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      addToCart(btn.dataset.name, btn.dataset.price, "🛍️");
    });
  });
  document.querySelectorAll(".cadeau-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      addToCart(btn.dataset.name, btn.dataset.price, "🎁");
    });
  });

  const orderOverlay = document.getElementById("orderOverlay");
  const orderModal = document.getElementById("orderModal");
  const orderModalClose = document.getElementById("orderModalClose");

  function openOrderModal() {
    orderOverlay.classList.add("active");
    orderModal.classList.add("active");
  }
  function closeOrderModal() {
    orderOverlay.classList.remove("active");
    orderModal.classList.remove("active");
  }

  document
    .querySelector(".cart-checkout-btn")
    ?.addEventListener("click", openOrderModal);
  orderModalClose?.addEventListener("click", closeOrderModal);
  orderOverlay?.addEventListener("click", closeOrderModal);

  document
    .getElementById("orderSubmit")
    ?.addEventListener("click", async () => {
      const nom = document.getElementById("orderNom").value.trim();
      const tel = document.getElementById("orderTel").value.trim();
      const loc = document.getElementById("orderLoc").value.trim();
      if (!nom || !tel || !loc) {
        ["orderNom", "orderTel", "orderLoc"].forEach((id) => {
          const el = document.getElementById(id);
          if (!el.value.trim()) {
            el.style.borderColor = "#c27474";
            setTimeout(() => (el.style.borderColor = ""), 600);
          }
        });
        return;
      }
      const resume = cart
        .map((i) => `${i.name} x${i.qty} — ${formatPrice(i.price * i.qty)}`)
        .join("\n");
      const submitBtn = document.getElementById("orderSubmit");
      submitBtn.textContent = "Envoi en cours…";
      submitBtn.disabled = true;
      try {
        const res = await fetch("https://formspree.io/f/mrejkkdv", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            nom,
            telephone: tel,
            localisation: loc,
            commande: resume,
            total: formatPrice(getCartTotal()),
          }),
        });
        if (res.ok) {
          submitBtn.textContent = "✓ Commande envoyée !";
          submitBtn.style.background = "#6b8f71";
          setTimeout(() => {
            cart = [];
            renderCart();
            closeOrderModal();
            closeCart();
            submitBtn.textContent = "Valider la commande";
            submitBtn.style.background = "";
            submitBtn.disabled = false;
            ["orderNom", "orderTel", "orderLoc"].forEach(
              (id) => (document.getElementById(id).value = ""),
            );
          }, 2000);
        } else throw new Error();
      } catch {
        submitBtn.textContent = "Erreur — Réessayer";
        submitBtn.style.background = "#c27474";
        setTimeout(() => {
          submitBtn.textContent = "Valider la commande";
          submitBtn.style.background = "";
          submitBtn.disabled = false;
        }, 2500);
      }
    });

  renderCart();

  // FORMULAIRE RÉSERVATION
  document.getElementById("resSubmit")?.addEventListener("click", async () => {
    const nom = document.getElementById("resNom")?.value.trim();
    const email = document.getElementById("resEmail")?.value.trim();
    const date = document.getElementById("resDate")?.value;
    const personnes = document.getElementById("resPersonnes")?.value;
    const message = document.getElementById("resMessage")?.value.trim();
    if (!nom || !email || !date) {
      [
        { id: "resNom", val: nom },
        { id: "resEmail", val: email },
        { id: "resDate", val: date },
      ].forEach(({ id, val }) => {
        if (!val) {
          const el = document.getElementById(id);
          if (el) {
            el.style.borderColor = "#c27474";
            setTimeout(() => (el.style.borderColor = ""), 600);
          }
        }
      });
      return;
    }
    const resSubmit = document.getElementById("resSubmit");
    resSubmit.textContent = "Envoi en cours…";
    resSubmit.disabled = true;
    try {
      const res = await fetch("https://formspree.io/f/mrejkkdv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          type: "Réservation de table",
          nom,
          email,
          date,
          personnes,
          message: message || "—",
        }),
      });
      if (res.ok) {
        resSubmit.textContent = "✓ Demande envoyée !";
        resSubmit.style.background = "#6b8f71";
        setTimeout(() => {
          resSubmit.textContent = "Envoyer la demande";
          resSubmit.style.background = "";
          resSubmit.disabled = false;
          ["resNom", "resEmail", "resDate", "resMessage"].forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.value = "";
          });
        }, 3000);
      } else throw new Error();
    } catch {
      resSubmit.textContent = "Erreur — Réessayer";
      resSubmit.style.background = "#c27474";
      setTimeout(() => {
        resSubmit.textContent = "Envoyer la demande";
        resSubmit.style.background = "";
        resSubmit.disabled = false;
      }, 2500);
    }
  });
});

// COPYRIGHT - année dynamique
const currentYearEl = document.getElementById('current-year');
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}
