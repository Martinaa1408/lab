// Year
document.addEventListener("DOMContentLoaded", () => {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});

// Mobile nav toggle
(() => {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Close menu when clicking a link (mobile)
  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => menu.classList.remove("open"));
  });
})();

// Dropdowns: click to open, click outside to close
(() => {
  const dds = document.querySelectorAll(".dd");
  if (!dds.length) return;

  dds.forEach(dd => {
    const btn = dd.querySelector(".dd__btn");
    if (!btn) return;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      // close others
      dds.forEach(x => { if (x !== dd) x.classList.remove("open"); });
      dd.classList.toggle("open");
    });
  });

  document.addEventListener("click", () => {
    dds.forEach(dd => dd.classList.remove("open"));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") dds.forEach(dd => dd.classList.remove("open"));
  });
})();

// Tabs: any [data-tabs] container with .tabs__btn[aria-controls] and .tabs__panel
(() => {
  document.querySelectorAll("[data-tabs]").forEach(box => {
    const btns = box.querySelectorAll(".tabs__btn");
    btns.forEach(btn => btn.addEventListener("click", () => {
      btns.forEach(b => {
        const on = b === btn;
        b.setAttribute("aria-selected", on ? "true" : "false");
        const p = document.getElementById(b.getAttribute("aria-controls"));
        if (p) p.hidden = !on;
      });
    }));
  });
})();

// Instagram-style carousel and like button
(() => {
  document.querySelectorAll("[data-carousel]").forEach(box => {
    const track = box.querySelector(".ig__track");
    const prev = box.querySelector(".ig__nav--prev");
    const next = box.querySelector(".ig__nav--next");
    const count = box.querySelector(".ig__count");
    const dots = box.parentElement.querySelectorAll(".ig__dots i");
    const n = track.children.length;
    const update = () => {
      const i = Math.round(track.scrollLeft / track.clientWidth);
      if (count) count.textContent = (i + 1) + "/" + n;
      dots.forEach((d, k) => d.classList.toggle("on", k === i));
      if (prev) prev.hidden = i === 0;
      if (next) next.hidden = i === n - 1;
    };
    prev && prev.addEventListener("click", () => track.scrollBy({ left: -track.clientWidth, behavior: "smooth" }));
    next && next.addEventListener("click", () => track.scrollBy({ left: track.clientWidth, behavior: "smooth" }));
    track.addEventListener("scroll", () => window.requestAnimationFrame(update));
    update();
  });
  document.querySelectorAll(".ig__like").forEach(btn => btn.addEventListener("click", () => {
    btn.setAttribute("aria-pressed", btn.getAttribute("aria-pressed") === "true" ? "false" : "true");
  }));
})();
