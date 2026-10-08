// Small enhancements for the static site: tabs, pop-ups and a lightbox.
// Nothing here is required to read the pages; without JS everything is visible and in order.
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- Assets dropdown in the top menu: opens on click (and on hover via CSS), closes on Escape or outside click
  document.querySelectorAll(".nav-drop").forEach(function (drop) {
    var btn = drop.querySelector(".nav-drop-btn");
    function set(open) { drop.classList.toggle("open", open); btn.setAttribute("aria-expanded", open ? "true" : "false"); }
    btn.addEventListener("click", function (e) { e.stopPropagation(); set(!drop.classList.contains("open")); });
    document.addEventListener("click", function (e) { if (!drop.contains(e.target)) set(false); });
    drop.addEventListener("keydown", function (e) { if (e.key === "Escape") { set(false); btn.focus(); } });
  });

  // ---- Tabs: [role=tablist] > [role=tab][aria-controls], panels toggled with `hidden`
  document.querySelectorAll(".ui-tabs").forEach(function (root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll(":scope > .ui-tablist > [role=tab]"));
    if (!tabs.length) return;
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(t); });
      t.addEventListener("keydown", function (e) {
        var j = e.key === "ArrowRight" || e.key === "ArrowDown" ? i + 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? i - 1 : -1;
        if (j < 0) return;
        e.preventDefault();
        select(tabs[(j + tabs.length) % tabs.length], true);
      });
    });
    var initial = tabs.filter(function (t) { return t.getAttribute("aria-selected") === "true"; })[0] || tabs[0];
    select(initial);
  });

  // ---- One shared dialog for stage findings; any element with data-pop-title opens it
  var pop = null;
  function ensurePop() {
    if (pop) return pop;
    pop = document.createElement("dialog");
    pop.className = "pop";
    pop.innerHTML = '<button class="pop-close" type="button" aria-label="Close">✕</button><div class="pop-body"></div>';
    document.body.appendChild(pop);
    pop.querySelector(".pop-close").addEventListener("click", function () { pop.close(); });
    pop.addEventListener("click", function (e) { if (e.target === pop) pop.close(); });
    return pop;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  document.querySelectorAll("[data-pop-title]").forEach(function (el) {
    if (el.tagName !== "BUTTON") el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); el.click(); }
    });
    el.addEventListener("click", function () {
      var d = ensurePop();
      var paras = (el.getAttribute("data-pop-body") || "").split("|").filter(Boolean).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
      var state = el.getAttribute("data-pop-state");
      d.querySelector(".pop-body").innerHTML =
        '<span class="label">' + esc(el.getAttribute("data-pop-kicker") || "") + "</span>" +
        "<h3>" + esc(el.getAttribute("data-pop-title")) + (state ? ' <span class="app-chip ' + esc(state === "skipped" ? "done" : "accent") + '">' + esc(state) + "</span>" : "") + "</h3>" +
        paras +
        (el.getAttribute("data-pop-src") ? '<div class="pop-src">' + esc(el.getAttribute("data-pop-src")) + "</div>" : "");
      d.showModal();
    });
  });

  // ---- Lightbox: every framed screenshot opens at full size
  var box = null;
  function ensureBox() {
    if (box) return box;
    box = document.createElement("dialog");
    box.className = "pop lightbox";
    box.innerHTML = '<button class="pop-close" type="button" aria-label="Close">✕</button><figure style="margin:0"><img alt=""><figcaption></figcaption></figure>';
    document.body.appendChild(box);
    box.querySelector(".pop-close").addEventListener("click", function () { box.close(); });
    box.addEventListener("click", function (e) { if (e.target === box) box.close(); });
    return box;
  }
  document.querySelectorAll(".frame img").forEach(function (img) {
    img.setAttribute("tabindex", "0");
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", "Open full size: " + (img.alt || "screenshot"));
    function open() {
      var b = ensureBox();
      var cap = img.closest("figure") && img.closest("figure").querySelector("figcaption");
      b.querySelector("img").src = img.currentSrc || img.src;
      b.querySelector("img").alt = img.alt;
      b.querySelector("figcaption").textContent = cap ? cap.textContent : img.alt;
      b.showModal();
    }
    img.addEventListener("click", open);
    img.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  });
})();
