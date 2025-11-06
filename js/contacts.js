// Contacts page functionality
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initSuccessModal();
    initAccessibility();
});

function initContactForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea, select');
    
    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const errorElement = document.getElementById(`${field.id}-error`);
    
    clearError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        showError(field, 'Это поле обязательно для заполнения');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(field, 'Введите корректный email адрес');
            return false;
        }
    }
    
    // Message length validation
    if (field.id === 'message' && value.length < 10) {
        showError(field, 'Сообщение должно содержать не менее 10 символов');
        return false;
    }
    
    return true;
}

function validateForm() {
    const form = document.getElementById('contactForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function showError(field, message) {
    field.classList.add('error');
    const errorElement = document.getElementById(`${field.id}-error`);
    errorElement.textContent = message;
    errorElement.classList.add('show');
    
    // Announce error to screen readers
    errorElement.setAttribute('role', 'alert');
}

function clearError(e) {
    const field = e.target || e;
    field.classList.remove('error');
    const errorElement = document.getElementById(`${field.id}-error`);
    errorElement.classList.remove('show');
    errorElement.removeAttribute('role');
}

function submitForm() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // In real application, you would send data to server here
        console.log('Form data:', Object.fromEntries(formData));
        
        // Show success message
        showSuccessModal();
        
        // Reset form
        form.reset();
        
        // Restore button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function initSuccessModal() {
    const modal = document.getElementById('successModal');
    const modalOverlay = document.getElementById('successOverlay');
    const closeBtn = document.getElementById('successClose');
    const okBtn = document.getElementById('successOk');
    
    // Close modal
    closeBtn.addEventListener('click', closeSuccessModal);
    okBtn.addEventListener('click', closeSuccessModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeSuccessModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeSuccessModal();
        }
    });
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Focus on OK button
    setTimeout(() => {
        document.getElementById('successOk').focus();
    }, 100);
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function initAccessibility() {
    // Add ARIA labels
    const form = document.getElementById('contactForm');
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        const label = form.querySelector(`label[for="${field.id}"]`);
        if (label) {
            label.innerHTML += ' <span class="visually-hidden">(обязательное поле)</span>';
        }
    });
    
    // External link indicators
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.setAttribute('aria-label', `${link.textContent} (открывается в новом окне)`);
        
    });
}

// Utility function for form serialization
function serializeForm(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    return data;
}