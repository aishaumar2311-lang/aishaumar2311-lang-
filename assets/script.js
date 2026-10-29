/* ============================================================
   GOLDEN INTERNATIONAL SCHOOL ACADEMY — Site Scripts
   ------------------------------------------------------------
   FORM SETUP (school administrator):
   To receive real enquiries, paste your form endpoint below
   (e.g. Formspree, Getform, or your own backend URL).
   While FORM_ENDPOINT is empty, the form validates entries but
   does NOT pretend to submit — it asks parents to phone the
   school instead. Never collect children's data without a
   privacy notice and a secure destination.
   ============================================================ */
var FORM_ENDPOINT = ""; // <-- EDIT: e.g. "https://formspree.io/f/xxxxxxx"

(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header shadow ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var mobileMenu = document.querySelector(".mobile-menu");
  if (toggle && mobileMenu) {
    toggle.addEventListener("click", function () {
      var open = mobileMenu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileMenu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll("[data-count]");
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var start = null, dur = 1200;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + (p === 1 ? suffix : "");
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window && counters.length) {
    var cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- FAQ accordion (accessible) ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    var panel = item.querySelector(".faq-a");
    if (!btn || !panel) return;
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        other.querySelector(".faq-a").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  /* ---------- Filter bars (news & gallery) ---------- */
  document.querySelectorAll("[data-filter-group]").forEach(function (bar) {
    var targetSel = bar.getAttribute("data-filter-group");
    var items = document.querySelectorAll(targetSel + " [data-category]");
    bar.querySelectorAll(".filter-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        bar.querySelectorAll(".filter-btn").forEach(function (b) {
          b.classList.remove("active");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
        var cat = btn.getAttribute("data-filter");
        items.forEach(function (item) {
          var show = cat === "all" || item.getAttribute("data-category") === cat;
          item.classList.toggle("is-hidden", !show);
        });
      });
    });
  });

  /* ---------- Gallery lightbox ---------- */
  var lightbox = document.querySelector(".lightbox");
  var galleryItems = Array.prototype.slice.call(
    document.querySelectorAll(".gallery-item")
  );
  if (lightbox && galleryItems.length) {
    var lbImg = lightbox.querySelector("img");
    var lbCap = lightbox.querySelector("figcaption");
    var lbCount = lightbox.querySelector(".lb-counter");
    var current = 0, lastFocus = null;

    function visibleItems() {
      return galleryItems.filter(function (i) { return !i.classList.contains("is-hidden"); });
    }
    function show(idx) {
      var vis = visibleItems();
      current = (idx + vis.length) % vis.length;
      var img = vis[current].querySelector("img");
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      var cap = vis[current].querySelector("figcaption");
      lbCap.textContent = cap ? cap.textContent.trim() : img.alt;
      lbCount.textContent = current + 1 + " of " + vis.length;
    }
    function open(item) {
      lastFocus = document.activeElement;
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
      show(visibleItems().indexOf(item));
      lightbox.querySelector(".lb-close").focus();
    }
    function close() {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }
    galleryItems.forEach(function (item) {
      item.addEventListener("click", function () { open(item); });
      item.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(item); }
      });
    });
    lightbox.querySelector(".lb-close").addEventListener("click", close);
    lightbox.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
    lightbox.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
  }

  /* ---------- Site search ---------- */
  var SEARCH_INDEX = [
    { t: "Home", d: "Welcome to Golden International School Academy", u: "index.html", k: "home welcome main start" },
    { t: "About Our School", d: "Our story, vision, mission and core values", u: "about.html", k: "about history story vision mission values leadership head principal" },
    { t: "Our Core Values", d: "Integrity, Excellence, Respect, Discipline, Creativity, Responsibility, Compassion", u: "about.html#values", k: "values integrity excellence respect discipline creativity responsibility compassion character" },
    { t: "Academics", d: "Early Years, Nursery, Primary and Secondary programs", u: "academics.html", k: "academics curriculum classes programs subjects learning" },
    { t: "Early Years Program", d: "A welcoming introduction to learning through play and exploration", u: "academics.html#early-years", k: "early years creche playgroup toddlers foundation" },
    { t: "Nursery Program", d: "Language, social skills, curiosity and confidence", u: "academics.html#nursery", k: "nursery kindergarten kg reception" },
    { t: "Primary Education", d: "Literacy, numeracy, communication and problem-solving", u: "academics.html#primary", k: "primary basic elementary grade class" },
    { t: "Secondary Education", d: "Critical thinking, discipline and preparation for the future", u: "academics.html#secondary", k: "secondary jss sss junior senior high school exams" },
    { t: "Admissions", d: "How to apply, requirements and the enquiry form", u: "admissions.html", k: "admission apply enrol enroll register join intake form fees" },
    { t: "Admission Enquiry Form", d: "Send an enquiry to the school office", u: "admissions.html#enquiry-form", k: "form enquire enquiry apply online register" },
    { t: "School Fees", d: "How to request current fee information from the school", u: "admissions.html#fees", k: "fees tuition cost price payment school fees" },
    { t: "Book a School Visit", d: "Arrange to visit and tour the school", u: "admissions.html#visit", k: "visit tour campus open day appointment" },
    { t: "School Life", d: "Sports, arts, clubs, assemblies and celebrations", u: "school-life.html", k: "school life sports arts clubs activities events assembly" },
    { t: "School Gallery", d: "Photos of learning, sports and school events", u: "school-life.html#gallery", k: "gallery photos pictures images" },
    { t: "Facilities", d: "Classrooms and learning spaces at the school", u: "facilities.html", k: "facilities classroom library laboratory computer playground campus building" },
    { t: "News & Events", d: "School announcements, updates and parent information", u: "news.html", k: "news events announcements updates calendar newsletter" },
    { t: "Contact Us", d: "Phone 09040139800 · Polo Road, near Polo Health Clinic", u: "contact.html", k: "contact phone call address location directions map email 09040139800 polo" },
    { t: "Frequently Asked Questions", d: "Answers for prospective parents", u: "index.html#faq", k: "faq questions help answers parents" }
  ];
  var overlay = document.querySelector(".search-overlay");
  if (overlay) {
    var input = overlay.querySelector("input[type='search']");
    var results = overlay.querySelector(".search-results");
    function render(list) {
      if (!list.length) {
        results.innerHTML = '<p class="search-empty">No matches found. Try “admissions”, “fees” or “contact”.</p>';
        return;
      }
      results.innerHTML = list.map(function (r) {
        return '<a href="' + r.u + '"><strong>' + r.t + "</strong><span>" + r.d + "</span></a>";
      }).join("");
    }
    function openSearch() {
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
      render(SEARCH_INDEX.slice(0, 7));
      setTimeout(function () { input.focus(); }, 40);
    }
    function closeSearch() {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    }
    document.querySelectorAll("[data-open-search]").forEach(function (b) {
      b.addEventListener("click", openSearch);
    });
    overlay.querySelector("[data-close-search]").addEventListener("click", closeSearch);
    overlay.addEventListener("click", function (e) { if (e.target === overlay) closeSearch(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("open")) closeSearch();
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openSearch(); }
    });
    input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      if (!q) { render(SEARCH_INDEX.slice(0, 7)); return; }
      render(SEARCH_INDEX.filter(function (r) {
        return (r.t + " " + r.d + " " + r.k).toLowerCase().indexOf(q) !== -1;
      }));
    });
  }

  /* ---------- Enquiry forms (validation + honest submission) ---------- */
  document.querySelectorAll("form[data-enquiry-form]").forEach(function (form) {
    var status = form.querySelector(".form-status");
    var submitBtn = form.querySelector("button[type='submit']");
    var submitting = false;

    function setStatus(type, html) {
      if (!status) return;
      status.className = "form-status show " + type;
      status.innerHTML = html;
      status.setAttribute("role", type === "success" ? "status" : "alert");
      status.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    function fieldValid(field) {
      var input = field.querySelector("input, select, textarea");
      if (!input) return true;
      var val = (input.value || "").trim();
      var ok = true;
      if (input.hasAttribute("required") && !val) ok = false;
      if (ok && input.type === "email" && val && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) ok = false;
      if (ok && input.type === "tel" && val && !/^[+()\-.\s\d]{7,17}$/.test(val)) ok = false;
      if (ok && input.type === "checkbox" && input.hasAttribute("required") && !input.checked) ok = false;
      field.classList.toggle("invalid", !ok);
      return ok;
    }
    form.querySelectorAll(".form-field input, .form-field select, .form-field textarea").forEach(function (el) {
      el.addEventListener("blur", function () {
        var f = el.closest(".form-field");
        if (f) fieldValid(f);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (submitting) return;
      /* Spam honeypot: silently stop bots that fill the hidden field */
      var hp = form.querySelector("input[name='website']");
      if (hp && hp.value) return;

      var allOk = true, firstBad = null;
      form.querySelectorAll(".form-field").forEach(function (f) {
        if (!fieldValid(f)) { allOk = false; if (!firstBad) firstBad = f; }
      });
      var consent = form.querySelector("input[name='consent']");
      if (consent && !consent.checked) {
        allOk = false;
        consent.closest(".checkbox-field").style.color = "#B3261E";
      }
      if (!allOk) {
        setStatus("error", "<strong>Please check the highlighted fields</strong> and try again. Fields marked * are required.");
        if (firstBad) firstBad.querySelector("input, select, textarea").focus();
        return;
      }

      /* No backend configured yet — be honest, never fake success */
      if (!FORM_ENDPOINT) {
        setStatus(
          "warning",
          "<span><strong>Thank you — your details are ready, but online submission is not yet connected.</strong> " +
          "The school is finalising its official enquiry inbox. Please call <a href='tel:+2349040139800'><strong>0904 013 9800</strong></a> " +
          "now to complete your enquiry, and the school office will assist you right away.</span>"
        );
        return;
      }

      submitting = true;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
      fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            setStatus("success", "<span><strong>Enquiry sent successfully.</strong> Thank you for contacting Golden International School Academy. The school office will reach out using your preferred contact method.</span>");
          } else {
            throw new Error("Bad response");
          }
        })
        .catch(function () {
          setStatus("error", "<span><strong>We could not send your enquiry just now.</strong> Please try again, or call the school on <a href='tel:+2349040139800'><strong>0904 013 9800</strong></a>.</span>");
        })
        .finally(function () {
          submitting = false;
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtn.getAttribute("data-label") || "Submit";
        });
    });
  });
})();
