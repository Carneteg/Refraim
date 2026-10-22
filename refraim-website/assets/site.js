/* Refraim AB – webbplatsens skript. Inga beroenden, inga cookies, ingen spårning. */
(function () {
  "use strict";

  var CONTACT_EMAIL = "tobias@refraim.se";

  /* ---------- Gissa-gapet på /ai-gapet ---------- */
  function initGap() {
    var lead = document.querySelector('[data-gap="lead"]');
    var emp = document.querySelector('[data-gap="emp"]');
    if (!lead || !emp) return;
    var q = function (k) { return document.querySelector('[data-gap="' + k + '"]'); };

    function textFor(gap) {
      if (gap >= 30) return "Ett stort gap. Om det stämmer fattas era AI-beslut i dag på en bild som inte finns.";
      if (gap >= 10) return "Ett märkbart gap. Vilken avdelning tror du drar ner snittet – och vet ledningen om det?";
      if (gap > 0) return "Litet gap – om gissningen stämmer. Men hur säker är du på den andra siffran?";
      return "Flytta reglagen. Vad tror du att ledningen skulle svara – och vad skulle medarbetarna beskriva?";
    }

    function update() {
      var l = Number(lead.value), e = Number(emp.value), gap = Math.abs(l - e);
      q("lead-out").textContent = l;
      q("emp-out").textContent = e;
      q("lead-bar").style.width = l + "%";
      q("emp-bar").style.width = e + "%";
      q("gap").textContent = gap;
      q("text").textContent = textFor(gap);
    }
    lead.addEventListener("input", update);
    emp.addEventListener("input", update);
    update();
  }

  /* ---------- Formulär ----------
     Formulären skickas som ett förifyllt mejl till CONTACT_EMAIL i besökarens
     e-postprogram. Inget sparas på webbplatsen. Se README för hur de kan kopplas
     till en formulärtjänst i stället. */
  function labelText(label, field) {
    var t = "";
    label.childNodes.forEach(function (n) { if (n.nodeType === 3) t += n.textContent; });
    return t.trim() || field.name || "Fält";
  }

  function initForms() {
    document.querySelectorAll("form[data-mail-subject]").forEach(function (form) {
      form.setAttribute("novalidate", "");
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var invalid = form.querySelector(":invalid");
        if (invalid) { invalid.reportValidity(); return; }
        var lines = [];
        form.querySelectorAll("label").forEach(function (label) {
          var field = label.querySelector("input, select, textarea");
          if (!field) return;
          lines.push(labelText(label, field) + ": " + (field.value || "–"));
        });
        lines.push("", "Skickat från " + window.location.href);
        var href = "mailto:" + CONTACT_EMAIL +
          "?subject=" + encodeURIComponent(form.getAttribute("data-mail-subject")) +
          "&body=" + encodeURIComponent(lines.join("\n"));
        window.location.href = href;

        var note = form.querySelector("[data-form-note]");
        if (!note) {
          note = document.createElement("p");
          note.setAttribute("data-form-note", "");
          note.setAttribute("role", "status");
          note.style.cssText = "margin:0;font-size:15px;line-height:1.5;color:#464E57";
          form.appendChild(note);
        }
        note.innerHTML = "Ditt e-postprogram öppnas med meddelandet ifyllt. Öppnades inget? Mejla direkt till " +
          '<a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + "</a>.";
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { initGap(); initForms(); });
  } else { initGap(); initForms(); }
})();
