// contact-modal.js - управление модальным окном контактов
document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact modal script loaded');
    
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');

    // Маска для телефона
    if (phoneInput) {
        phoneInput.addEventListener('input', function(event) {
            let value = event.target.value.replace(/\D/g, '');
            
            if (value.length === 0) {
                event.target.value = '+7 (';
            } else if (value.length <= 1) {
                event.target.value = '+7 (' + value;
            } else if (value.length <= 4) {
                event.target.value = '+7 (' + value.substring(1, 4);
            } else if (value.length <= 7) {
                event.target.value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7);
            } else if (value.length <= 9) {
                event.target.value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9);
            } else {
                event.target.value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9) + '-' + value.substring(9, 11);
            }
        });

        // Валидация телефона
        phoneInput.addEventListener('blur', function() {
            const phoneValue = phoneInput.value.replace(/\D/g, '');
            if (phoneValue && phoneValue.length !== 11) {
                showValidationError(phoneInput, 'Номер телефона должен содержать 11 цифр');
            } else {
                clearValidationError(phoneInput);
            }
        });
    }

    // Валидация email
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailValue = emailInput.value.trim();
            if (emailValue && !isValidEmail(emailValue)) {
                showValidationError(emailInput, 'Введите корректный email адрес');
            } else {
                clearValidationError(emailInput);
            }
        });
    }

    // Функция проверки email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Показать ошибку валидации
    function showValidationError(input, message) {
        clearValidationError(input);
        input.classList.add('is-invalid');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback d-block';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    }

    // Очистить ошибку валидации
    function clearValidationError(input) {
        input.classList.remove('is-invalid');
        const existingError = input.parentNode.querySelector('.invalid-feedback');
        if (existingError) {
            existingError.remove();
        }
    }

    // Обработка отправки формы
    if (submitBtn && contactForm) {
        submitBtn.addEventListener('click', function() {
            submitForm();
        });

        // Обработка отправки по Enter
        contactForm.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                submitForm();
            }
        });
    }

    // Функция отправки формы
    function submitForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();

        // Сброс предыдущих ошибок
        clearAllValidationErrors();

        // Валидация обязательных полей
        let isValid = true;

        if (!name) {
            showValidationError(document.getElementById('name'), 'Поле обязательно для заполнения');
            isValid = false;
        }

        if (!email) {
            showValidationError(document.getElementById('email'), 'Поле обязательно для заполнения');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showValidationError(document.getElementById('email'), 'Введите корректный email адрес');
            isValid = false;
        }

        if (!message) {
            showValidationError(document.getElementById('message'), 'Поле обязательно для заполнения');
            isValid = false;
        }

        // Валидация телефона (если заполнен)
        if (phone) {
            const phoneDigits = phone.replace(/\D/g, '');
            if (phoneDigits.length !== 11) {
                showValidationError(document.getElementById('phone'), 'Номер телефона должен содержать 11 цифр');
                isValid = false;
            }
        }

        if (!isValid) {
            // Прокрутка к первой ошибке
            const firstError = document.querySelector('.is-invalid');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Подготовка данных для отправки
        const formData = {
            name: name,
            email: email,
            phone: phone || 'Не указан',
            subject: subject || 'Не указана',
            message: message,
            timestamp: new Date().toISOString()
        };

        // Здесь можно добавить отправку данных на сервер
        console.log('Данные формы:', formData);

        // Имитация отправки
        simulateFormSubmission(formData);
    }

    // Очистка всех ошибок валидации
    function clearAllValidationErrors() {
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            clearValidationError(input);
        });
    }

    // Имитация отправки формы
    function simulateFormSubmission(formData) {
        // Показываем индикатор загрузки
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Отправка...';

        // Имитация задержки сети
        setTimeout(() => {
            // Показываем сообщение об успехе
            showSuccessMessage();

            // Закрываем модальное окно
            const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
            modal.hide();

            // Восстанавливаем кнопку
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Отправить';
                
                // Очищаем форму
                contactForm.reset();
                clearAllValidationErrors();
            }, 1000);

        }, 2000);
    }

    // Показать сообщение об успехе
    function showSuccessMessage() {
        // Создаем и показываем toast сообщение
        const toastContainer = document.createElement('div');
        toastContainer.className = 'position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '9999';
        
        toastContainer.innerHTML = `
            <div class="toast show" role="alert">
                <div class="toast-header bg-success text-white">
                    <strong class="me-auto">Успешно!</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
                </div>
                <div class="toast-body bg-dark text-light">
                    Сообщение отправлено! Я свяжусь с вами в ближайшее время.
                </div>
            </div>
        `;
        
        document.body.appendChild(toastContainer);
        
        // Автоматически скрываем через 5 секунд
        setTimeout(() => {
            toastContainer.remove();
        }, 5000);
    }

    // Очистка формы при закрытии модального окна
    const contactModal = document.getElementById('contactModal');
    if (contactModal) {
        contactModal.addEventListener('hidden.bs.modal', function() {
            contactForm.reset();
            clearAllValidationErrors();
        });
    }
});