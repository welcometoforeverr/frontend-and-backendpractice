// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize accessibility features
    initAccessibility();
    
    // Initialize smooth interactions
    initSmoothInteractions();
    
    // Initialize progressive enhancement
    initProgressiveEnhancement();
});

function initAccessibility() {
    // Add accessible keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Skip link focus management
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

function initSmoothInteractions() {
    // Add loading states for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.href && !this.download) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });
}

function initProgressiveEnhancement() {
    // Check for container queries support
    if (!CSS.supports('container-type: inline-size')) {
        document.documentElement.classList.add('no-cq');
    }
    
    // Check for dvh support
    if (!CSS.supports('height: 100dvh')) {
        document.documentElement.classList.add('no-dvh');
    }
    
    // Load critical images
    loadCriticalImages();
}

function loadCriticalImages() {
    const criticalImages = document.querySelectorAll('img[fetchpriority="high"]');
    criticalImages.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
            img.addEventListener('error', function() {
                this.classList.add('error');
            });
        }
    });
}

// Utility function for responsive images
function updateImageSizes() {
    const images = document.querySelectorAll('img[sizes]');
    images.forEach(img => {
        const currentSize = img.getBoundingClientRect().width;
        console.log(`Image "${img.alt}" rendered at: ${currentSize}px`);
    });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initAccessibility,
        initSmoothInteractions,
        initProgressiveEnhancement
    };
}