/* ==========================================================================
   NYXO STYLE LAB — shared behaviour
   Palette engine, lab bar / footer, reveal motion and small enhancers.
   No dependencies.
   ========================================================================== */

(() => {
  "use strict";

  const root = document.documentElement;
  const page = root.dataset.page;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const STYLES = {
    skeuomorphism: {
      title: "Skeuomorphism",
      file: "skeuomorphism.html",
      palettes: [
        { id: "walnut", name: "Walnut", colors: ["#2a1a12", "#e9dfcd", "#c98a3e"] },
        { id: "graphite", name: "Graphite", colors: ["#222527", "#d9dee0", "#f0a23a"] },
        { id: "sage", name: "Sage", colors: ["#202a23", "#e3e9d9", "#b08a4a"] },
        { id: "midnight", name: "Midnight", colors: ["#0d1117", "#28303c", "#6ee7ff"] },
      ],
    },
    neumorphism: {
      title: "Neumorphism",
      file: "neumorphism.html",
      palettes: [
        { id: "cloud", name: "Cloud", colors: ["#e8eef5", "#ffffff", "#4c7cf3"] },
        { id: "sage", name: "Sage", colors: ["#e6ede6", "#ffffff", "#4f8a68"] },
        { id: "blush", name: "Blush", colors: ["#f4e8ea", "#ffffff", "#c25a77"] },
        { id: "midnight", name: "Midnight", colors: ["#1c222b", "#2a3341", "#7aa2ff"] },
      ],
    },
    glassmorphism: {
      title: "Glassmorphism",
      file: "glassmorphism.html",
      palettes: [
        { id: "alpine", name: "Alpine", colors: ["#8fd3ff", "#e7f3ff", "#ffffff"] },
        { id: "sunset", name: "Sunset", colors: ["#ffb56b", "#ffd9a8", "#ffffff"] },
        { id: "orchid", name: "Orchid", colors: ["#c9a8ff", "#efe6ff", "#ffffff"] },
        { id: "noir", name: "Noir", colors: ["#0f1419", "#d8f26a", "#ffffff"] },
      ],
    },
    claymorphism: {
      title: "Claymorphism",
      file: "claymorphism.html",
      palettes: [
        { id: "sherbet", name: "Sherbet", colors: ["#ffe0b8", "#ff8a5c", "#7ed6c4"] },
        { id: "bubblegum", name: "Bubblegum", colors: ["#ffcfe3", "#ff5fa2", "#b28cff"] },
        { id: "ocean", name: "Ocean", colors: ["#c9efff", "#39b8ff", "#7ce0d3"] },
        { id: "forest", name: "Forest", colors: ["#d8efcf", "#6cbf5f", "#ffcf6b"] },
      ],
    },
    brutalism: {
      title: "Brutalism",
      file: "brutalism.html",
      palettes: [
        { id: "acid", name: "Acid", colors: ["#d8ff00", "#0a0a0a", "#ff4d00"] },
        { id: "warning", name: "Warning", colors: ["#ff3b00", "#0a0a0a", "#d8ff00"] },
        { id: "blueprint", name: "Blueprint", colors: ["#0038ff", "#f4f1e8", "#d8ff00"] },
        { id: "concrete", name: "Concrete", colors: ["#e8e5df", "#111111", "#ff6a00"] },
      ],
    },
    minimalism: {
      title: "Minimalism",
      file: "minimalism.html",
      palettes: [
        { id: "bone", name: "Bone", colors: ["#f4f1ea", "#16160f", "#9a6b3f"] },
        { id: "paper", name: "Paper", colors: ["#fafafa", "#101010", "#bbbbbb"] },
        { id: "slate", name: "Slate", colors: ["#e7e9e8", "#1b2422", "#3d6357"] },
        { id: "olive", name: "Olive", colors: ["#f0efe4", "#1e231b", "#5b6b3a"] },
      ],
    },
    maximalism: {
      title: "Maximalism",
      file: "maximalism.html",
      palettes: [
        { id: "sunset", name: "Sunset", colors: ["#1a0b2e", "#ff5e3a", "#ff2e93"] },
        { id: "acid", name: "Acid", colors: ["#0b0b0b", "#c6ff00", "#ff2e93"] },
        { id: "midnight", name: "Midnight", colors: ["#050a1f", "#7c5cff", "#24f2c4"] },
        { id: "carnival", name: "Carnival", colors: ["#ffe9c9", "#ff3d00", "#00a88f"] },
      ],
    },
    "liquid-glass": {
      title: "Liquid Glass",
      file: "liquid-glass.html",
      palettes: [
        { id: "midnight", name: "Midnight", colors: ["#060a16", "#7fd8ff", "#a78bfa"] },
        { id: "aurora", name: "Aurora", colors: ["#0b0714", "#b8ff6a", "#7c9cff"] },
        { id: "solar", name: "Solar", colors: ["#140b06", "#ffb35c", "#ff7a59"] },
        { id: "porcelain", name: "Porcelain", colors: ["#eef1f5", "#2f6bff", "#7c5cff"] },
      ],
    },
    "spatial-ui": {
      title: "Spatial UI",
      file: "spatial-ui.html",
      palettes: [
        { id: "lunar", name: "Lunar", colors: ["#0e1118", "#9ec5ff", "#d3b8ff"] },
        { id: "orbit", name: "Orbit", colors: ["#0b0a20", "#8f7bff", "#31d0ff"] },
        { id: "ember", name: "Ember", colors: ["#170f0c", "#ffb36b", "#ff7d6b"] },
        { id: "aurora", name: "Aurora", colors: ["#071613", "#6ff2c4", "#a7d8ff"] },
      ],
    },
    "bento-grid": {
      title: "Bento Grid",
      file: "bento-grid.html",
      palettes: [
        { id: "paper", name: "Paper", colors: ["#f2f0eb", "#ff5c35", "#1f6f5c"] },
        { id: "midnight", name: "Midnight", colors: ["#08090b", "#d4ff4f", "#7c9cff"] },
        { id: "ocean", name: "Ocean", colors: ["#eef5f8", "#007c91", "#ff7a59"] },
        { id: "blush", name: "Blush", colors: ["#fbf0ee", "#e2503b", "#7a4fd1"] },
      ],
    },
  };

  const ORDER = [
    "skeuomorphism",
    "neumorphism",
    "glassmorphism",
    "claymorphism",
    "brutalism",
    "minimalism",
    "maximalism",
    "liquid-glass",
    "spatial-ui",
    "bento-grid",
  ];

  const style = STYLES[page];

  /* ------------------------------------------------------------------------
     Palette bar
     ---------------------------------------------------------------------- */

  const dots = (palette) => `
    <span class="nx-pal__dots" aria-hidden="true">
      ${palette.colors.map((c) => `<i style="--c:${c}"></i>`).join("")}
    </span>`;

  const chevron = `
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

  const arrow = `
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

  function initBar() {
    const bar = document.getElementById("nx-bar");
    if (!bar || !style) return;

    const saved = readSavedPalette();
    let activeId = style.palettes.some((p) => p.id === saved) ? saved : style.palettes[0].id;
    const activePalette = () => style.palettes.find((p) => p.id === activeId) || style.palettes[0];

    bar.innerHTML = `
      <a class="nx-bar__brand" href="index.html" aria-label="NYXO Style Lab — all styles">
        <span class="nx-bar__mark" aria-hidden="true">N</span>
        <span class="nx-bar__word">NYXO<em>STYLE LAB</em></span>
      </a>
      <span class="nx-bar__style">
        <span>Live demonstration</span>
        <strong>${style.title}</strong>
      </span>
      <div class="nx-bar__palettes-wrap" id="nx-palette-panel">
        <span class="nx-bar__label">Colour palette</span>
        <div class="nx-bar__palettes" role="group" aria-label="Choose a colour palette">
          ${style.palettes
            .map(
              (p) => `
            <button class="nx-pal" type="button" data-palette-id="${p.id}"
              aria-pressed="${p.id === activeId ? "true" : "false"}"
              aria-label="Apply ${p.name} palette">
              ${dots(p)}<span class="nx-pal__name">${p.name}</span>
            </button>`
            )
            .join("")}
        </div>
      </div>
      <button class="nx-bar__toggle" type="button" aria-expanded="false"
        aria-controls="nx-palette-panel" aria-label="Choose colour palette">
        <span class="nx-bar__toggle-dots">${dots(activePalette())}</span>
        <span class="nx-bar__toggle-name">${activePalette().name}</span>
        ${chevron}
      </button>
      <a class="nx-bar__all" href="index.html">All 10 styles ${arrow}</a>
      <span class="nx-sr-only" id="nx-live" role="status" aria-live="polite"></span>
    `;

    const toggle = bar.querySelector(".nx-bar__toggle");
    const live = bar.querySelector("#nx-live");
    const mobileQuery = window.matchMedia("(max-width: 899px)");

    const setOpen = (open) => {
      bar.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };

    function applyPalette(id, { persist = true, announce = true } = {}) {
      const palette = style.palettes.find((p) => p.id === id);
      if (!palette) return;
      activeId = id;
      root.dataset.palette = id;

      bar.querySelectorAll(".nx-pal").forEach((btn) => {
        btn.setAttribute("aria-pressed", String(btn.dataset.paletteId === id));
      });

      toggle.querySelector(".nx-bar__toggle-dots").innerHTML = dots(palette);
      toggle.querySelector(".nx-bar__toggle-name").textContent = palette.name;

      if (persist) writeSavedPalette(id);
      if (announce) live.textContent = `${palette.name} palette applied`;

      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) {
        const chrome = getComputedStyle(root).getPropertyValue("--bar-bg").trim();
        meta.setAttribute("content", chrome || palette.colors[0]);
      }

      document.dispatchEvent(
        new CustomEvent("nx:palettechange", { detail: { page, palette: id } })
      );
    }

    bar.querySelectorAll(".nx-pal").forEach((btn) => {
      btn.addEventListener("click", () => {
        applyPalette(btn.dataset.paletteId);
        if (mobileQuery.matches) {
          setOpen(false);
          toggle.focus();
        }
      });
    });

    toggle.addEventListener("click", () => {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    document.addEventListener("click", (event) => {
      if (bar.classList.contains("is-open") && !bar.contains(event.target)) setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && bar.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    mobileQuery.addEventListener("change", () => setOpen(false));

    applyPalette(activeId, { persist: false, announce: false });
  }

  function readSavedPalette() {
    try {
      return localStorage.getItem(`nyxo.palette.${page}`);
    } catch (error) {
      return null;
    }
  }

  function writeSavedPalette(id) {
    try {
      localStorage.setItem(`nyxo.palette.${page}`, id);
    } catch (error) {
      /* storage can be unavailable in private mode */
    }
  }

  /* ------------------------------------------------------------------------
     Lab footer
     ---------------------------------------------------------------------- */

  function initLabFooter() {
    if (!style) return;
    const index = ORDER.indexOf(page);
    const prev = STYLES[ORDER[(index + ORDER.length - 1) % ORDER.length]];
    const next = STYLES[ORDER[(index + 1) % ORDER.length]];

    const footer = document.createElement("footer");
    footer.className = "nx-lab";
    footer.innerHTML = `
      <div class="nx-lab__inner">
        <div class="nx-lab__brand">
          <span class="nx-lab__mark" aria-hidden="true">N</span>
          <p class="nx-lab__txt">
            <b>NYXO — Web &amp; App Developer</b>
            Style Lab demonstration · Palette &amp; layout only
          </p>
        </div>
        <nav class="nx-lab__nav" aria-label="Style demonstrations">
          <span class="nx-lab__count">${String(index + 1).padStart(2, "0")} / ${ORDER.length}</span>
          <a class="nx-lab__link" href="${prev.file}" aria-label="Previous style: ${prev.title}">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13 8H4M7.5 3.5 3 8l4.5 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Prev
          </a>
          <a class="nx-lab__link" href="index.html">All styles</a>
          <a class="nx-lab__link" href="${next.file}" aria-label="Next style: ${next.title}">
            Next
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </nav>
      </div>`;
    document.body.appendChild(footer);
  }

  /* ------------------------------------------------------------------------
     Reveal on scroll
     ---------------------------------------------------------------------- */

  function initReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    items.forEach((item) => observer.observe(item));
  }

  /* ------------------------------------------------------------------------
     Count-up numbers
     ---------------------------------------------------------------------- */

  function initCounters() {
    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    const format = (value, decimals) =>
      value.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });

    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      if (Number.isNaN(target)) return;
      const decimals = el.dataset.decimals
        ? parseInt(el.dataset.decimals, 10)
        : Number.isInteger(target)
          ? 0
          : 1;
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";

      if (reduceMotion.matches) {
        el.textContent = `${prefix}${format(target, decimals)}${suffix}`;
        return;
      }

      const duration = 1400;
      const started = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - started) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = `${prefix}${format(target * eased, decimals)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = `${prefix}${format(target, decimals)}${suffix}`;
      };
      requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
      counters.forEach(run);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          run(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.45 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------------
     Menu helpers for the individual site headers
     ---------------------------------------------------------------------- */

  function initMenus() {
    document.querySelectorAll("[data-menu-toggle]").forEach((button) => {
      const target = document.getElementById(button.getAttribute("aria-controls"));
      if (!target) return;

      const setMenu = (open) => {
        button.setAttribute("aria-expanded", String(open));
        target.classList.toggle("is-open", open);
        document.body.classList.toggle("nx-menu-open", open);
      };

      button.addEventListener("click", () => {
        const open = button.getAttribute("aria-expanded") !== "true";
        setMenu(open);
        if (open) {
          const first = target.querySelector("[data-menu-close], a, button");
          if (first) first.focus({ preventScroll: true });
        }
      });

      target.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenu(false));
      });

      target.querySelectorAll("[data-menu-close]").forEach((close) => {
        close.addEventListener("click", () => {
          setMenu(false);
          button.focus();
        });
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
          setMenu(false);
          button.focus();
        }
      });

      window.matchMedia("(min-width: 900px)").addEventListener("change", (event) => {
        if (event.matches) setMenu(false);
      });
    });
  }

  /* ------------------------------------------------------------------------
     Pointer-driven details
     ---------------------------------------------------------------------- */

  function initPointerMotion() {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduceMotion.matches) return;

    let frame = null;
    let mx = 0;
    let my = 0;

    window.addEventListener(
      "pointermove",
      (event) => {
        mx = (event.clientX / window.innerWidth - 0.5) * 2;
        my = (event.clientY / window.innerHeight - 0.5) * 2;
        if (frame) return;
        frame = requestAnimationFrame(() => {
          root.style.setProperty("--nx-mx", mx.toFixed(3));
          root.style.setProperty("--nx-my", my.toFixed(3));
          frame = null;
        });
      },
      { passive: true }
    );

    document.querySelectorAll("[data-tilt]").forEach((el) => {
      const max = parseFloat(el.dataset.tilt) || 6;
      el.addEventListener(
        "pointermove",
        (event) => {
          const rect = el.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width;
          const py = (event.clientY - rect.top) / rect.height;
          el.style.setProperty("--tilt-y", `${((px - 0.5) * 2 * max).toFixed(2)}deg`);
          el.style.setProperty("--tilt-x", `${((0.5 - py) * 2 * max).toFixed(2)}deg`);
          el.style.setProperty("--glare-x", `${(px * 100).toFixed(1)}%`);
          el.style.setProperty("--glare-y", `${(py * 100).toFixed(1)}%`);
          el.classList.add("is-tilting");
        },
        { passive: true }
      );
      el.addEventListener("pointerleave", () => {
        el.style.setProperty("--tilt-x", "0deg");
        el.style.setProperty("--tilt-y", "0deg");
        el.classList.remove("is-tilting");
      });
    });

    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      const range = parseFloat(el.dataset.magnetic) || 6;
      el.addEventListener(
        "pointermove",
        (event) => {
          const rect = el.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2 * range;
          const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2 * range;
          el.style.setProperty("--mag-x", `${x.toFixed(1)}px`);
          el.style.setProperty("--mag-y", `${y.toFixed(1)}px`);
        },
        { passive: true }
      );
      el.addEventListener("pointerleave", () => {
        el.style.setProperty("--mag-x", "0px");
        el.style.setProperty("--mag-y", "0px");
      });
    });
  }

  /* ------------------------------------------------------------------------
     Small live details
     ---------------------------------------------------------------------- */

  function initClock() {
    document.querySelectorAll("[data-clock]").forEach((el) => {
      const zone = el.dataset.clock || "Asia/Kolkata";
      let formatter;
      try {
        formatter = new Intl.DateTimeFormat("en-IN", {
          timeZone: zone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
      } catch (error) {
        formatter = new Intl.DateTimeFormat("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
      }
      const tick = () => {
        el.textContent = formatter.format(new Date());
      };
      tick();
      window.setInterval(tick, 30000);
    });
  }

  function initYear() {
    document.querySelectorAll("[data-year]").forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* ------------------------------------------------------------------------
     Boot
     ---------------------------------------------------------------------- */

  initBar();
  initLabFooter();
  initReveal();
  initCounters();
  initMenus();
  initPointerMotion();
  initClock();
  initYear();
})();
