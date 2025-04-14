document.addEventListener('DOMContentLoaded', () => {
    // Array of interests to cycle through
    const interests = [
        'Photography.',
        'AI.',
        'Machine Learning.',
        'Piano.',
        'Guitar.',
        'Dance Music.',
        'Coffee.',
        'GPUs.',
        'interesting people.',
        'smoking meat.',
        'Welding.',
        'Chopin.',
        'Sparkling Water.',
        'Jesus.',
        'facial expressions.',
        'the blues.',
        'warmly lit spaces.'
    ];

    const changingText = document.getElementById('changing-text');
    let lastIndex = -1;

    // Function to get random index different from last one
    function getRandomIndex() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * interests.length);
        } while (newIndex === lastIndex && interests.length > 1);
        lastIndex = newIndex;
        return newIndex;
    }

    // Function to update text with fade effect
    function updateText() {
        if (changingText) {
            changingText.style.opacity = '0';
            
            setTimeout(() => {
                const index = getRandomIndex();
                changingText.textContent = interests[index];
                changingText.style.opacity = '1';
            }, 250); // Half of the interval for smooth transition
        }
    }

    // Add transition style - faster for quicker words
    if (changingText) {
        changingText.style.transition = 'opacity 0.25s ease-in-out';
        
        // Start the text rotation - 2000ms interval
        setInterval(updateText, 2000);
    }
    
    // Animate quick navigation items with staggered delay
    const quickNavItems = document.querySelectorAll('.quick-nav-item');
    
    quickNavItems.forEach((item, index) => {
        // Add a slight delay before animation starts
        setTimeout(() => {
            item.classList.add('animated');
        }, 800 + (index * 150)); // Staggered delay after hero content appears
    });
    
    // Add interactive hover effects for floating shapes
    const shapes = document.querySelectorAll('.shape');
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = hero.getBoundingClientRect();
            
            // Calculate mouse position relative to hero section
            const x = (clientX - left) / width;
            const y = (clientY - top) / height;
            
            // Move shapes slightly based on mouse position
            shapes.forEach((shape, index) => {
                const factor = (index + 1) * 10;
                const offsetX = (x - 0.5) * factor;
                const offsetY = (y - 0.5) * factor;
                
                shape.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
        });
        
        // Reset shapes position when mouse leaves
        hero.addEventListener('mouseleave', () => {
            shapes.forEach((shape) => {
                shape.style.transform = 'translate(0, 0)';
            });
        });
    }
    
    // Add subtle parallax effect to profile image
    const profileImage = document.querySelector('.profile-image');
    
    if (profileImage && hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = hero.getBoundingClientRect();
            
            // Calculate mouse position relative to hero section
            const x = (clientX - left) / width - 0.5;
            const y = (clientY - top) / height - 0.5;
            
            // Apply subtle movement to the profile image
            profileImage.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
        });
        
        // Reset profile image position when mouse leaves
        hero.addEventListener('mouseleave', () => {
            profileImage.style.transform = 'translate(0, 0)';
        });
    }
});