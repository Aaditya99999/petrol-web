
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    setTimeout(() => {
        cursorFollower.style.left = `${e.clientX}px`;
        cursorFollower.style.top = `${e.clientY}px`;
    }, 50);
});
const mobileToggle = document.querySelector('.mobile-toggle');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');

mobileToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
    mobileToggle.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

document.addEventListener('click', (e) => {
    if (!navList.contains(e.target) && !mobileToggle.contains(e.target) && navList.classList.contains('active')) {
        navList.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});
document.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up, .animate-item').forEach(el => {
    observer.observe(el);
});
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();
function countUp(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.hasAttribute('data-counted')) {
            const numbers = entry.target.querySelectorAll('[data-count]');
            numbers.forEach(num => {
                const target = parseInt(num.getAttribute('data-count'));
                countUp(num, target);
            });
            entry.target.setAttribute('data-counted', 'true');
            statsObserver.unobserve(entry.target);
        }
    });
});

const statsSection = document.querySelector('.stats, .stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');

            if (filter === 'all' || category.includes(filter)) {
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.display = 'block';
                    item.style.animation = 'revealUp 0.6s ease-out';
                }, 10);
            } else {
                item.style.display = 'none';
            }
        });
    });
});
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = contactForm.querySelector('input[type="text"]');
        const email = contactForm.querySelector('input[type="email"]');
        const message = contactForm.querySelector('textarea');

        if (!name.value || !email.value || !message.value) {
            alert('Please fill in all required fields');
            return;
        }

        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#00d084';

            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        }, 1500);
    });
}
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const input = newsletterForm.querySelector('input');
        const email = input.value;

        if (!email) {
            alert('Please enter your email');
            return;
        }

        input.value = '';
        alert('Thank you for subscribing!');
    });
}
const navLinks2 = document.querySelectorAll('.nav-link');

navLinks2.forEach(link => {
    link.addEventListener('mouseenter', function() {
        navLinks2.forEach(l => {
            if (l !== this) {
                l.style.opacity = '0.5';
            }
        });
    });

    link.addEventListener('mouseleave', function() {
        navLinks2.forEach(l => {
            l.style.opacity = '1';
        });
    });
});
const elementsToAnimate = document.querySelectorAll(
    '.service-card, .team-card, .blog-card, .portfolio-item'
);

const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            elementObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    elementObserver.observe(el);
});
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.image-wrapper');

    parallaxElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        const elementOffset = element.getBoundingClientRect().top + scrollPosition;
        const distance = scrollPosition - elementOffset;

        element.style.backgroundPosition = `center ${distance * 0.5}px`;
    });
});
document.querySelectorAll('.service-link, .blog-link, .portfolio-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
    });

    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.style.opacity = '1';
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.6s ease';
        imageObserver.observe(img);
    });
}
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        const existingRipple = this.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        this.appendChild(ripple);
    });
});
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(1.02)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.display = 'none';
        }
    }, 1500);
});
document.querySelectorAll('[data-delay]').forEach(element => {
    const delay = element.getAttribute('data-delay');
    element.style.animationDelay = (delay * 0.1) + 's';
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
window.addEventListener('load', () => {
    const animateItems = document.querySelectorAll('.animate-item');
    animateItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s forwards`;
    });

    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.animation = 'slideDown 0.6s ease-out';
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navList.classList.contains('active')) {
        navList.classList.remove('active');
        mobileToggle.classList.remove('active');
    }

    if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});
document.querySelectorAll('button[type="submit"]').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.disabled) {
            this.style.pointerEvents = 'none';
            setTimeout(() => {
                this.style.pointerEvents = 'auto';
            }, 1500);
        }
    });
});
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.style.boxShadow = 'none';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 208, 132, 0.1)';
    }

    lastScroll = currentScroll;
});
function animateText(element) {
    const text = element.textContent;
    element.textContent = '';

    let index = 0;
    const interval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
        } else {
            clearInterval(interval);
        }
    }, 50);
}
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

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
const biofuelContainer = document.querySelector('.biofuel-container');

function handleBiofuelAnimations() {
    if (biofuelContainer) {
        if (window.innerWidth <= 768) {
            biofuelContainer.style.display = 'none';
        } else {
            biofuelContainer.style.display = 'block';
        }
    }
}

handleBiofuelAnimations();
window.addEventListener('resize', debounce(handleBiofuelAnimations, 200));

window.addEventListener('scroll', () => {
    if (biofuelContainer && window.innerWidth > 768) {
        const scrollPosition = window.pageYOffset;
        biofuelContainer.style.transform = `translateY(${scrollPosition * 0.3}px)`;
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('biofuel-popup-modal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.popup-close-btn');
    const overlay = modal.querySelector('.popup-overlay');
    const ctaBtn = modal.querySelector('.popup-cta-btn');

    function showModal() {
        modal.style.display = 'flex';
        modal.offsetHeight;
        modal.classList.add('show');
        
        document.body.style.overflow = 'hidden';
    }

    function hideModal() {
        modal.classList.remove('show');
        
        document.body.style.overflow = '';
        
        setTimeout(() => {
            modal.style.display = 'none';
        }, 500); // matches the CSS transition time
    }

    window.addEventListener('load', () => {
        setTimeout(() => {
            showModal();
        }, 2200); // 2.2 seconds gives the preloader perfect time to vanish
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', hideModal);
    }

    if (overlay) {
        overlay.addEventListener('click', hideModal);
    }

    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            hideModal();
            document.body.style.overflow = '';
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            hideModal();
        }
    });
});
console.log('%cBuilt with ❤️ by Pro Designer', 'color: #00d084; font-size: 16px; font-weight: bold;');
