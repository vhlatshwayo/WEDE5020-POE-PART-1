// 1947 on Vilakazi Street: shared behaviour (Part 1 to Part 3)
// Each feature is its own small function so it is easy to explain and test.

document.documentElement.classList.add('js'); // lets the CSS know JavaScript is running

document.addEventListener('DOMContentLoaded', function () {
  initNav();
  initReveal();
  initMenuTools();
  initAccordion();
  initLightbox();
  initEvents();
  initMap();
  initForms();
});

/* ---------- Mobile navigation (Part 1) ---------- */
function initNav() {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', function () {
    var isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

/* ---------- Scroll animation: elements fade up as they enter the screen ---------- */
function initReveal() {
  var items = document.querySelectorAll('.card, .menu-category, .gallery li, section .photo-frame:not(.photo-frame--hero)');
  items.forEach(function (el) { el.classList.add('reveal'); });
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target); // animate once only
      }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { observer.observe(el); });
}

/* ---------- Menu page: search, filter by category, sort ---------- */
function initMenuTools() {
  var search = document.getElementById('menuSearch');
  var category = document.getElementById('menuCategory');
  var sort = document.getElementById('menuSort');
  if (!search || !category || !sort) return;

  var count = document.getElementById('menuCount');
  var sections = Array.prototype.slice.call(document.querySelectorAll('.menu-category'));

  // Read every dish from the page into a simple list of objects
  var dishes = [];
  sections.forEach(function (section) {
    var catName = section.querySelector('h2').textContent.trim();
    section.querySelectorAll('.menu-item').forEach(function (el, i) {
      dishes.push({
        el: el,
        section: section,
        category: catName,
        order: i,
        name: el.querySelector('.name').textContent.trim(),
        price: parseInt(el.querySelector('.price').textContent.replace(/\D/g, ''), 10),
        text: el.textContent.toLowerCase()
      });
    });
  });

  // Fill the category dropdown from the headings (so it never goes out of date)
  sections.forEach(function (section) {
    if (section.querySelector('.menu-item')) {
      var name = section.querySelector('h2').textContent.trim();
      var opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name;
      category.appendChild(opt);
    }
  });

  function update() {
    var term = search.value.trim().toLowerCase();
    var cat = category.value;
    var shown = 0;

    // 1. sort the dishes inside each section
    sections.forEach(function (section) {
      var list = dishes.filter(function (d) { return d.section === section; });
      list.sort(function (a, b) {
        if (sort.value === 'low') return a.price - b.price;
        if (sort.value === 'high') return b.price - a.price;
        if (sort.value === 'az') return a.name.localeCompare(b.name);
        return a.order - b.order;
      });
      list.forEach(function (d) { section.appendChild(d.el); });
    });

    // 2. show or hide dishes that match the search and category
    dishes.forEach(function (d) {
      var match = (cat === 'all' || d.category === cat) && (!term || d.text.indexOf(term) !== -1);
      d.el.hidden = !match;
      if (match) shown++;
    });

    // 3. hide whole sections with nothing to show (the Cellar block has no dishes)
    sections.forEach(function (section) {
      var hasDishes = section.querySelector('.menu-item');
      var anyVisible = section.querySelector('.menu-item:not([hidden])');
      section.hidden = hasDishes ? !anyVisible : (term !== '' || cat !== 'all');
    });

    count.textContent = shown === 0
      ? 'No dishes match your search. Try a different word.'
      : 'Showing ' + shown + ' of ' + dishes.length + ' dishes.';
  }

  search.addEventListener('input', update);
  category.addEventListener('change', update);
  sort.addEventListener('change', update);
  update();
}

/* ---------- Accordion (FAQ on the Enquiries page) ---------- */
function initAccordion() {
  document.querySelectorAll('.accordion-trigger').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      panel.hidden = open;
    });
  });
}

/* ---------- Gallery lightbox (About page) ---------- */
function initLightbox() {
  var links = Array.prototype.slice.call(document.querySelectorAll('.gallery-link'));
  if (!links.length) return;

  // Build the lightbox once with DOM methods (createElement, not innerHTML)
  var box = document.createElement('div');
  box.className = 'lightbox';
  box.hidden = true;
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Image viewer');

  var img = document.createElement('img');
  var caption = document.createElement('p');
  var close = makeButton('lightbox-close', 'Close image viewer', '\u00D7');
  var prev = makeButton('lightbox-prev', 'Previous image', '\u2039');
  var next = makeButton('lightbox-next', 'Next image', '\u203A');
  [close, prev, next, img, caption].forEach(function (n) { box.appendChild(n); });
  document.body.appendChild(box);

  var current = 0;
  var lastFocus = null;

  function makeButton(cls, label, symbol) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = cls;
    b.setAttribute('aria-label', label);
    b.textContent = symbol;
    return b;
  }
  function show(i) {
    current = (i + links.length) % links.length;
    img.src = links[current].href;
    img.alt = links[current].querySelector('img').alt;
    caption.textContent = links[current].dataset.caption || '';
  }
  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    box.hidden = false;
    document.body.classList.add('no-scroll');
    close.focus();
  }
  function shut() {
    box.hidden = true;
    document.body.classList.remove('no-scroll');
    if (lastFocus) lastFocus.focus();
  }

  links.forEach(function (link, i) {
    link.addEventListener('click', function (e) { e.preventDefault(); open(i); });
  });
  close.addEventListener('click', shut);
  prev.addEventListener('click', function () { show(current - 1); });
  next.addEventListener('click', function () { show(current + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) shut(); }); // click the dark area to close
  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') shut();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
}

/* ---------- Dynamic content: upcoming events loaded from data/events.json ---------- */
function initEvents() {
  var list = document.getElementById('eventsList');
  if (!list) return;
  var status = document.getElementById('eventsStatus');

  fetch('data/events.json')
    .then(function (res) {
      if (!res.ok) throw new Error('Request failed');
      return res.json();
    })
    .then(function (events) {
      events.sort(function (a, b) { return new Date(a.date) - new Date(b.date) });
      events.forEach(function (ev) {
        var card = document.createElement('article');
        card.className = 'card reveal in';
        var date = document.createElement('p');
        date.className = 'eyebrow';
        date.textContent = new Date(ev.date + 'T12:00:00').toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' });
        var title = document.createElement('h3');
        title.textContent = ev.title;
        var text = document.createElement('p');
        text.textContent = ev.description;
        var price = document.createElement('p');
        price.className = 'event-price';
        price.textContent = ev.price;
        var link = document.createElement('a');
        link.href = 'enquiry.html';
        link.className = 'event-link';
        link.textContent = 'Enquire about this event';
        [date, title, text, price, link].forEach(function (n) { card.appendChild(n); });
        list.appendChild(card);
      });
      status.hidden = true;
    })
    .catch(function () {
      // textContent is used so nothing from the file is ever run as HTML
      status.textContent = 'Events could not be loaded right now. Please check back soon or contact us.';
    });
}

/* ---------- Interactive map (Contact page) using Leaflet ---------- */
function initMap() {
  var el = document.getElementById('map');
  if (!el) return;
  if (typeof L === 'undefined') {
    el.textContent = 'The map could not load. Our address is 7156 Vilakazi Street, Orlando West, Soweto.';
    return;
  }
  // Approximate coordinates: check them against Google Maps before submitting
  var restaurant = [-26.2381, 27.9073];
  var parking = [-26.2396, 27.9085];

  var map = L.map('map', { scrollWheelZoom: false }).setView(restaurant, 16);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  L.marker(restaurant).addTo(map).bindPopup('<strong>1947 on Vilakazi Street</strong><br>7156 Vilakazi Street').openPopup();
  L.marker(parking).addTo(map).bindPopup('<strong>Visitor parking</strong><br>Vilakazi Street precinct');

  // Fit both markers on screen, and let people zoom with the scroll wheel after clicking the map
  map.fitBounds([restaurant, parking], { padding: [50, 50] });
  map.on('click', function () { map.scrollWheelZoom.enable(); });
}

/* ---------- Forms: validation, response and submission ---------- */
var RULES = {
  phone: /^(\+27|0)[1-9][0-9]{8}$/,                // South African number, spaces removed first
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
};

function validateField(input) {
  var value = input.value.trim();
  var message = '';
  var field = input.closest('.field');
  var error = field && field.querySelector('.field-error');
  if (error && !error.dataset.default) error.dataset.default = error.textContent; // remember the original wording

  if (input.hasAttribute('required') && !value) {
    message = (error && error.dataset.default) || 'This field is required.';
  } else if (input.type === 'email' && value && !RULES.email.test(value)) {
    message = 'Please enter a valid email address, like name@example.com.';
  } else if (input.type === 'tel' && value && !RULES.phone.test(value.replace(/[\s-]/g, ''))) {
    message = 'Please enter a valid South African number, like 011 123 4567 or +27 82 123 4567.';
  } else if (input.type === 'number' && value) {
    var n = Number(value);
    if (!Number.isInteger(n) || n < Number(input.min) || n > Number(input.max)) {
      message = 'Please enter a whole number from ' + input.min + ' to ' + input.max + '.';
    }
  } else if (input.type === 'date' && value) {
    var chosen = new Date(value + 'T00:00:00');
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    if (chosen < today) message = 'Please choose a date that is today or later.';
  } else if (input.minLength > 0 && value && value.length < input.minLength) {
    message = 'Please write at least ' + input.minLength + ' characters (you have ' + value.length + ').';
  }

  if (field) field.classList.toggle('invalid', message !== '');
  if (error && message) error.textContent = message;
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
  return message === '';
}

function initForms() {
  document.querySelectorAll('form[data-validate]').forEach(function (form) {
    var fields = form.querySelectorAll('input, select, textarea');
    var today = new Date().toISOString().slice(0, 10);
    var dateInput = form.querySelector('input[type="date"]');
    if (dateInput) dateInput.min = today;

    // Check each field when the user leaves it, and clear errors as they fix them
    fields.forEach(function (input) {
      input.addEventListener('blur', function () { validateField(input); });
      input.addEventListener('input', function () {
        if (input.closest('.field') && input.closest('.field').classList.contains('invalid')) validateField(input);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var allValid = true;
      var firstBad = null;
      fields.forEach(function (input) {
        if (!validateField(input)) {
          allValid = false;
          if (!firstBad) firstBad = input;
        }
      });
      var box = form.parentElement.querySelector('#formSuccess');
      if (!allValid) {
        if (box) box.classList.remove('show');
        firstBad.focus();
        return;
      }
      if (form.id === 'enquiryForm') submitEnquiry(form, box);
      if (form.id === 'contactForm') submitContact(form, box);
    });
  });
}

function showResult(box, text) {
  box.textContent = text;
  box.classList.add('show');
  box.setAttribute('tabindex', '-1');
  box.focus();
}

// Works out a simple, friendly response based on what the visitor chose
function buildEnquiryResponse(data) {
  var date = new Date(data.preferredDate + 'T12:00:00');
  var pretty = date.toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' });
  var guests = Number(data.guests);

  if (date.getDay() === 1) {
    return 'Thank you, ' + data.fullName.split(' ')[0] + '. We are closed on Mondays, so ' + pretty + ' is not available. Please pick a Tuesday to Sunday and send the form again.';
  }
  var line;
  if (data.enquiryType === 'chefstable') {
    line = 'The Chef\u2019s Table is R1 450 per guest with wine pairing (' + guests + ' guest' + (guests > 1 ? 's' : '') + ' = R' + (guests * 1450).toLocaleString('en-ZA') + '). Seats are limited to 10, so we will confirm availability for ' + pretty + ' by email.';
  } else if (guests >= 10 || data.enquiryType === 'private' || data.enquiryType === 'corporate') {
    line = 'For ' + guests + ' guests on ' + pretty + ', a R200 per person deposit (R' + (guests * 200).toLocaleString('en-ZA') + ') secures the space. Our events team will confirm availability and a menu quote.';
  } else {
    line = 'A table for ' + guests + ' on ' + pretty + ' looks available. There is no booking fee, and a host will confirm by email or phone.';
  }
  return 'Thank you, ' + data.fullName.split(' ')[0] + '. ' + line;
}

// AJAX: sends the form in the background with fetch, so the page does not reload
function submitEnquiry(form, box) {
  var button = form.querySelector('button[type="submit"]');
  var data = Object.fromEntries(new FormData(form).entries());
  button.disabled = true;
  button.textContent = 'Sending...';

  // jsonplaceholder is a free practice API: it accepts the POST and replies, but stores nothing
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data)
  })
    .then(function (res) {
      if (!res.ok) throw new Error('Server said ' + res.status);
      return res.json();
    })
    .then(function () {
      showResult(box, buildEnquiryResponse(data));
      form.reset();
    })
    .catch(function () {
      showResult(box, 'Sorry, we could not send your enquiry. Please check your connection and try again, or call us.');
    })
    .then(function () {
      button.disabled = false;
      button.textContent = 'Submit Enquiry';
    });
}

// Contact form: compiles the validated details into an email to the restaurant
var CONTACT_EMAIL = 'bookings@1947onvilakazi.co.za'; // change to your own address when testing

function submitContact(form, box) {
  var d = Object.fromEntries(new FormData(form).entries());
  var body = 'Name: ' + d.fullName + '\nEmail: ' + d.email + '\nMessage type: ' + d.messageType + '\n\n' + d.message;
  var mailto = 'mailto:' + CONTACT_EMAIL +
    '?subject=' + encodeURIComponent(d.messageType + ': ' + d.subject) +
    '&body=' + encodeURIComponent(body);
  showResult(box, 'Thank you, ' + d.fullName.split(' ')[0] + '. Your email app should open with your message ready to send to ' + CONTACT_EMAIL + '.');
  form.reset();
  window.location.href = mailto;
}
