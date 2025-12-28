// ==========================================
// NAVIGATION
// ==========================================

// Get navbar elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    
    // Animate hamburger icon
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
    } else {
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Reset hamburger icon
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    }
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// MENU TABS
// ==========================================

const menuTabs = document.querySelectorAll('.menu-tab');
const menuContents = document.querySelectorAll('.menu-content');

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        menuTabs.forEach(t => t.classList.remove('active'));
        menuContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding content
        const category = tab.getAttribute('data-category');
        const targetContent = document.getElementById(category);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// CONTACT FORM
// ==========================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Create WhatsApp message
    const message = `
📧 *New Contact Message from Website*

👤 Name: ${data.name}
📧 Email: ${data.email}
${data.phone ? `📞 Phone: ${data.phone}` : ''}
💬 Message: ${data.message}
    `.trim();
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp business number (REPLACE WITH YOUR NUMBER)
    const whatsappNumber = '94775929597';
    
    // Open WhatsApp
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    
    // Reset form
    contactForm.reset();
    
    // Show success message
    showNotification('Thank you! Your message has been sent via WhatsApp. We\'ll get back to you soon.');
});

// ==========================================
// SMOOTH SCROLL
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for # links
        if (href === '#') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// LAZY LOADING IMAGES
// ==========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => imageObserver.observe(img));
}

// ==========================================
// ANIMATION ON SCROLL
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
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
const animateElements = document.querySelectorAll('.menu-item, .gallery-item, .testimonial-card, .feature-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: type === 'success' ? '#25d366' : '#e74c3c',
        color: 'white',
        padding: '15px 25px',
        borderRadius: '10px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        animation: 'slideInRight 0.3s ease',
        maxWidth: '90%',
        fontSize: '0.95rem'
    });
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// GALLERY LIGHTBOX (Simple Implementation)
// ==========================================

const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${img.src}" alt="${img.alt}">
            </div>
        `;
        
        Object.assign(lightbox.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '9999',
            cursor: 'pointer',
            animation: 'fadeIn 0.3s ease'
        });
        
        const content = lightbox.querySelector('.lightbox-content');
        Object.assign(content.style, {
            position: 'relative',
            maxWidth: '90%',
            maxHeight: '90%'
        });
        
        const closeBtn = lightbox.querySelector('.lightbox-close');
        Object.assign(closeBtn.style, {
            position: 'absolute',
            top: '-40px',
            right: '0',
            fontSize: '40px',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold'
        });
        
        const lightboxImg = lightbox.querySelector('img');
        Object.assign(lightboxImg.style, {
            maxWidth: '100%',
            maxHeight: '90vh',
            objectFit: 'contain',
            borderRadius: '10px'
        });
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Close lightbox
        const closeLightbox = () => {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                lightbox.remove();
                document.body.style.overflow = 'auto';
            }, 300);
        };
        
        lightbox.addEventListener('click', closeLightbox);
        closeBtn.addEventListener('click', closeLightbox);
        
        // Prevent closing when clicking on image
        lightboxImg.addEventListener('click', (e) => e.stopPropagation());
    });
});

// ==========================================
// PRELOADER (Optional)
// ==========================================

window.addEventListener('load', () => {
    // Remove loading class if you have one
    document.body.classList.add('loaded');
    
    // Log performance metrics
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    }
    
    // Show welcome message in console
    console.log('%c🏔️ Hiking Bar Ella', 'color: #d4af37; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
    console.log('%cWelcome to the best restaurant in Ella, Sri Lanka!', 'color: #666; font-size: 14px;');
    console.log('%cA Great Place. Great Food. 🍕🍔🍹', 'color: #d4af37; font-size: 12px;');
});

// ==========================================
// EASTER EGG - KONAMI CODE
// ==========================================

let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        showNotification('🎉 You found the secret! Enjoy 10% off your next visit! Show this to staff.', 'success');
        // You can add more fun effects here
        document.body.style.animation = 'rainbow 2s linear infinite';
    }
});

// ==========================================
// BACK TO TOP - SHOW ON LONG PAGES
// ==========================================

// Add smooth scroll behavior for all browsers
document.documentElement.style.scrollBehavior = 'smooth';

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        // Your scroll code here runs at 60fps max
    });
}, { passive: true });

// ==========================================
// ACCESSIBILITY IMPROVEMENTS
// ==========================================

// Add keyboard navigation for menu tabs
menuTabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
    
    tab.addEventListener('keydown', (e) => {
        let newIndex;
        
        if (e.key === 'ArrowRight') {
            newIndex = index + 1 >= menuTabs.length ? 0 : index + 1;
        } else if (e.key === 'ArrowLeft') {
            newIndex = index - 1 < 0 ? menuTabs.length - 1 : index - 1;
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            tab.click();
            return;
        }
        
        if (newIndex !== undefined) {
            menuTabs[newIndex].focus();
            menuTabs[newIndex].click();
        }
    });
});

// ==========================================
// CONSOLE CREDITS
// ==========================================

console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #d4af37;');
console.log('%c🏔️ HIKING BAR ELLA', 'color: #d4af37; font-size: 20px; font-weight: bold;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #d4af37;');
console.log('%cWebsite Design & Development', 'color: #666; font-size: 12px;');
console.log('%c📍 Ella, Sri Lanka', 'color: #d4af37; font-size: 11px;');
console.log('%c📞 +94 77 592 9597', 'color: #666; font-size: 11px;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #d4af37;');
