/**
 * Aarogya Hospital — site scripts
 * Everything here enhances content that already exists in the HTML.
 * No page depends on JS to render its primary content.
 */

document.addEventListener('DOMContentLoaded', function () {
  initNavToggle();
  initDoctorFinder();
  initFaqAccordion();
  initAppointmentForm();
  initGalleryFilter();
  initScrollReveal();
  initTiltCards();
  initCounters();
  initGalleryLightbox();
  initOptionalChatbot();
});

/* ---------------- Mobile nav ---------------- */
function initNavToggle() {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.primary-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

/* ---------------- Doctor / department finder ---------------- */
function initDoctorFinder() {
  var finder = document.querySelector('[data-finder]');
  if (!finder) return;

  var input = finder.querySelector('input[type="search"]');
  var chips = finder.querySelectorAll('.chip');
  var count = finder.querySelector('[data-finder-count]');
  var cards = document.querySelectorAll('[data-dept]');
  var activeDept = 'all';

  function apply() {
    var term = (input.value || '').trim().toLowerCase();
    var visible = 0;

    cards.forEach(function (card) {
      var dept = card.getAttribute('data-dept');
      var haystack = (card.getAttribute('data-search') || '').toLowerCase();
      var matchesDept = activeDept === 'all' || dept === activeDept;
      var matchesTerm = term === '' || haystack.indexOf(term) !== -1;
      var show = matchesDept && matchesTerm;
      card.hidden = !show;
      if (show) visible++;
    });

    if (count) {
      count.textContent = visible === 0
        ? 'No matches — try a different department or search term.'
        : visible + (visible === 1 ? ' result' : ' results');
    }
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
      chip.setAttribute('aria-pressed', 'true');
      activeDept = chip.getAttribute('data-dept-filter');
      apply();
    });
  });

  if (input) {
    input.addEventListener('input', apply);
  }

  apply();
}

/* ---------------- FAQ accordion ---------------- */
function initFaqAccordion() {
  var items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    var panel = item.querySelector('.faq-a');
    if (!btn || !panel) return;

    btn.addEventListener('click', function () {
      var isOpen = item.getAttribute('data-open') === 'true';

      items.forEach(function (other) {
        other.setAttribute('data-open', 'false');
        other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-a').style.maxHeight = null;
      });

      if (!isOpen) {
        item.setAttribute('data-open', 'true');
        btn.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
}

/* ---------------- Appointment form ---------------- */
function initAppointmentForm() {
  var form = document.querySelector('#appointment-form');
  if (!form) return;

  var success = document.querySelector('.form-success');
  var today = new Date().toISOString().split('T')[0];
  var dateInput = form.querySelector('#appt-date');
  if (dateInput) dateInput.setAttribute('min', today);

  var rules = {
    'appt-name': function (v) { return v.trim().length >= 3 ? '' : 'Enter your full name.'; },
    'appt-phone': function (v) { return /^(\+91[\s-]?)?[6-9]\d{9}$/.test(v.trim()) ? '' : 'Enter a valid 10-digit phone number.'; },
    'appt-email': function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Enter a valid email address.'; },
    'appt-department': function (v) { return v ? '' : 'Select a department.'; },
    'appt-date': function (v) { return v ? '' : 'Choose a preferred date.'; },
    'appt-time': function (v) { return v ? '' : 'Choose a preferred time.'; }
  };

  function validateField(fieldEl) {
    var rule = rules[fieldEl.id];
    if (!rule) return true;
    var wrapper = fieldEl.closest('.field');
    var msg = rule(fieldEl.value);
    wrapper.classList.toggle('error', !!msg);
    var errEl = wrapper.querySelector('.err-msg');
    if (errEl) errEl.textContent = msg;
    return !msg;
  }

  Object.keys(rules).forEach(function (id) {
    var el = form.querySelector('#' + id);
    if (el) {
      el.addEventListener('blur', function () { validateField(el); });
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = true;
    Object.keys(rules).forEach(function (id) {
      var el = form.querySelector('#' + id);
      if (el && !validateField(el)) valid = false;
    });

    if (!valid) {
      var firstError = form.querySelector('.field.error input, .field.error select');
      if (firstError) firstError.focus();
      if (success) success.setAttribute('data-show', 'false');
      return;
    }

    // No backend is wired up for this static build — this simply confirms
    // the request locally. Replace with a real submit handler / API call.
    if (success) {
      success.setAttribute('data-show', 'true');
      success.textContent = 'Request received. Our front desk will call you within one business day to confirm your slot.';
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    form.reset();
  });
}

/* ---------------- Gallery filter ---------------- */
function initGalleryFilter() {
  var filterBar = document.querySelector('.gallery-filter');
  if (!filterBar) return;

  var buttons = filterBar.querySelectorAll('button');
  var items = document.querySelectorAll('.gallery-item');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      btn.setAttribute('aria-pressed', 'true');
      var cat = btn.getAttribute('data-cat');

      items.forEach(function (item) {
        item.hidden = cat !== 'all' && item.getAttribute('data-cat') !== cat;
      });
    });
  });
}


/* ---------------- Scroll reveal ---------------- */
function initScrollReveal() {
  var items = document.querySelectorAll('section, .emergency-strip, .cta-band, .page-banner');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (item) { item.classList.add('revealed'); });
    return;
  }
  items.forEach(function (item) { item.classList.add('reveal'); });
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(function (item) { observer.observe(item); });
}

/* ---------------- Subtle 3D tilt ---------------- */
function initTiltCards() {
  var cards = document.querySelectorAll('.card, .info-block, .gallery-figure, [data-tilt-card]');
  if (!cards.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  cards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = 'translateY(-6px) rotateX(' + (-y * 5).toFixed(2) + 'deg) rotateY(' + (x * 5).toFixed(2) + 'deg)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });
}

/* ---------------- Counter animation ---------------- */
function initCounters() {
  var counters = document.querySelectorAll('[data-count]');
  if (!counters.length || !('IntersectionObserver' in window)) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var target = parseInt(el.getAttribute('data-count'), 10) || 0;
      var start = 0;
      var duration = 900;
      var t0 = performance.now();
      function tick(now) {
        var progress = Math.min((now - t0) / duration, 1);
        el.textContent = Math.round(start + (target - start) * progress);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(function (el) { observer.observe(el); });
}

/* ---------------- Gallery lightbox ---------------- */
function initGalleryLightbox() {
  var figures = document.querySelectorAll('[data-lightbox]');
  if (!figures.length) return;

  var modal = document.createElement('div');
  modal.className = 'lightbox-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.innerHTML = '<button class="lightbox-close" type="button" aria-label="Close gallery preview">×</button><div class="lightbox-card"><img alt=""><div class="lightbox-caption"></div></div>';
  document.body.appendChild(modal);

  var modalImg = modal.querySelector('img');
  var caption = modal.querySelector('.lightbox-caption');
  var close = modal.querySelector('.lightbox-close');

  function closeModal() { modal.setAttribute('data-open', 'false'); }
  close.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  figures.forEach(function (figure) {
    figure.addEventListener('click', function () {
      var img = figure.querySelector('img');
      if (!img) return;
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      caption.textContent = (figure.querySelector('.cap-title') ? figure.querySelector('.cap-title').textContent : '') + ' — ' + (figure.querySelector('.cap-desc') ? figure.querySelector('.cap-desc').textContent : '');
      modal.setAttribute('data-open', 'true');
      close.focus();
    });
  });
}

/* ---------------- Optional chatbot loader ---------------- */
function initOptionalChatbot() {
  var url = (window.AAROGYA_CHATBOT_EMBED_URL || '').trim();
  if (!url || url.indexOf('YOUR_') !== -1 || url.indexOf('PASTE_') !== -1) return;
  if (!/^https:\/\//i.test(url)) return;
  var script = document.createElement('script');
  script.async = true;
  script.src = url;
  script.charset = 'UTF-8';
  script.setAttribute('crossorigin', '*');
  document.body.appendChild(script);
}
