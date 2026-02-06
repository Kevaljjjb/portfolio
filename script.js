// ================================
// Portfolio Site JavaScript
// ================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initScrollEffects();
    initMobileMenu();
    initContactForm();
    initTypingEffect();
    initTestimonialSlider();
    initProjectSearch();
    initProjectFilters();
    initMatrixEffect();
});

// ================================
// Navigation
// ================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                navMenu.classList.remove('active');
            }
        });
    });

    // Active link highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink && scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    });
}

// ================================
// Mobile Menu
// ================================
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const hamburger = navToggle.querySelector('.hamburger');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Animate hamburger
        if (navMenu.classList.contains('active')) {
            hamburger.style.background = 'transparent';
            hamburger.style.transform = 'rotate(45deg)';
        } else {
            hamburger.style.background = '';
            hamburger.style.transform = '';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.style.background = '';
            hamburger.style.transform = '';
        }
    });
}

// ================================
// Scroll Effects
// ================================
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const animateElements = document.querySelectorAll(
        '.glass-card, .section-title, .section-subtitle, .hero-text > *, .hero-avatar'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Make hero elements visible immediately
    setTimeout(() => {
        document.querySelectorAll('.hero-text > *, .hero-avatar').forEach(el => {
            el.style.opacity = '1';
        });
    }, 100);
}

// ================================
// Typing Effect
// ================================
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const roles = [
        'Data Engineer',
        'AI Specialist',
        'Web Scraping Expert',
        'Automation Pro'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at end
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing after a small delay
    setTimeout(type, 1000);
}

// ================================
// Contact Form
// ================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // For now, show success message (you can integrate with Formspree or similar)
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent! ✓';
            submitBtn.style.background = '#ffffff';
            submitBtn.style.color = '#000000';

            // Reset form
            form.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }, 1000);

        // To actually send emails, uncomment and configure:
        /*
        try {
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                submitBtn.textContent = 'Message Sent! ✓';
                form.reset();
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            submitBtn.textContent = 'Failed to send';
            console.error('Form submission error:', error);
        }
        */
    });
}

// ================================
// Utility: Debounce
// ================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Parallax effect removed to prevent background cropping

// ================================
// Testimonial Slider (v3)
// ================================
function initTestimonialSlider() {
    const slider = document.getElementById('testimonial-slider');
    const inner = slider?.querySelector('.testimonials-flex-inner');
    const cards = slider?.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    const dots = document.querySelectorAll('.testimonials-nav .nav-dot');

    if (!slider || !cards || cards.length === 0) return;

    let currentIndex = 0;

    function updateSlider() {
        if (!inner || !cards[currentIndex]) return;

        const containerWidth = slider.offsetWidth;
        const cardWidth = cards[currentIndex].offsetWidth;

        // Add padding to inner container so first/last cards can center
        const sidePadding = (containerWidth / 2) - (cardWidth / 2);
        inner.style.paddingLeft = `${sidePadding}px`;
        inner.style.paddingRight = `${sidePadding}px`;

        const cardOffset = cards[currentIndex].offsetLeft;

        // Calculate scroll position to center the card
        const scrollTo = cardOffset - (containerWidth / 2) + (cardWidth / 2);

        slider.scrollTo({
            left: scrollTo,
            behavior: 'smooth'
        });

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        // Update Lucide icons (ensures icons in new cards are rendered)
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    prevBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : cards.length - 1;
        updateSlider();
    });

    nextBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex < cards.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });

    // Initialize position (center first card)
    window.addEventListener('load', () => {
        setTimeout(updateSlider, 100);
    });

    // Handle resize
    window.addEventListener('resize', debounce(() => {
        updateSlider();
    }, 250));
}

// ================================
// Project Search & Filtering
// ================================
function initProjectSearch() {
    const heroSearch = document.getElementById('hero-search');
    const projectSearch = document.getElementById('project-search');
    const projectCards = document.querySelectorAll('.project-card');

    function performSearch(query) {
        const searchTerm = query.toLowerCase().trim();

        projectCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.project-tag')).map(t => t.textContent.toLowerCase());
            const tech = Array.from(card.querySelectorAll('.project-tech i')).map(i => i.className.toLowerCase());

            if (title.includes(searchTerm) ||
                description.includes(searchTerm) ||
                tags.some(t => t.includes(searchTerm)) ||
                tech.some(t => t.includes(searchTerm))) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // If hero search, scroll to projects if not already there
        if (document.activeElement === heroSearch && searchTerm.length > 0) {
            const projectSection = document.getElementById('projects');
            const offsetTop = projectSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    heroSearch?.addEventListener('input', (e) => {
        if (projectSearch) projectSearch.value = e.target.value;
        performSearch(e.target.value);
    });

    projectSearch?.addEventListener('input', (e) => {
        if (heroSearch) heroSearch.value = e.target.value;
        performSearch(e.target.value);
    });
}

function initProjectFilters() {
    const heroFilters = document.querySelectorAll('.hero-quick-filters .filter-btn');
    const projectFilters = document.querySelectorAll('.project-filters .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    function applyFilter(category) {
        // Sync filter buttons
        const allFilters = [...heroFilters, ...projectFilters];
        allFilters.forEach(btn => {
            if (btn.dataset.filter === category || btn.dataset.category === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        projectCards.forEach(card => {
            const tags = Array.from(card.querySelectorAll('.project-tag')).map(t => t.textContent.toLowerCase());

            if (category === 'all') {
                card.style.display = 'block';
            } else {
                // Map short filters to project tags
                const matches = tags.some(tag => {
                    if (category === 'ai') return tag.includes('ai') || tag.includes('machine learning');
                    if (category === 'automation') return tag.includes('automation');
                    if (category === 'data') return tag.includes('data');
                    if (category === 'web') return tag.includes('scraping') || tag.includes('web');
                    return tag.includes(category);
                });
                card.style.display = matches ? 'block' : 'none';
            }
        });

        // Scroll to projects if clicked from hero
        if ([...heroFilters].some(btn => btn === document.activeElement)) {
            const projectSection = document.getElementById('projects');
            const offsetTop = projectSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    heroFilters.forEach(btn => {
        btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
    });

    projectFilters.forEach(btn => {
        btn.addEventListener('click', () => applyFilter(btn.dataset.category));
    });
}

// ================================
// Matrix Rain Effect
// ================================
function initMatrixEffect() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        const container = canvas.parentElement;
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', debounce(resizeCanvas, 250));

    // Matrix characters - mix of letters, numbers, and symbols
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>?/\\|~';
    const charArray = chars.split('');

    const fontSize = 24;
    const rowSpacing = 40; // Larger spacing prevents overlap and looks cleaner
    let rows = Math.floor(canvas.height / rowSpacing);

    // Array to track the x position and direction of each row
    let drops = [];
    let directions = []; // 1 = left-to-right, -1 = right-to-left

    // Initialize drops with staggered positions
    function initDrops() {
        rows = Math.floor(canvas.height / rowSpacing);
        drops = [];
        directions = [];
        const maxChars = canvas.width / fontSize;

        for (let i = 0; i < rows; i++) {
            // Alternate directions
            directions[i] = i % 2 === 0 ? 1 : -1;

            // Stagger starting positions across the canvas so it's never empty
            if (directions[i] === 1) {
                // Left-to-right: start at various points from left
                drops[i] = (i * (maxChars / rows)) % maxChars - 12;
            } else {
                // Right-to-left: start at various points from right  
                drops[i] = maxChars - ((i * (maxChars / rows)) % maxChars) + 12;
            }
        }
    }

    initDrops();

    // Reinitialize drops on resize
    window.addEventListener('resize', debounce(() => {
        resizeCanvas();
        initDrops();
    }, 250));

    // Draw function
    function draw() {
        // Clear canvas completely - no trails
        ctx.fillStyle = 'rgba(10, 10, 10, 1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = `${fontSize}px monospace`;

        const streamLength = 12; // Number of characters per stream
        const maxChars = canvas.width / fontSize;

        for (let i = 0; i < drops.length; i++) {
            // Vertical position (y) - fixed for each row
            const y = i * rowSpacing + rowSpacing;
            const dir = directions[i];

            // Draw multiple characters per row
            for (let j = 0; j < streamLength; j++) {
                const char = charArray[Math.floor(Math.random() * charArray.length)];

                // Each character in the stream is offset based on direction
                const x = (drops[i] - (j * dir)) * fontSize;

                // Skip if outside visible area
                if (x < -fontSize || x > canvas.width + fontSize) continue;

                // Lead character (j=0) is brightest, fades towards tail
                const fadeRatio = 1 - (j / streamLength);
                const brightness = Math.floor(80 + fadeRatio * 175);

                if (j === 0) {
                    // Lead character - bright white with glow
                    ctx.fillStyle = '#ffffff';
                    ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
                    ctx.shadowBlur = 10;
                } else {
                    ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${0.3 + fadeRatio * 0.7})`;
                    ctx.shadowBlur = 0;
                }

                ctx.fillText(char, x, y);
                ctx.shadowBlur = 0;
            }

            // Reset drop based on direction
            if (dir === 1) {
                // Left-to-right: reset when goes off right side
                if (drops[i] * fontSize > canvas.width + streamLength * fontSize) {
                    drops[i] = -streamLength;
                }
            } else {
                // Right-to-left: reset when goes off left side
                if (drops[i] * fontSize < -streamLength * fontSize) {
                    drops[i] = maxChars + streamLength;
                }
            }

            // Move drop based on direction
            drops[i] += 0.15 * dir;
        }
    }

    // Animation loop
    let animationId;
    function animate() {
        draw();
        animationId = requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Pause animation when not visible (performance optimization)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!animationId) animate();
            } else {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                    animationId = null;
                }
            }
        });
    }, { threshold: 0.1 });

    observer.observe(canvas);
}

// Initialize Matrix Effect
document.addEventListener('DOMContentLoaded', () => {
    initMatrixEffect();

    // Contact Form Handling (AJAX)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        showNotification('Message sent successfully! I will get back to you soon.', 'success');
                        contactForm.reset();
                    } else {
                        showNotification('Oops! Something went wrong. Please try again.', 'error');
                    }
                })
                .catch(error => {
                    showNotification('Error sending message. Please try again later.', 'error');
                    console.error('Form error:', error);
                })
                .finally(() => {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
});

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;

    document.body.appendChild(notification);

    // Use timeout to allow CSS transition to work
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}
