/* Refraim AB – Google Analytics 4 med samtycke (Consent Mode v2).
   GA laddas först när besökaren klickar "Acceptera" i bannern.
   Valet sparas i localStorage ("refraim-consent": "granted" | "denied"). */
(function () {
  "use strict";

  var GA_ID = "G-JQCBX0WBBV"; /* Mätnings-ID från Google Analytics */
  var KEY = "refraim-consent";

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  /* Standard: allt nekat tills besökaren valt */
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    wait_for_update: 500
  });

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function save(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  var loaded = false;
  function loadGA() {
    if (loaded || GA_ID.indexOf("G-") !== 0 || GA_ID.indexOf("X") > -1) return;
    loaded = true;
    gtag("consent", "update", { analytics_storage: "granted" });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    gtag("js", new Date());
    gtag("config", GA_ID, { anonymize_ip: true });
  }

  function banner() {
    var wrap = document.createElement("div");
    wrap.id = "cookie-banner";
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-label", "Cookies");
    wrap.style.cssText =
      "position:fixed;left:16px;right:16px;bottom:16px;z-index:1000;max-width:560px;margin:0 auto;" +
      "background:#16191D;color:#FBFBF9;border-radius:14px;padding:20px 22px;" +
      "box-shadow:0 12px 40px rgba(0,0,0,.25);font-family:'Schibsted Grotesk',system-ui,sans-serif;" +
      "display:flex;flex-wrap:wrap;gap:14px 20px;align-items:center";
    wrap.innerHTML =
      '<p style="margin:0;flex:1 1 280px;font-size:15px;line-height:1.5;color:#D8D8D2">' +
      "Vi använder Google Analytics för att se hur sajten används. Inga cookies sätts förrän du accepterar. " +
      '<a href="/integritet" style="color:#FBFBF9">Läs mer</a></p>' +
      '<div style="display:flex;gap:10px;flex:0 0 auto">' +
      '<button type="button" data-consent="denied" style="background:transparent;color:#FBFBF9;border:1px solid #464E57;border-radius:8px;padding:10px 16px;font:inherit;font-weight:600;font-size:15px;cursor:pointer">Avböj</button>' +
      '<button type="button" data-consent="granted" style="background:#D08A2E;color:#16191D;border:0;border-radius:8px;padding:10px 16px;font:inherit;font-weight:600;font-size:15px;cursor:pointer">Acceptera</button>' +
      "</div>";
    wrap.addEventListener("click", function (ev) {
      var b = ev.target.closest("[data-consent]");
      if (!b) return;
      var v = b.getAttribute("data-consent");
      save(v);
      wrap.remove();
      if (v === "granted") loadGA();
    });
    document.body.appendChild(wrap);
  }

  /* Gör det möjligt att ändra sitt val via en länk med data-cookie-settings */
  document.addEventListener("click", function (ev) {
    var a = ev.target.closest("[data-cookie-settings]");
    if (!a) return;
    ev.preventDefault();
    try { localStorage.removeItem(KEY); } catch (e) {}
    if (!document.getElementById("cookie-banner")) banner();
  });

  function init() {
    var c = read();
    if (c === "granted") loadGA();
    else if (c !== "denied") banner();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
