// Projects page functionality
document.addEventListener('DOMContentLoaded', function() {
    initProjectsFilter();
    initProjectModals();
    initAccessibility();
});

// Filter functionality
function initProjectsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Modal functionality
function initProjectModals() {
    const modal = document.getElementById('projectModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const detailBtns = document.querySelectorAll('.project-details-btn');
    
    // Project data
    const projects = {
        1: {
            title: 'Личный сайт',
            image: '../images/project1-600.jpg',
            description: 'Адаптивный сайт-портфолио, разработанный с использованием современных технологий веб-разработки. Включает семантическую верстку, доступность и оптимизированную производительность.',
            tags: ['HTML5', 'CSS3', 'Bootstrap 5', 'JavaScript'],
            live: '#',
            source: '#'
        },
        2: {
            title: 'Todo-приложение',
            image: '../images/project2-600.jpg',
            description: 'Приложение для управления задачами с возможностью добавления, редактирования, удаления и отметки выполненных задач. Использует Local Storage для сохранения данных.',
            tags: ['JavaScript', 'Local Storage', 'DOM API'],
            live: '#',
            source: '#'
        },
        3: {
            title: 'Интернет-магазин',
            image: '../images/project3-600.jpg',
            description: 'E-commerce проект с современным пользовательским интерфейсом. Включает каталог товаров, корзину покупок и систему оформления заказов.',
            tags: ['React', 'API', 'Context API', 'CSS Modules'],
            live: '#',
            source: '#'
        }
    };
    
    // Open modal
    detailBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.dataset.project;
            const project = projects[projectId];
            
            if (project) {
                openProjectModal(project);
            }
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    function openProjectModal(project) {
        document.getElementById('modal-title').textContent = project.title;
        document.getElementById('modalImage').src = project.image;
        document.getElementById('modalImage').alt = `Скриншот проекта: ${project.title}`;
        document.getElementById('modalDesc').textContent = project.description;
        
        const tagsContainer = document.getElementById('modalTags');
        tagsContainer.innerHTML = '';
        project.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = tag;
            tagsContainer.appendChild(span);
        });
        
        document.getElementById('modalLive').href = project.live;
        document.getElementById('modalSource').href = project.source;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus management
        setTimeout(() => {
            modalClose.focus();
        }, 100);
    }
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Return focus to the button that opened the modal
        const activeElement = document.activeElement;
        if (activeElement && activeElement.classList.contains('project-details-btn')) {
            activeElement.focus();
        }
    }
}

function initAccessibility() {
    // Add ARIA labels and roles
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach((btn, index) => {
        btn.setAttribute('aria-pressed', btn.classList.contains('active'));
        btn.setAttribute('role', 'button');
    });
    
    // Lazy loading images
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}