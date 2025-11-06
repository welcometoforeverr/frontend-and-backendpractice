// Diary page functionality
document.addEventListener('DOMContentLoaded', function() {
    initDiaryModal();
    initProgressBars();
    initAccessibility();
});

function initDiaryModal() {
    const modal = document.getElementById('addEntryModal');
    const modalOverlay = document.getElementById('entryModalOverlay');
    const openBtn = document.getElementById('addEntryBtn');
    const closeBtn = document.getElementById('entryModalClose');
    const cancelBtn = document.getElementById('cancelEntryBtn');
    const form = document.getElementById('diaryForm');
    
    // Open modal
    openBtn.addEventListener('click', openModal);
    
    // Close modal
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        addNewEntry();
        closeModal();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    function openModal() {
        // Set today's date as default
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('entryDate').value = today;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        setTimeout(() => {
            document.getElementById('entryTitle').focus();
        }, 100);
    }
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        form.reset();
    }
    
    function addNewEntry() {
        const date = document.getElementById('entryDate').value;
        const title = document.getElementById('entryTitle').value;
        const description = document.getElementById('entryDescription').value;
        const status = document.getElementById('entryStatus').value;
        
        // Create new timeline item
        const timeline = document.querySelector('.timeline');
        const newItem = createTimelineItem(date, title, description, status);
        
        // Add to beginning of timeline
        timeline.insertBefore(newItem, timeline.firstChild);
        
        // Show success message
        showNotification('Запись успешно добавлена!');
    }
    
    function createTimelineItem(date, title, description, status) {
        const article = document.createElement('article');
        article.className = 'timeline-item';
        
        const formattedDate = new Date(date).toLocaleDate('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        const isCompleted = status === 'completed';
        const markerClass = isCompleted ? 'completed' : 'in-progress';
        const markerIcon = isCompleted ? '✓' : '⟳';
        
        article.innerHTML = `
            <div class="timeline-marker ${markerClass}" aria-hidden="true">
                <span class="timeline-icon">${markerIcon}</span>
            </div>
            <div class="timeline-content">
                <time class="timeline-date" datetime="${date}">${formattedDate}</time>
                <h3 class="timeline-event">${title}</h3>
                <p class="timeline-description">${description}</p>
                <div class="timeline-tags">
                    <span class="tag">Новая запись</span>
                </div>
            </div>
        `;
        
        return article;
    }
}

function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    // Animate progress bars on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.style.getPropertyValue('--progress');
                entry.target.style.width = progress;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

function initAccessibility() {
    // Add ARIA labels
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.setAttribute('aria-labelledby', `timeline-item-${index}`);
        
        const event = item.querySelector('.timeline-event');
        if (event) {
            event.id = `timeline-item-${index}`;
        }
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-success);
        color: white;
        padding: var(--space-md) var(--space-lg);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add keyframes for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);