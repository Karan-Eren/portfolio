// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Performance optimization: Cache DOM elements
    const heroSection = document.querySelector('.hero');
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const navLinkItems = document.querySelectorAll('.nav-links a');
    const projectCards = document.querySelectorAll('.project-card');
    const navbar = document.querySelector('.navbar');
    
    // Note: Hamburger menu toggle is handled in hamburger.js
    
    // Calendar options elements
    const scheduleCallBtn = document.getElementById('schedule-call-btn');
    const calendarOptions = document.getElementById('calendar-options');
    const closeCalendarBtn = document.getElementById('close-calendar-btn');
    let bodyOverlay;
    
    // Create overlay for when calendar options are shown
    function createOverlay() {
        if (!bodyOverlay) {
            bodyOverlay = document.createElement('div');
            bodyOverlay.className = 'body-overlay';
            document.body.appendChild(bodyOverlay);
            
            // Close calendar options when overlay is clicked
            bodyOverlay.addEventListener('click', closeCalendarOptions, { passive: true });
        }
    }
    
    // Show calendar options panel
    function showCalendarOptions() {
        if (!bodyOverlay) createOverlay();
        
        calendarOptions.style.display = 'flex';
        
        // Force a reflow - batch with other style changes
        requestAnimationFrame(() => {
            calendarOptions.classList.add('active');
            bodyOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close calendar options panel
    function closeCalendarOptions() {
        calendarOptions.classList.remove('active');
        bodyOverlay.classList.remove('active');
        
        // Re-enable scroll after animation completes
        setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, 400);
    }
    
    // Set up event listeners for calendar options
    if (scheduleCallBtn && calendarOptions) {
        createOverlay();
        
        scheduleCallBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showCalendarOptions();
        }, { passive: false });
    }
    
    if (closeCalendarBtn) {
        closeCalendarBtn.addEventListener('click', closeCalendarOptions, { passive: true });
    }
    
    // Close calendar options with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && calendarOptions && calendarOptions.classList.contains('active')) {
            closeCalendarOptions();
        }
    }, { passive: true });
    
    // Calendar event generation
    const createIcsBtn = document.getElementById('create-ics');
    const addToGoogleBtn = document.getElementById('add-to-google');
    
    if (createIcsBtn) {
        createIcsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadIcsFile();
        }, { passive: false });
    }
    
    if (addToGoogleBtn) {
        addToGoogleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openGoogleCalendar();
        }, { passive: false });
    }
    
    // Function to download ICS file - cached date formatting
    function downloadIcsFile() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        // Format dates for ICS file
        const startDate = formatDateForIcs(tomorrow, 10); // 10 AM tomorrow
        const endDate = formatDateForIcs(tomorrow, 11);   // 11 AM tomorrow
        
        const icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
PRODID:-//Personal Portfolio//EN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:Call with Me
DTSTART:${startDate}
DTEND:${endDate}
DESCRIPTION:Discussion about potential collaboration or project details.
LOCATION:Online
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;
        
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'schedule_call.ics';
        document.body.appendChild(link);
        link.click();
        
        // Clean up resources
        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        }, 100);
    }
    
    // Format date for ICS file
    function formatDateForIcs(date, hour) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const formattedHour = hour.toString().padStart(2, '0');
        
        return `${year}${month}${day}T${formattedHour}0000Z`;
    }
    
    // Open Google Calendar with pre-filled event
    function openGoogleCalendar() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        // Set time to 10 AM tomorrow
        tomorrow.setHours(10, 0, 0, 0);
        
        const startTime = tomorrow.toISOString().replace(/-|:|\.\d+/g, '');
        
        // End time (1 hour later)
        const endTime = new Date(tomorrow.getTime() + (60 * 60 * 1000)).toISOString().replace(/-|:|\.\d+/g, '');
        
        const eventDetails = {
            action: 'TEMPLATE',
            text: 'Call with Me',
            details: 'Discussion about potential collaboration or project details.',
            location: 'Online',
            dates: startTime + '/' + endTime
        };
        
        const googleCalendarUrl = 'https://calendar.google.com/calendar/render?' + 
            Object.keys(eventDetails)
                .map(key => `${key}=${encodeURIComponent(eventDetails[key])}`)
                .join('&');
        
        window.open(googleCalendarUrl, '_blank');
    }
    
    // Enhanced typing animation with better performance and memory cleanup
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    
    const textArray = ['Software Developer', 'Web Developer', 'Python Programmer', 'C/C++ Developer', 'Problem Solver'];
    const typingDelay = 80; // Faster typing
    const erasingDelay = 40; // Faster erasing
    const newTextDelay = 1500; // Shorter delay between phrases
    let textArrayIndex = 0;
    let charIndex = 0;
    let typingTimeout = null;
    
    function type() {
        if (!typedTextSpan || !cursorSpan) return;
        
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            typingTimeout = setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            typingTimeout = setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (!typedTextSpan || !cursorSpan) return;
        
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            typingTimeout = setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            textArrayIndex = (textArrayIndex + 1) % textArray.length;
            typingTimeout = setTimeout(type, typingDelay);
        }
    }
    
    // Only start typing if elements exist and are visible
    if (typedTextSpan && cursorSpan && textArray.length) {
        // Clear any existing timeout to prevent multiple instances
        if (typingTimeout) clearTimeout(typingTimeout);
        
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
            setTimeout(type, newTextDelay);
        });
        
        // Clean up typing animation when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && typingTimeout) {
                clearTimeout(typingTimeout);
                typingTimeout = null;
            } else if (!document.hidden && !typingTimeout) {
                // Resume typing when page becomes visible again
                setTimeout(type, newTextDelay);
            }
        }, { passive: true });
    }
    
    // Custom high-performance smooth scroll implementation
    function smoothScrollTo(targetPosition, duration = 800) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        
        // Don't animate very small scrolls
        if (Math.abs(distance) < 50) {
            window.scrollTo(0, targetPosition);
            return;
        }
        
        // Ease-out cubic function for smoother deceleration
        const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
        
        let startTime = null;
        
        function scrollAnimation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeProgress = easeOutCubic(progress);
            
            window.scrollTo(0, startPosition + distance * easeProgress);
            
            if (elapsedTime < duration) {
                // Continue animation
                requestAnimationFrame(scrollAnimation);
            }
        }
        
        // Start the animation
        requestAnimationFrame(scrollAnimation);
    }
    
    // Improved smooth scrolling with custom implementation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip if it's the schedule call button
            if (this.id === 'schedule-call-btn') return;
            
            const targetId = this.getAttribute('href');
            // Skip if the href is just "#" (the logo link)
            if (targetId === '#') {
                e.preventDefault();
                smoothScrollTo(0, 600);
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerOffset = 80; // Account for fixed header
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                
                // Use custom smooth scroll function for better performance
                smoothScrollTo(targetPosition, 600);
            }
        }, { passive: false });
    });
    
    // Optimized scroll handling using throttle and requestAnimationFrame
    let lastScrollY = window.pageYOffset;
    let ticking = false;
    
    // More efficient throttle function
    function throttle(callback, limit) {
        let waiting = false;
        return function() {
            if (!waiting) {
                callback.apply(this, arguments);
                waiting = true;
                requestAnimationFrame(() => {
                    waiting = false;
                });
            }
        };
    }
    
    // Scroll handler with efficient throttling
    window.addEventListener('scroll', throttle(() => {
        lastScrollY = window.pageYOffset;
        
        // Update header state - high priority visual feedback
        updateHeader();
        
        // Schedule less critical updates with requestAnimationFrame
        if (!ticking) {
            requestAnimationFrame(() => {
                updateNavigation();
                // Only run parallax effect when in viewport
                if (heroSection.getBoundingClientRect().bottom > 0) {
                    updateParallax();
                }
                ticking = false;
            });
            ticking = true;
        }
    }, 50), { passive: true });
    
    function updateNavigation() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (lastScrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Highly optimized parallax with transform instead of background position
    function updateParallax() {
        if (lastScrollY <= heroSection.offsetHeight) {
            const translateY = lastScrollY * 0.15; // Reduced movement amount
            const heroContent = document.querySelector('.hero-content');
            
            if (heroContent) {
                // Use transform for better performance
                heroContent.style.transform = `translate3d(0, ${translateY}px, 0)`;
            }
            
            // Use opacity instead of tilt for better performance
            const opacity = Math.max(0.5, 1 - (lastScrollY / (heroSection.offsetHeight)));
            heroSection.style.opacity = opacity;
        }
    }
    
    function updateHeader() {
        const shouldBeScrolled = lastScrollY > 50;
        const isCurrentlyScrolled = header.classList.contains('scrolled');
        
        // Only apply changes if state needs to change
        if (shouldBeScrolled !== isCurrentlyScrolled) {
            if (shouldBeScrolled) {
                header.classList.add('scrolled');
                navbar.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
                navbar.classList.remove('scrolled');
            }
        }
    }
    
    // Optimized Intersection Observer for section animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Optimize card animations
                if (entry.target.classList.contains('projects-grid')) {
                    requestAnimationFrame(animateCards);
                }
                
                // Stop observing once element is animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe key elements
    document.querySelectorAll('.about-content, .projects-grid, .contact-content').forEach(el => {
        observer.observe(el);
    });
    
    function animateCards() {
        // Use CSS custom properties for animation instead of JS timeouts
        projectCards.forEach((card, index) => {
            card.style.setProperty('--card-delay', `${index * 100}ms`);
            card.classList.add('active');
        });
    }
    
    // Optimized mouse move effect with better throttling
    projectCards.forEach(card => {
        let isHovering = false;
        let rafId = null;
        
        // Track hover state
        card.addEventListener('mouseenter', () => {
            isHovering = true;
            // Set will-change only while hovering
            card.style.willChange = 'transform, box-shadow';
        }, { passive: true });
        
        card.addEventListener('mouseleave', () => {
            isHovering = false;
            card.style.willChange = 'auto';
            card.style.transform = '';
            card.style.boxShadow = '';
            // Cancel any pending animation frame
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        }, { passive: true });
        
        // Throttled mousemove handler with rAF
        card.addEventListener('mousemove', throttle(e => {
            if (!isHovering) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Limit rotation for smoother effect
            const rotateX = Math.min(10, Math.max(-10, (y - centerY) / 20));
            const rotateY = Math.min(10, Math.max(-10, (centerX - x) / 20));
            
            // Use rAF for smoother animation
            rafId = requestAnimationFrame(() => {
                // Apply transform once per frame
                card.style.transform = `perspective(1000px) translate3d(0, 0, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
                card.style.boxShadow = `0 15px 35px rgba(0, 0, 0, 0.3), ${(x - centerX) / 15}px ${(y - centerY) / 15}px 30px rgba(0, 0, 0, 0.2)`;
                rafId = null;
            });
        }, 16), { passive: true });
    });
    
    // Create particle effect using more efficient Canvas
    function createParticles() {
        if (document.querySelector('.particles-canvas')) return;
        
        const particlesContainer = document.querySelector('.hero');
        if (!particlesContainer) return;
        
        // Create canvas for better performance
        const canvas = document.createElement('canvas');
        canvas.className = 'particles-canvas';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '0';
        
        // Append canvas once
        particlesContainer.appendChild(canvas);
        
        // Set canvas size
        function resizeCanvas() {
            canvas.width = particlesContainer.offsetWidth;
            canvas.height = particlesContainer.offsetHeight;
        }
        
        resizeCanvas();
        
        // Handle resize
        window.addEventListener('resize', throttle(resizeCanvas, 100), { passive: true });
        
        // Get context
        const ctx = canvas.getContext('2d');
        
        // Create particles
        const particles = [];
        const particleCount = window.innerWidth < 768 ? 10 : 20; // Reduce on mobile
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 5 + 1,
                speedX: Math.random() * 2 - 1,
                speedY: -Math.random() * 2 - 0.5,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
        
        // Animate particles
        function animateParticles() {
            if (!document.hidden) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                particles.forEach(particle => {
                    // Move
                    particle.x += particle.speedX;
                    particle.y += particle.speedY;
                    
                    // Draw
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(100, 255, 218, ${particle.opacity})`;
                    ctx.fill();
                    
                    // Reset if out of bounds
                    if (particle.y < -particle.size || 
                        particle.x < -particle.size || 
                        particle.x > canvas.width + particle.size) {
                        particle.x = Math.random() * canvas.width;
                        particle.y = canvas.height + particle.size;
                        particle.speedX = Math.random() * 2 - 1;
                    }
                });
            }
            
            // Only request animation frame when tab is visible
            if (!document.hidden) {
                requestAnimationFrame(animateParticles);
            }
        }
        
        // Start animation
        animateParticles();
        
        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                requestAnimationFrame(animateParticles);
            }
        }, { passive: true });
    }
    
    // Initial particles - only on desktop or tablet to save resources on mobile
    if (window.innerWidth > 576) {
        requestAnimationFrame(createParticles);
    }
    
    // Add styles via stylesheet for better performance
    function addDynamicStyles() {
        // If styles already exist, don't add again
        if (document.getElementById('dynamic-portfolio-styles')) return;
        
        const styleEl = document.createElement('style');
        styleEl.id = 'dynamic-portfolio-styles';
        
        // Optimize CSS rules for performance
        const cssText = `
            header.scrolled {
                background-color: rgba(10, 25, 47, 0.95);
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            }
            
            .projects-grid .project-card {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.5s cubic-bezier(0.645, 0.045, 0.355, 1),
                            transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
                transition-delay: var(--card-delay, 0ms);
                will-change: opacity, transform;
            }
            
            .projects-grid .project-card.active {
                opacity: 1;
                transform: translateY(0);
            }
            
            @media (prefers-reduced-motion: reduce) {
                .projects-grid .project-card,
                .projects-grid .project-card.active {
                    transition: none;
                    opacity: 1;
                    transform: none;
                }
                
                .particles-canvas {
                    display: none;
                }
            }
        `;
        
        styleEl.textContent = cssText;
        document.head.appendChild(styleEl);
    }
    
    // Add dynamic styles
    addDynamicStyles();
}); 