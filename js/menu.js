// menu.js - управление мобильным меню
document.addEventListener('DOMContentLoaded', function() {
    console.log('Menu script loaded');
    
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuToggle && menuClose && mobileMenu) {
        console.log('All menu elements found');
        
        menuToggle.addEventListener('click', function() {
            console.log('Menu toggle clicked');
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        menuClose.addEventListener('click', function() {
            console.log('Menu close clicked');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });

        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Закрытие при клике вне меню
        document.addEventListener('click', function(event) {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(event.target) && 
                !menuToggle.contains(event.target)) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Закрытие при нажатии Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    } else {
        console.log('Some menu elements not found');
    }
});