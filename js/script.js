// =========================================================
// Sofy Norcross — interactividad del sitio
// =========================================================

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

    // Cierra el menú al pulsar un enlace (útil en móvil)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Formulario de contacto: validación simple + mensaje de confirmación
  var form = document.querySelector('.contact-form');
  if (form) {
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Procesar prefijo y teléfono (limpieza y formateo)
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

      console.log('Teléfono listo para usar:', telefonoCompleto);

      if (status) {
        status.textContent = '¡Gracias! Tu mensaje se ha enviado correctamente.';
      }
      form.reset();
    });
  }
});