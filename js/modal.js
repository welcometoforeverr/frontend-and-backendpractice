// modal.js - управление модальным окном
document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.getElementById('openModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const cancelBtn = document.getElementById('cancelBtn');
    const contactForm = document.getElementById('contactForm');

    // Открытие модального окна
    if (openModalBtn) {
        openModalBtn.addEventListener('click', function() {
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Закрытие модального окна
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }

    // Закрытие при клике вне модального окна
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(event) {
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Закрытие при нажатии Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Обработка отправки формы
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Здесь можно добавить отправку данных на сервер
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            console.log('Форма отправлена:', data);
            
            // Показываем сообщение об успехе
            alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
            
            // Закрываем модальное окно и сбрасываем форму
            closeModal();
            contactForm.reset();
        });
    }

    // Маска для телефона
    const phoneInput = document.getElementById('phone');
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
    }
});