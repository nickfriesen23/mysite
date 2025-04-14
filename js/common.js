document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileMenuToggle.textContent = mainNav.classList.contains('active') ? 'Close' : 'Menu';
        });
    }
    
    // Add smooth scroll behavior for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    if (mobileMenuToggle) {
                        mobileMenuToggle.textContent = 'Menu';
                    }
                }
            }
        });
    });
    
    // Add hover effect for interactive elements
    const addHoverEffect = (selector, transformValue, additionalStyles = {}) => {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = transformValue;
                
                // Apply any additional styles
                Object.entries(additionalStyles).forEach(([property, value]) => {
                    this.style[property] = value;
                });
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                
                // Reset additional styles
                Object.keys(additionalStyles).forEach(property => {
                    this.style[property] = '';
                });
            });
        });
    };
    
    // Apply hover effects to different element types
    addHoverEffect('.quick-nav-item', 'translateY(-10px)', {
        boxShadow: '0 10px 25px rgba(255, 200, 87, 0.3)',
        borderColor: 'var(--mustard)',
        background: 'rgba(255, 255, 255, 0.15)'
    });
    
    // Add cursor trail effect on hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        // Create cursor trail container
        const trailContainer = document.createElement('div');
        trailContainer.className = 'cursor-trail';
        trailContainer.style.position = 'absolute';
        trailContainer.style.top = '0';
        trailContainer.style.left = '0';
        trailContainer.style.width = '100%';
        trailContainer.style.height = '100%';
        trailContainer.style.pointerEvents = 'none';
        trailContainer.style.zIndex = '1';
        hero.appendChild(trailContainer);
        
        // Track mouse movement and create trail particles
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { left, top } = hero.getBoundingClientRect();
            
            // Create a trail particle
            const particle = document.createElement('div');
            particle.className = 'trail-particle';
            particle.style.position = 'absolute';
            particle.style.width = '8px';
            particle.style.height = '8px';
            particle.style.borderRadius = '50%';
            particle.style.background = 'rgba(255, 200, 87, 0.6)';
            particle.style.left = `${clientX - left}px`;
            particle.style.top = `${clientY - top}px`;
            particle.style.pointerEvents = 'none';
            particle.style.opacity = '0.8';
            particle.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
            
            trailContainer.appendChild(particle);
            
            // Animate and remove the particle
            setTimeout(() => {
                particle.style.transform = 'scale(2)';
                particle.style.opacity = '0';
            }, 10);
            
            setTimeout(() => {
                trailContainer.removeChild(particle);
            }, 800);
        });
    }
    
    // Handle active state for navigation links
    const updateActiveNavLink = () => {
        const navLinks = document.querySelectorAll('.main-nav a');
        const currentPath = window.location.pathname;
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath === currentPath ||
                (currentPath.endsWith('/') && linkPath === currentPath.slice(0, -1)) ||
                (linkPath.endsWith('/') && linkPath.slice(0, -1) === currentPath)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };
    
    // Update active nav link on page load
    updateActiveNavLink();
    
    // Add a subtle parallax effect to the hero section
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                const parallaxSpeed = 0.4;
                hero.style.backgroundPosition = `center ${scrollPosition * parallaxSpeed}px`;
            }
        });
    }
});