/* =============================================================================
   card.js — renders the business card from a config object and builds the vCard.
   Used by index.html (live card) and setup.html (wizard preview).
   No dependencies. All personal data lives in config.js — you never edit this.
   ========================================================================== */
(function (global) {
  "use strict";

  // --- SVG icons. Stroke icons inherit --accent-2; add class "solid" for fills.
  var ICONS = {
    person: '<svg viewBox="0 0 24 24" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>',
    phone: '<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
    globe: '<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    tool: '<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    location: '<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" class="solid"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 9.67H5.67V18.3h2.67V9.67zM7 6.5a1.54 1.54 0 1 0 0 3.08 1.54 1.54 0 0 0 0-3.08zm11.33 6.63c0-2.32-1.24-3.4-2.9-3.4a2.5 2.5 0 0 0-2.27 1.25h-.04V9.67h-2.56V18.3h2.67v-4.27c0-1.13.21-2.22 1.6-2.22 1.37 0 1.39 1.28 1.39 2.3v4.19h2.67v-4.87z"/></svg>',
    github: '<svg viewBox="0 0 24 24" class="solid"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z" class="solid" style="fill:var(--accent-2);stroke:none"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" class="solid"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>',
    x: '<svg viewBox="0 0 24 24" class="solid"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.22-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64z"/></svg>'
  };

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/\\/g, "\\\\").replace(/;/g, "\\;")
      .replace(/,/g, "\\,").replace(/\n/g, "\\n");
  }
  function escHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function stripProto(u) { return String(u || "").replace(/^https?:\/\//, "").replace(/\/$/, ""); }
  function initialsFrom(name) {
    var p = String(name || "").trim().split(/\s+/);
    return ((p[0] || "")[0] || "") + ((p.length > 1 ? p[p.length - 1] : "")[0] || "");
  }

  // --- Build a vCard 3.0 string (CRLF line endings) from the config ----------
  function buildVCard(cfg) {
    cfg = cfg || {};
    var parts = String(cfg.name || "").trim().split(/\s+/);
    var last = parts.length > 1 ? parts[parts.length - 1] : "";
    var first = parts.length > 1 ? parts.slice(0, -1).join(" ") : (parts[0] || "");
    var L = ["BEGIN:VCARD", "VERSION:3.0"];
    L.push("N:" + esc(last) + ";" + esc(first) + ";;;");
    L.push("FN:" + esc(cfg.name || ""));
    if (cfg.org) L.push("ORG:" + esc(cfg.org));
    if (cfg.title) L.push("TITLE:" + esc(cfg.title));
    (cfg.phones || []).forEach(function (p) {
      var type = /cell|mobile/i.test(p.label || "") ? "CELL" : "WORK";
      var pref = p.primary ? ",PREF" : "";
      var dial = String(p.dial || p.value || "").replace(/[^\d+,;]/g, "");
      if (dial) L.push("TEL;TYPE=" + type + ",VOICE" + pref + ":" + dial);
    });
    (cfg.emails || []).forEach(function (e) {
      if (e.value) L.push("EMAIL;TYPE=INTERNET:" + esc(e.value));
    });
    (cfg.links || []).forEach(function (lnk, i) {
      if (!lnk.url) return;
      var n = i + 1;
      L.push("item" + n + ".URL:" + lnk.url);
      L.push("item" + n + ".X-ABLabel:" + esc(lnk.label || "Link"));
    });
    if (cfg.url) L.push("URL:" + cfg.url);
    L.push("REV:" + new Date().toISOString().replace(/\.\d+Z$/, "Z"));
    L.push("END:VCARD");
    return L.join("\r\n") + "\r\n";
  }

  function downloadVCard(cfg) {
    var vcf = buildVCard(cfg);
    var filename = (String(cfg.name || "contact").trim().replace(/\s+/g, "-")) + ".vcf";
    try {
      var blob = new Blob([vcf], { type: "text/vcard;charset=utf-8" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url; a.download = filename;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
    } catch (e) {
      window.location.href = "data:text/vcard;charset=utf-8," + encodeURIComponent(vcf);
    }
  }

  function row(iconKey, href, label, value, external) {
    var icon = ICONS[iconKey] || ICONS.globe;
    var attrs = external ? ' target="_blank" rel="noopener noreferrer"' : "";
    return '<a class="row" href="' + escHtml(href) + '"' + attrs + '>' +
      '<span class="ico" aria-hidden="true">' + icon + "</span>" +
      '<span class="meta"><span class="k">' + escHtml(label) + "</span><br>" +
      '<span class="v">' + escHtml(value) + "</span></span></a>";
  }

  // --- Render the whole card into a mount element -----------------------------
  function renderCard(cfg, mount) {
    cfg = cfg || {};
    var theme = cfg.theme || {};
    var rootStyle = document.documentElement.style;
    if (theme.accent) rootStyle.setProperty("--accent", theme.accent);
    if (theme.accent2) rootStyle.setProperty("--accent-2", theme.accent2);
    if (theme.onAccent) rootStyle.setProperty("--on-accent", theme.onAccent);

    var initials = cfg.initials || initialsFrom(cfg.name);
    var rows = "";
    (cfg.phones || []).forEach(function (p) {
      var dial = String(p.dial || p.value || "").replace(/[^\d+,;]/g, "");
      rows += row("phone", "tel:" + dial, p.label || "Phone", p.value || dial, false);
    });
    (cfg.emails || []).forEach(function (e) {
      rows += row("mail", "mailto:" + e.value, e.label || "Email", e.value, false);
    });
    (cfg.links || []).forEach(function (lnk) {
      rows += row(lnk.icon || "globe", lnk.url, lnk.label || "Link", lnk.value || stripProto(lnk.url), true);
    });

    var saveLabel = cfg.saveLabel || "Save to Contacts";
    mount.className = "card";
    mount.innerHTML =
      '<div class="avatar" aria-hidden="true">' + escHtml(initials) + "</div>" +
      "<h1>" + escHtml(cfg.name || "") + "</h1>" +
      (cfg.title ? '<p class="title">' + escHtml(cfg.title) + "</p>" : "") +
      (cfg.org ? '<p class="org">' + escHtml(cfg.org) + "</p>" : "") +
      '<div class="divider"></div>' +
      '<a class="save" href="#" role="button"><span class="ico-inline" aria-hidden="true">' + ICONS.person + "</span>" + escHtml(saveLabel) + "</a>" +
      '<div class="actions">' + rows + "</div>" +
      '<p class="hint">Tap <strong>' + escHtml(saveLabel) + "</strong> to add me to your phone.</p>" +
      (cfg.footer ? '<p class="footer">' + escHtml(cfg.footer) + "</p>" : "");

    // size the inline save icon
    var inline = mount.querySelector(".ico-inline svg");
    if (inline) { inline.setAttribute("width", "20"); inline.setAttribute("height", "20"); inline.style.stroke = "var(--on-accent)"; }

    var saveBtn = mount.querySelector(".save");
    if (saveBtn) saveBtn.addEventListener("click", function (ev) { ev.preventDefault(); downloadVCard(cfg); });
  }

  // --- Head/SEO: title, description, Open Graph, canonical, JSON-LD -----------
  function applyMeta(cfg) {
    cfg = cfg || {};
    var descParts = [cfg.title, cfg.org].filter(Boolean).join(" at ");
    var title = [cfg.name, descParts].filter(Boolean).join(" — ");
    var desc = "Save " + (cfg.name || "my") + " contact — " + (descParts || "digital business card") + ".";
    if (title) document.title = title;

    function meta(sel, attr, key, val) {
      var el = document.head.querySelector(sel);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute("content", val);
    }
    meta('meta[name="description"]', "name", "description", desc);
    meta('meta[property="og:title"]', "property", "og:title", title);
    meta('meta[property="og:description"]', "property", "og:description", "Tap to save my contact.");
    meta('meta[property="og:type"]', "property", "og:type", "profile");
    if (cfg.url) meta('meta[property="og:url"]', "property", "og:url", cfg.url);

    if (cfg.url) {
      var canon = document.head.querySelector('link[rel="canonical"]');
      if (!canon) { canon = document.createElement("link"); canon.setAttribute("rel", "canonical"); document.head.appendChild(canon); }
      canon.setAttribute("href", cfg.url);
    }

    // JSON-LD Person for search engines / brand
    var ld = {
      "@context": "https://schema.org", "@type": "Person",
      name: cfg.name || undefined, jobTitle: cfg.title || undefined,
      worksFor: cfg.org ? { "@type": "Organization", name: cfg.org } : undefined,
      url: cfg.url || undefined,
      email: (cfg.emails && cfg.emails[0]) ? cfg.emails[0].value : undefined,
      telephone: (cfg.phones && cfg.phones[0]) ? (cfg.phones[0].dial || cfg.phones[0].value) : undefined,
      sameAs: (cfg.links || []).map(function (l) { return l.url; }).filter(Boolean)
    };
    var s = document.getElementById("ld-person") || document.createElement("script");
    s.id = "ld-person"; s.type = "application/ld+json";
    s.textContent = JSON.stringify(ld, function (k, v) { return v === undefined ? undefined : v; });
    if (!s.parentNode) document.head.appendChild(s);
  }

  global.Card = {
    ICONS: ICONS, buildVCard: buildVCard, downloadVCard: downloadVCard,
    renderCard: renderCard, applyMeta: applyMeta, stripProto: stripProto, initialsFrom: initialsFrom
  };
})(window);
