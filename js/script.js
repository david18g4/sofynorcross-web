document.addEventListener('DOMContentLoaded', function () {
  // Menú de navegación móvil
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.classList.toggle('is-active', isOpen);
    });

    // Cierra el menú al pulsar un enlace
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var WEB3FORMS_ACCESS_KEY = 'c174e817-9cca-4e74-b0a1-76314d835ae2';

  var form = document.querySelector('.contact-form');
  if (form) {
    var status = form.querySelector('.form-status');
    var submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Procesar prefijo y teléfono
      var prefijoInput = document.getElementById('prefijo');
      var telefonoInput = document.getElementById('telefono');

      var rawPrefijo = prefijoInput ? prefijoInput.value.trim() : '';
      var rawTelefono = telefonoInput ? telefonoInput.value.trim() : '';

      var cleanPrefijo = rawPrefijo.replace(/\D/g, '');
      var cleanTelefono = rawTelefono.replace(/\D/g, '');

      var telefonoCompleto = '';
      if (cleanTelefono.length > 0) {
        var code = cleanPrefijo.length > 0 ? '+' + cleanPrefijo : '';
        telefonoCompleto = (code + ' ' + cleanTelefono).trim();
      }

      var formData = new FormData(form);
      formData.set('telefono', telefonoCompleto);
      formData.append('access_key', WEB3FORMS_ACCESS_KEY);
      formData.append('subject', 'Nuevo mensaje desde la web de Sofy Norcross');

      if (status) {
        status.textContent = 'Enviando...';
      }
      if (submitBtn) {
        submitBtn.disabled = true;
      }

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
        .then(function (response) { return response.json(); })
        .then(function (data) {
          if (data.success) {
            if (status) {
              status.textContent = '¡Gracias! Tu mensaje se ha enviado correctamente.';
            }
            form.reset();
          } else {
            if (status) {
              status.textContent = 'No se pudo enviar. Escríbenos directamente a sofynorcross@gmail.com.';
            }
          }
        })
        .catch(function () {
          if (status) {
            status.textContent = 'No se pudo enviar. Escríbenos directamente a sofynorcross@gmail.com.';
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
          }
        });
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.createElement('div');
  lightbox.className = 'modal-lightbox';
  lightbox.innerHTML = `
    <button class="modal-close" aria-label="Cerrar previsualización">&times;</button>
    <img src="" alt="Previsualización">
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.modal-close');

  let scrollPosition = 0;

  const openModal = (src, alt) => {
    scrollPosition = window.scrollY;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Previsualización de imagen';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';

    window.scrollTo({
      top: scrollPosition,
      left: 0,
      behavior: 'instant'
    });
  };

  const triggerElements = document.querySelectorAll('.shop .left-side, .gig-poster');
  triggerElements.forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const img = element.querySelector('img');
      if (img) openModal(img.src, img.alt);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});