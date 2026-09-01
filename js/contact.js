/* ==========================================================================
   YUNKA RURU - CONTACT FORM & REAL-TIME VALIDATION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const phoneInput = document.getElementById('contactPhone');
  const typeSelect = document.getElementById('contactType');
  const messageInput = document.getElementById('contactMessage');
  const submitBtn = document.getElementById('contactSubmitBtn');

  // Regex patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9+() -]{7,18}$/;

  function validateField(input, isValid, errorMsg) {
    const feedbackEl = input.parentElement.querySelector('.invalid-feedback');
    if (!isValid) {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
      if (feedbackEl && errorMsg) feedbackEl.textContent = errorMsg;
    } else {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    }
    return isValid;
  }

  // Real-time input listeners
  nameInput.addEventListener('input', () => {
    validateField(nameInput, nameInput.value.trim().length >= 3, 'Por favor, ingresa tu nombre completo (mínimo 3 letras).');
  });

  emailInput.addEventListener('input', () => {
    validateField(emailInput, emailRegex.test(emailInput.value.trim()), 'Ingresa un correo electrónico válido (ej: contacto@empresa.com).');
  });

  phoneInput.addEventListener('input', () => {
    validateField(phoneInput, phoneRegex.test(phoneInput.value.trim()), 'Ingresa un número telefónico o WhatsApp válido.');
  });

  messageInput.addEventListener('input', () => {
    validateField(messageInput, messageInput.value.trim().length >= 10, 'Por favor, escribe un mensaje de al menos 10 caracteres.');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput, nameInput.value.trim().length >= 3, 'Por favor, ingresa tu nombre completo.');
    const isEmailValid = validateField(emailInput, emailRegex.test(emailInput.value.trim()), 'Ingresa un correo electrónico válido.');
    const isPhoneValid = validateField(phoneInput, phoneRegex.test(phoneInput.value.trim()), 'Ingresa un número telefónico o WhatsApp válido.');
    const isMsgValid = validateField(messageInput, messageInput.value.trim().length >= 10, 'Por favor, escribe tu consulta o requerimiento.');

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isMsgValid) {
      showToast('Por favor, completa correctamente los campos requeridos.', 'error');
      return;
    }

    // Submit loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando mensaje...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      const clientType = typeSelect ? typeSelect.value : 'General';
      const summaryText = `*Nuevo Contacto Web Yunka Ruru*%0A%0A👤 *Nombre:* ${encodeURIComponent(nameInput.value.trim())}%0A📧 *Email:* ${encodeURIComponent(emailInput.value.trim())}%0A📞 *Teléfono:* ${encodeURIComponent(phoneInput.value.trim())}%0A🏢 *Tipo de Cliente:* ${encodeURIComponent(clientType)}%0A💬 *Mensaje:* ${encodeURIComponent(messageInput.value.trim())}`;

      // Open WhatsApp direct conversation with pre-filled message
      const whatsappUrl = `https://wa.me/51914120519?text=${summaryText}`;
      
      showToast('¡Gracias por comunicarte! Redirigiendo a WhatsApp con tu mensaje...', 'success');

      // Reset form
      form.reset();
      [nameInput, emailInput, phoneInput, messageInput].forEach(inp => {
        inp.classList.remove('is-valid');
      });

      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 1200);

    }, 1000);
  });
}

/**
 * Toast Notification system
 */
function showToast(message, type = 'success') {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  const icon = type === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation';
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translate3d(30px, 0, 0)';
    toast.style.transition = 'all 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}
