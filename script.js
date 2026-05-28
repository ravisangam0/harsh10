document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Scroll Animations (Intersection Observer)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Run once
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
  });

  // Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      
      // Reset errors
      document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.form-control').forEach(el => el.style.borderColor = 'var(--border-subtle)');

      if (name.value.trim() === '') {
        showError(name, 'Name is required');
        isValid = false;
      }

      if (email.value.trim() === '') {
        showError(email, 'Email is required');
        isValid = false;
      } else if (!isValidEmail(email.value.trim())) {
        showError(email, 'Please enter a valid email');
        isValid = false;
      }

      if (message.value.trim() === '') {
        showError(message, 'Message is required');
        isValid = false;
      }

      if (isValid) {
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
        
        // Simulate API Call
        setTimeout(() => {
          btn.innerHTML = 'Message Sent Successfully!';
          btn.classList.replace('btn-primary', 'btn-outline');
          contactForm.reset();
          
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.replace('btn-outline', 'btn-primary');
            btn.disabled = false;
          }, 3000);
        }, 1500);
      }
    });
  }

  function showError(inputElement, message) {
    inputElement.style.borderColor = '#ef4444';
    const errorDiv = inputElement.nextElementSibling;
    errorDiv.innerText = message;
    errorDiv.style.display = 'block';
  }

  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
});
