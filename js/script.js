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
    'appt-date': function (v) { return v ? '' : 'Choose a preferred date.'; }
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
