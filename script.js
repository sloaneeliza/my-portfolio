// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.project-card, .skill-tag, .contact-link, .experience-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add stagger effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add stagger effect to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add stagger effect to experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.15}s`;
    });
});

// Autonomous floating shapes that move freely on their own
let scrollOffset = 0;
const shapeData = new Map();

// Track scroll position for parallax
window.addEventListener('scroll', () => {
    scrollOffset = window.pageYOffset;
});

// Make shapes float around autonomously with organic movement
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.shape');

    // Initialize shape data with position, velocity, and autonomous behavior
    shapes.forEach((shape, index) => {
        shapeData.set(shape, {
            x: 0,
            y: 0,
            velocityX: (Math.random() - 0.5) * 0.5,
            velocityY: (Math.random() - 0.5) * 0.5,
            time: Math.random() * Math.PI * 2, // Random starting phase
            speed: 0.3 + index * 0.1 // Different speeds for each shape
        });
    });

    // Continuous animation loop for autonomous floating movement
    function animateShapes() {
        const heroHeight = heroSection.offsetHeight;

        shapes.forEach((shape) => {
            const data = shapeData.get(shape);

            // Increment time for smooth wave-like motion
            data.time += 0.015 * data.speed;

            // Create organic movement using sine/cosine waves with larger amplitude
            const waveX = Math.sin(data.time) * 30;
            const waveY = Math.cos(data.time * 0.7) * 30;

            // Calculate position directly from waves for continuous movement
            data.x = waveX + data.velocityX;
            data.y = waveY + data.velocityY;

            // Add occasional random drift
            if (Math.random() < 0.01) {
                data.velocityX += (Math.random() - 0.5) * 5;
                data.velocityY += (Math.random() - 0.5) * 5;
            }

            // Apply gentle drag to drift velocity only
            data.velocityX *= 0.95;
            data.velocityY *= 0.95;

            // Keep drift velocity bounded
            const maxDrift = 20;
            if (Math.abs(data.velocityX) > maxDrift) {
                data.velocityX *= 0.9;
            }
            if (Math.abs(data.velocityY) > maxDrift) {
                data.velocityY *= 0.9;
            }

            // Apply transform with parallax
            const speed = 0.3 + (Array.from(shapes).indexOf(shape) * 0.1);
            const movement = Math.min(scrollOffset * speed, heroHeight * 0.3);

            if (shape.classList.contains('shape-3')) {
                shape.style.transform = `translate(calc(-50% + ${data.x}px), calc(-50% + ${movement + data.y}px))`;
            } else {
                shape.style.transform = `translate(${data.x}px, ${movement + data.y}px)`;
            }
        });

        requestAnimationFrame(animateShapes);
    }

    animateShapes();
});

// Add cursor trail effect (optional, subtle)
let mouseX = 0;
let mouseY = 0;
let cursorCircle;

document.addEventListener('DOMContentLoaded', () => {
    // Create cursor circle
    cursorCircle = document.createElement('div');
    cursorCircle.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid rgba(255, 110, 199, 0.5);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease;
        display: none;
    `;
    document.body.appendChild(cursorCircle);

    // Show custom cursor on desktop only
    if (window.innerWidth > 768) {
        cursorCircle.style.display = 'block';
    }
});

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768 && cursorCircle) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorCircle.style.left = `${mouseX - 10}px`;
        cursorCircle.style.top = `${mouseY - 10}px`;
    }
});

// Scale cursor on hover over interactive elements
document.addEventListener('DOMContentLoaded', () => {
    const interactiveElements = document.querySelectorAll('a, button, .project-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorCircle && window.innerWidth > 768) {
                cursorCircle.style.transform = 'scale(1.5)';
                cursorCircle.style.borderColor = 'rgba(0, 212, 255, 0.8)';
            }
        });

        el.addEventListener('mouseleave', () => {
            if (cursorCircle && window.innerWidth > 768) {
                cursorCircle.style.transform = 'scale(1)';
                cursorCircle.style.borderColor = 'rgba(255, 110, 199, 0.5)';
            }
        });
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(13, 13, 13, 0.95)';
    } else {
        navbar.style.background = 'rgba(13, 13, 13, 0.8)';
    }
});

// Add hover sound effect (optional - commented out by default)
// Uncomment if you want subtle interaction feedback
/*
const hoverSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuByvLZiTYIFWa3696dMwgbZ7/u3ZI+ChJNoejyuV4cBzqL0fHLfC4FKHzH8dyONwgZar7t4JtEChBTpuPvsmccBjiP0/DKfC0FJ3zH8NuQQAkWXrTr66lWFApGn+DuxmocBSp+yPHWjTYIGGm76+CaSwkUVKrl7q9eHAc2jM/uyX0uBSh+yPDTijUIGWm76+CaSwoUVqjl7q5dHQc3jc/uyHwuBSh+x/DTiTUIGWq76t+dSAkTVajl7q1eHQc4jc/uyH0uBSd+x/DTizUIGGu76t+dRwkSVKnl7q1dHQc3jc/uyHwuBSh+x/DSizQJGGu76t+cSAkSVKfm7q1eHQc3jM/uyH0tBSh+x/DSijQJGGu76N+dSAkSVKfm7q1dHQc3jM/uyH0uBSd+x/DSizUJGGu86N+cSAkSVKfm7a1dHQc3jc/uyH0tBSh+x/DSizUJGGu86N+cSAkSVKjm7q1dHQc3jM/uyH0tBSh+x/DSizUJF2u86N+dSAkSVKjm7q1dHQc2jM7tx3wtBSh+yPHSizUIGGq85+CcSgkTVKjm7q1dHQc3jM/uyH0tBSh+x/DSijUIGGu86N+cSAkSVKjm7a1dHAc3jM/uyH0tBSh+x/DSizUJF2u86N+cSgkSVKjm7a1dHQc3jM/uyH0tBSh+x/DSizUIGGu86N+cSAkSVKjm7a1dHQc3jM/uyH0tBSh+x/DSijUIGGu86N+cSgkSVKfm7a1dHQc3jM/uyH0tBSh+x/DSizUIGGu86N+cSAkSVKjm7a1dHQc3jM/uyH0tBSh+x/DSizUIGGu86N+cSAkSVKjm7a1dHQc3jM/uyH0tBSh+x/DSizUIGGu86N+cSAkSVKjl7a1dHQc3jM/uyH0tBSh+x/DSizUIGGu86N+cSAkSVKjl7a1dHQc3jM/uyH0tBSh+x/DSizUIGGu86N+cSQkSVKjl7a1dHQc3jM/uyH0tBSh+x/DSizUIGGu86N+cSQkSVKjl7a1dHQc3jM/uyH0tBSh+x/DSizUIGGu86N+cSQkSVKjl7a1dHAc3jM/tx30tBSh+x/DSizUIGGu86N+cSQkSVKjl7a1dHAc3jM/tyH0tBSh+x/DSizUIGGu86N+cSQkSVKjl7a1dHAc3jM/tyH0tBSh+x/DSizUIGGu86N+cSQkSVKjl7a1dHAc3jM/tyH0tBSh+x/DSizUIGGu86N+cSQkSVKjl7a1dHAc3jM/tyH0tBSh+x/DSizUIGGu86N+cSQkSVKjl7a1dHAc3jM/tyH0tBSh+x/DSizUIGGu86N+cSQkSVKjl7a1dHAc3jM/tyH0tBSh+x/DSizUIGGu86N+cSQkS');
document.querySelectorAll('.project-card, .btn, .skill-tag').forEach(el => {
    el.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.play().catch(() => {});
    });
});
*/
