// Portfolio App - Interactive Components
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupScrollEffects();
        this.setupAnimations();
    }

    // Smooth scrolling for navigation links
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Scroll effects and animations
    setupScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(
            '.timeline-item, .education-card, .project-card, .hero-content, .section-title'
        );
        
        animatedElements.forEach(el => observer.observe(el));
    }

    // Setup animations
    setupAnimations() {
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            .timeline-item,
            .education-card,
            .project-card,
            .hero-content,
            .section-title {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }

            .animate-in {
                opacity: 1;
                transform: translateY(0);
            }

            .timeline-item.animate-in {
                animation: slideInLeft 0.6s ease-out forwards;
            }

            .education-card.animate-in,
            .project-card.animate-in {
                animation: fadeInUp 0.6s ease-out forwards;
            }

            @keyframes slideInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            /* Typing animation for hero */
            .hero-name {
                overflow: hidden;
                border-right: 3px solid var(--color-primary);
                white-space: nowrap;
                animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
            }

            @keyframes typing {
                from { width: 0 }
                to { width: 100% }
            }

            @keyframes blink-caret {
                from, to { border-color: transparent }
                50% { border-color: var(--color-primary) }
            }

            /* Hover effects */
            .project-card {
                cursor: pointer;
            }

            .project-card:hover .project-placeholder {
                transform: scale(1.1);
                transition: transform 0.3s ease;
            }

            .contact-link:hover svg {
                transform: scale(1.1);
                transition: transform 0.2s ease;
            }
        `;
        document.head.appendChild(style);

        // Trigger initial animations for visible elements
        setTimeout(() => {
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) heroContent.classList.add('animate-in');
        }, 300);
    }

    // Utility method for smooth scrolling to element
    scrollToElement(elementId, offset = 0) {
        const element = document.getElementById(elementId);
        if (element) {
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Enhanced Project Card Interactions
class ProjectCardManager {
    constructor() {
        this.init();
    }

    init() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            this.setupCardInteractions(card);
        });
    }

    setupCardInteractions(card) {
        // Add click to expand functionality (could be enhanced with modals)
        card.addEventListener('click', (e) => {
            // Don't trigger on button clicks
            if (e.target.classList.contains('btn')) return;
            
            // Add visual feedback
            card.style.transform = 'scale(1.02)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        });

        // Enhance hover effects
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '';
        });
    }
}

// Form Enhancement (for future contact form)
class FormManager {
    constructor() {
        this.setupContactLinks();
    }

    setupContactLinks() {
        // Add click tracking for contact links
        const contactLinks = document.querySelectorAll('.contact-link');
        
        contactLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Add visual feedback
                link.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    link.style.transform = '';
                }, 150);

                // Log interaction (could be enhanced with analytics)
                const linkType = link.textContent.trim();
                console.log(`Contact link clicked: ${linkType}`);
            });
        });
    }
}

// Theme Manager (for future dark mode toggle)
class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.init();
    }

    init() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme) {
            this.currentTheme = savedTheme;
            this.applyTheme(savedTheme);
        }
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        localStorage.setItem('portfolio-theme', theme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Page loaded in ${Math.round(loadTime)}ms`);
        });

        // Lazy load images when they come into view
        this.setupLazyLoading();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
    new ProjectCardManager();
    new FormManager();
    new ThemeManager();
    new PerformanceMonitor();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PortfolioApp,
        ProjectCardManager,
        FormManager,
        ThemeManager,
        PerformanceMonitor
    };
}