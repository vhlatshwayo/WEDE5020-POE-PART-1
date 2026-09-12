// 1947 on Vilakazi Street — shared behaviour

document.addEventListener('DOMContentLoaded', function () {
  // Mobile navigation toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Generic form validation (Enquiry + Contact pages)
  var forms = document.querySelectorAll('form[data-validate]');
  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      form.querySelectorAll('[required]').forEach(function (input) {
        var field = input.closest('.field');
        var isEmpty = !input.value || !input.value.trim();
        var isBadEmail = input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);

        if (isEmpty || isBadEmail) {
          valid = false;
          if (field) field.classList.add('invalid');
        } else {
          if (field) field.classList.remove('invalid');
        }
      });

      var successBox = form.parentElement.querySelector('#formSuccess');
      if (valid) {
        form.reset();
        if (successBox) {
          successBox.classList.add('show');
          successBox.setAttribute('tabindex', '-1');
          successBox.focus();
        }
      } else if (successBox) {
        successBox.classList.remove('show');
      }
    });
  });
});
