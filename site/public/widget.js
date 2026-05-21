/*
 * getinput widget — framework-agnostic version
 * Drop in any HTML page:
 *   <script src="https://getinput.io/widget.js"></script>
 *
 * Optional config via data-* on the <script> tag:
 *   data-endpoint="/api/input"   — POST edits here instead of localStorage
 *   data-hosts="localhost,foo"   — comma-separated hosts where the widget shows (default: localhost,127.0.0.1, or any when ?getinput is present)
 *   data-storage-key="getinput"  — localStorage key (default: getinput-edits)
 */
(function () {
  "use strict";

  if (window.__getinputMounted) return;
  window.__getinputMounted = true;

  // ---------- config ----------
  var script = document.currentScript || (function () {
    var scripts = document.getElementsByTagName("script");
    for (var i = scripts.length - 1; i >= 0; i--) {
      if ((scripts[i].src || "").indexOf("widget.js") >= 0) return scripts[i];
    }
    return null;
  })();
  var cfg = {
    endpoint: (script && script.getAttribute("data-endpoint")) || "",
    hosts: ((script && script.getAttribute("data-hosts")) || "localhost,127.0.0.1").split(",").map(function (h) { return h.trim(); }),
    storageKey: (script && script.getAttribute("data-storage-key")) || "getinput-edits",
  };

  var params = new URLSearchParams(window.location.search);
  var shareMode = params.has("getinput");
  var host = window.location.hostname;
  var visible = shareMode || cfg.hosts.some(function (h) { return host.indexOf(h) !== -1; });
  if (!visible) return;

  // ---------- styles ----------
  var css = `
    .gi-root, .gi-root *, .gi-root *::before, .gi-root *::after { box-sizing: border-box; }
    .gi-root {
      position: fixed; bottom: 16px; right: 16px; z-index: 2147483647;
      font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      font-size: 14px; line-height: 1.4; color: #111827;
    }
    .gi-bar { display: flex; gap: 8px; align-items: center; }
    .gi-btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 8px 14px; border-radius: 9999px; border: 0; cursor: pointer;
      font: inherit; font-weight: 500; color: #fff;
      box-shadow: 0 6px 18px rgba(0,0,0,0.12); transition: filter 120ms;
    }
    .gi-btn:hover { filter: brightness(1.08); }
    .gi-btn-edit { background: #b45309; }
    .gi-btn-comment { background: #2563eb; }
    .gi-btn-secondary { background: #1f2937; }
    .gi-count {
      width: 32px; height: 32px; border-radius: 9999px;
      background: #f3f4f6; color: #4b5563; border: 1px solid #e5e7eb;
      display: flex; align-items: center; justify-content: center;
      font-size: 12px; font-weight: 500; cursor: pointer;
    }
    .gi-card {
      background: #fff; border: 1px solid #e5e7eb; border-radius: 12px;
      padding: 14px; box-shadow: 0 12px 32px rgba(0,0,0,0.14);
      max-width: 320px;
    }
    .gi-card h3 { margin: 0 0 10px; font-size: 14px; font-weight: 600; }
    .gi-card p { margin: 0 0 6px; color: #374151; }
    .gi-textarea {
      width: 100%; min-height: 56px; padding: 8px; border-radius: 6px;
      border: 1px solid #e5e7eb; background: #f9fafb; font: inherit; resize: vertical;
    }
    .gi-row { display: flex; gap: 8px; justify-content: flex-end; margin-top: 10px; }
    .gi-link { background: none; border: 0; color: #6b7280; font: inherit; cursor: pointer; padding: 6px 10px; }
    .gi-link:hover { color: #111827; }
    .gi-primary {
      background: #2563eb; color: #fff; border: 0; border-radius: 6px;
      padding: 6px 12px; font: inherit; font-weight: 500; cursor: pointer;
    }
    .gi-primary:disabled { opacity: 0.5; cursor: not-allowed; }
    .gi-list { max-height: 220px; overflow-y: auto; margin: 0 -4px 10px; padding: 0 4px; }
    .gi-item {
      background: #f9fafb; border: 1px solid #f3f4f6; border-radius: 8px;
      padding: 8px; margin-bottom: 6px; font-size: 12px;
    }
    .gi-item .gi-label { font-weight: 600; }
    .gi-item .gi-strike { color: #9ca3af; text-decoration: line-through; }
    .gi-toast {
      position: absolute; bottom: 56px; right: 0; background: #059669; color: #fff;
      padding: 6px 12px; border-radius: 8px; font-size: 13px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .gi-onboard {
      position: absolute; bottom: 56px; right: 0; width: 260px; background: #fff;
      border: 1px solid #e5e7eb; border-radius: 10px; padding: 12px;
      box-shadow: 0 12px 32px rgba(0,0,0,0.14);
    }
    .gi-onboard p { margin: 0 0 6px; }
    .gi-target-edit { outline: 2px solid #b45309 !important; outline-offset: 2px; cursor: text; }
    .gi-target-comment { outline: 2px solid #2563eb !important; outline-offset: 2px; cursor: crosshair; }
    .gi-cursor-edit { cursor: text !important; }
    .gi-cursor-comment { cursor: crosshair !important; }
    .gi-footer { text-align: center; margin-top: 8px; font-size: 11px; color: #9ca3af; }
    .gi-footer a { color: inherit; text-decoration: none; }
  `;
  var styleEl = document.createElement("style");
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ---------- state ----------
  var mode = "idle"; // idle | editing | commenting | viewing
  var edits = loadEdits();
  var activeEl = null;
  var originalText = "";
  var onboardingDismissed = !!localStorage.getItem("getinput-onboarded");

  // ---------- DOM ----------
  var root = document.createElement("div");
  root.className = "gi-root";
  document.body.appendChild(root);

  function render() {
    root.innerHTML = "";

    if (mode === "idle" && !activeEl) {
      var bar = el("div", "gi-bar");
      bar.appendChild(button("Edit", "gi-btn gi-btn-edit", function () { setMode("editing"); }, "Click any text to edit it"));
      bar.appendChild(button("Comment", "gi-btn gi-btn-comment", function () { setMode("commenting"); }, "Click any element to comment"));
      if (edits.length > 0) {
        var count = el("button", "gi-count");
        count.textContent = String(edits.length);
        count.title = "View " + edits.length + " edit" + (edits.length === 1 ? "" : "s");
        count.onclick = function () { setMode("viewing"); };
        bar.appendChild(count);
      }
      root.appendChild(bar);

      if (!onboardingDismissed && edits.length === 0) {
        var card = el("div", "gi-onboard");
        card.innerHTML = "<p><strong>Edit text directly on this page.</strong></p>" +
          "<p style=\"color:#6b7280\">Click <strong>Edit</strong>, then click a heading or paragraph to change it. Your edits save locally.</p>";
        var dismiss = el("button", "gi-link");
        dismiss.textContent = "Got it";
        dismiss.style.padding = "0";
        dismiss.style.marginTop = "6px";
        dismiss.onclick = function () { onboardingDismissed = true; localStorage.setItem("getinput-onboarded", "1"); render(); };
        card.appendChild(dismiss);
        root.appendChild(card);
      }
    } else if ((mode === "editing" || mode === "commenting") && !activeEl) {
      var hint = el("div", "gi-card");
      var msg = el("p");
      msg.textContent = mode === "editing" ? "Click any text to edit it" : "Click any element to comment on it";
      hint.appendChild(msg);
      var cancel = el("button", "gi-link");
      cancel.textContent = "Cancel";
      cancel.onclick = function () { setMode("idle"); };
      hint.appendChild(cancel);
      root.appendChild(hint);
    } else if (mode === "commenting" && activeEl) {
      var box = el("div", "gi-card");
      var label = el("p");
      label.style.fontSize = "11px";
      label.style.color = "#9ca3af";
      label.textContent = truncate(activeEl.textContent || selectorOf(activeEl), 50);
      var ta = el("textarea", "gi-textarea");
      ta.placeholder = "What should change?";
      var row = el("div", "gi-row");
      var c = el("button", "gi-link"); c.textContent = "Cancel";
      c.onclick = cancelComment;
      var s = el("button", "gi-primary"); s.textContent = "Save";
      s.onclick = function () { submitComment(ta.value); };
      ta.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submitComment(ta.value); }
        if (e.key === "Escape") cancelComment();
      });
      row.appendChild(c); row.appendChild(s);
      box.appendChild(label); box.appendChild(ta); box.appendChild(row);
      root.appendChild(box);
      setTimeout(function () { ta.focus(); }, 30);
    } else if (mode === "viewing") {
      var view = el("div", "gi-card");
      var header = el("h3");
      header.textContent = "Feedback (" + edits.length + ")";
      view.appendChild(header);
      if (edits.length === 0) {
        var empty = el("p");
        empty.style.color = "#9ca3af";
        empty.textContent = "No edits yet.";
        view.appendChild(empty);
      } else {
        var list = el("div", "gi-list");
        edits.forEach(function (item) {
          var i = el("div", "gi-item");
          if (item.type === "text-edit") {
            i.innerHTML = "<div class=\"gi-label\" style=\"color:#b45309\">Edit</div>" +
              "<div class=\"gi-strike\">" + esc(truncate(item.original, 60)) + "</div>" +
              "<div>" + esc(truncate(item.edited, 60)) + "</div>";
          } else {
            i.innerHTML = "<div class=\"gi-label\" style=\"color:#2563eb\">Comment</div>" +
              "<div>" + esc(item.comment) + "</div>" +
              "<div style=\"color:#9ca3af;font-size:11px;margin-top:4px\">on: " + esc(truncate(item.elementText || "", 40)) + "</div>";
          }
          list.appendChild(i);
        });
        view.appendChild(list);
      }
      var actions = el("div", "gi-row");
      actions.style.justifyContent = "space-between";
      var close = el("button", "gi-link"); close.textContent = "Close";
      close.onclick = function () { setMode("idle"); };
      var copyBtn = el("button", "gi-primary"); copyBtn.textContent = "Copy JSON";
      copyBtn.disabled = edits.length === 0;
      copyBtn.onclick = function () { copyJSON(); };
      actions.appendChild(close); actions.appendChild(copyBtn);
      view.appendChild(actions);
      root.appendChild(view);
    }

    if (shareMode) {
      var footer = el("div", "gi-footer");
      footer.innerHTML = '<a href="https://getinput.io" target="_blank" rel="noopener">Powered by getinput</a>';
      root.appendChild(footer);
    }
  }

  function setMode(next) {
    mode = next;
    document.body.classList.remove("gi-cursor-edit", "gi-cursor-comment");
    if (next === "editing") document.body.classList.add("gi-cursor-edit");
    if (next === "commenting") document.body.classList.add("gi-cursor-comment");
    render();
  }

  // ---------- interaction ----------
  document.addEventListener("click", function (e) {
    if (mode === "idle" || mode === "viewing") return;
    var target = e.target;
    if (!(target instanceof Element)) return;
    if (root.contains(target)) return;
    e.preventDefault();
    e.stopPropagation();

    if (mode === "editing" && isTextEl(target)) {
      activeEl = target;
      originalText = target.textContent || "";
      target.setAttribute("contenteditable", "true");
      target.classList.add("gi-target-edit");
      target.focus();
      var onBlur = function () {
        target.removeAttribute("contenteditable");
        target.classList.remove("gi-target-edit");
        target.removeEventListener("blur", onBlur);
        var newText = target.textContent || "";
        if (newText !== originalText) {
          saveEdit({
            type: "text-edit",
            selector: selectorOf(target),
            path: window.location.pathname,
            original: originalText,
            edited: newText,
            timestamp: new Date().toISOString(),
          });
        }
        activeEl = null;
        setMode("idle");
      };
      target.addEventListener("blur", onBlur);
    } else if (mode === "commenting") {
      activeEl = target;
      target.classList.add("gi-target-comment");
      render();
    }
  }, true);

  function submitComment(text) {
    if (!activeEl || !text || !text.trim()) return;
    saveEdit({
      type: "comment",
      selector: selectorOf(activeEl),
      path: window.location.pathname,
      elementText: (activeEl.textContent || "").slice(0, 100),
      comment: text.trim(),
      timestamp: new Date().toISOString(),
    });
    activeEl.classList.remove("gi-target-comment");
    activeEl = null;
    setMode("idle");
  }

  function cancelComment() {
    if (activeEl) activeEl.classList.remove("gi-target-comment");
    activeEl = null;
    setMode("idle");
  }

  // ---------- storage ----------
  function loadEdits() {
    try { return JSON.parse(localStorage.getItem(cfg.storageKey) || "[]"); }
    catch (e) { return []; }
  }
  function persist() {
    try { localStorage.setItem(cfg.storageKey, JSON.stringify(edits)); } catch (e) {}
  }
  function saveEdit(item) {
    edits.push(item);
    persist();
    if (cfg.endpoint) {
      fetch(cfg.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      }).catch(function () {});
    }
    toast("Saved");
    render();
  }
  function copyJSON() {
    var json = JSON.stringify(edits, null, 2);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(json).then(function () { toast("Copied!"); });
    } else {
      var ta = document.createElement("textarea");
      ta.value = json;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); toast("Copied!"); } catch (e) {}
      document.body.removeChild(ta);
    }
  }

  // ---------- toast ----------
  var toastEl;
  var toastTimer;
  function toast(msg) {
    if (toastEl && toastEl.parentNode) toastEl.parentNode.removeChild(toastEl);
    toastEl = el("div", "gi-toast");
    toastEl.textContent = msg;
    root.appendChild(toastEl);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      if (toastEl && toastEl.parentNode) toastEl.parentNode.removeChild(toastEl);
    }, 1500);
  }

  // ---------- helpers ----------
  function el(tag, cls) { var e = document.createElement(tag); if (cls) e.className = cls; return e; }
  function button(text, cls, onclick, title) {
    var b = el("button", cls);
    b.textContent = text;
    if (title) b.title = title;
    b.onclick = onclick;
    return b;
  }
  function isTextEl(node) {
    var allowed = ["P","H1","H2","H3","H4","H5","H6","SPAN","A","LI","TD","TH","LABEL","BUTTON","STRONG","EM","SMALL","FIGCAPTION","BLOCKQUOTE","DT","DD"];
    if (allowed.indexOf(node.tagName) < 0) return false;
    var t = (node.textContent || "").trim();
    return t.length > 0 && t.length < 500 && node.querySelectorAll("*").length < 5;
  }
  function selectorOf(node) {
    var parts = [];
    var cur = node;
    while (cur && cur !== document.body) {
      var sel = cur.tagName.toLowerCase();
      if (cur.id) { sel = "#" + cur.id; parts.unshift(sel); break; }
      if (cur.className && typeof cur.className === "string") {
        var classes = cur.className.split(/\s+/).filter(function (c) { return c && c.indexOf("gi-") !== 0; }).slice(0, 2).join(".");
        if (classes) sel += "." + classes;
      }
      parts.unshift(sel);
      cur = cur.parentElement;
    }
    return parts.join(" > ");
  }
  function truncate(s, n) { return (s || "").length > n ? s.slice(0, n) + "…" : (s || ""); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  render();
})();
