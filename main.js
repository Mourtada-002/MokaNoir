// MOKA NOIR — main.js

document.addEventListener("DOMContentLoaded", () => {
  // =============================================
  // CUSTOM CURSOR
  // =============================================
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

  // =============================================
  // SCROLL REVEAL
  // =============================================
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  reveals.forEach((el) => observer.observe(el));

  // Timeline items reveal
  const timelineItems = document.querySelectorAll(".timeline-item");
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const idx = Array.from(timelineItems).indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, idx * 120);
          timelineObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  timelineItems.forEach((el) => timelineObserver.observe(el));

  // =============================================
  // NAVBAR SCROLL EFFECT
  // =============================================
  const navbar = document.querySelector(".navbar-container");
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 60) {
        navbar.style.paddingTop = "16px";
      } else {
        navbar.style.paddingTop = "30px";
      }
    },
    { passive: true },
  );

  // =============================================
  // MENU CARD STAGGER
  // =============================================
  const menuCards = document.querySelectorAll(".menu-card");
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Array.from(menuCards).indexOf(entry.target);
          entry.target.style.transitionDelay = `${idx * 0.1}s`;
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  menuCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(28px)";
    card.style.transition =
      "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease";
    cardObserver.observe(card);
  });

  // =============================================
  // PROCESS STEPS STAGGER
  // =============================================
  const steps = document.querySelectorAll(".process-step");
  const stepObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Array.from(steps).indexOf(entry.target);
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, idx * 150);
          stepObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  steps.forEach((step) => {
    step.style.opacity = "0";
    step.style.transform = "translateY(24px)";
    step.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    stepObserver.observe(step);
  });

  // =============================================
  // CTA EMAIL MICRO-INTERACTION
  // =============================================
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
        } else {
          throw new Error();
        }
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

  // =============================================
  // MINI CART
  // =============================================
  const miniCart = document.getElementById("miniCart");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartClose = document.getElementById("cartClose");
  const cartItemsEl = document.getElementById("cartItems");
  const cartFooter = document.getElementById("cartFooter");
  const cartTotal = document.getElementById("cartTotal");

  // State
  let cart = []; // [{id, name, price, icon, qty}]

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

    // Qty buttons
    cartItemsEl.querySelectorAll(".qty-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx);
        const action = btn.dataset.action;
        if (action === "inc") {
          cart[idx].qty++;
        } else {
          cart[idx].qty--;
          if (cart[idx].qty <= 0) cart.splice(idx, 1);
        }
        renderCart();
      });
    });

    // Remove buttons
    cartItemsEl.querySelectorAll(".cart-item-remove").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx);
        cart.splice(idx, 1);
        renderCart();
      });
    });
  }

  function addToCart(name, price, icon) {
    const existing = cart.find((item) => item.name === name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price: parseInt(price), icon, qty: 1 });
    }
    renderCart();
    openCart();
  }

  // Menu card "Commander" buttons
  document.querySelectorAll(".menu-card .menu-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".menu-card");
      const name = card.dataset.name;
      const price = card.dataset.price;
      const iconEl = card.querySelector(".menu-icon");
      const icon = iconEl ? iconEl.textContent : "☕";
      addToCart(name, price, icon);
    });
  });

  // Boutique "Ajouter" buttons
  document.querySelectorAll(".boutique-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      const price = btn.dataset.price;
      const iconEl = btn
        .closest(".boutique-card")
        ?.querySelector(".boutique-icon");
      const icon = iconEl ? iconEl.textContent : "🛍️";
      addToCart(name, price, icon);
    });
  });

  // Cadeaux "Offrir" buttons
  document.querySelectorAll(".cadeau-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      const price = btn.dataset.price;
      const iconEl = btn.closest(".cadeau-card")?.querySelector(".cadeau-icon");
      const icon = iconEl ? iconEl.textContent : "🎁";
      addToCart(name, price, icon);
    });
  });

  // Checkout button → ouvre le modal commande
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

  // Envoi commande Formspree
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
            el.style.animation = "shake 0.4s ease";
            setTimeout(() => {
              el.style.borderColor = "";
              el.style.animation = "";
            }, 600);
          }
        });
        return;
      }

      const resume = cart
        .map((i) => `${i.name} x${i.qty} — ${formatPrice(i.price * i.qty)}`)
        .join("\n");
      const total = formatPrice(getCartTotal());

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
            total,
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
            document.getElementById("orderNom").value = "";
            document.getElementById("orderTel").value = "";
            document.getElementById("orderLoc").value = "";
          }, 2000);
        } else {
          throw new Error();
        }
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

  // Init render
  renderCart();

  // =============================================
  // FORMULAIRE RÉSERVATION
  // =============================================
  const resSubmit = document.getElementById("resSubmit");

  resSubmit?.addEventListener("click", async () => {
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
            el.style.animation = "shake 0.4s ease";
            setTimeout(() => {
              el.style.borderColor = "";
              el.style.animation = "";
            }, 600);
          }
        }
      });
      return;
    }

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
          document.getElementById("resNom").value = "";
          document.getElementById("resEmail").value = "";
          document.getElementById("resDate").value = "";
          document.getElementById("resMessage").value = "";
        }, 3000);
      } else {
        throw new Error();
      }
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

  // =============================================
  // ORIGINES CARDS STAGGER
  // =============================================
  const origineCards = document.querySelectorAll(".origine-card");
  const origineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Array.from(origineCards).indexOf(entry.target);
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, idx * 60);
          origineObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05 },
  );

  origineCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(16px)";
    card.style.transition =
      "opacity 0.5s ease, transform 0.5s ease, background 0.3s, border-color 0.3s";
    origineObserver.observe(card);
  });

  // =============================================
  // BOUTIQUE CARDS STAGGER
  // =============================================
  const boutiqueCards = document.querySelectorAll(".boutique-card");
  const boutiqueObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Array.from(boutiqueCards).indexOf(entry.target);
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, idx * 100);
          boutiqueObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  boutiqueCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(24px)";
    card.style.transition =
      "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease";
    boutiqueObserver.observe(card);
  });
});
